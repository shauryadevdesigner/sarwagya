import { site } from '@/config/site'
import { MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react'

export default function MapBlock() {
  const hasAddress = Boolean(site.address.street && site.address.city)
  const hasGeo = site.geo.lat !== null && site.geo.lng !== null

  if (!hasAddress && !hasGeo) {
    return null
  }

  const destination = hasGeo
    ? `${site.geo.lat},${site.geo.lng}`
    : encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.postalCode}`)

  return (
    <div className="map-block border-t border-[var(--line)] pt-12 mt-12">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--orange)] flex items-center gap-1">
            <MapPin size={14} /> Studio Address
          </span>
          <p className="mt-2 text-base font-sans font-bold">
            {site.address.street}, {site.address.city} {site.address.postalCode}
          </p>
          {site.hours && (
            <p className="text-xs text-[var(--muted)] font-mono mt-1">Hours: {site.hours}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${destination}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--ink)] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
          >
            Get Directions <ArrowUpRight size={14} />
          </a>
          {site.phone && (
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 border border-[var(--ink)] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              <Phone size={14} /> Call
            </a>
          )}
        </div>
      </div>

      {hasGeo && (
        <div className="w-full h-64 border border-[var(--line)] overflow-hidden">
          <iframe
            title="Sarwagya Office Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=en&z=15&output=embed`}
          />
        </div>
      )}
    </div>
  )
}

