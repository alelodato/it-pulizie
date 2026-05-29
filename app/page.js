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
        className="relative flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #dff3fa 0%, #b6e3f0 40%, #e8f7fc 100%)' }}
      >
        {/* Top bar */}
        <div className="relative z-10 w-full bg-blu">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">

            {/* Mobile: telefono + zona */}
            <div className="flex sm:hidden items-center justify-between w-full">
              <a
                href="tel:+393337382823"
                className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-white/80 hover:text-celeste transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +39 333 7382823
              </a>
              <span className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-white/80">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Roma e Provincia
              </span>
            </div>

            {/* Desktop: contatti + social */}
            <div className="hidden sm:flex items-center justify-center w-full gap-6">
              <a
                href="tel:+393337382823"
                className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-white/80 hover:text-celeste transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +39 333 7382823
              </a>
              <a
                href="mailto:itpulizie.info@gmail.com"
                className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-white/80 hover:text-celeste transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                itpulizie.info@gmail.com
              </a>
              <span className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-white/80">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Pomezia (RM)
              </span>
              <div className="w-px h-4 bg-white/20" />
              <a href="https://www.linkedin.com/in/i-t-pulizie-475530412/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-celeste hover:text-white transition-all duration-300" aria-label="Linkedin">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/it_pulizie?igsh=aGducXBoaWNrZW51" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-celeste hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://wa.me/393337382823" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-celeste hover:text-white transition-all duration-300" aria-label="WhatsApp">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              </a>
            </div>

          </div>
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
        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6 py-16 fade-up">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <img
                src="/it-pulizie-logo.png"
                alt="I.T. Pulizie logo"
                className="h-48 w-auto"
              />
            </div>

            <h1 className="font-heading text-blu leading-[1.1] mb-4" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)' }}>
              Pulizia professionale<br />
              per<span className="text-celeste"> condomini</span>,<br />
              <span className="text-celeste">uffici</span> e <span className="text-celeste">ambienti civili</span>.
            </h1>

            <p className="font-body font-light text-site-gray text-base max-w-md mx-auto mb-8 leading-relaxed">
              Interventi programmati, attrezzature professionali e un servizio costruito
              sulle esigenze reali del tuo spazio. Operiamo in tutta la provincia di Roma.
            </p>

            <a
              href="#preventivo"
              className="inline-block bg-blu text-white font-heading text-sm tracking-[0.1em] uppercase px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:shadow-[0_8px_28px_rgba(77,184,212,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Richiedi una valutazione gratuita
            </a>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/bg-1.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/85 md:bg-black/90" />
        </div>

        <RevealWrapper>
          <section id="chi-siamo" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Chi siamo</p>
                <h2 className="font-heading text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  Una struttura stabile,<br />un servizio costante.
                </h2>
                <p className="font-body font-light text-white leading-relaxed mb-4">
                  IT Pulizie offre servizi di pulizia professionale per condomini, uffici e ambienti civili.
                  Gestiamo interventi programmati con continuità, mantenendo gli spazi ordinati, puliti e curati nel tempo.
                  Ogni servizio viene organizzato in base alle reali esigenze dello stabile, con attenzione alla puntualità, alla gestione operativa e alla qualità del risultato.
                </p>
                <p className="font-body font-light text-white/75 leading-relaxed">
                  Disponibili per sopralluogo e valutazione senza impegno.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {distingue.map(({ titolo, desc }) => (
                  <div key={titolo} className="border-l-[3px] border-celeste pl-5">
                    <strong className="font-heading text-white block mb-1 text-base">{titolo}</strong>
                    <span className="font-body font-light text-white/70 text-sm leading-relaxed">{desc}</span>
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

      {/* COME LAVORIAMO + FORM */}
      <div className="relative overflow-hidden">
        {/* Background image desktop */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/bg-2.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Background image mobile */}
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/bg-2-mb.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <RevealWrapper>
          <section id="preventivo" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste mb-3">Come lavoriamo</p>
                <h2 className="font-heading text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
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
                  <li key={item} className="flex items-start gap-3 font-body font-light text-white/75 text-sm leading-relaxed">
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
            <h2 className="font-heading text-white leading-tight mb-4 text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Richiedici una valutazione.
            </h2>
            <p className="font-body font-light text-white/70 text-center max-w-lg mx-auto mb-10 text-sm leading-relaxed">
              Inserisci le informazioni richieste per ricevere un preventivo gratuito e senza impegno.
            </p>
            <div className="bg-white rounded-[20px] px-8 py-12 sm:px-12 shadow-[0_8px_40px_rgba(0,0,0,0.2)] max-w-2xl mx-auto">
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
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/bg-3.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <RevealWrapper>
          <section id="lavora" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
            <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste-light mb-3">
              Lavora con noi
            </p>
            <h2 className="font-heading text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Entra nel nostro team.
            </h2>
            <p className="font-body font-light text-white/70 leading-relaxed max-w-lg mb-10">
              Cerchiamo persone affidabili, precise e motivate. Se vuoi far parte di una realtà seria
              e strutturata, inviaci il tuo curriculum e ti contatteremo appena possibile.
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
      <footer className="border-t border-celeste-light/40 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Logo + contatti + social sulla stessa riga */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">

            {/* Logo */}
            <img
              src="/it-pulizie-logo2.png"
              alt="I.T. Pulizie"
              className="h-48 w-auto opacity-80"
            />

            {/* Contatti */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              <a
                href="tel:+393337382823"
                className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-blu hover:text-celeste transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +39 333 7382823
              </a>
              <a
                href="mailto:itpulizie.info@gmail.com"
                className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-blu hover:text-celeste transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                itpulizie.info@gmail.com
              </a>
              <span className="hidden sm:flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-blu">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Via Sofia, 10 – Pomezia (RM)
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/i-t-pulizie-475530412/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-celeste-light flex items-center justify-center text-blu hover:bg-celeste hover:border-celeste hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/it_pulizie?igsh=aGducXBoaWNrZW51"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-celeste-light flex items-center justify-center text-blu hover:bg-celeste hover:border-celeste hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/393337382823"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-celeste-light flex items-center justify-center text-blu hover:bg-celeste hover:border-celeste hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-celeste-light/40 pt-6 text-center">
            <p className="font-heading text-[0.65rem] tracking-[0.1em] uppercase text-site-gray">
              WWW.ITPULIZIE.IT &nbsp;·&nbsp; Via Sofia, 10 – Pomezia (RM) &nbsp;·&nbsp; © 2026 I.T. Pulizie
            </p>
          </div>

        </div>
      </footer>
    </>
  )
}