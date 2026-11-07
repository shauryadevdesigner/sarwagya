import { Resend } from 'resend'
import { InquiryRow } from '@/lib/supabase/server'

/**
 * Sends a notification email to the configured recipient when a new inquiry is submitted.
 * The HTML template follows Sarwagya's branding guidelines (dark background, orange accent, etc.).
 * A plain‑text fallback is also provided for email clients that do not render HTML.
 */
export async function sendInquiryNotificationEmail(inquiry: InquiryRow): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const notificationRecipient = process.env.SARWAGYA_NOTIFICATION_EMAIL || 'hello@sarwagya.in'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'inquiries@notifications.sarwagya.in'

  if (!apiKey) {
    return { success: false, error: 'RESEND_API_KEY is not configured in environment variables.' }
  }

  const resend = new Resend(apiKey)

  // Format date/time for Indian locale
  const formattedDate = new Date(inquiry.created_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  // ------------------------------------------------------------
  // HTML email – table based layout with inline CSS for maximum compatibility
  // ------------------------------------------------------------
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New Project Inquiry — Sarwagya</title>
  <style>
    /* General resets */
    body {margin:0;padding:0;background-color:#090909;font-family:Arial,Helvetica,sans-serif;}
    .wrapper {width:100%;background-color:#090909;padding:20px 0;}
    .container {max-width:600px;margin:auto;background:#ffffff;border-radius:4px;overflow:hidden;}
    .header {background:#090909;color:#ffffff;padding:20px;text-align:center;}
    .header h1 {margin:0;font-size:24px;letter-spacing:-0.5px;}
    .label {display:inline-block;background:#FF4B16;color:#ffffff;padding:2px 8px;font-size:12px;border-radius:3px; margin-top:8px;}
    .content {padding:20px;color:#777777;}
    .reference {background:#F5F4F0;padding:12px;margin:16px 0;border-left:4px solid #FF4B16;font-family:monospace;}
    .section-title {font-size:16px;color:#111111;margin:20px 0 8px;}
    .info-table {width:100%;border-collapse:collapse;}
    .info-table td {padding:6px 0;vertical-align:top;}
    .info-table .label {width:35%;font-weight:bold;color:#777777;text-transform:uppercase;font-size:12px;}
    .info-table .value {color:#111111;}
    .desc {background:#F5F4F0;padding:12px;margin-top:8px;white-space:pre-wrap;font-family:monospace;color:#111111;}
    .footer {font-size:12px;color:#777777;text-align:center;padding:12px;}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>SARWAGYA <span class="label">NEW INQUIRY</span></h1>
        <p style="margin:8px 0;font-size:18px;color:#FF4B16;">A new project has entered.</p>
        <p style="margin:0;font-size:14px;color:#F5F4F0;">A potential client has submitted a project inquiry.</p>
      </div>
      <div class="content">
        <div class="reference">
          <strong>Reference ID:</strong> ${escapeHtml(inquiry.id)}<br/>
          <strong>Submitted:</strong> ${escapeHtml(formattedDate)} (IST)
        </div>

        <div class="section-title">Client Information</div>
        <table class="info-table">
          <tr><td class="label">Full Name</td><td class="value">${escapeHtml(inquiry.full_name)}</td></tr>
          <tr><td class="label">Business / Organisation</td><td class="value">${escapeHtml(inquiry.business_name || 'Individual / Founder')}</td></tr>
          <tr><td class="label">Email</td><td class="value"><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#FF4B16;text-decoration:none;">${escapeHtml(inquiry.email)}</a></td></tr>
          <tr><td class="label">Phone</td><td class="value"><a href="tel:${escapeHtml(inquiry.phone)}" style="color:#111111;text-decoration:none;">${escapeHtml(inquiry.phone)}</a></td></tr>
        </table>

        <div class="section-title">Project Details</div>
        <table class="info-table">
          <tr><td class="label">Requested Service</td><td class="value"><strong>${escapeHtml(inquiry.service_type)}</strong></td></tr>
          <tr><td class="label">Budget</td><td class="value">${escapeHtml(inquiry.budget || 'Not specified')}</td></tr>
          <tr><td class="label">Pricing Preference</td><td class="value">${escapeHtml(inquiry.pricing_preference || 'Standard')}</td></tr>
        </table>
        <div class="section-title">Project Scope & Requirements</div>
        <div class="desc">${escapeHtml(inquiry.project_description)}</div>
      </div>
      <div class="footer">
        WE BUILD. YOU GROW. | Delivered securely via Sarwagya Studio Lead Pipeline
      </div>
    </div>
  </div>
</body>
</html>
  `

  // Plain‑text fallback – mirrors the HTML content but without styling.
  const text = `
--- New Project Inquiry ---
Reference ID: ${inquiry.id}
Submitted: ${formattedDate} (IST)

Client Information
- Full Name: ${inquiry.full_name}
- Business / Organisation: ${inquiry.business_name || 'Individual / Founder'}
- Email: ${inquiry.email}
- Phone: ${inquiry.phone}

Project Details
- Requested Service: ${inquiry.service_type}
- Budget: ${inquiry.budget || 'Not specified'}
- Pricing Preference: ${inquiry.pricing_preference || 'Standard'}

Project Scope & Requirements
${inquiry.project_description}

---
Sent via Sarwagya Lead Notification System`

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: notificationRecipient,
      replyTo: inquiry.email,
      subject: `New Project Inquiry — ${inquiry.full_name} (${inquiry.service_type})`,
      html,
      text,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { success: false, error: message }
  }
}

/**
 * Very small HTML‑escape helper – ensures user supplied values cannot break the markup.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
