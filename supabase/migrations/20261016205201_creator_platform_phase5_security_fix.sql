/*
# Phase 5 Security Fix: Revoke EXECUTE from anon on SECURITY DEFINER functions

## Summary
Fixes security advisor warnings by revoking EXECUTE permissions from the `anon` role
on SECURITY DEFINER functions that should only be callable by authenticated users or
the service role (edge functions).

## Changes
1. `increment_balance` — Revoke from anon. This function is only called by the webhook
   edge function (service role key, bypasses RLS). Authenticated users don't need it either,
   but we keep it granted to authenticated for safety since the service role bypasses all.
   Actually, the service role bypasses all RLS and grants, so we only need to revoke from anon.
   We also revoke from authenticated since this should only be called via service role.

2. `request_withdrawal` — Revoke from anon. This function uses auth.uid() internally so
   it requires an authenticated session. Keep EXECUTE on authenticated only.

3. `handle_new_user` — This is a trigger function called on user signup. It should not
   be callable via the REST API at all. Revoke from both anon and authenticated. The
   trigger still works because trigger functions run with the privileges of the table owner.

4. `set_updated_at` — Revoke from anon and authenticated. Same reason — it's a trigger
   function, not meant to be called via REST API.

## Security Impact
- Prevents anonymous users from calling increment_balance to artificially inflate balances
- Prevents anonymous users from calling request_withdrawal
- Prevents arbitrary RPC calls to trigger functions via the REST API
*/

-- increment_balance: only service role (edge functions) should call this
REVOKE EXECUTE ON FUNCTION public.increment_balance(uuid, numeric) FROM anon, authenticated;

-- request_withdrawal: only authenticated users should call this
REVOKE EXECUTE ON FUNCTION public.request_withdrawal(numeric, text, text) FROM anon;

-- handle_new_user: trigger function, should not be callable via REST API
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

-- set_updated_at: trigger function, should not be callable via REST API
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated;
