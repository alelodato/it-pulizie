This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Statistiche anonime (Supabase) e dashboard /statistiche

I visitatori che arrivano dagli annunci spesso rifiutano o ignorano il banner cookie e quindi
non compaiono in GA4. Per avere comunque dati **aggregati e anonimi** su come usano la landing
e il sito, il sito registra pochi eventi in una tabella Supabase e li mostra nella dashboard
privata `/statistiche`.

### Cosa raccoglie (e cosa no)

Per ogni caricamento di pagina il browser genera un `visit_id` casuale (`crypto.randomUUID()`)
tenuto **solo in memoria**: cambia a ogni caricamento e non viene salvato sul dispositivo.
Una visita = un caricamento di pagina.

| Evento | Quando | `label` / `value` |
|---|---|---|
| `pageview` | apertura della pagina | – |
| `scroll` | 25, 50, 75, 100% della pagina (una volta ciascuna) | value = soglia |
| `engaged` | secondi con la pagina visibile e in primo piano (a 15, 30, 60 s e quando la pagina viene nascosta o chiusa) | value = secondi |
| `cta_click` | click su telefono, WhatsApp, email, richiesta preventivo/sopralluogo | label = `tel`, `whatsapp`, `mail`, `preventivo`, `sopralluogo` |
| `form_start` | primo campo del modulo toccato | label = `sopralluogo` (landing) o `preventivo` (home) |
| `form_submit` | invio riuscito del modulo (stesso momento di `generate_lead` per GTM) | label come sopra |

Con ogni evento si salvano solo: pagina (`path`, senza query string), sorgente (`google_ads`,
`google_organic`, `direct`, `social`, `other`, ricavata **nel browser** dalla presenza di
`gclid`/`gbraid`/`wbraid` e dal dominio del referrer), dispositivo (`mobile`, `tablet`,
`desktop`) e l'ambiente (`prod`, `preview`, `dev`, deciso dal server da `VERCEL_ENV`).

**Non** si salvano: IP, user agent, cookie, query string, valore del gclid, referrer completo.
Lo user agent serve solo, sul server, a scartare i bot. Nessun cookie e nessun
sessionStorage; l'unico uso di localStorage è il flag di esclusione `itp_notrack`.
Il tracciamento non dipende dal consenso cookie (non scrive né legge nulla sul dispositivo)
ma rispetta `itp_notrack`. Le pagine `/statistiche` e `/escludi-visite` non vengono tracciate.

File principali:

- `supabase/landing_events.sql` – tabella, vincoli, permessi, indici, pulizia a 14 mesi
- `lib/stats.js` – funzioni pure (bot, dispositivo, sorgente, validazione, aggregazioni), test in `lib/stats.test.mjs` (`npm test`)
- `lib/visit-client.js`, `components/analytics/VisitTracker.js` – lato browser (montato in `app/layout.js`)
- `app/api/v/route.js` – riceve gli eventi (sendBeacon), risponde sempre 204
- `lib/supabase-server.js`, `lib/hit.js`, `lib/stats-data.js` – accesso a Supabase, solo server
- `app/statistiche/` – dashboard, login ed export CSV; `app/escludi-visite/` – esclusione delle proprie visite

### 1. Creare la tabella in Supabase

1. Supabase → progetto (regione UE) → **SQL Editor** → **New query**.
2. Incolla tutto `supabase/landing_events.sql` e premi **Run**. Si può rieseguire senza danni.
3. (Facoltativo) per la pulizia automatica a 14 mesi: **Database → Extensions → pg_cron → Enable**,
   poi togli i commenti al blocco `cron.schedule` in fondo al file ed eseguilo.

**Perché servono i GRANT.** Nei nuovi progetti Supabase le tabelle create nello schema
`public` non sono più esposte automaticamente alla Data API: senza un grant esplicito anche il
ruolo `service_role` (la chiave secret `sb_secret_...` usata dal server) riceve
`permission denied for table landing_events`. Lo script dà a `service_role` solo
`select, insert, delete` sulla tabella e `usage, select` sulla sequenza dell'id, toglie ogni
permesso ad `anon` e `authenticated` e attiva la RLS senza policy, così le chiavi pubbliche
non possono né leggere né scrivere. Se la dashboard mostra "permission denied", riesegui lo script.

### 2. Variabili d'ambiente su Vercel

Project → **Settings → Environment Variables** (per Production e Preview; mai con prefisso `NEXT_PUBLIC_`):

| Variabile | Valore |
|---|---|
| `SUPABASE_URL` | URL base del progetto, es. `https://abcd1234.supabase.co` (senza slash finale e senza `/rest/v1`) |
| `SUPABASE_SERVICE_ROLE_KEY` | chiave **secret** `sb_secret_...` (Project Settings → API Keys) |
| `STATS_PASSWORD` | password della dashboard, almeno 16 caratteri, comoda da scrivere sul telefono |
| `STATS_SECRET` | almeno 32 caratteri casuali: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

Dopo averle salvate serve un nuovo deploy. `@supabase/supabase-js` richiede **Node.js 22**:
controlla in Project → Settings → General → Node.js Version.

### 3. Usare /statistiche

- Apri `https://www.itpulizie.it/statistiche` e inserisci la password. L'accesso resta valido 8 ore
  (cookie di amministrazione httpOnly, firmato con `STATS_SECRET`, che riguarda solo la dashboard).
- Filtri: periodo (oggi, 7 giorni, 30 giorni, dal 16 nov = tutta la campagna) e ambiente
  (di default quello del deploy: produzione sul sito, preview sui preview).
- KPI, funnel (arrivi → scroll ≥ 50% → click contatto → modulo iniziato → modulo inviato),
  tabelle per sorgente, dispositivo e pagina di ingresso, ultime 50 visite.
- **Copia riepilogo** mette negli appunti un testo breve con i numeri principali;
  **Scarica CSV** esporta gli eventi del periodo (`/statistiche/export`, stessa password).
- Se la lettura da Supabase fallisce (tabella mancante, permessi, chiavi, progetto in pausa)
  la pagina mostra l'errore e un suggerimento invece di zeri.
- Le pagine sono `noindex, nofollow`, fuori dalla sitemap e con `Disallow` in `robots.txt`.

### 4. Escludere le proprie visite

Apri `/escludi-visite` da ogni browser che usi (PC e telefono) e premi **Escludi le mie visite**:
imposta `itp_notrack` in localStorage e da quel browser non parte più nessun evento.
Lo stesso pulsante riattiva il conteggio.

### Limiti da sapere

- Supabase restituisce al massimo **1000 righe per richiesta**: dashboard ed export leggono
  sempre a pagine con `.range()` (fino a 200.000 eventi per periodo).
- I progetti Supabase del piano **free vanno in pausa dopo 7 giorni senza attività**: in pausa
  gli eventi non vengono salvati e la dashboard mostra un errore. Si riattiva dal pannello Supabase.
- Una visita = un caricamento di pagina: chi passa dalla landing alla home conta come due visite,
  e la seconda ha sorgente "diretto / interno".
- Gli errori di inserimento compaiono nei log di Vercel con il solo messaggio di Supabase
  (`[stats] inserimento non riuscito: ...`), mai con i dati dell'evento.
