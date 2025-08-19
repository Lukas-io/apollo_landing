-- Create the waitlist table for collecting user emails
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON public.waitlist(email);

-- Add an index on created_at for sorting and analytics
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at);

-- Add an index on status for filtering
CREATE INDEX idx_waitlist_status ON public.waitlist(status);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (public)
CREATE POLICY "Enable insert for anyone"
ON public.waitlist
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);
