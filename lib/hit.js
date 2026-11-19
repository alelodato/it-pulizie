// Inserimento di un evento anonimo nella tabella landing_events (solo server).
import 'server-only'
import { getSupabaseServer, EVENTS_TABLE } from '@/lib/supabase-server'

// Colonne dell'indice unico: lo stesso evento ripetuto viene ignorato
// (insert ... on conflict do nothing).
const DEDUP_COLUMNS = 'visit_id,event,path,label,value'

// row: evento già validato da validateHit() + env deciso dal server.
// Non lancia mai: in caso di errore scrive nei log SOLO il messaggio di Supabase,
// mai il contenuto dell'evento.
export async function insertHit(row) {
  try {
    const supabase = getSupabaseServer()
    const { error } = await supabase
      .from(EVENTS_TABLE)
      .upsert(row, { onConflict: DEDUP_COLUMNS, ignoreDuplicates: true })
    if (error) {
      console.error('[stats] inserimento non riuscito:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('[stats] inserimento non riuscito:', err && err.message ? err.message : 'errore sconosciuto')
    return false
  }
}
