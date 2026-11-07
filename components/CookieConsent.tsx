'use client'

import { useEffect, useState } from 'react'
import { site } from '@/config/site'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sarwagya_cookie_consent')
    if (!saved) {
      setShow(true)
    } else if (saved === 'granted' && site.gaId) {
      loadGa(site.gaId)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('sarwagya_cookie_consent', 'granted')
    setShow(false)
    if (site.gaId) {
      loadGa(site.gaId)
    }
  }

  const handleDecline = () => {
    localStorage.setItem('sarwagya_cookie_consent', 'denied')
    setShow(false)
  }

  const loadGa = (id: string) => {
    if (document.getElementById('ga-script')) return
    const script = document.createElement('script')
    script.id = 'ga-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)

    const initScript = document.createElement('script')
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', { anonymize_ip: true });
    `
    document.head.appendChild(initScript)
  }

  if (!show) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="cookie-banner fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-[var(--ink)] text-[var(--paper)] p-5 border border-[var(--line)] shadow-2xl z-50 flex flex-col gap-3 text-xs"
    >
      <p className="leading-relaxed">
        We use privacy-friendly analytics to understand how visitors engage with our studio. No personal data is sold.
      </p>
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={handleAccept}
          className="bg-[var(--orange)] text-white font-bold px-4 py-2 uppercase tracking-wider text-[11px] hover:opacity-90"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="border border-[var(--paper)] text-[var(--paper)] font-bold px-4 py-2 uppercase tracking-wider text-[11px] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
        >
          Decline
        </button>
      </div>
    </div>
  )
}

