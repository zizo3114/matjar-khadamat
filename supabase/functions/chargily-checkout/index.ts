import { createClient } from "npm:@supabase/supabase-js@2.118.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CHARGILY_API_BASE = "https://pay.chargily.dz/api/v2";
const CHARGILY_SECRET = Deno.env.get("CHARGILY_SECRET_KEY") ?? "";
const APP_URL = Deno.env.get("APP_URL") ?? "http://localhost:5173";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

type CheckoutRequest = {
  type: "tip" | "product_purchase";
  profile_id?: string;
  digital_product_id?: string;
  payer_email: string;
  amount?: number;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body: CheckoutRequest = await req.json();

    if (!body.payer_email || !body.type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let amount: number;
    let profileId: string;
    let productId: string | null = null;
    let description: string;

    if (body.type === "tip") {
      if (!body.profile_id || !body.amount) {
        return new Response(
          JSON.stringify({ error: "profile_id and amount are required for tips" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      amount = Math.round(body.amount * 100);
      profileId = body.profile_id;
      description = `Tip to creator`;
    } else if (body.type === "product_purchase") {
      if (!body.digital_product_id) {
        return new Response(
          JSON.stringify({ error: "digital_product_id is required for product purchases" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const { data: product, error: productError } = await supabase
        .from("digital_products")
        .select("*")
        .eq("id", body.digital_product_id)
        .maybeSingle();

      if (productError || !product) {
        return new Response(
          JSON.stringify({ error: "Product not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      amount = Math.round(parseFloat(product.price) * 100);
      profileId = product.profile_id;
      productId = product.id;
      description = `Purchase: ${product.title}`;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Amount must be greater than 0" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Insert pending transaction
    const { data: txn, error: txnError } = await supabase
      .from("transactions")
      .insert({
        payer_email: body.payer_email,
        profile_id: profileId,
        type: body.type,
        digital_product_id: productId,
        amount: amount / 100,
        status: "pending",
      })
      .select()
      .single();

    if (txnError || !txn) {
      return new Response(
        JSON.stringify({ error: "Failed to create transaction" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Create Chargily checkout
    const checkoutPayload: Record<string, unknown> = {
      amount,
      currency: "dzd",
      success_url: `${APP_URL}/payment/success?checkout_id=${txn.id}`,
      failure_url: `${APP_URL}/payment/failed?checkout_id=${txn.id}`,
      description,
      metadata: {
        transaction_id: txn.id,
        payer_email: body.payer_email,
        type: body.type,
        profile_id: profileId,
        ...(productId ? { digital_product_id: productId } : {}),
      },
    };

    const chargilyRes = await fetch(`${CHARGILY_API_BASE}/checkouts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CHARGILY_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    });

    if (!chargilyRes.ok) {
      const errText = await chargilyRes.text();
      await supabase
        .from("transactions")
        .update({ status: "failed" })
        .eq("id", txn.id);
      return new Response(
        JSON.stringify({ error: `Chargily API error: ${errText}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const checkout = await chargilyRes.json();

    // Store checkout ID and URL
    await supabase
      .from("transactions")
      .update({
        checkout_id: checkout.id,
        checkout_url: checkout.checkout_url,
      })
      .eq("id", txn.id);

    return new Response(
      JSON.stringify({
        checkout_url: checkout.checkout_url,
        checkout_id: checkout.id,
        transaction_id: txn.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
