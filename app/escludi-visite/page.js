// Pagina per escludere le proprie visite dalle statistiche anonime (flag 'itp_notrack'
// in localStorage, valido solo per questo browser). Non indicizzata.
import ExcludeToggle from '@/components/analytics/ExcludeToggle'

export const metadata = {
  title: 'Escludi le mie visite',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function EscludiVisite() {
  return (
    <main className="min-h-screen bg-site-white px-4 py-10 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)] p-6">
        <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-2">Statistiche anonime</p>
        <h1 className="font-heading text-blu text-2xl mb-3">Escludi le mie visite.</h1>
        <p className="font-body text-sm text-[#44596e] leading-relaxed mb-6">
          Il sito raccoglie statistiche anonime di utilizzo, senza cookie. Da qui puoi escludere le visite fatte da
          questo browser: la scelta vale solo su questo dispositivo e va ripetuta su ogni browser che usi.
        </p>
        <ExcludeToggle />
        <p className="font-body text-xs text-[#5a6e82] mt-6">
          <a href="/" className="text-[#1f7e9a] underline underline-offset-2">Torna al sito</a>
        </p>
      </div>
    </main>
  )
}
