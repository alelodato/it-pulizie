import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import CookiePreferencesLink from '@/components/consent/CookiePreferencesLink'

const legalLinkClass =
  'font-heading text-[0.65rem] tracking-[0.1em] uppercase text-site-gray hover:text-celeste transition-colors'

// Footer del sito, estratto da app/page.js senza modifiche al markup.
// Aggiunti solo i link legali e "Preferenze cookie".
export default function SiteFooter() {
  return (
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
              href="tel:+393381569737"
              className="flex items-center gap-2 font-heading text-[0.68rem] tracking-[0.1em] uppercase text-blu hover:text-celeste transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +39 338 1569737
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
              aria-label="LinkedIn"
            >
              <FaLinkedin size={14} />
            </a>
            <a
              href="https://www.instagram.com/it_pulizie?igsh=aGducXBoaWNrZW51"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-celeste-light flex items-center justify-center text-blu hover:bg-celeste hover:border-celeste hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://wa.me/393337382823"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-celeste-light flex items-center justify-center text-blu hover:bg-celeste hover:border-celeste hover:text-white transition-all duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={14} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-celeste-light/40 pt-6 text-center">
          <p className="font-heading text-[0.65rem] tracking-[0.1em] uppercase text-site-gray">
            WWW.ITPULIZIE.IT &nbsp;·&nbsp; Via Sofia, 10 – Pomezia (RM) &nbsp;·&nbsp; © 2026 I.T. Pulizie
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href="/privacy-policy" className={legalLinkClass}>Privacy policy</a>
            <span className="text-celeste-light" aria-hidden="true">·</span>
            <a href="/cookie-policy" className={legalLinkClass}>Cookie policy</a>
            <span className="text-celeste-light" aria-hidden="true">·</span>
            <CookiePreferencesLink className={legalLinkClass} />
          </div>
        </div>

      </div>
    </footer>
  )
}
