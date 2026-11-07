import { createClient } from '@supabase/supabase-js'

export type InquiryRow = {
  id: string
  full_name: string
  business_name: string | null
  email: string
  phone: string
  service_type: string
  budget: string | null
  project_description: string
  pricing_preference: string | null
  status: 'NEW' | 'CONTACTED' | 'DISCUSSION' | 'PROPOSAL_SENT' | 'CONVERTED' | 'REJECTED'
  source: string
  created_at: string
  email_sent_at: string | null
  excel_synced_at: string | null
}

export type IntegrationJobRow = {
  id: string
  inquiry_id: string
  integration_type: 'email' | 'excel'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  attempts: number
  last_error: string | null
  next_retry_at: string | null
  created_at: string
  completed_at: string | null
}

/**
 * Server-only Supabase client utilizing the high-privilege service_role key.
 * This client bypasses RLS and must NEVER be exposed to the browser.
 */
export function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

