import type { Metadata, Viewport } from 'next'
import { site } from '@/config/site'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import CookieConsent from '@/components/CookieConsent'
import GlobalDockNav from '@/components/GlobalDockNav'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Premium Web Development Agency in India | Sarwagya',
    template: '%s | Sarwagya',
  },
  description: 'Sarwagya is an independent digital studio building high-conviction websites and web apps for businesses with somewhere to go. Fast, bespoke, zero templates.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: 'Premium Web Development Agency in India | Sarwagya',
    description: 'Sarwagya is an independent digital studio building high-conviction websites and web apps. Zero templates, bespoke craft.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sarwagya - We build. You grow.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Web Development Agency in India | Sarwagya',
    description: 'Sarwagya is an independent digital studio building high-conviction websites and web apps.',
    images: ['/og-default.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f1eee8' },
    { media: '(prefers-color-scheme: dark)', color: '#11100e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgSchema = getOrganizationSchema()
  const websiteSchema = getWebSiteSchema()

  return (
    <html lang="en" className="light">
      <head>
        <JsonLd schema={[orgSchema, websiteSchema]} />
      </head>
      <body className="antialiased pb-20">
        {children}
        <CookieConsent />
        <GlobalDockNav />
      </body>
    </html>
  )
}
