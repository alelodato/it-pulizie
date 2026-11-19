// Statistiche anonime di utilizzo: funzioni pure condivise da browser, API e dashboard.
// Nessuna dipendenza da Node o dal browser: si testano con `npm test`.
//
// Privacy: queste funzioni lavorano solo su categorie. Il referrer e i parametri
// dell'URL servono a classificare la sorgente nel browser e non vengono mai inviati.

export const EVENTS = ['pageview', 'scroll', 'engaged', 'cta_click', 'form_start', 'form_submit']
export const SOURCES = ['google_ads', 'google_organic', 'direct', 'social', 'other']
export const DEVICES = ['mobile', 'tablet', 'desktop']
export const ENVS = ['prod', 'preview', 'dev']
export const SCROLL_STEPS = [25, 50, 75, 100]
export const CTA_LABELS = ['tel', 'whatsapp', 'mail', 'preventivo', 'sopralluogo']
export const FORM_LABELS = ['sopralluogo', 'preventivo']
export const MAX_ENGAGED_SECONDS = 86400

// Pagine che non vanno mai tracciate (area privata e pagina di esclusione).
export const UNTRACKED_PREFIXES = ['/statistiche', '/escludi-visite']

const VISIT_ID_RE = /^[a-zA-Z0-9-]{8,40}$/
const PATH_RE = /^\/[A-Za-z0-9\-._~%/]*$/

// ---------------------------------------------------------------------------
// Bot
// ---------------------------------------------------------------------------

const BOT_RE = new RegExp(
  [
    '\\bbot\\b', 'bot[/;]', 'crawl', 'spider', 'slurp', 'headless', 'lighthouse', 'pagespeed', 'ptst',
    'facebookexternalhit', 'facebookcatalog', 'whatsapp', 'telegrambot', 'skypeuripreview',
    'curl/', 'wget', 'python', 'httpclient', 'java/', 'go-http', 'axios', 'node-fetch', 'undici',
    'postman', 'phantomjs', 'selenium', 'puppeteer', 'playwright', 'google-inspectiontool',
    'adsbot', 'mediapartners', 'googleother', 'bingpreview', 'ahrefs', 'semrush', 'mj12',
    'dotbot', 'yandex', 'baidu', 'duckduck', 'petalbot', 'gptbot', 'claudebot', 'ccbot',
    'bytespider', 'applebot', 'amazonbot', 'chatgpt', 'perplexity', 'uptime', 'monitor', 'scan',
  ].join('|'),
  'i'
)

export function isBot(userAgent) {
  if (typeof userAgent !== 'string' || userAgent.trim().length < 10) return true
  return BOT_RE.test(userAgent)
}

// ---------------------------------------------------------------------------
// Dispositivo
// ---------------------------------------------------------------------------

// width/height: dimensioni dello schermo; coarsePointer: input touch principale.
export function classifyDevice({ width, height, coarsePointer } = {}) {
  const w = Number(width) || 0
  const h = Number(height) || 0
  const shortSide = Math.min(w || h, h || w)
  if (coarsePointer) return shortSide > 0 && shortSide < 600 ? 'mobile' : 'tablet'
  if (w > 0 && w < 768) return 'mobile'
  return 'desktop'
}

// ---------------------------------------------------------------------------
// Sorgente
// ---------------------------------------------------------------------------

const SOCIAL_DOMAINS = [
  'facebook.com', 'fb.com', 'fb.me', 'instagram.com', 'linkedin.com', 'lnkd.in', 't.co', 'twitter.com',
  'x.com', 'tiktok.com', 'youtube.com', 'youtu.be', 'pinterest.com', 'pinterest.it', 'reddit.com',
  'threads.net', 'whatsapp.com', 'wa.me', 't.me', 'telegram.org', 'snapchat.com',
]
const GOOGLE_RE = /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/
const GOOGLE_ADS_HOSTS = ['googleadservices.com', 'googlesyndication.com', 'doubleclick.net']

function stripWww(host) {
  return String(host || '').toLowerCase().replace(/^www\./, '')
}

function hostMatches(host, domains) {
  return domains.some((d) => host === d || host.endsWith('.' + d))
}

// search: window.location.search; referrer: document.referrer; host: window.location.host.
// Il parametro gclid (o gbraid/wbraid, usati da Google Ads su iOS) serve solo a dire
// "arriva da un annuncio": il valore non viene letto né salvato.
export function classifySource({ search = '', referrer = '', host = '' } = {}) {
  let params
  try {
    params = new URLSearchParams(search)
  } catch {
    params = new URLSearchParams()
  }
  if (['gclid', 'gbraid', 'wbraid'].some((k) => params.get(k))) return 'google_ads'

  let refHost = ''
  try {
    refHost = referrer ? stripWww(new URL(referrer).hostname) : ''
  } catch {
    refHost = ''
  }
  if (!refHost) return 'direct'
  // Navigazione interna (es. dalla landing alla home): non è una nuova sorgente esterna.
  if (host && refHost === stripWww(String(host).split(':')[0])) return 'direct'
  if (hostMatches(refHost, GOOGLE_ADS_HOSTS)) return 'google_ads'
  if (GOOGLE_RE.test(refHost)) return 'google_organic'
  if (hostMatches(refHost, SOCIAL_DOMAINS)) return 'social'
  return 'other'
}

// ---------------------------------------------------------------------------
// Validazione dell'evento ricevuto dall'API (whitelist)
// ---------------------------------------------------------------------------

export function isTrackedPath(path) {
  return !UNTRACKED_PREFIXES.some((p) => path === p || path.startsWith(p + '/'))
}

export function normalizePath(path) {
  if (typeof path !== 'string') return null
  const clean = path.split(/[?#]/)[0]
  if (!clean || clean.length > 200 || !PATH_RE.test(clean)) return null
  return clean
}

// Restituisce l'evento normalizzato oppure null se non è valido.
export function validateHit(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null

  const visit_id = typeof raw.visit_id === 'string' ? raw.visit_id : ''
  if (!VISIT_ID_RE.test(visit_id)) return null

  const event = raw.event
  if (!EVENTS.includes(event)) return null

  const path = normalizePath(raw.path)
  if (!path || !isTrackedPath(path)) return null

  const source = raw.source
  if (!SOURCES.includes(source)) return null

  const device = raw.device
  if (!DEVICES.includes(device)) return null

  const label = typeof raw.label === 'string' ? raw.label.trim().toLowerCase() : ''
  const num = Number(raw.value)
  const value = Number.isFinite(num) ? Math.round(num) : NaN

  const out = { visit_id, event, path, source, device, label: '', value: 0 }

  switch (event) {
    case 'pageview':
      return out
    case 'scroll':
      if (!SCROLL_STEPS.includes(value)) return null
      return { ...out, value }
    case 'engaged':
      if (!(value >= 1 && value <= MAX_ENGAGED_SECONDS)) return null
      return { ...out, value }
    case 'cta_click':
      if (!CTA_LABELS.includes(label)) return null
      return { ...out, label }
    case 'form_start':
    case 'form_submit':
      if (!FORM_LABELS.includes(label)) return null
      return { ...out, label }
    default:
      return null
  }
}

export function envFromVercel(vercelEnv) {
  if (vercelEnv === 'production') return 'prod'
  if (vercelEnv === 'preview') return 'preview'
  return 'dev'
}

// ---------------------------------------------------------------------------
// Aggregazioni per la dashboard
// ---------------------------------------------------------------------------

// Raggruppa le righe per visit_id. Una visita = un caricamento di pagina.
export function buildVisits(rows) {
  const byId = new Map()
  const sorted = [...(rows || [])].sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))

  for (const r of sorted) {
    let v = byId.get(r.visit_id)
    if (!v) {
      v = {
        visit_id: r.visit_id,
        start: r.created_at,
        path: r.path,
        device: r.device,
        source: r.source,
        hasPageview: false,
        paths: [],
        scrollMax: 0,
        engagedSec: 0,
        cta: [],
        formStart: [],
        formSubmit: [],
      }
      byId.set(r.visit_id, v)
    }
    if (!v.paths.includes(r.path)) v.paths.push(r.path)
    switch (r.event) {
      case 'pageview':
        if (!v.hasPageview) {
          // la prima pagina vista definisce ingresso, sorgente e dispositivo
          v.hasPageview = true
          v.path = r.path
          v.source = r.source
          v.device = r.device
        }
        break
      case 'scroll':
        v.scrollMax = Math.max(v.scrollMax, Number(r.value) || 0)
        break
      case 'engaged':
        v.engagedSec = Math.max(v.engagedSec, Number(r.value) || 0)
        break
      case 'cta_click':
        if (!v.cta.includes(r.label)) v.cta.push(r.label)
        break
      case 'form_start':
        if (!v.formStart.includes(r.label)) v.formStart.push(r.label)
        break
      case 'form_submit':
        if (!v.formSubmit.includes(r.label)) v.formSubmit.push(r.label)
        break
      default:
        break
    }
  }

  return [...byId.values()]
    .map((v) => ({ ...v, events: describeEvents(v) }))
    .sort((a, b) => String(b.start).localeCompare(String(a.start)))
}

function describeEvents(v) {
  return [
    ...v.cta.map((l) => `click ${l}`),
    ...v.formStart.map((l) => `modulo ${l} iniziato`),
    ...v.formSubmit.map((l) => `modulo ${l} inviato`),
  ]
}

export function pct(part, total, decimals = 1) {
  if (!total) return 0
  const f = 10 ** decimals
  return Math.round((part / total) * 100 * f) / f
}

// Funnel: arrivi → scroll ≥ 50% → click contatto → modulo iniziato → modulo inviato.
export function buildFunnel(visits) {
  const list = visits || []
  const total = list.length
  const steps = [
    { key: 'arrivi', label: 'Arrivi', count: total },
    { key: 'scroll50', label: 'Scroll ≥ 50%', count: list.filter((v) => v.scrollMax >= 50).length },
    { key: 'cta', label: 'Click contatto', count: list.filter((v) => v.cta.length > 0).length },
    { key: 'form_start', label: 'Modulo iniziato', count: list.filter((v) => v.formStart.length > 0).length },
    { key: 'form_submit', label: 'Modulo inviato', count: list.filter((v) => v.formSubmit.length > 0).length },
  ]
  return steps.map((s, i) => ({
    ...s,
    pctOfStart: pct(s.count, total),
    pctOfPrev: i === 0 ? (total ? 100 : 0) : pct(s.count, steps[i - 1].count),
  }))
}

function avg(nums) {
  if (!nums.length) return 0
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)
}

export function summarize(visits) {
  const list = visits || []
  const total = list.length
  const count = (fn) => list.filter(fn).length
  return {
    visits: total,
    googleAds: count((v) => v.source === 'google_ads'),
    googleAdsPct: pct(count((v) => v.source === 'google_ads'), total),
    devicePct: Object.fromEntries(DEVICES.map((d) => [d, pct(count((v) => v.device === d), total)])),
    avgEngagedSec: avg(list.map((v) => v.engagedSec)),
    avgScroll: avg(list.map((v) => v.scrollMax)),
    ctaVisits: count((v) => v.cta.length > 0),
    formSubmitVisits: count((v) => v.formSubmit.length > 0),
  }
}

// Tabella per dimensione (source, device o path di ingresso).
export function groupVisits(visits, key) {
  const list = visits || []
  const groups = new Map()
  for (const v of list) {
    const k = v[key]
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(v)
  }
  return [...groups.entries()]
    .map(([k, vs]) => ({
      key: k,
      visits: vs.length,
      pct: pct(vs.length, list.length),
      avgEngagedSec: avg(vs.map((v) => v.engagedSec)),
      avgScroll: avg(vs.map((v) => v.scrollMax)),
      cta: vs.filter((v) => v.cta.length > 0).length,
      formSubmit: vs.filter((v) => v.formSubmit.length > 0).length,
    }))
    .sort((a, b) => b.visits - a.visits || String(a.key).localeCompare(String(b.key)))
}

// ---------------------------------------------------------------------------
// Periodi (fuso orario di Roma)
// ---------------------------------------------------------------------------

export const CAMPAIGN_START_DAY = '2026-11-16'
export const PERIODS = [
  { key: 'oggi', label: 'Oggi' },
  { key: '7g', label: '7 giorni' },
  { key: '30g', label: '30 giorni' },
  { key: 'campagna', label: 'Dal 16 nov' },
]
export const DEFAULT_PERIOD = '7g'

function tzOffsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)
  const get = (t) => Number(parts.find((p) => p.type === t).value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return Math.round((asUtc - date.getTime()) / 60000)
}

// Mezzanotte (ora di Roma) del giorno "YYYY-MM-DD", come Date UTC.
export function romeMidnight(day) {
  const [y, m, d] = day.split('-').map(Number)
  const guess = new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
  const offset = tzOffsetMinutes(guess, 'Europe/Rome')
  return new Date(guess.getTime() - offset * 60000)
}

export function romeDay(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(date)
}

export function periodStart(period, now = new Date()) {
  switch (period) {
    case 'oggi':
      return romeMidnight(romeDay(now))
    case '30g':
      return new Date(now.getTime() - 30 * 86400000)
    case 'campagna':
      return romeMidnight(CAMPAIGN_START_DAY)
    case '7g':
    default:
      return new Date(now.getTime() - 7 * 86400000)
  }
}

export function normalizePeriod(p) {
  return PERIODS.some((x) => x.key === p) ? p : DEFAULT_PERIOD
}

export function normalizeEnv(e, fallback) {
  return ENVS.includes(e) ? e : fallback
}

// ---------------------------------------------------------------------------
// Riepilogo testuale da copiare
// ---------------------------------------------------------------------------

export function buildSummaryText({ periodLabel, env, from, to, summary, funnel, funnelAds, bySource, byPath }) {
  const fmt = (d) => new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit' }).format(d)
  const funnelLine = (f) => f.map((s, i) => (i === 0 ? `${s.count}` : `${s.count} (${s.pctOfStart}%)`)).join(' → ')
  return [
    `I.T. Pulizie – statistiche anonime (${env})`,
    `Periodo: ${periodLabel}, dal ${fmt(from)} al ${fmt(to)}`,
    `Visite: ${summary.visits} · da Google Ads: ${summary.googleAds} (${summary.googleAdsPct}%)`,
    `Dispositivi: mobile ${summary.devicePct.mobile}% · desktop ${summary.devicePct.desktop}% · tablet ${summary.devicePct.tablet}%`,
    `Tempo attivo medio: ${summary.avgEngagedSec}s · scroll medio: ${summary.avgScroll}%`,
    `Funnel (arrivi → scroll ≥50% → click contatto → modulo iniziato → inviato): ${funnelLine(funnel)}`,
    `Funnel Google Ads: ${funnelLine(funnelAds)}`,
    `Sorgenti: ${bySource.map((r) => `${r.key} ${r.visits}`).join(' · ') || '-'}`,
    `Pagine di ingresso: ${byPath.slice(0, 5).map((r) => `${r.key} ${r.visits}`).join(' · ') || '-'}`,
  ].join('\n')
}
