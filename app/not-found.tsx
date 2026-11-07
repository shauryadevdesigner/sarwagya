import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found on Sarwagya.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <Link className="nav-cta" href="/#contact">
          Start a project <ArrowUpRight size={16} />
        </Link>
      </header>

      <section className="section py-24 md:py-36 flex flex-col items-start max-w-4xl">
        <span className="text-[var(--orange)] font-mono text-sm tracking-widest uppercase font-bold mb-4">
          Error 404
        </span>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6">
          LOST IN<br />
          <em>THE VOID.</em>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--muted)] font-sans max-w-xl mb-12">
          This URL went nowhere. We don&apos;t keep hostage pages or broken promises, so let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/#contact"
            className="bg-[var(--orange)] text-white font-bold px-8 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90"
          >
            Start Your Project <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/"
            className="border border-[var(--ink)] font-bold px-8 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Back to Homepage
          </Link>
        </div>

        <div className="border-t border-[var(--line)] pt-8 w-full">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] block mb-4">
            Helpful Destinations
          </span>
          <div className="flex flex-wrap gap-8 text-sm font-bold uppercase tracking-wider">
            <Link href="/#services" className="hover:text-[var(--orange)]">Services</Link>
            <Link href="/work" className="hover:text-[var(--orange)]">Selected Work</Link>
            <Link href="/#about" className="hover:text-[var(--orange)]">Pricing</Link>
            <Link href="/#contact" className="hover:text-[var(--orange)]">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-[var(--orange)]">Privacy Policy</Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@sarwagya.in">hello@sarwagya.in</a>
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

