// Test delle funzioni pure delle statistiche anonime. Esecuzione: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isBot,
  classifyDevice,
  classifySource,
  validateHit,
  buildVisits,
  buildFunnel,
  summarize,
  groupVisits,
  envFromVercel,
  periodStart,
  romeMidnight,
  buildSummaryText,
  normalizePeriod,
} from './stats.js'

const CHROME_ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36'
const SAFARI_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1'
const INSTAGRAM_INAPP = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0'

test('isBot: browser reali non sono bot', () => {
  for (const ua of [CHROME_ANDROID, SAFARI_IPHONE, INSTAGRAM_INAPP, 'Mozilla/5.0 (Linux; Android 10; Cubot X30) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36']) {
    assert.equal(isBot(ua), false, ua)
  }
})

test('isBot: crawler, strumenti e UA vuoti sono bot', () => {
  for (const ua of [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'AdsBot-Google (+http://www.google.com/adsbot.html)',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/130.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Mobile Safari/537.36 Chrome-Lighthouse',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'curl/8.5.0',
    'python-requests/2.31.0',
    'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    '',
    undefined,
  ]) {
    assert.equal(isBot(ua), true, String(ua))
  }
})

test('classifyDevice', () => {
  assert.equal(classifyDevice({ width: 390, height: 844, coarsePointer: true }), 'mobile')
  assert.equal(classifyDevice({ width: 844, height: 390, coarsePointer: true }), 'mobile') // telefono in orizzontale
  assert.equal(classifyDevice({ width: 820, height: 1180, coarsePointer: true }), 'tablet')
  assert.equal(classifyDevice({ width: 1440, height: 900, coarsePointer: false }), 'desktop')
  assert.equal(classifyDevice({ width: 1920, height: 1080, coarsePointer: true }), 'tablet') // schermo touch grande
  assert.equal(classifyDevice({ width: 600, height: 900, coarsePointer: false }), 'mobile')
  assert.equal(classifyDevice({}), 'desktop')
})

test('classifySource', () => {
  const host = 'www.itpulizie.it'
  assert.equal(classifySource({ search: '?gclid=abc123', referrer: 'https://www.google.com/', host }), 'google_ads')
  assert.equal(classifySource({ search: '?utm_source=x&gbraid=xyz', host }), 'google_ads')
  assert.equal(classifySource({ search: '?gclid=', referrer: 'https://www.google.it/', host }), 'google_organic')
  assert.equal(classifySource({ referrer: 'https://www.google.it/', host }), 'google_organic')
  assert.equal(classifySource({ referrer: 'https://www.google.co.uk/', host }), 'google_organic')
  assert.equal(classifySource({ referrer: 'https://www.googleadservices.com/pagead/aclk', host }), 'google_ads')
  assert.equal(classifySource({ referrer: '', host }), 'direct')
  assert.equal(classifySource({ referrer: 'not a url', host }), 'direct')
  assert.equal(classifySource({ referrer: 'https://www.itpulizie.it/pulizie-condominiali-roma-sud', host }), 'direct')
  assert.equal(classifySource({ referrer: 'https://itpulizie.it/', host }), 'direct')
  assert.equal(classifySource({ referrer: 'https://l.facebook.com/', host }), 'social')
  assert.equal(classifySource({ referrer: 'https://www.instagram.com/', host }), 'social')
  assert.equal(classifySource({ referrer: 'https://www.bing.com/', host }), 'other')
  assert.equal(classifySource({ referrer: 'https://notgoogle.com/', host }), 'other')
  assert.equal(classifySource(), 'direct')
})

const base = { visit_id: 'b3f1c2d4-1111-4222-8333-944455556666', path: '/pulizie-condominiali-roma-sud', source: 'google_ads', device: 'mobile' }

test('validateHit: eventi validi vengono normalizzati', () => {
  assert.deepEqual(validateHit({ ...base, event: 'pageview', label: 'x', value: 99 }), { ...base, event: 'pageview', label: '', value: 0 })
  assert.deepEqual(validateHit({ ...base, event: 'scroll', value: 50 }), { ...base, event: 'scroll', label: '', value: 50 })
  assert.deepEqual(validateHit({ ...base, event: 'engaged', value: 15.4 }), { ...base, event: 'engaged', label: '', value: 15 })
  assert.deepEqual(validateHit({ ...base, event: 'cta_click', label: ' TEL ' }), { ...base, event: 'cta_click', label: 'tel', value: 0 })
  assert.deepEqual(validateHit({ ...base, event: 'form_submit', label: 'sopralluogo' }), { ...base, event: 'form_submit', label: 'sopralluogo', value: 0 })
  assert.equal(validateHit({ ...base, path: '/?gclid=SEGRETO#x', event: 'pageview' }).path, '/')
})

test('validateHit: tutto ciò che è fuori whitelist viene scartato', () => {
  const bad = [
    null, 'stringa', [], {},
    { ...base, event: 'click' },
    { ...base, event: 'pageview', visit_id: 'corto' },
    { ...base, event: 'pageview', visit_id: 'ha spazi e simboli!!' },
    { ...base, event: 'pageview', path: 'senza-slash' },
    { ...base, event: 'pageview', path: '/' + 'a'.repeat(250) },
    { ...base, event: 'pageview', path: '/<script>' },
    { ...base, event: 'pageview', path: '/statistiche' },
    { ...base, event: 'pageview', path: '/statistiche/export' },
    { ...base, event: 'pageview', path: '/escludi-visite' },
    { ...base, event: 'pageview', source: 'bing' },
    { ...base, event: 'pageview', device: 'tv' },
    { ...base, event: 'scroll', value: 33 },
    { ...base, event: 'engaged', value: 0 },
    { ...base, event: 'engaged', value: 90000 },
    { ...base, event: 'engaged', value: 'tanti' },
    { ...base, event: 'cta_click', label: 'mario.rossi@example.com' },
    { ...base, event: 'cta_click', label: '' },
    { ...base, event: 'form_start', label: 'tel' },
  ]
  for (const b of bad) assert.equal(validateHit(b), null, JSON.stringify(b))
})

test('validateHit non accetta campi extra (es. env dal client)', () => {
  const v = validateHit({ ...base, event: 'pageview', env: 'prod', ip: '1.2.3.4', gclid: 'x' })
  assert.deepEqual(Object.keys(v).sort(), ['device', 'event', 'label', 'path', 'source', 'value', 'visit_id'])
})

test('envFromVercel', () => {
  assert.equal(envFromVercel('production'), 'prod')
  assert.equal(envFromVercel('preview'), 'preview')
  assert.equal(envFromVercel('development'), 'dev')
  assert.equal(envFromVercel(undefined), 'dev')
})

const row = (visit, t, event, extra = {}) => ({
  visit_id: visit,
  created_at: `2026-11-18T10:00:${String(t).padStart(2, '0')}Z`,
  event,
  path: '/pulizie-condominiali-roma-sud',
  source: 'google_ads',
  device: 'mobile',
  label: '',
  value: 0,
  ...extra,
})

const ROWS = [
  // visita A: arriva da Ads, scrolla fino in fondo, clicca telefono e invia il modulo
  row('visit-aaaa', 1, 'pageview'),
  row('visit-aaaa', 2, 'scroll', { value: 25 }),
  row('visit-aaaa', 3, 'scroll', { value: 50 }),
  row('visit-aaaa', 4, 'scroll', { value: 100 }),
  row('visit-aaaa', 5, 'engaged', { value: 15 }),
  row('visit-aaaa', 6, 'engaged', { value: 42 }),
  row('visit-aaaa', 7, 'cta_click', { label: 'tel' }),
  row('visit-aaaa', 8, 'form_start', { label: 'sopralluogo' }),
  row('visit-aaaa', 9, 'form_submit', { label: 'sopralluogo' }),
  // visita B: arriva in home da desktop, scrolla al 25% e se ne va
  row('visit-bbbb', 10, 'pageview', { path: '/', source: 'direct', device: 'desktop' }),
  row('visit-bbbb', 11, 'scroll', { path: '/', source: 'direct', device: 'desktop', value: 25 }),
  row('visit-bbbb', 12, 'engaged', { path: '/', source: 'direct', device: 'desktop', value: 8 }),
  // visita C: Ads, scroll 50, inizia il modulo ma non lo invia
  row('visit-cccc', 13, 'pageview'),
  row('visit-cccc', 14, 'scroll', { value: 50 }),
  row('visit-cccc', 15, 'form_start', { label: 'sopralluogo' }),
]

test('buildVisits raggruppa per visit_id', () => {
  const visits = buildVisits(ROWS)
  assert.equal(visits.length, 3)
  assert.equal(visits[0].visit_id, 'visit-cccc') // più recente per prima
  const a = visits.find((v) => v.visit_id === 'visit-aaaa')
  assert.equal(a.scrollMax, 100)
  assert.equal(a.engagedSec, 42)
  assert.deepEqual(a.cta, ['tel'])
  assert.deepEqual(a.formSubmit, ['sopralluogo'])
  assert.deepEqual(a.events, ['click tel', 'modulo sopralluogo iniziato', 'modulo sopralluogo inviato'])
  const b = visits.find((v) => v.visit_id === 'visit-bbbb')
  assert.equal(b.path, '/')
  assert.equal(b.device, 'desktop')
  assert.equal(b.source, 'direct')
  assert.equal(b.scrollMax, 25)
})

test('buildVisits: le righe fuori ordine danno lo stesso risultato', () => {
  assert.deepEqual(buildVisits([...ROWS].reverse()), buildVisits(ROWS))
})

test('buildFunnel conta i passaggi e le percentuali', () => {
  const f = buildFunnel(buildVisits(ROWS))
  assert.deepEqual(f.map((s) => [s.key, s.count, s.pctOfStart]), [
    ['arrivi', 3, 100],
    ['scroll50', 2, 66.7],
    ['cta', 1, 33.3],
    ['form_start', 2, 66.7],
    ['form_submit', 1, 33.3],
  ])
  assert.equal(f[4].pctOfPrev, 50)
  assert.deepEqual(buildFunnel([]).map((s) => s.count), [0, 0, 0, 0, 0])
  assert.equal(buildFunnel([])[1].pctOfStart, 0)
})

test('summarize e groupVisits', () => {
  const visits = buildVisits(ROWS)
  const s = summarize(visits)
  assert.equal(s.visits, 3)
  assert.equal(s.googleAds, 2)
  assert.equal(s.googleAdsPct, 66.7)
  assert.deepEqual(s.devicePct, { mobile: 66.7, tablet: 0, desktop: 33.3 })
  assert.equal(s.avgEngagedSec, Math.round((42 + 8 + 0) / 3))
  assert.equal(s.avgScroll, Math.round((100 + 25 + 50) / 3))
  const bySource = groupVisits(visits, 'source')
  assert.deepEqual(bySource.map((r) => [r.key, r.visits, r.formSubmit]), [['google_ads', 2, 1], ['direct', 1, 0]])
  assert.deepEqual(summarize([]).devicePct, { mobile: 0, tablet: 0, desktop: 0 })
})

test('periodi nel fuso di Roma', () => {
  assert.equal(romeMidnight('2026-11-16').toISOString(), '2026-11-15T23:00:00.000Z') // ora solare
  assert.equal(romeMidnight('2026-07-01').toISOString(), '2026-06-30T22:00:00.000Z') // ora legale
  const now = new Date('2026-11-19T00:30:00Z') // 01:30 a Roma
  assert.equal(periodStart('oggi', now).toISOString(), '2026-11-18T23:00:00.000Z')
  assert.equal(periodStart('7g', now).toISOString(), '2026-11-12T00:30:00.000Z')
  assert.equal(periodStart('campagna', now).toISOString(), '2026-11-15T23:00:00.000Z')
  assert.equal(normalizePeriod('boh'), '7g')
})

test('buildSummaryText contiene i numeri principali', () => {
  const visits = buildVisits(ROWS)
  const text = buildSummaryText({
    periodLabel: '7 giorni',
    env: 'prod',
    from: new Date('2026-11-12T00:00:00Z'),
    to: new Date('2026-11-19T00:00:00Z'),
    summary: summarize(visits),
    funnel: buildFunnel(visits),
    funnelAds: buildFunnel(visits.filter((v) => v.source === 'google_ads')),
    bySource: groupVisits(visits, 'source'),
    byPath: groupVisits(visits, 'path'),
  })
  assert.match(text, /Visite: 3 · da Google Ads: 2 \(66.7%\)/)
  assert.match(text, /Funnel Google Ads: 2 → 2 \(100%\) → 1 \(50%\) → 2 \(100%\) → 1 \(50%\)/)
})
