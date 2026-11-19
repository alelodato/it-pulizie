-- =============================================================================
-- I.T. Pulizie – statistiche anonime di utilizzo del sito
-- Tabella: public.landing_events
--
-- Come si usa: Supabase > SQL Editor > New query > incolla tutto il file > Run.
-- Lo script si può rieseguire: crea solo ciò che non esiste e riapplica i permessi.
--
-- PRIVACY (scelte vincolanti)
-- - Nessun dato personale: niente IP, user agent, query string, valore del gclid,
--   referrer completo, cookie o identificativi persistenti.
-- - visit_id è un UUID casuale generato nel browser e tenuto solo in memoria:
--   cambia a ogni caricamento di pagina, quindi non permette di riconoscere
--   la stessa persona tra una visita e l'altra.
-- - source è solo una categoria (google_ads, google_organic, direct, social, other)
--   ricavata nel browser; il referrer e il gclid non arrivano mai al server.
-- - env è deciso dal server (VERCEL_ENV), non dal browser.
-- - I CHECK sotto rifiutano qualunque valore fuori dalla whitelist, così anche
--   una chiamata manipolata non può scrivere testo libero nella tabella.
-- - Conservazione: massimo 14 mesi (vedi job pg_cron commentato in fondo).
-- =============================================================================

create table if not exists public.landing_events (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  env        text not null check (env in ('prod', 'preview', 'dev')),
  visit_id   text not null check (visit_id ~ '^[a-zA-Z0-9-]{8,40}$'),
  event      text not null check (event in ('pageview', 'scroll', 'engaged', 'cta_click', 'form_start', 'form_submit')),
  path       text not null check (left(path, 1) = '/' and char_length(path) <= 200),
  source     text not null check (source in ('google_ads', 'google_organic', 'direct', 'social', 'other')),
  device     text not null check (device in ('mobile', 'tablet', 'desktop')),
  label      text not null default '' check (char_length(label) <= 40),
  value      integer not null default 0 check (value between 0 and 86400)
);

-- PERMESSI
-- Nei nuovi progetti Supabase le tabelle create nello schema public NON sono più
-- esposte automaticamente alla Data API (PostgREST). Senza un GRANT esplicito anche
-- il ruolo service_role, cioè la chiave secret "sb_secret_..." usata dal server,
-- riceve "permission denied for table landing_events".
-- Il sito accede alla tabella SOLO dal server (route /api/v e pagina /statistiche)
-- con la chiave secret: diamo quindi i permessi minimi solo a service_role.
--   - insert: per registrare gli eventi
--   - select: per la dashboard e per l'export CSV
--   - delete: per la pulizia dei dati vecchi
-- La sequenza dell'identity serve per generare gli id durante l'insert.
grant select, insert, delete on public.landing_events to service_role;
grant usage, select on sequence public.landing_events_id_seq to service_role;

-- anon e authenticated (le chiavi pubbliche) non devono poter né leggere né scrivere.
-- NON dare grant a questi ruoli.
revoke all on public.landing_events from anon, authenticated;
revoke all on sequence public.landing_events_id_seq from anon, authenticated;

-- RLS attiva SENZA policy: per anon e authenticated ogni accesso è negato anche se
-- in futuro qualcuno concedesse dei grant per errore. service_role ignora la RLS
-- per progettazione, quindi il server continua a funzionare.
alter table public.landing_events enable row level security;

-- INDICI
-- L'indice unico rende gli eventi idempotenti: lo stesso evento della stessa visita
-- (stessa pagina, etichetta e valore) inviato due volte viene ignorato grazie a
-- "insert ... on conflict do nothing" (upsert con ignoreDuplicates nel codice).
create unique index if not exists landing_events_dedup_idx
  on public.landing_events (visit_id, event, path, label, value);

create index if not exists landing_events_created_at_idx
  on public.landing_events (created_at);

create index if not exists landing_events_env_created_at_idx
  on public.landing_events (env, created_at);

-- CONSERVAZIONE (facoltativo, da attivare a mano)
-- Cancella ogni notte le righe più vecchie di 14 mesi. Richiede l'estensione
-- pg_cron: Supabase > Database > Extensions > pg_cron > Enable.
-- Poi togli i commenti alle righe qui sotto ed esegui solo quel blocco.
--
-- select cron.schedule(
--   'landing_events_retention_14_mesi',
--   '15 3 * * *',
--   $$ delete from public.landing_events where created_at < now() - interval '14 months' $$
-- );
--
-- Per disattivarlo:
-- select cron.unschedule('landing_events_retention_14_mesi');
