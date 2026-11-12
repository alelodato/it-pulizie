'use client'

import { useEffect, useState } from 'react'
import {
  OPEN_PREFERENCES_EVENT,
  pushEvent,
  readStoredConsent,
  storeConsent,
  updateConsent,
} from '@/lib/tracking'

const choiceButtonClass =
  'w-full bg-blu text-white font-body font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#1f7e9a] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-celeste focus-visible:ring-offset-2'

export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!readStoredConsent()) setOpen(true)

    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen)
  }, [])

  function choose(choice) {
    storeConsent(choice)
    updateConsent(choice)
    pushEvent('consent_choice', { consent_choice: choice })
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      className="fixed z-[60] inset-x-0 bottom-0 lg:inset-x-auto lg:left-6 lg:bottom-6 lg:max-w-md bg-white border-t border-celeste-light lg:border lg:rounded-2xl shadow-[0_-8px_32px_rgba(26,63,111,0.15)] lg:shadow-[0_12px_40px_rgba(26,63,111,0.2)]"
    >
      <div className="relative px-5 pt-5 pb-5 sm:px-6">
        <button
          type="button"
          onClick={() => choose('rejected')}
          aria-label="Chiudi e rifiuta i cookie non necessari"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-site-gray hover:bg-site-white hover:text-blu transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p id="cookie-banner-title" className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-2 pr-10">
          Cookie
        </p>
        <p id="cookie-banner-text" className="font-body text-sm text-[#44596e] leading-relaxed mb-4 pr-6">
          Usiamo cookie tecnici necessari al sito e, solo con il tuo consenso, cookie di analisi e pubblicità (Google Analytics e Google Ads) per capire come arrivano le richieste. Puoi cambiare scelta in qualsiasi momento.{' '}
          <a href="/cookie-policy" className="text-[#1f7e9a] underline underline-offset-2 hover:text-blu">
            Cookie policy
          </a>
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => choose('rejected')} className={choiceButtonClass}>
            Rifiuta
          </button>
          <button type="button" onClick={() => choose('accepted')} className={choiceButtonClass}>
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
