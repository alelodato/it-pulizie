// Client Supabase SOLO lato server (route /api/v, pagina /statistiche, export CSV).
// Usa la chiave secret (sb_secret_...) che bypassa la RLS: non deve mai finire nel
// browser. "server-only" fa fallire la build se un componente client lo importa.
import 'server-only'
import { createClient } from '@supabase/supabase-js'

let client = null

export class SupabaseConfigError extends Error {}

export function getSupabaseServer() {
  if (client) return client

  const url = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '')
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

  if (!url || !key) {
    throw new SupabaseConfigError('Variabili SUPABASE_URL e/o SUPABASE_SERVICE_ROLE_KEY non impostate.')
  }
  if (/\/rest\/v1$/.test(url)) {
    throw new SupabaseConfigError('SUPABASE_URL deve essere l’URL base del progetto, senza /rest/v1.')
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-client-info': 'itpulizie-stats' } },
  })
  return client
}

export const EVENTS_TABLE = 'landing_events'
