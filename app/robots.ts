import { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'

  // Block indexing on preview/staging deployments
  if (!isProd && process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/thank-you', '/api/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}

