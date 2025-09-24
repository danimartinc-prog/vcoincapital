-- Drop and recreate the assign_wallet_admin function to handle wallets without auth.users
CREATE OR REPLACE FUNCTION public.assign_wallet_admin(wallet_address text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  wallet_uuid uuid;
BEGIN
  -- Generate a deterministic UUID from the wallet address
  wallet_uuid := gen_random_uuid();
  
  -- Check if wallet already has admin privileges
  IF EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.profiles p ON ur.user_id = p.user_id
    WHERE p.full_name = wallet_address AND ur.role = 'admin'
  ) THEN
    -- Wallet already has admin role, nothing to do
    RETURN;
  END IF;
  
  -- Create profile for wallet (without foreign key constraint to auth.users)
  INSERT INTO public.profiles (id, user_id, email, full_name, role)
  VALUES (wallet_uuid, wallet_uuid, null, wallet_address, 'admin')
  ON CONFLICT (user_id) DO UPDATE SET
    role = 'admin',
    full_name = wallet_address,
    updated_at = now();
  
  -- Assign admin role in user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (wallet_uuid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;