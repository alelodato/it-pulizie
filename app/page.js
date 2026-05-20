import SideNav from '@/components/SideNav'
import RevealWrapper from '@/components/RevealWrapper'
import PreventivoForm from '@/components/PreventivoForm'
import ServiziTabs from '@/components/ServiziTabs'
import Image from 'next/image'

const servizi = [
  { icon: '🏢', titolo: 'Condomini', desc: 'Pulizia e manutenzione condominiale, scale, ingressi e aree condominiali con interventi programmati e costanti.' },
  { icon: '🏗️', titolo: 'Post Cantiere', desc: 'Sgrossi e rifiniture dopo lavori edili. Ambienti riconsegnati puliti, sicuri e pronti all\'uso.' },
  { icon: '🏠', titolo: 'Uffici e Ambienti', desc: 'Servizi di pulizia per ambienti di lavoro, con pianificazione su misura e attenzione alle superfici più utilizzate.' },
  { icon: '✨', titolo: 'Pavimentazioni', desc: 'Trattamenti professionali per ogni tipo di pavimento. Pulizia profonda, lucidatura e manutenzione.' },
  { icon: '🌿', titolo: 'Aree Verdi', desc: 'Gestione e manutenzione delle aree verdi condominiali e private. Cura costante degli spazi esterni.' },
  { icon: '🚗', titolo: 'Garage e Aree Esterne', desc: 'Pulizia di garage, parcheggi e spazi esterni con attrezzature e macchinari specifici.' },
]

const distingue = [
  {
    titolo: 'Pianificazione su misura',
    desc: 'Ogni intervento viene definito in base alle caratteristiche dello stabile, alle frequenze necessarie e alle esigenze specifiche dell’ambiente.',
  },
  {
    titolo: 'Attrezzature professionali',
    desc: 'Utilizziamo prodotti e macchinari professionali selezionati in base alle superfici e al tipo di intervento da eseguire.',
  },
  {
    titolo: 'Personale formato',
    desc: 'Il nostro staff opera con metodo, precisione e continuità, adattandosi a contesti diversi con un approccio pratico e organizzato.',
  },
]

const contatti = [
  { icon: '📞', label: 'Telefono', value: '+39 333 7382823' },
  { icon: '✉️', label: 'Email', value: 'itpulizie.info@gmail.com' },
]

export default function Home() {
  return (
    <>
      <SideNav />

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #dff3fa 0%, #b6e3f0 40%, #e8f7fc 100%)' }}
      >
        {/* Immagine di sfondo */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Pulizia professionale"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Onde SVG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="wave-animate absolute bottom-[-20px] w-[200%] opacity-35" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4db8d4" d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,200 L0,200 Z" />
            <path fill="#1a3f6f" fillOpacity="0.15" d="M0,120 C300,60 600,160 900,100 C1100,60 1300,140 1440,100 L1440,200 L0,200 Z" />
          </svg>
          <svg className="wave-animate-slow absolute bottom-0 w-[200%] opacity-20" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a8dce9" d="M0,60 C360,120 720,0 1080,80 C1260,120 1380,40 1440,60 L1440,200 L0,200 Z" />
          </svg>
        </div>

        {/* Contenuto */}
        <div className="relative z-10 text-center px-6 fade-up">
          <div className="inline-flex items-center gap-3 mb-2">
            <img
              src="/it-pulizie-logo.png"
              alt="I.T. Pulizie logo"
              className="h-48 w-auto"
            />
          </div>

          <h1 className="font-heading text-blu leading-[1.1] mb-5" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}>
            Pulizia professionale<br />
            <span className="text-celeste">per condomini,</span><br />
            uffici e ambienti civili.
          </h1>

          <p className="font-body font-light text-site-gray text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Interventi programmati, attrezzature professionali e un servizio costruito
            sulle esigenze reali del tuo spazio. Operiamo in tutta la provincia di Roma.
          </p>

          <a
            href="#preventivo"
            className="inline-block bg-blu text-white font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 my-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:shadow-[0_8px_28px_rgba(77,184,212,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Richiedi una valutazione gratuita
          </a>
        </div>
      </section>

      {/* CHI SIAMO */}
      <div style={{ background: 'linear-gradient(170deg, #e5f6fb 0%, #f0fafd 100%)' }}>
        <RevealWrapper>
          <section id="chi-siamo" className="max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Chi siamo</p>
                <h2 className="font-heading text-blu leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  Una struttura stabile,<br />un servizio costante.
                </h2>
                <p className="font-body font-light text-site-gray leading-relaxed mb-4">
                  IT Pulizie offre servizi di pulizia professionale per condomini, uffici e ambienti civili.
                  Gestiamo interventi programmati con continuità, mantenendo gli spazi ordinati, puliti e curati nel tempo.
                  Ogni servizio viene organizzato in base alle reali esigenze dello stabile, con attenzione alla puntualità, alla gestione operativa e alla qualità del risultato.
                </p>
                <p className="font-body font-light text-site-gray leading-relaxed">
                  Disponibili per sopralluogo e valutazione senza impegno.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {distingue.map(({ titolo, desc }) => (
                  <div key={titolo} className="border-l-[3px] border-celeste-light pl-5">
                    <strong className="font-heading text-blu block mb-1 text-base">{titolo}</strong>
                    <span className="font-body font-light text-site-gray text-sm leading-relaxed">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealWrapper>
      </div>

      {/* SERVIZI */}
      <RevealWrapper>
        <section id="servizi" className="max-w-5xl mx-auto px-6 py-24">
          <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Servizi</p>
          <h2 className="font-heading text-blu leading-tight mb-10" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Cosa facciamo.
          </h2>
          <ServiziTabs />
        </section>
      </RevealWrapper>

      {/* COME LAVORIAMO */}
      <div style={{ background: 'linear-gradient(170deg, #e5f6fb 0%, #f0fafd 100%)' }}>
        <RevealWrapper>
          <section id="preventivo" className="max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Come lavoriamo</p>
                <h2 className="font-heading text-blu leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  Metodo, precisione<br />e continuità.
                </h2>
              </div>
              <ul className="flex flex-col gap-3 pt-2">
                {[
                  'Interventi programmati',
                  'Pulizia mirata delle zone di passaggio e contatto',
                  'Attenzione alle superfici più utilizzate durante la giornata',
                  'Utilizzo di prodotti professionali adatti agli ambienti civili',
                  'Macchinari specifici per spazi ampi o superfici esterne',
                  'Controllo costante delle condizioni generali degli spazi',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body font-light text-site-gray text-sm leading-relaxed">
                    <span className="text-celeste mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM */}
            <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3 text-center">
              Preventivo gratuito
            </p>
            <h2 className="font-heading text-blu leading-tight mb-10 text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Richiedici una valutazione.
              < br />
              Inserisci le informazioni richieste per ricevere un preventivo gratuito e senza impegno.
            </h2>
            <div className="bg-white rounded-[20px] px-8 py-12 sm:px-12 shadow-[0_8px_40px_rgba(26,63,111,0.1)] max-w-2xl mx-auto">
              <PreventivoForm />
            </div>
          </section>
        </RevealWrapper>
      </div>

      {/* CONTATTI */}
      <RevealWrapper>
        <section id="contatti" className="max-w-5xl mx-auto px-6 py-24">
          <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Contatti</p>
          <h2 className="font-heading text-blu leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Richiedi un sopralluogo o una valutazione.
          </h2>
          <p className="font-body font-light text-site-gray leading-relaxed mb-10 max-w-lg">
            Siamo disponibili per valutare le esigenze dello stabile e organizzare un sopralluogo senza impegno.
            Ti risponderemo nel più breve tempo possibile con tutte le informazioni necessarie.
          </p>
          <div className="flex flex-wrap gap-9">
            {contatti.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #a8dce9, #4db8d4)' }}
                >
                  {icon}
                </div>
                <div>
                  <strong className="font-heading text-[0.72rem] tracking-[0.1em] uppercase text-celeste block mb-0.5">
                    {label}
                  </strong>
                  <span className="font-body text-site-gray text-sm">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealWrapper>

      {/* LAVORA CON NOI */}
      <div className="bg-blu">
        <RevealWrapper>
          <section id="lavora" className="max-w-5xl mx-auto px-6 py-24">
            <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste-light mb-3">
              Lavora con noi
            </p>
            <h2 className="font-heading text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Entra nel nostro team.
            </h2>
            <p className="font-body font-light text-white/70 leading-relaxed max-w-lg mb-10">
              Cerchiamo persone affidabili, precise e motivate. Se vuoi far parte di una realtà seria
              e strutturata, inviaci il tuo curriculum — ti contatteremo appena possibile.
            </p>
            <a
              href="mailto:itpulizie.info@gmail.com"
              className="inline-block bg-celeste text-blu font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(77,184,212,0.3)] hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Manda il tuo CV →
            </a>
          </section>
        </RevealWrapper>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0f2644] text-white/40 text-center pb-8 px-6 font-heading text-xs tracking-[0.08em]">
        <img
          src="/it-pulizie-logo2.png"
          alt="I.T. Pulizie"
          className="h-60 w-auto mx-auto opacity-60"
        />
        WWW.ITPULIZIE.IT &nbsp;·&nbsp; Via Sofia, 10 – Pomezia (RM) &nbsp;·&nbsp; ©️ 2026 I.T. Pulizie
      </footer>
    </>
  )
}