'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Menu, X, CircleArrowOutUpRight } from 'lucide-react'
import TextLoop from '../components/text-loop'
import StickyMobileCta from '../components/StickyMobileCta'
import FaqAccordion from '../components/FaqAccordion'
import ReviewsGrid from '../components/ReviewsGrid'
import MapBlock from '../components/MapBlock'
import ResponseBadge from '../components/ResponseBadge'
import JsonLd from '../components/JsonLd'
import { site } from '@/config/site'
import { getProfessionalServiceSchema, getFaqSchema } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'

const services = ['Websites', 'Web apps', 'Brand systems', 'Care plans']
const work = [
  { no: '01', title: 'Conversion-first websites', copy: 'Clear positioning, sharp interface systems and a build that feels unmistakably yours.', tag: 'Web design + build' },
  { no: '02', title: 'Products people return to', copy: 'Thoughtful web apps that turn complex workflows into confident, simple moments.', tag: 'Product development' },
  { no: '03', title: 'A better way to show up', copy: 'Digital foundations for ambitious teams who are ready to look as good as they work.', tag: 'Brand + digital' },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const [plan, setPlan] = useState('Project build')
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    projectDescription: '',
    websiteUrlHoneypot: '',
  })

  const professionalServiceSchema = getProfessionalServiceSchema()
  const faqSchema = getFaqSchema()

  const handleHeroCtaClick = () => {
    trackEvent({ name: 'cta_click', params: { location: 'hero', label: 'Start Your Project' } })
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWorkCtaClick = () => {
    trackEvent({ name: 'cta_click', params: { location: 'hero', label: 'See Our Work' } })
    const workSection = document.getElementById('work')
    if (workSection) workSection.scrollIntoView({ behavior: 'smooth' })
  }

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

      setSuccessMessage('Thank you for contacting Sarwagya. Your project inquiry has been received. Our team will get back to you soon.')
      // Redirect after confirming success in database
      setTimeout(() => {
        router.push('/thank-you')
      }, 1500)
    } catch {
      setErrorMessage('A network error occurred. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="site-shell">
      <JsonLd schema={[professionalServiceSchema, faqSchema]} />

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">SARWAGYA<span>®</span></Link>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faqs" onClick={() => setOpen(false)}>FAQs</a>
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </header>

      {/* 4.1 Hero with CTA Above The Fold */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent digital studio / India <span>↘</span></p>
          <h1>WE BUILD.<br /><em>YOU GROW.</em></h1>
          <p className="hero-intro">Sarwagya makes high-conviction websites and web apps for businesses with somewhere to go.</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <button
              id="hero-primary-cta"
              onClick={handleHeroCtaClick}
              className="bg-[var(--orange)] text-white font-bold px-7 py-3.5 text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Start Your Project <ArrowUpRight size={16} />
            </button>
            <button
              onClick={handleWorkCtaClick}
              className="font-bold text-xs tracking-widest uppercase flex items-center gap-1.5 py-3.5 px-4 hover:text-[var(--orange)] transition-colors border-b border-transparent hover:border-current"
            >
              See Our Work <CircleArrowOutUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Abstract orange and black collage">
          <div className="visual-grid" />
          <div className="visual-orange" />
          <div className="visual-word">DIGITAL</div>
          <div className="visual-sticker">GOOD<br />WORK<br /><strong>MATTERS.</strong></div>
          <div className="visual-line">01 — 03</div>
        </div>
      </section>

      {/* Services Section with Animated Ribbon */}
      <section className="section services-section" id="services">
        <div className="services-ribbon-wrapper" aria-label="Sarwagya studio promise">
          <TextLoop text="Good ideas, bad puns, great websites" separator="✦" ribbonColor="#5227FF" fontSize={26} ribbonWidth={50} speed={10} />
        </div>
        <div className="section-kicker"><span>( 01 )</span><span>What we do</span></div>
        <div className="services-layout">
          <h2>MAKE IT<br /><span>MATTER.</span></h2>
          <div className="service-list">
            {services.map((service, i) => (
              <div className="service-row" key={service}>
                <span>0{i + 1}</span>
                <h3>{service}</h3>
                <ArrowUpRight size={22} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="section dark-section" id="work">
        <div className="section-kicker light"><span>( 02 )</span><span>Selected thinking</span></div>
        <div className="work-heading">
          <h2>THE WORK<br /><em>IS THE PROOF.</em></h2>
          <p>We do not fill a portfolio with noise. We build focused digital experiences that earn attention and make the next step obvious.</p>
        </div>
        <div className="work-list">
          {work.map((item) => (
            <article className="work-card" key={item.no}>
              <div className="work-index">{item.no}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span>{item.tag}</span>
              </div>
              <ArrowUpRight className="work-arrow" />
            </article>
          ))}
        </div>
      </section>

      {/* 4.6 Client Reviews Section (renders only if genuine reviews exist) */}
      <ReviewsGrid />

      {/* Pricing Section */}
      <section className="section pricing-section" id="pricing">
        <div className="section-kicker"><span>( 03 )</span><span>Simple, transparent</span></div>
        <div className="pricing-heading">
          <h2>CHOOSE YOUR<br /><em>PACE.</em></h2>
          <p>Start with the scope that fits. Grow from there. Every engagement is designed around clarity, craft and momentum.</p>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <p className="price-label">01 / Project build</p>
            <strong>{site.pricing.oneTime}<span>+</span></strong>
            <p>For teams who want a distinctive website or web app, built properly from the ground up.</p>
            <a href="#contact" onClick={() => setPlan('Project build')}>Tell us about it <ArrowUpRight size={16} /></a>
          </div>
          <div className="price-card featured">
            <p className="price-label">02 / Managed plan</p>
            <strong>{site.pricing.managed}</strong>
            <p>For businesses who want a capable digital partner without the heavy upfront cost.</p>
            <a href="#contact" onClick={() => setPlan('Managed plan')}>Explore the plan <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* 4.7 Five FAQs */}
      <section className="section faq-section bg-[var(--paper)]" id="faqs">
        <div className="section-kicker"><span>( 04 )</span><span>Common questions</span></div>
        <div className="mt-16 max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8">
            STRAIGHT ANSWERS.<br />
            <em>NO FLUFF.</em>
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-heading">
          <p className="eyebrow">Have a good one?</p>
          <h2>LET&apos;S MAKE<br /><em>IT REAL.</em></h2>
          <div className="mt-8">
            <ResponseBadge className="bg-white/10 text-[var(--ink)] border-white/20" />
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Honeypot field for bot trapping (hidden from real users) */}
          <input
            type="text"
            name="websiteUrlHoneypot"
            value={formData.websiteUrlHoneypot}
            onChange={(e) => setFormData({ ...formData, websiteUrlHoneypot: e.target.value })}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label>
            Full Name *
            <input
              required
              placeholder="Your name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </label>
          <label>
            Business / Organization
            <input
              placeholder="Your company (optional)"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </label>
          <label>
            Work Email *
            <input
              required
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label>
            Phone Number *
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>
          <label>
            What do you need?
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option>Project build</option>
              <option>Managed plan</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            Tell us a little *
            <textarea
              required
              placeholder="What are you building, and why now?"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            />
          </label>

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
          
          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? 'Transmitting...' : 'Send inquiry'} <ArrowUpRight size={18} />
          </button>

          <p className="form-note">
            By sending, you agree to our <Link href="/privacy-policy" className="underline hover:text-[var(--paper)]">Privacy Policy</Link>. We never spam.
          </p>
        </form>

        {/* 4.11 Conditional Map & Directions */}
        <div className="col-span-full">
          <MapBlock />
        </div>

        <div className="tech-wordmark" aria-label="Sarwagya interactive wordmark">
          <span className="tech-wordmark-fill">SARWAGYA</span>
          <span className="tech-wordmark-outline">SARWAGYA</span>
          <span className="tech-wordmark-scan" aria-hidden="true" />
        </div>
      </section>

      {/* 4.10 Internal Links & Footer Sitemap */}
      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
          <div className="mt-4">
            <ResponseBadge className="bg-white/5 text-[var(--paper)] border-white/10" />
          </div>
        </div>

        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/work">Selected Work</Link>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#faqs">FAQs</a>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <a href="#contact">Start a project <ArrowUpRight size={14} /></a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Sarwagya Studio</span>
          <span>Made with intent.</span>
        </div>
      </footer>

      {/* 4.2 Sticky Mobile CTA bar */}
      <StickyMobileCta />
    </main>
  )
}
