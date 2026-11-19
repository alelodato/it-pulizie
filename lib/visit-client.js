// Statistiche anonime, lato browser.
// - visit_id: UUID casuale tenuto SOLO in memoria, nuovo a ogni caricamento di pagina
// - nessun cookie, nessun sessionStorage; l'unico uso di localStorage è il flag
//   di esclusione 'itp_notrack' (pagina /escludi-visite)
// - al server arrivano solo categorie: pagina (senza query string), sorgente,
//   dispositivo, tipo di evento, etichetta e valore numerico
// Ogni funzione è protetta da try/catch: il tracciamento non deve mai rompere la pagina.
import { classifyDevice, classifySource, isTrackedPath } from '@/lib/stats'

export const NOTRACK_KEY = 'itp_notrack'
const ENDPOINT = '/api/v'

const state = {
  ready: false,
  enabled: false,
  visitId: '',
  path: '/',
  source: 'direct',
  device: 'desktop',
  sent: new Set(),
}

function randomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = new Uint8Array(16)
  crypto.getRandomValues(b)
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
}

export function isExcluded() {
  try {
    return window.localStorage.getItem(NOTRACK_KEY) !== null
  } catch {
    return false
  }
}

export function setExcluded(excluded) {
  try {
    if (excluded) window.localStorage.setItem(NOTRACK_KEY, '1')
    else window.localStorage.removeItem(NOTRACK_KEY)
  } catch {
    // localStorage non disponibile: niente da fare
  }
  return isExcluded()
}

// Da chiamare una volta per caricamento di pagina (VisitTracker al mount).
export function initVisit() {
  if (typeof window === 'undefined' || state.ready) return
  try {
    state.ready = true
    state.enabled = !isExcluded()
    if (!state.enabled) return
    state.visitId = randomId()
    // la sorgente si calcola qui e il referrer/la query string non escono dal browser
    state.source = classifySource({
      search: window.location.search,
      referrer: document.referrer,
      host: window.location.host,
    })
    let coarse = false
    try {
      coarse = window.matchMedia('(pointer: coarse)').matches
    } catch {}
    state.device = classifyDevice({ width: window.screen.width, height: window.screen.height, coarsePointer: coarse })
  } catch {
    state.enabled = false
  }
}

export function setVisitPath(pathname) {
  state.path = pathname || '/'
}

export function trackingActive() {
  return state.ready && state.enabled && isTrackedPath(state.path)
}

function send(payload) {
  const body = JSON.stringify(payload)
  if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, body)) return
  fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {})
}

// hit('pageview') · hit('scroll', '', 50) · hit('cta_click', 'tel') · hit('form_submit', 'sopralluogo')
export function hit(event, label = '', value = 0) {
  try {
    if (!trackingActive()) return
    const key = `${event}|${state.path}|${label}|${value}`
    if (state.sent.has(key)) return // stesso evento già inviato in questa visita
    state.sent.add(key)
    send({
      visit_id: state.visitId,
      event,
      path: state.path,
      source: state.source,
      device: state.device,
      label,
      value,
    })
  } catch {
    // mai bloccare la pagina
  }
}
