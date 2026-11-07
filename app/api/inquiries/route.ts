import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validations/inquiry'
import { getServiceSupabase, InquiryRow, IntegrationJobRow } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/security/rateLimit'
import { processJob } from '@/lib/jobs/integrationWorker'

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const { allowed } = checkRateLimit(ip, 6, 15 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a few minutes before submitting another project inquiry.',
        },
        { status: 429 }
      )
    }

    // 2. Parse Body & Validate JSON
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid or malformed JSON payload.' },
        { status: 400 }
      )
    }

    // 3. Honeypot Check (Bot Trapping)
    if (body.websiteUrlHoneypot && String(body.websiteUrlHoneypot).trim().length > 0) {
      // Return fake success to bots without inserting record
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for contacting Sarwagya. Your project inquiry has been received. Our team will get back to you soon.',
        },
        { status: 200 }
      )
    }

    // 4. Validate with Zod Schema
    const parsed = inquirySchema.safeParse(body)
    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      return NextResponse.json(
        {
          success: false,
          error: issue ? issue.message : 'Invalid form fields provided.',
        },
        { status: 422 }
      )
    }

    const { fullName, businessName, email, phone, serviceType, budget, pricingPreference, projectDescription } = parsed.data

    // Normalize phone (strip excess spaces, hyphens)
    const normalizedPhone = phone.replace(/[\s()-]/g, '')

    // 5. Database Insertion via Service Client
    const supabase = getServiceSupabase()

    const { data: inquiry, error: insertError } = await supabase
      .from('client_inquiries')
      .insert({
        full_name: fullName,
        business_name: businessName || null,
        email,
        phone: normalizedPhone,
        service_type: serviceType,
        budget: budget || null,
        pricing_preference: pricingPreference || null,
        project_description: projectDescription,
        status: 'NEW',
        source: 'website',
      })
      .select('*')
      .single<InquiryRow>()

    if (insertError || !inquiry) {
      console.error('[Inquiries API] Supabase Insert Failed:', insertError)
      return NextResponse.json(
        {
          success: false,
          error: 'An internal database error occurred while registering your inquiry. Please try again later.',
        },
        { status: 500 }
      )
    }

    // 6. Enqueue Email & Excel Integration Jobs
    const jobsToInsert = [
      { inquiry_id: inquiry.id, integration_type: 'email', status: 'pending' },
    ]

    const { data: jobs, error: jobsError } = await supabase
      .from('integration_jobs')
      .insert(jobsToInsert)
      .select('*')

    if (jobsError) {
      console.error('[Inquiries API] Integration Jobs Enqueue Failed:', jobsError)
    }

    // 7. Non-blocking Async Dispatch for Immediate Processing
    if (jobs && Array.isArray(jobs)) {
      for (const job of jobs as IntegrationJobRow[]) {
        // Fire-and-forget; does not block the client response
        processJob(job).catch((err) => {
          console.error(`[Inquiries API] Immediate job dispatch failed for job ${job.id}:`, err)
        })
      }
    }

    // 8. Return Success Response
    return NextResponse.json(
      {
        success: true,
        referenceId: inquiry.id,
        message: 'Thank you for contacting Sarwagya. Your project inquiry has been received. Our team will get back to you soon.',
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'
    console.error('[Inquiries API] Unhandled Exception:', message)
    return NextResponse.json(
      { success: false, error: 'A server error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

