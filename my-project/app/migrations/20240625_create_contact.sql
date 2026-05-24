-- Migration: create contact table
-- Date: 2024-06-25
-- This script creates the `contact` table used for the new contact form.

CREATE TABLE IF NOT EXISTS public.contact (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text,
  status text DEFAULT 'Unread',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: create index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact (created_at DESC);
