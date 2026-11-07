import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import Breadcrumbs from '@/components/Breadcrumbs'
import CaseStudyCard from '@/components/CaseStudyCard'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((item) => item.slug === slug)
  if (!cs) return {}

  const title = `${cs.client}: ${cs.results[0] || 'Digital Transformation'} | Sarwagya Case Study`
  const description = cs.summary.slice(0, 155)

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${cs.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [cs.heroImage || '/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cs.heroImage || '/og-default.png'],
    },
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((item) => item.slug === slug)

  if (!cs) {
    notFound()
    return null
  }

  const related = caseStudies.filter((item) => item.slug !== cs.slug).slice(0, 2)

  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/work" className="text-[var(--orange)]">Work</Link>
          <Link className="nav-cta" href="/#contact">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>

      <article className="section py-16 md:py-24 max-w-5xl mx-auto w-full">
        <Breadcrumbs
          items={[
            { name: 'Selected Work', url: '/work' },
            { name: cs.client, url: `/work/${cs.slug}` },
          ]}
        />

        <header className="mt-8 mb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--muted)] mb-3">
            <span>{cs.industry}</span>
            <span>/</span>
            <span>{cs.year}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
            {cs.client}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted)] font-sans leading-relaxed max-w-3xl">
            {cs.summary}
          </p>
        </header>

        {cs.heroImage && (
          <div className="relative aspect-[16/9] w-full border border-[var(--line)] overflow-hidden my-12 bg-[var(--ink)]">
            <Image
              src={cs.heroImage}
              alt={`Full presentation of ${cs.client} web platform`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Problem -> Solution -> Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-[var(--line)] py-16 my-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] font-bold block mb-3">
              01 / The Problem
            </span>
            <p className="text-base leading-relaxed text-[var(--ink)] font-sans">
              {cs.problem}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] font-bold block mb-3">
              02 / The Solution
            </span>
            <p className="text-base leading-relaxed text-[var(--ink)] font-sans">
              {cs.solution}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] font-bold block mb-3">
              03 / The Results
            </span>
            <ul className="space-y-3 font-sans">
              {cs.results.map((r, i) => (
                <li key={i} className="text-base font-bold flex items-start gap-2">
                  <span className="text-[var(--orange)]">↗</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="my-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-4">
            Technologies & Services Deployed
          </h3>
          <div className="flex flex-wrap gap-2">
            {cs.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 border border-[var(--line)] font-mono text-xs bg-white/40">
                {tech}
              </span>
            ))}
            {cs.services.map((srv) => (
              <span key={srv} className="px-3 py-1.5 border border-[var(--line)] font-mono text-xs bg-[var(--orange)]/10 text-[var(--orange)] font-bold">
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial if present */}
        {cs.testimonial && (
          <div className="border border-[var(--line)] p-8 md:p-12 my-16 bg-white/40">
            <p className="text-xl md:text-2xl font-serif italic mb-6 leading-relaxed">
              &quot;{cs.testimonial.quote}&quot;
            </p>
            <p className="font-bold text-sm">{cs.testimonial.author}</p>
            <p className="text-xs text-[var(--muted)] font-mono">{cs.testimonial.role}</p>
          </div>
        )}

        {/* Project CTA */}
        <div className="bg-[var(--ink)] text-[var(--paper)] p-8 md:p-16 my-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              READY FOR A BUILD LIKE THIS?
            </h2>
            <p className="text-sm text-[#aaa59b] font-sans">
              Start with high-conviction engineering designed specifically for your growth.
            </p>
          </div>
          <Link
            href="/#contact"
            className="bg-[var(--orange)] text-white font-bold px-8 py-4 text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-90 shrink-0"
          >
            Start Your Project <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* More Work */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-[var(--line)] pt-16">
            <h3 className="text-2xl font-black tracking-tight mb-8">MORE SELECTED WORK</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((item) => (
                <CaseStudyCard key={item.slug} caseStudy={item} />
              ))}
            </div>
          </div>
        )}
      </article>

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

