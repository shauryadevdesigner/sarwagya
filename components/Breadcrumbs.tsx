import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from './JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo'

export interface BreadcrumbItem {
  name: string
  url: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: 'Home', url: '/' }, ...items]
  const schema = getBreadcrumbSchema(allItems)

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav py-4 text-xs font-mono tracking-wider uppercase text-[var(--muted)]">
      <JsonLd schema={schema} />
      <ol className="flex items-center flex-wrap gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <ChevronRight size={12} className="opacity-50" />}
              {isLast ? (
                <span className="text-[var(--ink)] font-bold truncate max-w-[180px] md:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="hover:text-[var(--orange)] transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

