'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Globe, Layers, Search, Sparkles } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pastProjects } from '@/data/pastProjects'

const CATEGORIES = [
  'All',
  'Crypto & Web3',
  'SaaS & AI',
  'E-Commerce',
  'Sports & Gaming',
  'Logistics & Auto',
  'iGaming & Casino',
  'Music & Creative',
  'Food & Hospitality',
] as const

export default function WorkListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return pastProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Count by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: pastProjects.length }
    pastProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <main className="site-shell min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sarwagya home">
          SARWAGYA<span>®</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/work" className="text-[var(--orange)]">Work</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/founders">Founders</Link>
          <Link className="nav-cta" href="/inquire">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>

      <section className="section py-16 md:py-24 max-w-7xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'Past Works & Production Portfolio', url: '/work' }]} />

        {/* Hero Header */}
        <div className="mt-8 mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-[var(--orange)] mb-3">
            <Sparkles size={14} /> Production Portfolio Index
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
            PROVEN IN<br />
            <em>THE WILD.</em>
          </h1>
          <p className="hero-intro max-w-2xl mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            A comprehensive, verified catalogue of live client platforms, DeFi protocols, SaaS suites, and e-commerce architectures delivered across diverse industries.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-[var(--line)] text-xs font-mono">
            <div>
              <span className="text-[var(--orange)] font-bold text-xl block leading-tight">{pastProjects.length}+</span>
              <span className="text-[var(--muted)] uppercase">Live Deployments</span>
            </div>
            <div className="h-8 w-px bg-[var(--line)]" />
            <div>
              <span className="text-[var(--ink)] font-bold text-xl block leading-tight">8</span>
              <span className="text-[var(--muted)] uppercase">Industry Verticals</span>
            </div>
            <div className="h-8 w-px bg-[var(--line)]" />
            <div>
              <span className="text-[var(--ink)] font-bold text-xl block leading-tight">100%</span>
              <span className="text-[var(--muted)] uppercase">Custom Built</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search by client, technology, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/60 border border-[var(--line)] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--orange)] font-sans"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              const count = categoryCounts[cat] || 0
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all border ${
                    active
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-md font-bold'
                      : 'bg-white/40 text-[var(--muted)] border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                  }`}
                >
                  {cat} <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs font-mono text-[var(--muted)] mb-6 border-b border-[var(--line)] pb-3">
          <span>Showing {filteredProjects.length} projects in {selectedCategory}</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[var(--orange)] font-bold underline hover:opacity-80"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.url + idx}
                className="group border border-[var(--line)] bg-white/50 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-between hover:border-[var(--orange)] hover:shadow-xl transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[var(--ink)] text-[var(--paper)] font-bold">
                      {proj.category}
                    </span>
                    {proj.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--orange)] border border-[var(--orange)]/30 px-2 py-0.5 bg-[var(--orange)]/5">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 group-hover:text-[var(--orange)] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[var(--muted)] font-sans leading-relaxed mb-6 line-clamp-3">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--muted)] truncate max-w-[190px]">
                    {proj.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--orange)] hover:underline shrink-0 group-hover:translate-x-0.5 transition-transform"
                    aria-label={`Visit live site: ${proj.title}`}
                  >
                    Launch Live <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center border border-[var(--line)] bg-white/40 my-8">
            <p className="text-lg font-bold mb-2">No projects matching your search.</p>
            <p className="text-xs font-mono text-[var(--muted)] mb-6">
              Try adjusting your filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="bg-[var(--ink)] text-white px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-24 p-8 md:p-16 bg-[var(--ink)] text-[var(--paper)] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] font-bold block mb-2">
              Next In Line
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              READY TO BUILD YOUR NEXT DIGITAL ASSET?
            </h2>
            <p className="text-sm text-[#aaa59b] max-w-xl mt-2 font-sans">
              From high-concurrency Web3 exchanges to bespoke luxury storefronts, we build production software designed to dominate its niche.
            </p>
          </div>
          <Link
            href="/inquire"
            className="bg-[var(--orange)] text-white font-bold px-8 py-4 text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl shrink-0"
          >
            Start Your Build <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/">SARWAGYA<span>®</span></Link>
          <p>WE BUILD. YOU GROW.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@sarwagya.in">hello@sarwagya.in</a>
          <Link href="/work">Selected Work</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/founders">Founders</Link>
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
