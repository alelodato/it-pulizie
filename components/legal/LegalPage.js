import Image from 'next/image'
import TopBar from '@/components/TopBar'
import SideNav from '@/components/SideNav'
import SiteFooter from '@/components/SiteFooter'

// Contenitore per le pagine legali (privacy policy, cookie policy).
export default function LegalPage({ label, title, updated, children }) {
  return (
    <>
      <SideNav />
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-16 lg:py-20">
        <a href="/" className="inline-block mb-8">
          <Image src="/it-pulizie-logo.png" alt="I.T. Pulizie – torna alla home" width={80} height={80} className="h-20 w-20" />
        </a>
        <p className="font-heading text-[0.72rem] tracking-[0.2em] uppercase text-[#1f7e9a] mb-3">{label}</p>
        <h1 className="font-heading text-blu leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
          {title}
        </h1>
        <p className="font-body text-sm text-[#5a6e82] mb-10">Ultimo aggiornamento: {updated}</p>
        <div className="legal-content font-body text-[#44596e] leading-relaxed space-y-4">{children}</div>
      </main>
      <SiteFooter />
    </>
  )
}

export function LegalH2({ children }) {
  return <h2 className="font-heading text-blu text-xl leading-snug pt-6">{children}</h2>
}
