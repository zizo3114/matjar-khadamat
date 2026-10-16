import { createClient } from "npm:@supabase/supabase-js@2.118.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CHARGILY_SECRET = Deno.env.get("CHARGILY_SECRET_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function verifySignature(rawBody: string, signatureHeader: string | null): Promise<boolean> {
  if (!signatureHeader) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(CHARGILY_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const expectedHex = Array.from(new Uint8Array(expected))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expectedHex === signatureHeader;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("signature") ?? req.headers.get("X-Signature");

    const isValid = await verifySignature(rawBody, signature);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const event = JSON.parse(rawBody);
    // Chargily sends { event: "checkout.paid", data: { ...checkout } }
    const eventType = event.event ?? event.type;
    const checkout = event.data ?? event;

    const checkoutId = checkout.id;
    if (!checkoutId) {
      return new Response(
        JSON.stringify({ error: "No checkout ID in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Find the transaction by checkout_id
    const { data: txn, error: txnError } = await supabase
      .from("transactions")
      .select("*")
      .eq("checkout_id", checkoutId)
      .maybeSingle();

    if (txnError || !txn) {
      return new Response(
        JSON.stringify({ error: "Transaction not found for this checkout" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Determine new status from event type
    let newStatus: string;
    if (eventType === "checkout.paid" || checkout.status === "paid") {
      newStatus = "paid";
    } else if (eventType === "checkout.failed" || checkout.status === "failed") {
      newStatus = "failed";
    } else if (eventType === "checkout.canceled" || checkout.status === "canceled") {
      newStatus = "canceled";
    } else {
      return new Response(
        JSON.stringify({ received: true, message: "Unhandled event type" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Only update if the transaction isn't already in this status (idempotency)
    if (txn.status === newStatus) {
      return new Response(
        JSON.stringify({ received: true, status: newStatus, message: "Already processed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Update transaction status
    const { error: updateError } = await supabase
      .from("transactions")
      .update({ status: newStatus })
      .eq("id", txn.id);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: "Failed to update transaction" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Increment the creator's wallet balance ONLY when a transaction becomes 'paid'
    if (newStatus === "paid") {
      const { error: balanceError } = await supabase.rpc("increment_balance", {
        p_profile_id: txn.profile_id,
        p_amount: txn.amount,
      });

      if (balanceError) {
        console.error("Failed to increment balance:", balanceError.message);
      }
    }

    return new Response(
      JSON.stringify({ received: true, status: newStatus }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
