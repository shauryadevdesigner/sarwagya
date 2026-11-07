'use client'

import { useId } from 'react'

export default function TextLoop({
  text = 'React ✦ Bits',
  separator = '✦',
  ribbonColor = '#5227FF',
  fontSize = 28,
  ribbonWidth = 52,
  speed = 10,
  className = '',
}: {
  text?: string
  separator?: string
  ribbonColor?: string
  fontSize?: number
  ribbonWidth?: number
  speed?: number
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const phrase = `${text.toUpperCase()} ${separator} `
  const repeated = phrase.repeat(10)

  return (
    <div className={`text-loop ${className}`} aria-label={text}>
      <svg className="text-loop-svg" viewBox="0 0 1200 240" role="img" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id={`wave-${id}`} d="M -320 120 Q -160 20 0 120 T 320 120 T 640 120 T 960 120 T 1280 120 T 1520 120" />
        </defs>
        <g className="text-loop-track" style={{ animationDuration: `${speed}s` }}>
          <path className="text-loop-ribbon" d="M -320 120 Q -160 20 0 120 T 320 120 T 640 120 T 960 120 T 1280 120 T 1520 120" stroke={ribbonColor} strokeWidth={ribbonWidth} />
          <text className="text-loop-text" fontSize={fontSize} fontWeight="800" letterSpacing="1.5" dominantBaseline="central">
            <textPath href={`#wave-${id}`} startOffset="0">{repeated}</textPath>
          </text>
          <text className="text-loop-text" fontSize={fontSize} fontWeight="800" letterSpacing="1.5" dominantBaseline="central">
            <textPath href={`#wave-${id}`} startOffset="100%">{repeated}</textPath>
          </text>
        </g>
      </svg>
    </div>
  )
}
