// BOZZA DA VALIDARE: testo di partenza redatto sui cookie effettivamente usati
// (GTM, GA4, Google Ads, preferenza di consenso). Va verificato dalla titolare
// o da un consulente privacy prima della pubblicazione e aggiornato se in GTM
// vengono aggiunti altri strumenti.
import LegalPage, { LegalH2 } from '@/components/legal/LegalPage'
import CookiePreferencesLink from '@/components/consent/CookiePreferencesLink'

export const metadata = {
  title: 'Cookie policy',
  description: 'Informativa sui cookie e sugli strumenti di tracciamento usati dal sito di I.T. Pulizie.',
  alternates: { canonical: 'https://www.itpulizie.it/cookie-policy' },
}

const linkClass = 'text-[#1f7e9a] underline underline-offset-2 hover:text-blu'
const thClass = 'text-left font-heading text-[0.7rem] tracking-[0.12em] uppercase text-blu px-3 py-2 bg-[#e5f6fb]'
const tdClass = 'align-top px-3 py-2 border-t border-celeste-light/60'

const TECNICI = [
  ['itp_consent_v1', 'I.T. Pulizie (memoria locale del browser)', 'Ricorda la tua scelta sui cookie', 'Finché non la cancelli o cambi scelta'],
]

const ANALISI_PUBBLICITA = [
  ['_ga, _ga_*', 'Google Analytics 4', 'Statistiche aggregate sulle visite e sulle richieste inviate', 'Fino a 2 anni'],
  ['_gcl_au, _gcl_aw, _gcl_gs', 'Google Ads (Linker conversioni)', "Collegano una richiesta all'annuncio da cui sei arrivato", 'Fino a 90 giorni'],
  ['Cookie di Google Ads (es. IDE, test_cookie)', 'Google', 'Misurazione delle conversioni degli annunci', 'Fino a 13 mesi'],
]

function CookieTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-celeste-light/60 bg-white">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr>
            <th className={thClass}>Nome</th>
            <th className={thClass}>Fornitore</th>
            <th className={thClass}>Finalità</th>
            <th className={thClass}>Durata</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i} className={tdClass}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CookiePolicy() {
  return (
    <LegalPage label="Informativa" title="Cookie policy." updated="novembre 2026">
      <p>
        Questa pagina spiega quali cookie e strumenti simili usa il sito www.itpulizie.it, gestito da I.T. Pulizie,
        Via Sofia, 10 – Pomezia (RM). Per il resto del trattamento dei dati vedi la{' '}
        <a href="/privacy-policy" className={linkClass}>privacy policy</a>.
      </p>

      <LegalH2>Cookie tecnici</LegalH2>
      <p>
        Sono necessari al funzionamento del sito e a ricordare la tua scelta sui cookie. Non richiedono consenso.
      </p>
      <CookieTable rows={TECNICI} />

      <LegalH2>Cookie di analisi e pubblicità</LegalH2>
      <p>
        Vengono attivati <strong className="text-blu">solo se clicchi &quot;Accetta&quot;</strong> nel banner. Li usiamo per
        capire come arrivano le richieste di contatto e quali annunci Google funzionano. Sono gestiti tramite Google Tag
        Manager, che di per sé non installa cookie.
      </p>
      <CookieTable rows={ANALISI_PUBBLICITA} />
      <p>
        Usiamo la modalità di consenso di Google (Consent Mode v2): finché non accetti, i servizi Google non salvano
        cookie sul tuo dispositivo e ricevono solo segnali anonimi e privi di identificativi. Se arrivi da un annuncio,
        l&apos;identificativo del clic può restare nell&apos;indirizzo delle pagine del sito per attribuire la richiesta in forma
        aggregata. Maggiori informazioni:{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={linkClass}>
          come Google usa i dati dei siti partner
        </a>.
      </p>

      <LegalH2>Come cambiare la tua scelta</LegalH2>
      <p>
        Puoi cambiare o revocare il consenso in qualsiasi momento da qui oppure dal link &quot;Preferenze cookie&quot; nel
        piè di pagina:
      </p>
      <p>
        <CookiePreferencesLink className="inline-block bg-blu text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-celeste transition-colors" />
      </p>
      <p>
        Puoi anche cancellare o bloccare i cookie dalle impostazioni del browser. La chiusura del banner con la X
        equivale al rifiuto dei cookie non necessari.
      </p>
    </LegalPage>
  )
}
