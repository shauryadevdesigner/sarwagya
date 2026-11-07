import { reviews } from '@/data/reviews'

export default function ReviewsGrid() {
  // Rule 3: Only render when real reviews exist
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section className="section reviews-section bg-[var(--paper)]" id="reviews">
      <div className="section-kicker">
        <span>( 04 )</span>
        <span>Client proof</span>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="border border-[var(--line)] p-8 flex flex-col justify-between bg-white/50 backdrop-blur-sm">
            <p className="text-lg leading-relaxed font-sans mb-8">“{rev.text}”</p>
            <div className="flex items-center gap-4 border-t border-[var(--line)] pt-4">
              <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                {rev.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{rev.name}</h4>
                <p className="text-xs text-[var(--muted)] font-mono">{rev.role}, {rev.company}</p>
                {rev.source && (
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-[var(--orange)]">
                    Via {rev.source}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

