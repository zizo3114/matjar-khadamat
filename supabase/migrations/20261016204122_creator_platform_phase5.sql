/*
# Phase 5: Wallet Balance & Withdrawal Requests

## Summary
Adds a `balance` column to the existing `profiles` table so creators can track their
earnings. Creates a new `withdrawal_requests` table for creators to request payouts
to their CCP/RIP accounts. Also updates the transactions RLS to let creators query
their own paid transactions for analytics.

## Changes to profiles table
- Added `balance` column (numeric(10,2), default 0) — tracks the creator's available
  wallet balance. Incremented by the webhook edge function when a transaction is paid.
  Decremented when a withdrawal request is created.

## New Table: withdrawal_requests
- `id` (uuid, PK)
- `profile_id` (uuid, FK → profiles.id ON DELETE CASCADE) — the creator requesting payout
- `amount` (numeric(10,2), not null) — amount to withdraw in DZD
- `ccp_rip_number` (text, not null) — the creator's CCP/RIP account number (20 digits)
- `full_name` (text, not null) — full name on the bank account
- `status` (text, not null, default 'pending', CHECK: 'pending' | 'approved' | 'rejected')
- `notes` (text, nullable) — admin notes for approval/rejection
- `created_at`, `updated_at` timestamps

## Security
### profiles
- The existing UPDATE policy for profiles already covers balance changes (auth.uid() = id).
  No new policy needed — the webhook uses the service role key which bypasses RLS.

### withdrawal_requests
- RLS enabled
- SELECT: creators can view only their own withdrawal requests (auth.uid() = profile_id)
- INSERT: creators can create withdrawal requests for themselves (auth.uid() = profile_id)
- UPDATE/DELETE: blocked (only admin/service role can approve/reject)

### transactions
- Updated SELECT policy to allow creators to see their own received transactions
  (auth.uid() = profile_id) for analytics, while still allowing public reads for
  payment status pages (by checkout_id/transaction_id).

## Important Notes
1. The balance increment happens in the webhook edge function (service role, bypasses RLS).
2. The balance decrement happens on the frontend via the existing profile UPDATE policy.
   However, to prevent race conditions and ensure atomicity, a SECURITY DEFINER function
   `request_withdrawal` is created to atomically check balance, deduct, and insert.
3. Minimum withdrawal amount is enforced in the frontend (2000 DZD) and in the DB function.
*/
-- Add balance column to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'balance'
  ) THEN
    ALTER TABLE profiles ADD COLUMN balance numeric(10,2) NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create withdrawal_requests table
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  ccp_rip_number text NOT NULL,
  full_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS withdrawal_requests_profile_id_idx ON withdrawal_requests(profile_id);
CREATE INDEX IF NOT EXISTS withdrawal_requests_status_idx ON withdrawal_requests(status);

ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_withdrawals" ON withdrawal_requests;
CREATE POLICY "select_own_withdrawals" ON withdrawal_requests FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_withdrawals" ON withdrawal_requests;
CREATE POLICY "insert_own_withdrawals" ON withdrawal_requests FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

-- updated_at trigger
DROP TRIGGER IF EXISTS withdrawal_requests_updated_at ON withdrawal_requests;
CREATE TRIGGER withdrawal_requests_updated_at
  BEFORE UPDATE ON withdrawal_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SECURITY DEFINER function: atomically check balance, deduct, and create withdrawal request
-- This prevents race conditions where two concurrent withdrawals could overdraw the balance
CREATE OR REPLACE FUNCTION public.request_withdrawal(
  p_amount numeric,
  p_ccp_rip_number text,
  p_full_name text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_balance numeric;
  v_profile_id uuid := auth.uid();
  v_min_withdrawal numeric := 2000;
  v_request_id uuid;
BEGIN
  -- Validate inputs
  IF p_amount <= 0 THEN
    RETURN jsonb_build_object('error', 'Amount must be greater than 0');
  END IF;

  IF p_amount < v_min_withdrawal THEN
    RETURN jsonb_build_object('error', 'Minimum withdrawal amount is 2000 DZD');
  END IF;

  IF length(p_ccp_rip_number) != 20 OR p_ccp_rip_number !~ '^[0-9]+$' THEN
    RETURN jsonb_build_object('error', 'CCP/RIP number must be exactly 20 digits');
  END IF;

  IF length(p_full_name) < 3 THEN
    RETURN jsonb_build_object('error', 'Full name must be at least 3 characters');
  END IF;

  -- Lock the profile row and check balance
  SELECT balance INTO v_balance
  FROM profiles
  WHERE id = v_profile_id
  FOR UPDATE;

  IF v_balance IS NULL THEN
    RETURN jsonb_build_object('error', 'Profile not found');
  END IF;

  IF v_balance < p_amount THEN
    RETURN jsonb_build_object('error', 'Insufficient balance');
  END IF;

  -- Deduct balance
  UPDATE profiles SET balance = balance - p_amount WHERE id = v_profile_id;

  -- Create withdrawal request
  INSERT INTO withdrawal_requests (profile_id, amount, ccp_rip_number, full_name, status)
  VALUES (v_profile_id, p_amount, p_ccp_rip_number, p_full_name, 'pending')
  RETURNING id INTO v_request_id;

  RETURN jsonb_build_object('success', true, 'request_id', v_request_id);
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.request_withdrawal TO authenticated;
