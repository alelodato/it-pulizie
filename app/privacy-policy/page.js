import LegalPage, { LegalH2 } from '@/components/legal/LegalPage'

export const metadata = {
  title: 'Privacy policy',
  description: 'Informativa sul trattamento dei dati personali di I.T. Pulizie ai sensi del Regolamento UE 2016/679 (GDPR).',
  alternates: { canonical: 'https://www.itpulizie.it/privacy-policy' },
}

const linkClass = 'text-[#1f7e9a] underline underline-offset-2 hover:text-blu'

export default function PrivacyPolicy() {
  return (
    <LegalPage label="Informativa" title="Privacy policy." updated="novembre 2026">
      <p>
        Questa informativa descrive come I.T. Pulizie tratta i dati personali di chi visita il sito www.itpulizie.it
        e di chi ci contatta, ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR).
      </p>

      <LegalH2>Titolare del trattamento</LegalH2>
      <p>
        I.T. Pulizie di Ivan Scrofani, Via Sofia, 10 – 00071 Pomezia (RM). Partita IVA IT17237381003.
        Email per le richieste privacy:{' '}
        <a href="mailto:itpulizie.info@gmail.com" className={linkClass}>itpulizie.info@gmail.com</a>.
      </p>

      <LegalH2>Quali dati trattiamo</LegalH2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong className="text-blu">Dati inviati con i moduli di contatto</strong>: nome e cognome, telefono, email,
          ruolo (es. amministratore o condomino), indirizzo o zona dello stabile e il contenuto del messaggio.
        </li>
        <li>
          <strong className="text-blu">Dati di provenienza della visita</strong>: se arrivi da un annuncio, insieme al modulo
          possono essere registrati l&apos;identificativo del clic (gclid) e i parametri della campagna (utm_source,
          utm_medium, utm_campaign, utm_term). Non contengono informazioni su di te, ma ci dicono quale annuncio ha
          generato la richiesta.
        </li>
        <li>
          <strong className="text-blu">Dati raccolti tramite contatto diretto</strong>: numero di telefono e contenuto delle
          conversazioni se ci chiami, ci scrivi su WhatsApp o via email.
        </li>
        <li>
          <strong className="text-blu">Statistiche aggregate delle visite (Vercel Web Analytics)</strong>: pagine visitate,
          sito di provenienza, tipo di dispositivo e browser e paese, raccolti da Vercel Inc. in forma aggregata e anonima,
          senza cookie né identificativi persistenti.
        </li>
        <li>
          <strong className="text-blu">Dati di navigazione e cookie</strong>: descritti nella{' '}
          <a href="/cookie-policy" className={linkClass}>cookie policy</a>.
        </li>
      </ul>

      <LegalH2>Finalità e basi giuridiche</LegalH2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Rispondere alle richieste, organizzare sopralluoghi e preparare preventivi: misure precontrattuali richieste
          dall&apos;interessato (art. 6.1.b GDPR).
        </li>
        <li>
          Misurare l&apos;efficacia del sito e delle campagne pubblicitarie (Google Analytics, Google Ads): solo con il
          tuo consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento.
        </li>
        <li>
          Conoscere in forma aggregata e anonima l&apos;andamento delle visite (Vercel Web Analytics): legittimo interesse
          del titolare a migliorare il sito (art. 6.1.f GDPR), senza cookie né identificativi persistenti.
        </li>
        <li>Adempiere a obblighi di legge, ad esempio fiscali e contabili (art. 6.1.c GDPR).</li>
      </ul>

      <LegalH2>Come vengono trattati e a chi vengono comunicati</LegalH2>
      <p>
        I dati sono trattati con strumenti elettronici dal personale di I.T. Pulizie. Per il funzionamento del sito ci
        avvaliamo di fornitori che agiscono come responsabili del trattamento:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Web3Forms, che inoltra al nostro indirizzo email i messaggi inviati con i moduli;</li>
        <li>il fornitore di hosting del sito;</li>
        <li>Vercel Inc., per la misurazione aggregata delle visite senza cookie (Vercel Web Analytics);</li>
        <li>Google (Tag Manager, Analytics, Ads), solo se presti il consenso ai cookie di analisi e pubblicità;</li>
        <li>Google (Gmail) per la gestione della posta elettronica e Meta (WhatsApp) se ci contatti tramite WhatsApp.</li>
      </ul>
      <p>
        Alcuni di questi fornitori possono trattare dati fuori dall&apos;Unione Europea; in tal caso il trasferimento
        avviene sulla base di decisioni di adeguatezza della Commissione Europea (es. EU-US Data Privacy Framework) o
        di clausole contrattuali standard. I dati non vengono diffusi né venduti.
      </p>

      <LegalH2>Per quanto tempo</LegalH2>
      <p>
        I dati delle richieste di contatto sono conservati per il tempo necessario a gestirle e, se non segue un
        rapporto contrattuale, al massimo per 24 mesi. In caso di contratto, per la durata del rapporto e per i tempi
        previsti dalla legge (10 anni per i documenti contabili). I tempi dei cookie sono indicati nella cookie policy.
      </p>

      <LegalH2>I tuoi diritti</LegalH2>
      <p>
        Puoi chiedere in qualsiasi momento l&apos;accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del
        trattamento, la portabilità e opporti al trattamento (artt. 15-22 GDPR), scrivendo a{' '}
        <a href="mailto:itpulizie.info@gmail.com" className={linkClass}>itpulizie.info@gmail.com</a>. Puoi revocare il
        consenso ai cookie dal link &quot;Preferenze cookie&quot; nel piè di pagina. Hai inoltre diritto di proporre reclamo
        al Garante per la protezione dei dati personali (www.garanteprivacy.it).
      </p>

      <LegalH2>Conferimento dei dati</LegalH2>
      <p>
        I campi contrassegnati con l&apos;asterisco sono necessari per ricontattarti: senza di essi non possiamo dare
        seguito alla richiesta. Gli altri dati sono facoltativi.
      </p>
    </LegalPage>
  )
}
