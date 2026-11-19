// Dashboard privata delle statistiche anonime.
// Protetta da password (STATS_PASSWORD) e cookie di amministrazione firmato (STATS_SECRET).
// noindex/nofollow, esclusa da sitemap e con Disallow in robots.txt.
import { isAuthenticated, authConfigProblem } from '@/lib/stats-auth'
import { resolveFilters, fetchEvents, buildDashboard } from '@/lib/stats-data'
import { PERIODS, ENVS } from '@/lib/stats'
import LoginForm from './LoginForm'
import CopySummary from './CopySummary'
import { logout } from './actions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Statistiche',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const SOURCE_NAMES = {
  google_ads: 'Google Ads',
  google_organic: 'Google organico',
  direct: 'Diretto / interno',
  social: 'Social',
  other: 'Altri siti',
}
const DEVICE_NAMES = { mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' }
const ENV_NAMES = { prod: 'Produzione', preview: 'Preview', dev: 'Sviluppo' }

const card = 'bg-white rounded-2xl border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)]'
const h2 = 'font-heading text-blu text-lg mb-3'

function fmtTime(iso) {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

function fmtDay(date) {
  return new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', day: '2-digit', month: 'short' }).format(date)
}

function filterHref(filters, change) {
  const p = new URLSearchParams({ periodo: filters.period, env: filters.env, ...change })
  return `/statistiche?${p.toString()}`
}

function Shell({ children }) {
  return (
    <main className="min-h-screen bg-site-white px-4 py-6 sm:px-6 lg:py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">{children}</div>
    </main>
  )
}

function Login({ configProblem }) {
  return (
    <Shell>
      <div className={`${card} p-6 max-w-sm w-full mx-auto mt-10`}>
        <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-2">Area riservata</p>
        <h1 className="font-heading text-blu text-2xl mb-5">Statistiche.</h1>
        <LoginForm configProblem={configProblem} />
      </div>
    </Shell>
  )
}

function Kpi({ label, value, sub }) {
  return (
    <div className={`${card} p-4`}>
      <p className="font-heading text-[0.65rem] tracking-[0.14em] uppercase text-[#1f7e9a] mb-1">{label}</p>
      <p className="font-heading text-blu text-2xl leading-tight">{value}</p>
      {sub && <p className="font-body text-xs text-[#5a6e82] mt-1">{sub}</p>}
    </div>
  )
}

function Funnel({ title, steps }) {
  return (
    <section className={`${card} p-4 sm:p-5`}>
      <h2 className={h2}>{title}</h2>
      <ol className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <li key={s.key}>
            <div className="flex items-baseline justify-between gap-3 font-body text-sm">
              <span className="text-blu font-semibold">{s.label}</span>
              <span className="text-[#44596e] whitespace-nowrap">
                <strong className="text-blu">{s.count}</strong>
                {i > 0 && <> · {s.pctOfStart}%</>}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[#e5f6fb] mt-1 overflow-hidden">
              <div className="h-full rounded-full bg-[#1f7e9a]" style={{ width: `${Math.max(s.pctOfStart, s.count > 0 ? 2 : 0)}%` }} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function GroupTable({ title, rows, names, keyLabel }) {
  return (
    <section className={`${card} p-4 sm:p-5`}>
      <h2 className={h2}>{title}</h2>
      {rows.length === 0 ? (
        <p className="font-body text-sm text-[#5a6e82]">Nessun dato nel periodo.</p>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm font-body min-w-[420px]">
            <thead>
              <tr className="text-left text-[0.65rem] font-heading tracking-[0.1em] uppercase text-[#1f7e9a]">
                <th className="px-1 py-2">{keyLabel}</th>
                <th className="px-1 py-2 text-right">Visite</th>
                <th className="px-1 py-2 text-right">%</th>
                <th className="px-1 py-2 text-right">Sec.</th>
                <th className="px-1 py-2 text-right">Scroll</th>
                <th className="px-1 py-2 text-right">Click</th>
                <th className="px-1 py-2 text-right">Moduli</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-t border-celeste-light/50 text-[#44596e]">
                  <td className="px-1 py-2 text-blu font-semibold break-all">{names ? names[r.key] || r.key : r.key}</td>
                  <td className="px-1 py-2 text-right">{r.visits}</td>
                  <td className="px-1 py-2 text-right">{r.pct}%</td>
                  <td className="px-1 py-2 text-right">{r.avgEngagedSec}</td>
                  <td className="px-1 py-2 text-right">{r.avgScroll}%</td>
                  <td className="px-1 py-2 text-right">{r.cta}</td>
                  <td className="px-1 py-2 text-right">{r.formSubmit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default async function StatistichePage({ searchParams }) {
  const configProblem = authConfigProblem()
  if (configProblem || !isAuthenticated()) return <Login configProblem={configProblem} />

  const filters = resolveFilters(searchParams)
  const { rows, error, truncated } = await fetchEvents(filters)
  const d = error ? null : buildDashboard(rows, filters)
  const exportHref = `/statistiche/export?${new URLSearchParams({ periodo: filters.period, env: filters.env }).toString()}`

  return (
    <Shell>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-1">Statistiche anonime</p>
          <h1 className="font-heading text-blu text-2xl leading-tight">I.T. Pulizie.</h1>
          <p className="font-body text-sm text-[#5a6e82] mt-1">
            {ENV_NAMES[filters.env]} · dal {fmtDay(filters.from)} a oggi
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="font-body text-sm text-[#1f7e9a] underline underline-offset-2 px-2 py-2">
            Esci
          </button>
        </form>
      </header>

      <nav aria-label="Filtri" className="flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PERIODS.map((p) => (
            <a
              key={p.key}
              href={filterHref(filters, { periodo: p.key })}
              aria-current={p.key === filters.period ? 'true' : undefined}
              className={
                p.key === filters.period
                  ? 'whitespace-nowrap bg-blu text-white font-body font-semibold text-sm px-4 py-2 rounded-full'
                  : 'whitespace-nowrap bg-white text-blu border border-celeste-light font-body text-sm px-4 py-2 rounded-full'
              }
            >
              {p.label}
            </a>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ENVS.map((e) => (
            <a
              key={e}
              href={filterHref(filters, { env: e })}
              aria-current={e === filters.env ? 'true' : undefined}
              className={
                e === filters.env
                  ? 'whitespace-nowrap bg-[#1f7e9a] text-white font-body font-semibold text-xs px-3 py-1.5 rounded-full'
                  : 'whitespace-nowrap bg-white text-[#1f7e9a] border border-celeste-light font-body text-xs px-3 py-1.5 rounded-full'
              }
            >
              {ENV_NAMES[e]}
            </a>
          ))}
        </div>
      </nav>

      {error && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-800">
          <p className="font-semibold mb-1">Impossibile leggere le statistiche da Supabase.</p>
          <p className="break-words">
            Errore: <code className="bg-white/70 rounded px-1">{error.message}</code>
          </p>
          {error.hint && <p className="mt-2">{error.hint}</p>}
        </div>
      )}

      {d && (
        <>
          {truncated && (
            <p role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-3 font-body text-sm text-amber-900">
              Il periodo contiene troppi eventi: sono mostrati solo i primi 200.000. Scegli un periodo più breve.
            </p>
          )}

          <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <Kpi label="Visite" value={d.summary.visits} />
            <Kpi label="Da Google Ads" value={d.summary.googleAds} sub={`${d.summary.googleAdsPct}% delle visite`} />
            <Kpi
              label="Dispositivi"
              value={`${d.summary.devicePct.mobile}% mob.`}
              sub={`desktop ${d.summary.devicePct.desktop}% · tablet ${d.summary.devicePct.tablet}%`}
            />
            <Kpi label="Tempo attivo medio" value={`${d.summary.avgEngagedSec} s`} />
            <Kpi label="Scroll medio" value={`${d.summary.avgScroll}%`} />
          </section>

          <div className="flex gap-3">
            <CopySummary text={d.summaryText} />
            <a
              href={exportHref}
              className="flex-1 text-center bg-white text-blu border border-blu/20 font-body font-semibold text-sm px-5 py-3 rounded-full hover:border-celeste transition-colors"
            >
              Scarica CSV
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Funnel title="Funnel – tutte le visite" steps={d.funnel} />
            <Funnel title="Funnel – Google Ads" steps={d.funnelAds} />
          </div>

          <GroupTable title="Per sorgente" rows={d.bySource} names={SOURCE_NAMES} keyLabel="Sorgente" />
          <GroupTable title="Per dispositivo" rows={d.byDevice} names={DEVICE_NAMES} keyLabel="Dispositivo" />
          <GroupTable title="Per pagina di ingresso" rows={d.byPath} keyLabel="Pagina" />

          <section className={`${card} p-4 sm:p-5`}>
            <h2 className={h2}>Ultime 50 visite</h2>
            {d.latest.length === 0 ? (
              <p className="font-body text-sm text-[#5a6e82]">Nessuna visita nel periodo.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-celeste-light/50">
                {d.latest.map((v) => (
                  <li key={v.visit_id} className="py-2.5 font-body text-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-blu font-semibold break-all">{v.path}</span>
                      <span className="text-[#5a6e82] text-xs whitespace-nowrap">{fmtTime(v.start)}</span>
                    </div>
                    <p className="text-[#44596e] text-xs mt-0.5">
                      {DEVICE_NAMES[v.device] || v.device} · {SOURCE_NAMES[v.source] || v.source} · scroll {v.scrollMax}% · {v.engagedSec} s
                    </p>
                    {v.events.length > 0 && <p className="text-[#1f7e9a] text-xs mt-0.5">{v.events.join(' · ')}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="font-body text-xs text-[#5a6e82]">
            Una visita = un caricamento di pagina. Dati anonimi: nessun cookie, IP o identificativo persistente.
          </p>
        </>
      )}
    </Shell>
  )
}
