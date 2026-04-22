import SideNav from '@/components/SideNav'
import RevealWrapper from '@/components/RevealWrapper'
import PreventivoForm from '@/components/PreventivoForm'

const servizi = [
  { icon: '🏢', titolo: 'Pulizia Uffici', desc: 'Ambienti di lavoro sempre in ordine. Interventi quotidiani, settimanali o su richiesta.' },
  { icon: '🏠', titolo: 'Pulizia Civile', desc: 'Abitazioni, ville e appartamenti. Pulizie ordinarie e straordinarie per privati.' },
  { icon: '🏗️', titolo: 'Post Cantiere', desc: 'Sanificazione e pulizia di ambienti dopo lavori edili o ristrutturazioni.' },
  { icon: '🏨', titolo: 'Strutture Ricettive', desc: 'Hotel, B&B, agriturismi. Pulizia camere e aree comuni con protocolli dedicati.' },
  { icon: '🏛️', titolo: 'Condomini', desc: 'Scale, garage, aree esterne. Contratti periodici e interventi straordinari.' },
  { icon: '✨', titolo: 'Sanificazione', desc: 'Trattamenti igienizzanti con prodotti certificati. Per ambienti sicuri e salubri.' },
]

const stats = [
  { value: '10+', label: 'Anni di esperienza nel settore' },
  { value: '200+', label: 'Clienti soddisfatti tra privati e aziende' },
  { value: '100%', label: 'Prodotti ecologici e certificati' },
]

const contatti = [
  { icon: '📞', label: 'Telefono', value: '+39 06 000 0000' },
  { icon: '✉️', label: 'Email', value: 'info@itpulizie.it' },
  { icon: '📍', label: 'Zona operativa', value: 'Roma e Provincia' },
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
            Pulizia<br />
            <span className="text-celeste">Professionale</span><br />
            che si vede.
          </h1>

          <p className="font-body font-light text-site-gray text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Servizi di pulizia civile e industriale per uffici, condomini, strutture ricettive e privati.
            Affidabilità, puntualità, risultati.
          </p>

          <a
            href="#preventivo"
            className="inline-block bg-blu text-white font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:shadow-[0_8px_28px_rgba(77,184,212,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Richiedi un preventivo gratuito
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Chi siamo</p>
                <h2 className="font-heading text-blu leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  Esperienza e cura<br />in ogni dettaglio.
                </h2>
                <p className="font-body font-light text-site-gray leading-relaxed mb-4">
                  I.T. Pulizie nasce dalla passione per gli ambienti puliti e dalla convinzione che un servizio
                  professionale faccia la differenza. Operiamo con personale qualificato, prodotti certificati
                  e un approccio su misura per ogni cliente.
                </p>
                <p className="font-body font-light text-site-gray leading-relaxed">
                  La nostra missione è semplice: consegnare spazi impeccabili, ogni giorno, senza sorprese.
                </p>
              </div>
              <div className="flex flex-col gap-7">
                {stats.map(({ value, label }) => (
                  <div key={value} className="border-l-[3px] border-celeste-light pl-5">
                    <strong className="font-heading text-celeste block leading-none mb-1" style={{ fontSize: '2.4rem' }}>
                      {value}
                    </strong>
                    <span className="font-body font-light text-site-gray text-sm">{label}</span>
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

      {/* PREVENTIVO */}
      <div style={{ background: 'linear-gradient(170deg, #e5f6fb 0%, #f0fafd 100%)' }}>
        <RevealWrapper>
          <section id="preventivo" className="max-w-5xl mx-auto px-6 py-24">
            <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3 text-center">
              Preventivo gratuito
            </p>
            <h2 className="font-heading text-blu leading-tight mb-10 text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Dicci di cosa hai bisogno.
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
            Hai una domanda o vuoi un chiarimento? Contattaci direttamente — rispondiamo entro poche ore.
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
              Cerchiamo persone affidabili, precise e motivate da aggiungere al nostro staff.
              Inviaci il tuo curriculum e ti contatteremo appena possibile.
            </p>
            <a
              href="mailto:lavoro@itpulizie.it"
              className="inline-block bg-celeste text-blu font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(77,184,212,0.3)] hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Manda il tuo CV →
            </a>
          </section>
        </RevealWrapper>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0f2644] text-white/40 text-center py-8 px-6 font-heading text-xs tracking-[0.08em]">
        WWW.ITPULIZIE.IT &nbsp;·&nbsp; P.IVA 00000000000 &nbsp;·&nbsp; © 2025 I.T. Pulizie
      </footer>
    </>
  )
}