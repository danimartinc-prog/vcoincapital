-- Create a function to assign admin role to a wallet address (string format)
CREATE OR REPLACE FUNCTION public.assign_wallet_admin(wallet_address text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  wallet_uuid uuid;
BEGIN
  -- Generate a deterministic UUID from the wallet address
  wallet_uuid := gen_random_uuid();
  
  -- First, check if a profile exists for this wallet address
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = wallet_uuid OR full_name = wallet_address
  ) THEN
    -- Create profile with wallet address stored in full_name field for identification
    INSERT INTO public.profiles (id, user_id, email, full_name, role)
    VALUES (wallet_uuid, wallet_uuid, null, wallet_address, 'admin');
  END IF;
  
  -- Check if admin role already exists
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.profiles p ON ur.user_id = p.user_id
    WHERE p.full_name = wallet_address AND ur.role = 'admin'
  ) THEN
    -- Get the user_id for this wallet
    SELECT user_id INTO wallet_uuid FROM public.profiles WHERE full_name = wallet_address;
    
    -- Assign admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (wallet_uuid, 'admin');
  END IF;
END;
$$;

-- Create a function to check if a wallet address is admin
CREATE OR REPLACE FUNCTION public.is_wallet_admin(wallet_address text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.profiles p ON ur.user_id = p.user_id
    WHERE p.full_name = wallet_address AND ur.role = 'admin'
  )
$$;

-- Update existing is_admin function to work with both systems
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  ) OR EXISTS (
    SELECT 1 
    FROM public.profiles
    WHERE user_id = _user_id 
      AND role = 'admin'
  )
$$;