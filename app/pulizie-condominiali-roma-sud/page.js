import Image from 'next/image'
import {
  UserCheck,
  Headset,
  CalendarCheck,
  ReceiptText,
  ClipboardList,
  Building2,
  MapPin,
  Check,
  Phone,
  Mail,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import TopBar from '@/components/TopBar'
import SideNav from '@/components/SideNav'
import SiteFooter from '@/components/SiteFooter'
import TrackedLink from '@/components/landing/TrackedLink'
import LinkClickTracker from '@/components/landing/LinkClickTracker'
import SopralluogoForm from '@/components/landing/SopralluogoForm'

const ZONE_SERVITE = [
  'EUR',
  'Laurentina',
  'Torrino',
  'Mostacciano',
  'Spinaceto',
  'Cecchignola',
  'Vigna Murata',
  'Fonte Meravigliosa',
  "Tor de' Cenci",
  'Trigoria',
]

const PHONE_MAIN = { label: '+39 333 7382823', href: 'tel:+393337382823' }
const PHONE_ALT = { label: '+39 338 1569737', href: 'tel:+393381569737' }
const WHATSAPP_URL =
  'https://wa.me/393337382823?text=Buongiorno%2C%20vorrei%20un%20sopralluogo%20per%20il%20mio%20condominio.'
const EMAIL = 'itpulizie.info@gmail.com'

const PAGE_URL = 'https://www.itpulizie.it/pulizie-condominiali-roma-sud'
const PAGE_TITLE = 'Pulizie Condominiali a Roma Sud | I.T. Pulizie'
const PAGE_DESCRIPTION =
  'Pulizie condominiali programmate a Roma Sud: EUR, Laurentina, Torrino, Mostacciano, Spinaceto e quartieri vicini. Personale fisso, referente diretto, canone mensile chiaro. Sopralluogo gratuito.'

export const metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: PAGE_URL,
    siteName: 'I.T. Pulizie',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: '/condomini.jpg', alt: 'I.T. Pulizie · Condomini' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/condomini.jpg'],
  },
}

const HERO_POINTS = ['Oltre 20 condomini gestiti', 'Sopralluogo gratuito', 'Canone mensile chiaro']

const VANTAGGI = [
  { Icon: UserCheck, titolo: 'Personale fisso e riconoscibile', desc: 'Sai sempre chi entra negli spazi comuni del condominio.' },
  { Icon: Headset, titolo: 'Referente diretto', desc: 'I titolari seguono personalmente ogni cliente.' },
  { Icon: CalendarCheck, titolo: 'Calendario concordato', desc: 'Giorni e orari stabiliti insieme e rispettati con continuità.' },
  { Icon: ReceiptText, titolo: 'Canone mensile chiaro', desc: 'Gli interventi straordinari sono preventivati a parte e approvati prima.' },
  { Icon: ClipboardList, titolo: 'Piano personalizzato', desc: 'Il servizio è costruito sulla struttura e sulle esigenze dello stabile.' },
  { Icon: Building2, titolo: 'Oltre 20 condomini gestiti', desc: 'Esperienza concreta nella pulizia condominiale continuativa.' },
]

const SERVIZI = [
  'Interventi programmati in base alle esigenze dello stabile',
  'Pulizia di scale, ingressi, androni e ascensori',
  'Cura delle aree comuni interne ed esterne',
  'Controllo costante delle condizioni generali',
]

const PASSI = [
  { titolo: 'Sopralluogo gratuito', desc: 'Veniamo a vedere il condominio e ascoltiamo le esigenze reali, senza impegno.' },
  { titolo: 'Piano e preventivo su misura', desc: "Frequenze, orari e canone mensile chiari, pronti da presentare all'amministratore o in assemblea." },
  { titolo: 'Servizio programmato', desc: 'Personale fisso, calendario concordato e un referente diretto per qualsiasi necessità.' },
]

const labelClass = 'font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-3'
const h2Class = 'font-heading text-blu leading-tight'
const h2Style = { fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }
const contactLabelClass = 'font-heading text-[0.72rem] tracking-[0.12em] uppercase text-[#1f7e9a] block mb-1'
const contactLinkClass = 'font-body text-blu hover:text-[#1f7e9a] underline-offset-2 hover:underline transition-colors'

export default function PulizieCondominialiRomaSud() {
  return (
    <>
      <SideNav />
      <LinkClickTracker />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #cdebf5 0%, #e4f4fa 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg className="wave-animate absolute bottom-[-20px] w-[200%] opacity-35" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4db8d4" d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,200 L0,200 Z" />
            <path fill="#1a3f6f" fillOpacity="0.15" d="M0,120 C300,60 600,160 900,100 C1100,60 1300,140 1440,100 L1440,200 L0,200 Z" />
          </svg>
          <svg className="wave-animate-slow absolute bottom-0 w-[200%] opacity-20" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a8dce9" d="M0,60 C360,120 720,0 1080,80 C1260,120 1380,40 1440,60 L1440,200 L0,200 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-10" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#f5fafd" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <TopBar />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 pt-12 pb-28 lg:pt-20 lg:pb-36 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div className="fade-up min-w-0">
            <p className={labelClass}>Pulizie condominiali programmate</p>
            <h1 className="font-heading text-blu leading-[1.1] mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
              Pulizie Condominiali a <span className="text-celeste">Roma Sud</span>.
            </h1>
            <p className="font-body text-[#44596e] text-base sm:text-lg leading-relaxed max-w-xl mb-3">
              Servizi programmati con personale fisso, referente diretto e un piano costruito sulle esigenze del tuo condominio.
            </p>
            <p className="font-body font-semibold text-blu text-base leading-relaxed max-w-xl mb-8">
              EUR, Laurentina, Torrino, Mostacciano e quartieri vicini.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <a
                href="#preventivo"
                className="w-full sm:w-auto text-center bg-blu text-white font-body font-semibold text-sm px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(26,63,111,0.25)] hover:bg-celeste hover:shadow-[0_8px_28px_rgba(77,184,212,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Richiedi un sopralluogo gratuito
              </a>
              <TrackedLink
                href={PHONE_MAIN.href}
                event="click_phone"
                location="hero"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 text-blu border border-blu/20 font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-white hover:border-celeste hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                <Phone size={16} aria-hidden="true" />
                {PHONE_MAIN.label}
              </TrackedLink>
            </div>

            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 mb-8">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2 font-body font-semibold text-sm text-blu">
                  <span className="w-5 h-5 rounded-full bg-[#1f7e9a] text-white flex items-center justify-center flex-shrink-0">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 bg-white/60 backdrop-blur-sm border border-white rounded-2xl px-4 py-3">
              <span className="flex items-center gap-1.5 font-heading text-[0.72rem] tracking-[0.14em] uppercase text-[#1f7e9a] mr-1">
                <MapPin size={16} aria-hidden="true" />
                Zone servite
              </span>
              {ZONE_SERVITE.map((z) => (
                <span key={z} className="font-body text-sm text-blu bg-white rounded-full px-3 py-1 border border-celeste-light/70">
                  {z}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(26,63,111,0.22)]">
              <Image
                src="/condomini.jpg"
                alt="Androne e scale di un condominio pulito da I.T. Pulizie"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-sm text-blu font-heading text-[0.7rem] tracking-[0.14em] uppercase px-4 py-2 rounded-full shadow-md">
              I.T. Pulizie · Condomini
            </span>
          </div>
        </div>
      </section>

      {/* VANTAGGI */}
      <section id="vantaggi" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-24">
        <p className={labelClass}>Perché sceglierci</p>
        <h2 className={`${h2Class} mb-12 max-w-2xl`} style={h2Style}>
          Persone che conosci, un servizio senza sorprese.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {VANTAGGI.map(({ Icon, titolo, desc }) => (
            <div
              key={titolo}
              className="bg-white rounded-2xl p-7 border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,63,111,0.14)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blu/10 text-blu mb-5">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-blu text-lg leading-snug mb-2">{titolo}</h3>
              <p className="font-body text-[#5a6e82] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section className="bg-blu">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-celeste-light mb-3">Cosa facciamo</p>
            <h2 className="font-heading text-white leading-tight mb-6" style={h2Style}>
              Pulizia e manutenzione condominiale.
            </h2>
            <p className="font-body text-white/80 leading-relaxed">
              Gestiamo la pulizia e il mantenimento degli spazi comuni con interventi programmati e continui. Scale, ingressi, androni, ascensori e aree condivise vengono trattati con attenzione e regolarità.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {SERVIZI.map((s) => (
              <li key={s} className="flex items-start gap-4 bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4">
                <span className="w-7 h-7 rounded-full bg-celeste text-blu flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="font-body text-white leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COME LAVORIAMO */}
      <section id="come-lavoriamo" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-24">
        <p className={labelClass}>Come lavoriamo</p>
        <h2 className={`${h2Class} mb-12`} style={h2Style}>
          Tre passi, nessuna sorpresa.
        </h2>
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {PASSI.map(({ titolo, desc }, i) => (
            <li
              key={titolo}
              className="relative bg-[#e5f6fb] rounded-2xl p-7 border border-blu border-t-4 shadow-[0_4px_20px_rgba(26,63,111,0.08)]"
            >
              <span className="font-heading text-celeste text-5xl leading-none block mb-4" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-blu text-xl leading-snug mb-2">
                <span className="sr-only">{i + 1}. </span>
                {titolo}
              </h3>
              <p className="font-body text-[#44596e] text-sm leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PREVENTIVO */}
      <section
        id="preventivo"
        className="scroll-mt-4"
        style={{ background: 'linear-gradient(160deg, #cdebf5 0%, #e4f4fa 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
          <div className="min-w-0">
            <p className={labelClass}>Sopralluogo gratuito</p>
            <h2 className={`${h2Class} mb-5`} style={h2Style}>
              Richiedi una valutazione per il tuo condominio.
            </h2>
            <p className="font-body text-[#44596e] leading-relaxed mb-6">
              Sei amministratore, consigliere o condomino? Lasciaci i tuoi dati: organizziamo un sopralluogo senza impegno e ti prepariamo un preventivo chiaro, pronto da presentare in assemblea.
            </p>
            <TrackedLink
              href={WHATSAPP_URL}
              event="click_whatsapp"
              location="preventivo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-semibold text-[#1f7e9a] hover:text-blu underline underline-offset-4 transition-colors"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              Preferisci WhatsApp? Scrivici
            </TrackedLink>
          </div>

          <div className="min-w-0 bg-white rounded-[20px] px-5 py-8 sm:px-10 sm:py-10 shadow-[0_8px_40px_rgba(26,63,111,0.12)]">
            <SopralluogoForm />
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-24">
        <h2 className={`${h2Class} mb-10`} style={h2Style}>
          Parliamone.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)] flex gap-4">
            <span className="w-11 h-11 rounded-xl bg-blu/10 text-blu flex items-center justify-center flex-shrink-0">
              <Phone size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <strong className={contactLabelClass}>Telefono</strong>
              <span className="flex flex-col gap-1">
                {[PHONE_MAIN, PHONE_ALT].map((p) => (
                  <TrackedLink key={p.href} href={p.href} event="click_phone" location="contatti" className={contactLinkClass}>
                    {p.label}
                  </TrackedLink>
                ))}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)] flex gap-4">
            <span className="w-11 h-11 rounded-xl bg-blu/10 text-blu flex items-center justify-center flex-shrink-0">
              <FaWhatsapp size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <strong className={contactLabelClass}>WhatsApp</strong>
              <TrackedLink
                href={WHATSAPP_URL}
                event="click_whatsapp"
                location="contatti"
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClass}
              >
                Scrivici su WhatsApp
              </TrackedLink>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)] flex gap-4">
            <span className="w-11 h-11 rounded-xl bg-blu/10 text-blu flex items-center justify-center flex-shrink-0">
              <Mail size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <strong className={contactLabelClass}>Email</strong>
              <a href={`mailto:${EMAIL}`} className={`${contactLinkClass} break-all`}>
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-celeste-light/60 shadow-[0_4px_20px_rgba(26,63,111,0.06)] flex gap-4">
            <span className="w-11 h-11 rounded-xl bg-blu/10 text-blu flex items-center justify-center flex-shrink-0">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <strong className={contactLabelClass}>Sede</strong>
              <span className="font-body text-blu block">Via Sofia, 10 – Pomezia (RM)</span>
              <span className="font-body text-sm text-[#5a6e82] block mt-1">
                Operiamo in tutta Roma Sud.
              </span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
