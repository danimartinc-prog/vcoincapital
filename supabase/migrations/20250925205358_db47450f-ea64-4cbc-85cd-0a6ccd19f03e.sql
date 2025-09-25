-- Drop all existing policies first
DROP POLICY IF EXISTS "Anyone can view wallet investments" ON wallet_investments;
DROP POLICY IF EXISTS "Anyone can create wallet investments" ON wallet_investments;
DROP POLICY IF EXISTS "Admins can view all wallet investments" ON wallet_investments;

-- Create secure RLS policies for wallet_investments
CREATE POLICY "Authenticated users can create wallet investments" 
ON wallet_investments 
FOR INSERT 
WITH CHECK (true);

-- Block direct SELECT access - force use of secure functions
CREATE POLICY "Block direct wallet investment access" 
ON wallet_investments 
FOR SELECT 
USING (false);

-- Allow admins full access for management
CREATE POLICY "Admins have full wallet investment access" 
ON wallet_investments 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create secure functions for wallet data access
CREATE OR REPLACE FUNCTION get_wallet_investments(target_wallet_address text)
RETURNS TABLE (
  id uuid,
  wallet_address text,
  project_id uuid,
  amount_eur numeric,
  amount_vcoin numeric,
  transaction_hash text,
  payment_method text,
  status text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wi.id,
    wi.wallet_address,
    wi.project_id,
    wi.amount_eur,
    wi.amount_vcoin,
    wi.transaction_hash,
    wi.payment_method,
    wi.status,
    wi.created_at,
    wi.updated_at
  FROM wallet_investments wi
  WHERE wi.wallet_address = LOWER(target_wallet_address);
END;
$$;

CREATE OR REPLACE FUNCTION get_wallet_balance(target_wallet_address text)
RETURNS TABLE (
  total_vcoin numeric,
  total_eur numeric
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(wi.amount_vcoin), 0) as total_vcoin,
    COALESCE(SUM(wi.amount_eur), 0) as total_eur
  FROM wallet_investments wi
  WHERE wi.wallet_address = LOWER(target_wallet_address) 
    AND wi.status = 'completed';
END;
$$;