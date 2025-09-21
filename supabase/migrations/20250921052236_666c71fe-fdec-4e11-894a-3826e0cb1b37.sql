-- Drop the existing overly permissive policy if it exists
DROP POLICY IF EXISTS "Authenticated users can view project contacts" ON public.project_contacts;

-- Verify and create the correct restrictive policies
-- Check if the founder policy exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'project_contacts' 
        AND policyname = 'Founders can view their project contacts'
    ) THEN
        EXECUTE 'CREATE POLICY "Founders can view their project contacts" 
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
        )';
    END IF;
END $$;

-- Check if the investor policy exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'project_contacts' 
        AND policyname = 'Investors can view contacts of invested projects'
    ) THEN
        EXECUTE 'CREATE POLICY "Investors can view contacts of invested projects" 
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
            AND investments.status = ''completed''
          )
        )';
    END IF;
END $$;