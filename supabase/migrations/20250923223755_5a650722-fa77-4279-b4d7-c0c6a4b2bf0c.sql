-- Update RLS policies to allow admins to view all data
CREATE POLICY "Admins can view all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all investments"
ON public.investments
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all transactions"
ON public.transactions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Function to get admin statistics
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM profiles),
    'total_projects', (SELECT COUNT(*) FROM projects),
    'total_investments', (SELECT COUNT(*) FROM investments),
    'total_amount_raised', (SELECT COALESCE(SUM(amount_eur), 0) FROM investments WHERE status = 'completed'),
    'pending_projects', (SELECT COUNT(*) FROM projects WHERE status = 'pending'),
    'active_projects', (SELECT COUNT(*) FROM projects WHERE status IN ('approved', 'active')),
    'total_transactions', (SELECT COUNT(*) FROM transactions)
  )
$$;