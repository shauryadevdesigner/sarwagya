import Link from 'next/link'
import { ArrowUpRight, Award, Compass, Eye, Sparkles } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Founders & Studio Philosophy | Sarwagya',
  description: 'Meet the engineering and creative leadership behind Sarwagya Studio. Craft, high conviction, zero corporate noise.',
  alternates: {
    canonical: '/founders',
  },
}

export default function FoundersPage() {
  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link className="nav-cta" href="/inquire">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>

      <article className="section py-16 md:py-24 max-w-5xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'Founders & Philosophy', url: '/founders' }]} />

        {/* Hero */}
        <div className="mt-8 mb-16">
          <p className="eyebrow">Studio Leadership <span>↘</span></p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mt-4 leading-none">
            ENGINEERS.<br />
            <em>NOT BROKERS.</em>
          </h1>
          <p className="hero-intro max-w-2xl mt-8 text-xl text-[var(--muted)]">
            Sarwagya was founded to eliminate the bloated agency layers. When you work with us, you speak directly with the architects writing the code and shaping the product.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 border-y border-[var(--line)] py-16">
          <div className="p-6 border border-[var(--line)] bg-white/40">
            <Sparkles size={28} className="text-[var(--orange)] mb-4" />
            <h3 className="text-2xl font-black tracking-tight mb-2">Blank Canvas</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Zero marketplace templates. Every system is conceived specifically for your business domain and conversion targets.
            </p>
          </div>

          <div className="p-6 border border-[var(--line)] bg-white/40">
            <Compass size={28} className="text-[var(--orange)] mb-4" />
            <h3 className="text-2xl font-black tracking-tight mb-2">High Conviction</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              We do not accept every project. We partner with ambitious businesses ready to look as sharp as they operate.
            </p>
          </div>

          <div className="p-6 border border-[var(--line)] bg-white/40">
            <Award size={28} className="text-[var(--orange)] mb-4" />
            <h3 className="text-2xl font-black tracking-tight mb-2">Clean Handover</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              No hostage traps. You hold 100% of the repository, domain credentials, and server keys with complete documentation.
            </p>
          </div>
        </div>

        {/* Founder Bio Card */}
        <div className="my-16 bg-[var(--ink)] text-[var(--paper)] p-8 md:p-14">
          <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--orange)] font-bold">
                Founder & Lead Architect
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-3 mb-6">
                NANDINI PANDEY
              </h2>
              <p className="text-base md:text-lg text-[#aaa59b] leading-relaxed mb-6">
                &quot;We don&apos;t treat websites like static business cards. A high-conviction website is a revenue engine, a reputation anchor, and a brand moat. That requires uncompromising engineering discipline, not drag-and-drop shortcuts.&quot;
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <span className="px-3 py-1 bg-white/10 text-white">Full-Stack Architecture</span>
                <span className="px-3 py-1 bg-white/10 text-white">Interface Engineering</span>
                <span className="px-3 py-1 bg-white/10 text-white">Design Systems</span>
              </div>
            </div>

            <div className="w-full md:w-64 aspect-square border border-white/20 bg-gradient-to-tr from-[var(--orange)] to-[var(--ink)] flex flex-col justify-end p-6 shrink-0">
              <Eye size={32} className="text-white mb-2" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">Sarwagya Studio</span>
              <span className="font-bold text-white text-lg">New Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12">
          <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">WANT TO TALK DIRECTLY?</h3>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto mb-8 font-sans">
            Skip the pitch decks. Tell us what you are building and we will evaluate the architectural scope.
          </p>
          <Link
            href="/inquire"
            className="inline-flex items-center gap-2 bg-[var(--orange)] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 shadow-lg"
          >
            Start Project Inquiry <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>

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

