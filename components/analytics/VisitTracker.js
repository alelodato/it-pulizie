'use client'

// Statistiche anonime su tutto il sito (montato in app/layout.js).
// Eventi: pageview, scroll (25/50/75/100), engaged (secondi attivi), cta_click.
// form_start e form_submit partono dai moduli e da lib/tracking.js.
// Non dipende dal consenso cookie perché non scrive né legge nulla sul dispositivo,
// tranne il flag di esclusione 'itp_notrack'.
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SCROLL_STEPS } from '@/lib/stats'
import { initVisit, setVisitPath, trackingActive, hit } from '@/lib/visit-client'

const ENGAGED_MILESTONES = [15, 30, 60]

// Etichetta del click su un link di contatto o di richiesta preventivo.
function ctaLabel(link, pathname) {
  const href = (link.getAttribute('href') || '').toLowerCase()
  if (href.startsWith('tel:')) return 'tel'
  if (href.startsWith('mailto:')) return 'mail'
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com') || href.includes('whatsapp.com/send')) return 'whatsapp'
  if (href.endsWith('#preventivo')) {
    return pathname.startsWith('/pulizie-condominiali') ? 'sopralluogo' : 'preventivo'
  }
  return ''
}

export default function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    let cleanup = () => {}
    try {
      initVisit()
      setVisitPath(pathname)
      if (!trackingActive()) return undefined

      hit('pageview')

      // --- scroll: ogni soglia una sola volta per pagina
      let ticking = false
      const reached = new Set()
      const onScroll = () => {
        if (ticking) return
        ticking = true
        window.requestAnimationFrame(() => {
          ticking = false
          try {
            const doc = document.documentElement
            const max = Math.max(doc.scrollHeight, document.body.scrollHeight)
            const seen = window.scrollY + window.innerHeight
            const pct = max > 0 ? (seen / max) * 100 : 100
            for (const step of SCROLL_STEPS) {
              const target = step === 100 ? 98 : step
              if (pct >= target && !reached.has(step)) {
                reached.add(step)
                hit('scroll', '', step)
              }
            }
          } catch {}
        })
      }

      // --- engaged: secondi con pagina visibile e in primo piano
      let seconds = 0
      let lastSent = 0
      const isActive = () => document.visibilityState === 'visible' && (typeof document.hasFocus !== 'function' || document.hasFocus())
      const sendEngaged = () => {
        if (seconds > lastSent) {
          lastSent = seconds
          hit('engaged', '', Math.min(seconds, 86400))
        }
      }
      const timer = window.setInterval(() => {
        if (!isActive()) return
        seconds += 1
        if (ENGAGED_MILESTONES.includes(seconds)) sendEngaged()
      }, 1000)
      const onVisibility = () => {
        if (document.visibilityState === 'hidden') sendEngaged()
      }

      // --- click su telefono, WhatsApp, email e richiesta preventivo
      const onClick = (e) => {
        try {
          const link = e.target && e.target.closest ? e.target.closest('a[href]') : null
          if (!link) return
          const label = ctaLabel(link, pathname)
          if (label) hit('cta_click', label)
        } catch {}
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      // pagehide e visibilitychange sono i più affidabili sui telefoni; beforeunload
      // copre le navigazioni in cui il browser scarta i beacon inviati più tardi.
      // Il primo che scatta invia, gli altri non mandano nulla (seconds > lastSent).
      window.addEventListener('pagehide', sendEngaged)
      window.addEventListener('beforeunload', sendEngaged)
      document.addEventListener('click', onClick, true)

      cleanup = () => {
        sendEngaged()
        window.clearInterval(timer)
        window.removeEventListener('scroll', onScroll)
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pagehide', sendEngaged)
        window.removeEventListener('beforeunload', sendEngaged)
        document.removeEventListener('click', onClick, true)
      }
    } catch {
      // il tracciamento non deve mai rompere la pagina
    }
    return () => {
      try {
        cleanup()
      } catch {}
    }
  }, [pathname])

  return null
}
