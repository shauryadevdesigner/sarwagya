import { ImageResponse } from 'next/og'
import { caseStudies } from '@/data/caseStudies'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((item) => item.slug === slug)

  const title = cs ? cs.client : 'Sarwagya Case Study'
  const subtitle = cs ? cs.summary : 'High-conviction digital engineering.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#11100e',
          color: '#f1eee8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.05em' }}>
            SARWAGYA<span style={{ color: '#ff5b1f' }}>®</span>
          </span>
          <span style={{ fontSize: 20, color: '#ff5b1f', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            Case Study
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, margin: 0 }}>
            {title}
          </h1>
          <p style={{ fontSize: 28, color: '#aaa59b', maxWidth: 900, margin: 0 }}>
            {subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(241,238,232,0.2)', paddingTop: '24px' }}>
          <span style={{ fontSize: 20, color: '#aaa59b' }}>sarwagya.in/work</span>
          <span style={{ fontSize: 20, color: '#ff5b1f', fontWeight: 'bold' }}>WE BUILD. YOU GROW.</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

