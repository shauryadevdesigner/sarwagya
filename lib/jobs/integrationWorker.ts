import { getServiceSupabase, IntegrationJobRow, InquiryRow } from '@/lib/supabase/server'
import { sendInquiryNotificationEmail } from '@/lib/email/resend'

const MAX_ATTEMPTS = 5

/**
 * Calculates exponential backoff retry timestamp in minutes.
 * Attempt 1 -> +2 mins, Attempt 2 -> +5 mins, Attempt 3 -> +15 mins, Attempt 4 -> +60 mins, Attempt 5 -> +180 mins.
 */
function calculateNextRetry(attempt: number): string {
  const intervalsMinutes = [2, 5, 15, 60, 180]
  const delayMinutes = intervalsMinutes[Math.min(attempt - 1, intervalsMinutes.length - 1)]
  const retryDate = new Date(Date.now() + delayMinutes * 60 * 1000)
  return retryDate.toISOString()
}

/**
 * Processes a single integration job with isolation and idempotency.
 */
export async function processJob(job: IntegrationJobRow): Promise<{ processed: boolean; success: boolean; error?: string }> {
  const supabase = getServiceSupabase()

  // Guard against already completed jobs
  if (job.status === 'completed') {
    return { processed: false, success: true }
  }

  // 1. Fetch related inquiry
  const { data: inquiry, error: fetchErr } = await supabase
    .from('client_inquiries')
    .select('*')
    .eq('id', job.inquiry_id)
    .single<InquiryRow>()

  if (fetchErr || !inquiry) {
    const errorMsg = fetchErr ? fetchErr.message : `Inquiry ${job.inquiry_id} not found.`
    await supabase
      .from('integration_jobs')
      .update({
        status: 'failed',
        last_error: errorMsg,
      })
      .eq('id', job.id)

    return { processed: true, success: false, error: errorMsg }
  }

  // Mark status as processing and increment attempt count
  const nextAttempt = job.attempts + 1
  await supabase
    .from('integration_jobs')
    .update({
      status: 'processing',
      attempts: nextAttempt,
    })
    .eq('id', job.id)

  let result: { success: boolean; error?: string } = { success: false }

  if (job.integration_type === 'email') {
    // If email was already marked sent on inquiry, complete job immediately
    if (inquiry.email_sent_at) {
      result = { success: true }
    } else {
      result = await sendInquiryNotificationEmail(inquiry)
      if (result.success) {
        await supabase
          .from('client_inquiries')
          .update({ email_sent_at: new Date().toISOString() })
          .eq('id', inquiry.id)
      }
    }
  } else {
    // Unsupported integration type – mark as failed
    result = { success: false, error: `Unsupported integration type ${job.integration_type}` };
  }

  const nowIso = new Date().toISOString()

  if (result.success) {
    await supabase
      .from('integration_jobs')
      .update({
        status: 'completed',
        completed_at: nowIso,
        last_error: null,
      })
      .eq('id', job.id)

    return { processed: true, success: true }
  } else {
    const isExhausted = nextAttempt >= MAX_ATTEMPTS
    const nextRetry = isExhausted ? null : calculateNextRetry(nextAttempt)

    await supabase
      .from('integration_jobs')
      .update({
        status: 'failed',
        last_error: result.error || 'Unknown integration execution error',
        next_retry_at: nextRetry,
      })
      .eq('id', job.id)

    return { processed: true, success: false, error: result.error }
  }
}

/**
 * Polls and executes pending or retryable integration jobs.
 */
export async function processPendingIntegrationJobs(batchSize = 20) {
  const supabase = getServiceSupabase()
  const nowIso = new Date().toISOString()

  // Select pending or failed jobs whose next_retry_at has arrived
  const { data: jobs, error } = await supabase
    .from('integration_jobs')
    .select('*')
    .or(`status.eq.pending,and(status.eq.failed,next_retry_at.lte.${nowIso})`)
    .order('created_at', { ascending: true })
    .limit(batchSize)

  if (error || !jobs || jobs.length === 0) {
    return { count: 0, error: error?.message }
  }

  const results = []
  for (const job of jobs as IntegrationJobRow[]) {
    const res = await processJob(job)
    results.push({ id: job.id, type: job.integration_type, ...res })
  }

  return { count: results.length, details: results }
}

