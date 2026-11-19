// Lettura degli eventi per la dashboard e l'export (solo server).
import 'server-only'
import { getSupabaseServer, EVENTS_TABLE } from '@/lib/supabase-server'
import {
  PERIODS,
  buildVisits,
  buildFunnel,
  summarize,
  groupVisits,
  buildSummaryText,
  envFromVercel,
  normalizeEnv,
  normalizePeriod,
  periodStart,
} from '@/lib/stats'

const PAGE_SIZE = 1000 // limite di Supabase per singola richiesta
const MAX_PAGES = 200 // tetto di sicurezza: 200.000 righe per periodo
export const COLUMNS = 'created_at,env,visit_id,event,path,source,device,label,value'

export function currentEnv() {
  return envFromVercel(process.env.VERCEL_ENV)
}

export function resolveFilters(searchParams = {}) {
  const period = normalizePeriod(searchParams.periodo)
  const env = normalizeEnv(searchParams.env, currentEnv())
  const now = new Date()
  return { period, env, from: periodStart(period, now), to: now, periodLabel: PERIODS.find((p) => p.key === period).label }
}

// Legge tutte le righe del periodo, a pagine da 1000 (.range).
// Restituisce { rows, error, truncated } senza mai lanciare.
export async function fetchEvents({ env, from }) {
  try {
    const supabase = getSupabaseServer()
    const rows = []
    for (let page = 0; page < MAX_PAGES; page++) {
      const start = page * PAGE_SIZE
      const { data, error } = await supabase
        .from(EVENTS_TABLE)
        .select(COLUMNS)
        .eq('env', env)
        .gte('created_at', from.toISOString())
        .order('id', { ascending: true })
        .range(start, start + PAGE_SIZE - 1)
      if (error) {
        console.error('[stats] lettura non riuscita:', error.message)
        return { rows: [], error: describeError(error), truncated: false }
      }
      rows.push(...(data || []))
      if (!data || data.length < PAGE_SIZE) return { rows, error: null, truncated: false }
    }
    return { rows, error: null, truncated: true }
  } catch (err) {
    const message = err && err.message ? err.message : 'errore sconosciuto'
    console.error('[stats] lettura non riuscita:', message)
    return { rows: [], error: describeError({ message }), truncated: false }
  }
}

// Messaggio leggibile, con un suggerimento per i casi più comuni.
function describeError(error) {
  const message = String(error.message || error.code || 'errore sconosciuto')
  const lower = message.toLowerCase()
  let hint = ''
  if (lower.includes('permission denied')) {
    hint = 'Mancano i GRANT per service_role: riesegui supabase/landing_events.sql nell’SQL Editor di Supabase.'
  } else if (lower.includes('does not exist') || lower.includes('could not find the table') || error.code === 'PGRST205' || error.code === '42P01') {
    hint = 'La tabella landing_events non esiste: esegui supabase/landing_events.sql nell’SQL Editor di Supabase.'
  } else if (lower.includes('invalid api key') || lower.includes('jwt') || lower.includes('unauthorized') || lower.includes('api key')) {
    hint = 'Chiave non valida: controlla SUPABASE_SERVICE_ROLE_KEY (deve essere la chiave secret sb_secret_...).'
  } else if (lower.includes('supabase_url') || lower.includes('fetch failed') || lower.includes('enotfound')) {
    hint = 'Controlla SUPABASE_URL (URL base del progetto, senza /rest/v1) e che il progetto non sia in pausa.'
  }
  return { message, hint }
}

export function buildDashboard(rows, filters) {
  const visits = buildVisits(rows)
  const adsVisits = visits.filter((v) => v.source === 'google_ads')
  const summary = summarize(visits)
  const funnel = buildFunnel(visits)
  const funnelAds = buildFunnel(adsVisits)
  const bySource = groupVisits(visits, 'source')
  const byDevice = groupVisits(visits, 'device')
  const byPath = groupVisits(visits, 'path')
  const summaryText = buildSummaryText({ ...filters, summary, funnel, funnelAds, bySource, byPath })
  return { visits, summary, funnel, funnelAds, bySource, byDevice, byPath, latest: visits.slice(0, 50), summaryText }
}
