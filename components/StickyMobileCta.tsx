'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import { MessageSquare, ArrowUpRight } from 'lucide-react'

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only run on small screens
    if (window.innerWidth >= 768) return

    const heroCta = document.getElementById('hero-primary-cta')
    const contactSection = document.getElementById('contact')

    if (!heroCta || !contactSection) return

    let pastHero = false
    let inContact = false

    const updateVisibility = () => {
      setVisible(pastHero && !inContact)
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
        updateVisibility()
      },
      { threshold: 0 }
    )

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        inContact = entry.isIntersecting
        updateVisibility()
      },
      { threshold: 0.1 }
    )

    heroObserver.observe(heroCta)
    contactObserver.observe(contactSection)

    return () => {
      heroObserver.disconnect()
      contactObserver.disconnect()
    }
  }, [])

  const handleStart = () => {
    trackEvent({ name: 'cta_click', params: { location: 'sticky_mobile', label: 'Start Project' } })
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsApp = () => {
    trackEvent({ name: 'whatsapp_click', params: { location: 'sticky_mobile' } })
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Sarwagya, I am interested in building a project.')}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--ink)]/95 backdrop-blur-md p-3 px-4 flex items-center gap-3 border-t border-white/10"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
        >
          <button
            onClick={handleStart}
            className="flex-1 bg-[var(--orange)] text-white font-bold py-3 px-4 text-xs tracking-wider uppercase flex items-center justify-center gap-1 shadow-md active:scale-95 transition-transform"
          >
            Start Project <ArrowUpRight size={14} />
          </button>
          <button
            onClick={handleWhatsApp}
            aria-label="Chat on WhatsApp"
            className="flex-1 bg-white/10 text-[var(--paper)] font-bold py-3 px-4 text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/20 active:scale-95 transition-transform"
          >
            <MessageSquare size={14} className="text-[#25D366]" /> WhatsApp
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

