-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view project contacts" ON public.project_contacts;

-- Create more restrictive policies for project contacts
-- 1. Project founders can view their own project contacts
CREATE POLICY "Founders can view their project contacts" 
ON public.project_contacts 
FOR SELECT 
USING (
  project_id IN (
    SELECT projects.id 
    FROM projects 
    WHERE projects.founder_id IN (
      SELECT profiles.id 
      FROM profiles 
      WHERE profiles.user_id = auth.uid()
    )
  )
);

-- 2. Investors can view contact info only for projects they've invested in
CREATE POLICY "Investors can view contacts of invested projects" 
ON public.project_contacts 
FOR SELECT 
USING (
  project_id IN (
    SELECT investments.project_id 
    FROM investments 
    WHERE investments.investor_id IN (
      SELECT profiles.id 
      FROM profiles 
      WHERE profiles.user_id = auth.uid()
    )
    AND investments.status = 'completed'
  )
);

-- 3. Add a policy for admins (if needed in the future)
-- This is commented out but can be enabled if admin functionality is added
-- CREATE POLICY "Admins can view all project contacts" 
-- ON public.project_contacts 
-- FOR SELECT 
-- USING (
--   EXISTS (
--     SELECT 1 FROM profiles 
--     WHERE profiles.user_id = auth.uid() 
--     AND profiles.role = 'admin'
--   )
-- );