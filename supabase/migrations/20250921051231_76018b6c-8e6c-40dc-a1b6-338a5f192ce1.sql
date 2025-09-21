-- Create a separate protected table for project contact information
CREATE TABLE public.project_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.project_contacts ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view contact information
CREATE POLICY "Authenticated users can view project contacts" 
ON public.project_contacts 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Project founders can manage their project contacts
CREATE POLICY "Founders can insert their project contacts" 
ON public.project_contacts 
FOR INSERT 
WITH CHECK (
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

CREATE POLICY "Founders can update their project contacts" 
ON public.project_contacts 
FOR UPDATE 
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

-- Migrate existing contact data to the new table
INSERT INTO public.project_contacts (project_id, contact_person, contact_email, contact_phone)
SELECT id, contact_person, contact_email, contact_phone 
FROM public.projects 
WHERE contact_person IS NOT NULL OR contact_email IS NOT NULL OR contact_phone IS NOT NULL;

-- Remove contact columns from projects table (keeping data safe first)
-- Note: We'll do this in a separate step after confirming the migration worked
-- ALTER TABLE public.projects DROP COLUMN contact_person;
-- ALTER TABLE public.projects DROP COLUMN contact_email; 
-- ALTER TABLE public.projects DROP COLUMN contact_phone;

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_project_contacts_updated_at
BEFORE UPDATE ON public.project_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();