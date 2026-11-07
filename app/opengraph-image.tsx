import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sarwagya — We Build. You Grow.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
          <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.05em' }}>
            SARWAGYA<span style={{ color: '#ff5b1f' }}>®</span>
          </span>
          <span style={{ fontSize: 20, color: '#ff5b1f', fontFamily: 'monospace' }}>
            DIGITAL STUDIO / INDIA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.9, margin: 0 }}>
            WE BUILD.<br />
            <span style={{ color: '#ff5b1f' }}>YOU GROW.</span>
          </h1>
          <p style={{ fontSize: 30, color: '#aaa59b', maxWidth: 900, margin: 0 }}>
            High-conviction websites and web apps for businesses with somewhere to go.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(241,238,232,0.2)',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: 22, color: '#aaa59b' }}>sarwagya.in</span>
          <span style={{ fontSize: 20, color: '#f1eee8', fontFamily: 'monospace' }}>
            Zero Templates • Bespoke Craft
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

