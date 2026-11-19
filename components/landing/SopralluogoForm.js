'use client'

import { useEffect, useState } from 'react'
import { pushEvent } from '@/lib/tracking'
import { hit } from '@/lib/visit-client'

const ATTRIBUTION_PARAMS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term']

const ROLES = ['Amministratore', 'Consigliere', 'Condomino', 'Altro']

const inputClass =
  'border border-celeste-light rounded-xl px-4 py-3 text-sm text-blu bg-site-white focus:outline-none focus:border-celeste transition-colors font-body w-full'
const labelClass =
  'font-heading text-[0.68rem] tracking-[0.14em] uppercase text-blu mb-1 block'

export default function SopralluogoForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [attribution, setAttribution] = useState({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const found = {}
    ATTRIBUTION_PARAMS.forEach((key) => {
      const value = params.get(key)
      if (value) found[key] = value.slice(0, 200)
    })
    setAttribution(found)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: se compilato è un bot, non inviamo nulla e non tracciamo.
    if (data.get('botcheck')) {
      setStatus('success')
      return
    }

    setStatus('loading')
    const role = String(data.get('ruolo') || '')

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: 'Nuova richiesta sopralluogo – Condomini Roma Sud',
      from_name: 'Landing Google Ads – I.T. Pulizie',
      pagina: 'pulizie-condominiali-roma-sud',
      nome: data.get('nome'),
      telefono: data.get('telefono'),
      email: data.get('email') || '',
      ruolo: role,
      indirizzo: data.get('indirizzo'),
      messaggio: data.get('messaggio') || '',
      privacy: 'Accettata',
      ...attribution,
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        pushEvent('generate_lead', {
          form_name: 'sopralluogo_condomini',
          lead_role: role.toLowerCase(),
        })
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="text-center py-6">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#e5f6fb] text-[#1f7e9a] flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading text-blu text-2xl mb-3">Richiesta inviata.</h3>
        <p className="font-body text-[#44596e] leading-relaxed max-w-sm mx-auto">
          Grazie. Ti ricontatteremo nel più breve tempo possibile per fissare il sopralluogo.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onFocusCapture={() => hit('form_start', 'sopralluogo')} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Honeypot anti-spam: invisibile per le persone */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        style={{ display: 'none' }}
      />

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="lp-nome">Nome e cognome*</label>
        <input className={inputClass} type="text" id="lp-nome" name="nome" autoComplete="name" required />
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="lp-telefono">Telefono*</label>
        <input className={inputClass} type="tel" id="lp-telefono" name="telefono" autoComplete="tel" required />
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="lp-email">Email</label>
        <input className={inputClass} type="email" id="lp-email" name="email" autoComplete="email" />
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="lp-ruolo">Sei*</label>
        <select className={inputClass} id="lp-ruolo" name="ruolo" required defaultValue="">
          <option value="" disabled>Seleziona...</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:col-span-2">
        <label className={labelClass} htmlFor="lp-indirizzo">Indirizzo o zona del condominio*</label>
        <input className={inputClass} type="text" id="lp-indirizzo" name="indirizzo" placeholder="Es. Via …, EUR" required />
      </div>

      <div className="flex flex-col sm:col-span-2">
        <label className={labelClass} htmlFor="lp-messaggio">Di cosa ha bisogno il condominio?</label>
        <textarea
          className={`${inputClass} resize-y min-h-[120px]`}
          id="lp-messaggio"
          name="messaggio"
          placeholder="Numero di scale, frequenza desiderata, eventuali esigenze particolari"
        />
      </div>

      <div className="sm:col-span-2 flex items-start gap-3">
        <input
          type="checkbox"
          id="lp-privacy"
          name="privacy"
          required
          className="mt-1 h-4 w-4 flex-shrink-0 accent-[#1a3f6f]"
        />
        <label htmlFor="lp-privacy" className="font-body text-sm text-[#44596e] leading-relaxed">
          Ho letto l&apos;
          <a href="/privacy-policy" target="_blank" rel="noopener" className="text-[#1f7e9a] underline underline-offset-2 hover:text-blu">
            informativa privacy
          </a>{' '}
          e acconsento al trattamento dei dati per essere ricontattato.*
        </label>
      </div>

      <div className="sm:col-span-2 text-center pt-2">
        {status === 'error' && (
          <p role="alert" className="font-body text-sm text-red-600 mb-4">
            Invio non riuscito. Riprova oppure chiamaci al +39 333 7382823.
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto bg-blu text-white font-body font-semibold text-sm px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-blu"
        >
          {status === 'loading' ? 'Invio in corso...' : 'Richiedi un sopralluogo gratuito'}
        </button>
      </div>
    </form>
  )
}
