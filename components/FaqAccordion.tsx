'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { trackEvent } from '@/lib/analytics'

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number, question: string) => {
    const next = openIndex === index ? null : index
    setOpenIndex(next)
    if (next !== null) {
      trackEvent({ name: 'faq_open', params: { index, question } })
    }
  }

  return (
    <div className="faq-accordion-list divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-btn-${index}`

        return (
          <div key={index} className="faq-item py-6 transition-colors">
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index, faq.question)}
              className="w-full flex items-center justify-between text-left gap-4 font-bold tracking-tight text-xl md:text-2xl hover:text-[var(--orange)] focus-visible:outline-2 focus-visible:outline-[var(--orange)]"
            >
              <span className="font-sans">{faq.question}</span>
              <span className="shrink-0 text-[var(--orange)]">
                {isOpen ? <Minus size={22} /> : <Plus size={22} />}
              </span>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="mt-4 pr-12 text-base md:text-lg leading-relaxed text-[var(--muted)] font-sans"
              >
                {faq.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

