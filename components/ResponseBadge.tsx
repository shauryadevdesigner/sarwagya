import { site } from '@/config/site'

export default function ResponseBadge({ className = '' }: { className?: string }) {
  if (!site.responseTime) return null

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] rounded-full ${className}`}
      aria-label={`Response time promise: We reply ${site.responseTime}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--orange)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--orange)]"></span>
      </span>
      <span>We reply {site.responseTime}</span>
    </span>
  )
}

