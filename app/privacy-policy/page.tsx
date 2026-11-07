import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/config/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, protects, and respects your data in accordance with DPDP Act, 2023 and GDPR principles.`,
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link className="nav-cta" href="/#contact">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>

      <section className="section py-16 md:py-24 max-w-4xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

        <div className="mt-8 mb-12">
          <p className="eyebrow">Trust & Legal <span>↘</span></p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-4">
            PRIVACY<br />
            <em>POLICY.</em>
          </h1>
          <p className="text-xs font-mono text-[var(--muted)] mt-4">
            Last Updated: November 2026 • Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 and GDPR guidelines.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-10 text-base md:text-lg leading-relaxed font-sans text-[var(--ink)]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">1. Who We Are</h2>
            <p className="text-[var(--muted)]">
              {site.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an independent digital studio based in India. We design and engineer conversion-first websites, web applications, and brand systems for growing businesses.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">2. Data We Collect</h2>
            <p className="text-[var(--muted)]">We only collect information necessary to provide our services:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[var(--muted)]">
              <li><strong>Inquiry Data:</strong> When you submit a project inquiry, we collect your name, email address, project requirements, and budget choices.</li>
              <li><strong>Analytics Data:</strong> If accepted via our cookie consent banner, we collect anonymized interaction data (page views, button clicks, referral sources) via Google Analytics without personally identifiable markers.</li>
              <li><strong>Direct Communications:</strong> Information exchanged via email ({site.email}) or WhatsApp.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">3. Purpose and Legal Basis</h2>
            <p className="text-[var(--muted)]">
              We process your data strictly to respond to inquiries, evaluate project proposals, prepare contracts, and enhance website performance. We never sell, rent, or trade your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">4. Third-Party Processors</h2>
            <p className="text-[var(--muted)]">We utilize trusted industry partners for infrastructure:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[var(--muted)]">
              <li><strong>Hosting & Edge Delivery:</strong> Vercel Inc.</li>
              <li><strong>Analytics:</strong> Google Analytics 4 (anonymized IP enabled).</li>
              <li><strong>Direct Messaging:</strong> Meta Platforms / WhatsApp (when initiated by you).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">5. Data Retention & Security</h2>
            <p className="text-[var(--muted)]">
              We retain contact information only as long as necessary to manage our business relationship or fulfill statutory obligations. We enforce industry-standard TLS encryption on all data transfers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">6. Your Rights</h2>
            <p className="text-[var(--muted)]">
              Under the DPDP Act 2023 and GDPR, you have the right to request access to your data, demand corrections, withdraw consent, or request complete deletion (&quot;right to be forgotten&quot;).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">7. Contact for Privacy Requests</h2>
            <p className="text-[var(--muted)]">
              To exercise any rights or ask questions regarding this policy, contact our Data Grievance Officer directly at:
              <br />
              <a href={`mailto:${site.email}`} className="font-bold text-[var(--orange)] underline mt-1 inline-block">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/#contact">Start a project <ArrowUpRight size={14} /></Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sarwagya Studio</span>
          <span>Made with intent.</span>
        </div>
      </footer>
    </main>
  )
}

