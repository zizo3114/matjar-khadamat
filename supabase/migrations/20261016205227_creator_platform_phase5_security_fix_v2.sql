/*
# Phase 5 Security Fix v2: Revoke EXECUTE from PUBLIC on SECURITY DEFINER functions

## Summary
PostgreSQL grants EXECUTE on functions to PUBLIC by default. The previous migration
only revoked from anon and authenticated roles, but PUBLIC grant still applies.
This migration revokes from PUBLIC first, then grants back only where needed.

## Changes
1. `increment_balance` — Revoke from PUBLIC. Only service role (edge functions) needs it.
   Service role bypasses all checks, so no explicit grant needed.

2. `request_withdrawal` — Revoke from PUBLIC, then grant to authenticated only.
   Authenticated users call this to request withdrawals (auth.uid() validates ownership).

3. `handle_new_user` — Revoke from PUBLIC. This is a trigger function, not callable via API.
   Triggers run with table owner privileges, not caller privileges.

4. `set_updated_at` — Revoke from PUBLIC. Trigger function, not callable via API.
*/

REVOKE EXECUTE ON FUNCTION public.increment_balance(uuid, numeric) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.request_withdrawal(numeric, text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC;

-- Grant request_withdrawal back to authenticated only
GRANT EXECUTE ON FUNCTION public.request_withdrawal(numeric, text, text) TO authenticated;
