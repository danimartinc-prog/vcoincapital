-- Remove contact columns from projects table now that data is migrated
ALTER TABLE public.projects DROP COLUMN IF EXISTS contact_person;
ALTER TABLE public.projects DROP COLUMN IF EXISTS contact_email; 
ALTER TABLE public.projects DROP COLUMN IF EXISTS contact_phone;