import { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${site.url}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${site.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${site.url}/work/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...caseStudyRoutes]
}

