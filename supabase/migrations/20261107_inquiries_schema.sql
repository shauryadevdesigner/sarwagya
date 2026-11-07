-- ==============================================================================
-- SARWAGYA DATABASE MIGRATION: Client Inquiries & Reliable Background Jobs
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create client_inquiries table
CREATE TABLE IF NOT EXISTS public.client_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    budget TEXT,
    project_description TEXT NOT NULL,
    pricing_preference TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (
        status IN ('NEW', 'CONTACTED', 'DISCUSSION', 'PROPOSAL_SENT', 'CONVERTED', 'REJECTED')
    ),
    source TEXT NOT NULL DEFAULT 'website',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email_sent_at TIMESTAMPTZ,
    excel_synced_at TIMESTAMPTZ
);

-- Indexes for client_inquiries
CREATE INDEX IF NOT EXISTS idx_client_inquiries_email ON public.client_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_client_inquiries_created_at ON public.client_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_client_inquiries_status ON public.client_inquiries(status);

-- 2. Create integration_jobs table
CREATE TABLE IF NOT EXISTS public.integration_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES public.client_inquiries(id) ON DELETE CASCADE,
    integration_type TEXT NOT NULL CHECK (integration_type IN ('email', 'excel')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    attempts INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    next_retry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    CONSTRAINT uq_inquiry_integration UNIQUE (inquiry_id, integration_type)
);

-- Indexes for integration_jobs
CREATE INDEX IF NOT EXISTS idx_integration_jobs_pending ON public.integration_jobs(status, next_retry_at)
    WHERE status IN ('pending', 'failed');
CREATE INDEX IF NOT EXISTS idx_integration_jobs_inquiry ON public.integration_jobs(inquiry_id);

-- ==============================================================================
-- 3. Row Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_jobs ENABLE ROW LEVEL SECURITY;

-- Deny all public anon SELECT/INSERT/UPDATE/DELETE.
-- Only the backend server using the service_role key can access and manipulate rows.
CREATE POLICY "Deny public select on client_inquiries"
    ON public.client_inquiries
    FOR SELECT
    TO anon
    USING (false);

CREATE POLICY "Deny public update on client_inquiries"
    ON public.client_inquiries
    FOR UPDATE
    TO anon
    USING (false);

CREATE POLICY "Deny public delete on client_inquiries"
    ON public.client_inquiries
    FOR DELETE
    TO anon
    USING (false);

CREATE POLICY "Deny public select on integration_jobs"
    ON public.integration_jobs
    FOR SELECT
    TO anon
    USING (false);

CREATE POLICY "Deny public update on integration_jobs"
    ON public.integration_jobs
    FOR UPDATE
    TO anon
    USING (false);

CREATE POLICY "Deny public delete on integration_jobs"
    ON public.integration_jobs
    FOR DELETE
    TO anon
    USING (false);

