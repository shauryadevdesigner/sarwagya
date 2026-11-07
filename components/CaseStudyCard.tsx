import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { CaseStudy } from '@/data/caseStudies'

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="case-study-card group border border-[var(--line)] bg-[var(--paper)] overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ink)]">
          {caseStudy.heroImage ? (
            <Image
              src={caseStudy.heroImage}
              alt={`Homepage and visual identity for ${caseStudy.client}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 font-mono font-bold text-lg">
              {caseStudy.client}
            </div>
          )}
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-3">
            <span>{caseStudy.industry}</span>
            <span>{caseStudy.year}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[var(--orange)] transition-colors">
            {caseStudy.client}
          </h3>
          <p className="text-sm md:text-base text-[var(--muted)] line-clamp-2 leading-relaxed mb-6 font-sans">
            {caseStudy.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 border border-[var(--line)] bg-white/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8 pt-0">
        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--orange)] group-hover:translate-x-1 transition-transform"
        >
          View Case Study <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  )
}

