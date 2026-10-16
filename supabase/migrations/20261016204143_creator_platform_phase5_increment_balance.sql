/*
# Phase 5: Add increment_balance function for webhook

## Summary
Creates a SECURITY DEFINER function `increment_balance` that safely increments a
creator's wallet balance. Used by the Chargily webhook edge function (which uses
the service role key, bypassing RLS, so this function is mainly for clean encapsulation).

## New Function: increment_balance
- Parameters: p_profile_id (uuid), p_amount (numeric)
- Adds p_amount to the profile's balance
- SECURITY DEFINER so it can be called from edge functions with service role

## Security
- Granted to authenticated role for potential future use
- Edge functions use service role which bypasses RLS
*/
CREATE OR REPLACE FUNCTION public.increment_balance(
  p_profile_id uuid,
  p_amount numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET balance = balance + p_amount
  WHERE id = p_profile_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_balance TO authenticated;
