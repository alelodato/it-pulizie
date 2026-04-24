import SideNav from '@/components/SideNav'
import RevealWrapper from '@/components/RevealWrapper'
import PreventivoForm from '@/components/PreventivoForm'

const servizi = [
  { icon: '🏢', titolo: 'Condomini', desc: 'Pulizia e manutenzione degli spazi comuni, scale, ingressi e aree condominiali con interventi programmati e costanti.' },
  { icon: '🏗️', titolo: 'Post Cantiere', desc: 'Sgrossi e rifiniture dopo lavori edili. Ambienti riconsegnati puliti, sicuri e pronti all\'uso.' },
  { icon: '🏠', titolo: 'Uffici e Ambienti', desc: 'Servizi di pulizia per ambienti di lavoro, con pianificazione su misura e attenzione alle superfici più utilizzate.' },
  { icon: '✨', titolo: 'Pavimentazioni', desc: 'Trattamenti professionali per ogni tipo di pavimento. Pulizia profonda, lucidatura e manutenzione.' },
  { icon: '🌿', titolo: 'Aree Verdi', desc: 'Gestione e manutenzione delle aree verdi condominiali e private. Cura costante degli spazi esterni.' },
  { icon: '🚗', titolo: 'Garage e Aree Esterne', desc: 'Pulizia di garage, parcheggi e spazi esterni con attrezzature e macchinari specifici.' },
]

const distingue = [
  {
    titolo: 'Pianificazione su misura',
    desc: 'Il servizio viene strutturato in base alle caratteristiche reali dello stabile, non su schemi standard.',
  },
  {
    titolo: 'Attrezzature professionali',
    desc: 'Operiamo con macchinari e prodotti professionali, scelti in base al tipo di superficie e all\'ambiente.',
  },
  {
    titolo: 'Personale formato',
    desc: 'Il nostro staff è abituato a operare in contesti diversi, con un approccio flessibile e puntuale.',
  },
]

const contatti = [
  { icon: '📞', label: 'Telefono', value: '+39 333 7382823' },
  { icon: '✉️', label: 'Email', value: 'itpulizie.info@gmail.com' },
  { icon: '📍', label: 'Sede', value: 'Via Sofia, 10 – Pomezia, 00071 (RM)' },
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="wave-animate absolute bottom-[-20px] w-[200%] opacity-35" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4db8d4" d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,200 L0,200 Z" />
            <path fill="#1a3f6f" fillOpacity="0.15" d="M0,120 C300,60 600,160 900,100 C1100,60 1300,140 1440,100 L1440,200 L0,200 Z" />
          </svg>
          <svg className="wave-animate-slow absolute bottom-0 w-[200%] opacity-20" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a8dce9" d="M0,60 C360,120 720,0 1080,80 C1260,120 1380,40 1440,60 L1440,200 L0,200 Z" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 fade-up">
          <div className="inline-flex items-center gap-3 mb-8">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="26" fill="#1a3f6f" />
              <path d="M14 34 C14 24 22 16 26 16 C30 16 38 24 38 34" stroke="#4db8d4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="26" cy="34" rx="6" ry="4" fill="#4db8d4" fillOpacity="0.7" />
              <rect x="23" y="28" width="6" height="10" rx="3" fill="white" />
            </svg>
            <span className="font-heading text-3xl text-blu tracking-wide">I.T. Pulizie</span>
          </div>

          <h1 className="font-heading text-blu leading-[1.1] mb-5" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}>
            Pulizia professionale<br />
            <span className="text-celeste">per condomini,</span><br />
            uffici e ambienti civili.
          </h1>

          <p className="font-body font-light text-site-gray text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Interventi programmati, attrezzature professionali e un servizio costruito
            sulle esigenze reali del tuo spazio. Con sede a Pomezia, operiamo in tutta la provincia di Roma.
          </p>

          <a
            href="#preventivo"
            className="inline-block bg-blu text-white font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:shadow-[0_8px_28px_rgba(77,184,212,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Richiedi una valutazione gratuita
          </a>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="w-full overflow-hidden leading-none" style={{ background: '#f5fafd' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: 'linear-gradient(160deg,#dff3fa,#e8f7fc)' }}>
          <path fill="#f5fafd" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

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
                  Lavoriamo su interventi programmati, con una struttura stabile pensata per mantenere
                  gli spazi in condizioni costanti di ordine e pulizia.
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
          <h2 className="font-heading text-blu leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Cosa facciamo.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map(({ icon, titolo, desc }) => (
              <div
                key={titolo}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(26,63,111,0.07)] border-t-4 border-celeste-light hover:border-celeste hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(26,63,111,0.12)] transition-all duration-300"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading text-blu text-lg mb-2">{titolo}</h3>
                <p className="font-body font-light text-site-gray text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
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
            Siamo a tua disposizione.
          </h2>
          <p className="font-body font-light text-site-gray leading-relaxed mb-10 max-w-lg">
            Contattaci per un sopralluogo o una valutazione senza impegno. Rispondiamo entro poche ore.
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
      <footer className="bg-[#0f2644] text-white/40 text-center py-8 px-6 font-heading text-xs tracking-[0.08em]">
        WWW.ITPULIZIE.IT &nbsp;·&nbsp; Via Sofia, 10 – Pomezia (RM) &nbsp;·&nbsp; © 2025 I.T. Pulizie
      </footer>
    </>
  )
}