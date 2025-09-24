-- Create platform configuration table
CREATE TABLE public.platform_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key text NOT NULL UNIQUE,
  config_value text NOT NULL,
  description text,
  created_at timestamp WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at timestamp WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_config ENABLE ROW LEVEL SECURITY;

-- Create policies - only admins can manage platform config
CREATE POLICY "Admins can view all platform config" 
ON public.platform_config 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert platform config" 
ON public.platform_config 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update platform config" 
ON public.platform_config 
FOR UPDATE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_platform_config_updated_at
BEFORE UPDATE ON public.platform_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default configuration values
INSERT INTO public.platform_config (config_key, config_value, description) VALUES
('treasury_wallet_address', '', 'Dirección de wallet para recibir fondos de la plataforma'),
('presale_contract_address', '', 'Dirección del contrato de presale desplegado'),
('vcoin_token_address', '', 'Dirección del token VCoin desplegado'),
('eth_withdrawal_fee', '0.01', 'Comisión por retiro en ETH (en ETH)'),
('usdt_withdrawal_fee', '10', 'Comisión por retiro en USDT (en USDT)'),
('platform_fee_percentage', '2.5', 'Porcentaje de comisión de la plataforma');