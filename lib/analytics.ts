// Minimal event tracking helpers respecting privacy and GA4 conventions.
// Never tracks personal data.

export type AnalyticsEvent =
  | { name: 'cta_click'; params: { location: string; label?: string } }
  | { name: 'generate_lead'; params?: Record<string, string | number> }
  | { name: 'whatsapp_click'; params?: { location?: string } }
  | { name: 'case_study_view'; params: { slug: string } }
  | { name: 'faq_open'; params: { index: number; question: string } }

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  // Verify cookie consent was given
  const consent = localStorage.getItem('sarwagya_cookie_consent')
  if (consent !== 'granted') return

  const win = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
  if (typeof win.gtag === 'function') {
    win.gtag('event', event.name, event.params || {})
  }
}

