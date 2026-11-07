import { NextRequest, NextResponse } from 'next/server'
import { processPendingIntegrationJobs } from '@/lib/jobs/integrationWorker'

/**
 * Protected worker endpoint invoked via Vercel Cron or authorized scheduler.
 * Validates against CRON_SECRET authorization header.
 */
export async function POST(req: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET
    const authHeader = req.headers.get('authorization')
    const querySecret = req.nextUrl.searchParams.get('secret')

    const isAuthorized =
      (cronSecret && authHeader === `Bearer ${cronSecret}`) ||
      (cronSecret && querySecret === cronSecret)

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized request.' }, { status: 401 })
    }

    const result = await processPendingIntegrationJobs(25)

    return NextResponse.json({
      success: true,
      processed: result.count,
      details: result.details,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}

// Support GET for scheduled external cron pings
export async function GET(req: NextRequest) {
  return POST(req)
}

