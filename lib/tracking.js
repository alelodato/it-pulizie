// Helper condivisi per dataLayer e Consent Mode.
// Regola: nei parametri degli eventi non vanno MAI dati personali
// (nomi, telefoni, email, indirizzi, testo libero).

export const CONSENT_STORAGE_KEY = 'itp_consent_v1'
export const OPEN_PREFERENCES_EVENT = 'itp:open-cookie-preferences'

export function pushEvent(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Usa window.gtag se definito da GtmHead, altrimenti scrive nel dataLayer
// nello stesso formato (oggetto arguments), così GTM lo interpreta uguale.
function gtag() {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag.apply(window, arguments)
    return
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(arguments)
}

export function consentStateFor(choice) {
  const value = choice === 'accepted' ? 'granted' : 'denied'
  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  }
}

export function updateConsent(choice) {
  gtag('consent', 'update', consentStateFor(choice))
}

export function readStoredConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && (parsed.choice === 'accepted' || parsed.choice === 'rejected')) {
      return parsed
    }
  } catch {
    // localStorage non disponibile o valore corrotto: nessuna scelta salvata
  }
  return null
}

export function storeConsent(choice) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ choice, date: new Date().toISOString() })
    )
  } catch {
    // ignorato: la scelta vale comunque per la sessione corrente
  }
}
