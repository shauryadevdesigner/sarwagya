import Link from 'next/link'
import { ArrowUpRight, BarChart3, CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { caseStudies } from '@/data/caseStudies'
import CaseStudyCard from '@/components/CaseStudyCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In-Depth Case Studies & Architectural Breakdowns | Sarwagya',
  description: 'Deep dives into engineering methodologies, conversion impact, and performance architecture.',
  alternates: {
    canonical: '/case-studies',
  },
}

export default function CaseStudiesPage() {
  const hasStudies = caseStudies && caseStudies.length > 0

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

      <div className="section py-16 md:py-24 max-w-7xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'In-Depth Case Studies', url: '/case-studies' }]} />

        <div className="mt-8 mb-16">
          <p className="eyebrow">Engineering Insights <span>↘</span></p>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter mt-4 leading-none">
            PROOF OVER<br />
            <em>PROMISES.</em>
          </h1>
          <p className="hero-intro max-w-2xl mt-6 text-xl text-[var(--muted)]">
            Explore how we dismantle slow legacy interfaces, engineer scalable Next.js systems, and deliver verifiable business lift.
          </p>
        </div>

        {/* Methodology Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 border-y border-[var(--line)] py-12">
          <div className="flex gap-4 items-start">
            <Cpu className="text-[var(--orange)] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-1">Turbopack & React 19 Core</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Sub-second page transitions, zero client-side bloat, and minimal hydrate overhead.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <BarChart3 className="text-[var(--orange)] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-1">Conversion Architecture</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Clear positioning, strategic user pathways, and zero distraction layouts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Terminal className="text-[var(--orange)] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-1">Lighthouse 95+ Standard</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Guaranteed mobile-first performance, perfect accessibility, and pristine SEO indexing.
              </p>
            </div>
          </div>
        </div>

        {hasStudies ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        ) : (
          <div className="border border-[var(--line)] p-12 md:p-16 text-center bg-white/40">
            <h3 className="text-3xl font-black mb-3">Authentic Case Studies Coming Soon</h3>
            <p className="text-base text-[var(--muted)] max-w-lg mx-auto mb-8 font-sans">
              In accordance with our studio policy, we never publish simulated metrics or fabricated client profiles. Verified case studies with real client permission will be published here.
            </p>
            <Link
              href="/inquire"
              className="inline-flex items-center gap-2 bg-[var(--orange)] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90"
            >
              Build Your Case Study With Us <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@sarwagya.in">hello@sarwagya.in</a>
          <Link href="/inquire">Start a project <ArrowUpRight size={14} /></Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sarwagya Studio</span>
          <span>Made with intent.</span>
        </div>
      </footer>
    </main>
  )
}

