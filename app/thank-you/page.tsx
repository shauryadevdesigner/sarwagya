'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react'
import { site } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import ResponseBadge from '@/components/ResponseBadge'

export default function ThankYouPage() {
  useEffect(() => {
    // Fire generate_lead event once only, guarding against refresh double counting
    const sent = sessionStorage.getItem('lead_event_sent')
    if (!sent) {
      trackEvent({ name: 'generate_lead' })
      sessionStorage.setItem('lead_event_sent', 'true')
    }
  }, [])

  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <Link className="nav-cta" href="/work">
          View Work <ArrowUpRight size={16} />
        </Link>
      </header>

      <section className="section py-20 md:py-28 max-w-3xl">
        <div className="flex items-center gap-3 text-[var(--orange)] mb-6">
          <CheckCircle2 size={32} />
          <span className="font-mono text-sm tracking-widest uppercase font-bold">Inquiry Received</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
          INQUIRY RECEIVED.<br />
          <em>WE&apos;RE ON IT.</em>
        </h1>

        <div className="my-6">
          <ResponseBadge />
        </div>

        <p className="text-lg md:text-xl text-[var(--muted)] font-sans mb-12 leading-relaxed">
          Thank you for reaching out. Your project details are already in our inbox. Here is exactly what happens next:
        </p>

        <div className="space-y-6 border-y border-[var(--line)] py-10 my-8">
          <div className="flex gap-6 items-start">
            <span className="font-mono text-[var(--orange)] font-bold text-lg">01</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Human Review</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                A core developer and designer review your requirements directly. No account manager buffer.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="font-mono text-[var(--orange)] font-bold text-lg">02</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Thoughtful Response</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                We reply with practical questions, initial architectural scope, and honest feasibility estimates.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="font-mono text-[var(--orange)] font-bold text-lg">03</span>
            <div>
              <h3 className="font-bold text-xl mb-1">Fast Direction Kickoff</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                If there is alignment, we schedule a concise 20-minute alignment call or jump straight to rough concepts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Sarwagya, I just sent an inquiry on your website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-bold px-6 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 shadow"
          >
            <MessageSquare size={16} /> Urgent? Message on WhatsApp
          </a>
          <Link
            href="/work"
            className="border border-[var(--ink)] font-bold px-6 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Explore Selected Work <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/">Back to Home</Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sarwagya Studio</span>
          <span>Made with intent.</span>
        </div>
      </footer>
    </main>
  )
}

