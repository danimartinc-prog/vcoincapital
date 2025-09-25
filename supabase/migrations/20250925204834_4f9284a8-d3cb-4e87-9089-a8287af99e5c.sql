-- Update platform configuration with proper addresses
UPDATE platform_config 
SET config_value = '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8C'
WHERE config_key = 'presale_contract_address';

UPDATE platform_config 
SET config_value = '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B'
WHERE config_key = 'vcoin_token_address';

UPDATE platform_config 
SET config_value = '0x89df84eB2D672623f2EaC82842bBcCCAB52f0A4C'
WHERE config_key = 'treasury_wallet_address';

-- Create a mapping table for wallet addresses to allow investments without UUID conflicts
CREATE TABLE IF NOT EXISTS wallet_investments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address text NOT NULL,
  project_id uuid NOT NULL,
  amount_eur numeric NOT NULL,
  amount_vcoin numeric NOT NULL,
  transaction_hash text,
  payment_method text DEFAULT 'ETH',
  status text DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on wallet_investments
ALTER TABLE wallet_investments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for wallet_investments
CREATE POLICY "Anyone can create wallet investments" ON wallet_investments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view wallet investments" ON wallet_investments FOR SELECT USING (true);
CREATE POLICY "Admins can view all wallet investments" ON wallet_investments FOR ALL USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE OR REPLACE TRIGGER update_wallet_investments_updated_at
    BEFORE UPDATE ON wallet_investments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();