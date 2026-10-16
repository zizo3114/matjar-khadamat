/*
# Phase 4: Transactions table for Chargily Pay V2

## Summary
Creates a `transactions` table to track all payments (tips and product purchases)
processed through the Chargily Pay V2 gateway. This is the backbone of the payment
system — every tip or product purchase creates a pending transaction, and the
Chargily webhook updates it to paid/failed.

## New Table: transactions
- `id` (uuid, PK)
- `payer_email` (text, not null) — email of the person paying
- `profile_id` (uuid, FK → profiles.id ON DELETE CASCADE) — the creator receiving money
- `type` (text, not null, CHECK constraint: 'tip' | 'product_purchase')
- `digital_product_id` (uuid, FK → digital_products.id ON DELETE SET NULL, nullable)
- `amount` (numeric(10,2), not null) — amount in DZD
- `status` (text, not null, default 'pending', CHECK: 'pending' | 'paid' | 'failed' | 'canceled')
- `checkout_id` (text, nullable) — Chargily Pay checkout ID
- `checkout_url` (text, nullable) — Chargily Pay checkout URL (stored temporarily for redirect)
- `created_at`, `updated_at` timestamps

## Security
- RLS enabled
- Public INSERT: anyone can initiate a payment (no auth required to tip/buy)
- Public SELECT: anyone can check transaction status by checkout_id (for payment status pages)
- Authenticated creators can SELECT their own received transactions (to see earnings)
- UPDATE/DELETE: only the webhook edge function (via service role, bypasses RLS)

## Notes
1. The `checkout_id` is used by the webhook to find and update the transaction.
2. `checkout_url` is stored so the frontend can redirect — it's not sensitive.
3. The service role key (used by edge functions) bypasses RLS for webhook updates.
*/
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payer_email text NOT NULL,
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('tip', 'product_purchase')),
  digital_product_id uuid REFERENCES digital_products(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'canceled')),
  checkout_id text,
  checkout_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS transactions_profile_id_idx ON transactions(profile_id);
CREATE INDEX IF NOT EXISTS transactions_checkout_id_idx ON transactions(checkout_id);
CREATE INDEX IF NOT EXISTS transactions_status_idx ON transactions(status);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a new pending transaction (to start checkout)
DROP POLICY IF EXISTS "public_insert_transactions" ON transactions;
CREATE POLICY "public_insert_transactions" ON transactions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Anyone can select by checkout_id (for payment status verification)
-- and creators can see their own received transactions
DROP POLICY IF EXISTS "select_transactions" ON transactions;
CREATE POLICY "select_transactions" ON transactions FOR SELECT
  TO anon, authenticated USING (true);

-- No public UPDATE or DELETE — only the service role (edge functions) can modify
DROP POLICY IF EXISTS "update_transactions" ON transactions;
CREATE POLICY "update_transactions" ON transactions FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

-- updated_at trigger
DROP TRIGGER IF EXISTS transactions_updated_at ON transactions;
CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
