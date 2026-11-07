import { site } from '@/config/site'
import { faqs } from '@/data/faqs'
import { reviews } from '@/data/reviews'

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phone,
    sameAs: Object.values(site.social).filter(Boolean),
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }
}

export function getProfessionalServiceSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og-default.png`,
    description: site.tagline,
    email: site.email,
    telephone: site.phone,
    priceRange: `${site.pricing.oneTime} - ${site.pricing.managed}`,
    areaServed: 'India',
    sameAs: Object.values(site.social).filter(Boolean),
    openingHours: site.hours,
  }

  if (site.address.street && site.address.city) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    }
  }

  if (site.geo.lat !== null && site.geo.lng !== null) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    }
  }

  if (reviews.length > 0) {
    const validReviews = reviews.filter((r) => typeof r.rating === 'number')
    if (validReviews.length > 0) {
      const avg =
        validReviews.reduce((acc, r) => acc + (r.rating || 5), 0) / validReviews.length
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: avg.toFixed(1),
        reviewCount: validReviews.length,
      }
      schema.review = validReviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        reviewBody: r.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating || 5,
        },
      }))
    }
  }

  return schema
}

export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${site.url}${item.url}`,
    })),
  }
}

