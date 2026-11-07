'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import ResponseBadge from '@/components/ResponseBadge'
import { site } from '@/config/site'

export default function InquirePage() {
  const [plan, setPlan] = useState('Project build')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  // Form state – mirrors home page
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    projectDescription: '',
    websiteUrlHoneypot: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          serviceType: plan,
          pricingPreference: plan,
          projectDescription: formData.projectDescription,
          websiteUrlHoneypot: formData.websiteUrlHoneypot,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.')
        setSubmitting(false)
        return
      }
      setSuccessMessage(
        'Thank you for contacting Sarwagya. Your project inquiry has been received. Our team will get back to you soon.'
      )
      setTimeout(() => router.push('/thank-you'), 1500)
    } catch {
      setErrorMessage('A network error occurred. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/founders">Founders</Link>
          <Link className="nav-cta" href="/inquire">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>

      <div className="section py-16 md:py-24 max-w-6xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'Project Inquiry', url: '/inquire' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Left Context */}
          <div className="lg:col-span-5">
            <p className="eyebrow">
              Direct Intake <span>↘</span>
            </p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mt-4 leading-none mb-6">
              LET&apos;S TALK<br />
              <em>NUMBERS.</em>
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
              Every inquiry is reviewed directly by our founding architects. We don&apos;t do pitch theater or sales calls — just honest scope, real
              pricing, and clear technical roadmaps.
            </p>

            <div className="mb-8">
              <ResponseBadge />
            </div>

            <div className="border-t border-[var(--line)] pt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 size={18} className="text-[var(--orange)]" />
                <span>Zero template locks — 100% custom codebase</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold">
                <ShieldCheck size={18} className="text-[var(--orange)]" />
                <span>Clean handover with full rights &amp; credentials</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold">
                <Zap size={18} className="text-[var(--orange)]" />
                <span>Lighthouse 95+ performance baseline</span>
              </div>
            </div>
          </div>

          {/* Right Dedicated Form */}
          <div className="lg:col-span-7 bg-[var(--ink)] text-[var(--paper)] p-8 md:p-14 border border-[var(--line)]">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">PROJECT BRIEF</h2>
            <p className="text-xs text-[#aaa59b] font-mono mb-8 uppercase tracking-wider">Takes ~90 seconds to complete</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot – hidden from users */}
              <input
                type="text"
                name="websiteUrlHoneypot"
                value={formData.websiteUrlHoneypot}
                onChange={e => setFormData({ ...formData, websiteUrlHoneypot: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                    Your Name *
                  </label>
                  <input
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-white/5 border border-white/20 p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--orange)]"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full bg-white/5 border border-white/20 p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--orange)]"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                  Business / Organization
                </label>
                <input
                  placeholder="Your company (optional)"
                  className="w-full bg-white/5 border border-white/20 p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--orange)]"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/20 p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--orange)]"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                  Engagement Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Project build', label: 'Full Build', desc: `${site.pricing.oneTime}+` },
                    { id: 'Managed plan', label: 'Managed Partner', desc: `${site.pricing.managed}` },
                    { id: 'Not sure yet', label: 'Consultation', desc: 'Custom' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPlan(opt.id)}
                      className={`p-4 text-left border transition-all ${
                        plan === opt.id
                          ? 'border-[var(--orange)] bg-[var(--orange)]/15 text-white'
                          : 'border-white/15 bg-white/5 text-[#aaa59b] hover:border-white/40'
                      }`}
                    >
                      <span className="block font-bold text-sm text-white">{opt.label}</span>
                      <span className="block text-xs font-mono text-[var(--orange)] mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#aaa59b] mb-2 font-bold">
                  What are you building? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the current pain points, business goals, and timeline..."
                  className="w-full bg-white/5 border border-white/20 p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--orange)] resize-none"
                  value={formData.projectDescription}
                  onChange={e => setFormData({ ...formData, projectDescription: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--orange)] text-white font-bold py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all shadow-xl"
              >
                {submitting ? 'Transmitting Brief...' : 'Transmit Project Brief'} <ArrowUpRight size={16} />
              </button>

              {errorMessage && (
                <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono">
                  {successMessage}
                </div>
              )}

              <p className="text-[11px] text-[#aaa59b] font-mono text-center">
                Guaranteed response {site.responseTime}. No unsolicited spam.
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">
            SARWAGYA<span>®</span>
          </Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/">Homepage</Link>
          <Link href="/work">Selected Work</Link>
          <Link href="/founders">Founders</Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sarwagya Studio</span>
          <span>Made with intent.</span>
        </div>
      </footer>
    </main>
  )
}
