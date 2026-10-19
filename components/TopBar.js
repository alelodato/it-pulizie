'use client'

import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const linkClass = "flex items-center gap-1.5 font-body text-[0.72rem] text-white/70 hover:text-celeste transition-colors duration-200 whitespace-nowrap"
const textClass = "flex items-center gap-1.5 font-body text-[0.72rem] text-white/60 whitespace-nowrap"
const iconLinkClass = "text-white/50 hover:text-celeste transition-colors duration-200"
const dividerClass = "w-px h-3.5 bg-white/20 flex-shrink-0"

export default function TopBar() {
    return (
        <div className="relative z-10 w-full bg-blu/95 backdrop-blur-sm border-b border-white/10">

            {/* Desktop */}
            <div className="hidden sm:flex items-center justify-center max-w-5xl mx-auto px-6 py-2.5 gap-5">
                <a href="tel:+393337382823" className={linkClass}>
                    <PhoneIcon className="w-3.5 h-3.5 text-white/40" />
                    +39 333 7382823
                </a>
                <a href="tel:+393381569737" className={linkClass}>
                    <PhoneIcon className="w-3.5 h-3.5 text-white/40" />
                    +39 338 1569737
                </a>
                <a href="mailto:itpulizie.info@gmail.com" className={linkClass}>
                    <EnvelopeIcon className="w-3.5 h-3.5 text-white/40" />
                    itpulizie.info@gmail.com
                </a>
                <span className={textClass}>
                    <MapPinIcon className="w-3.5 h-3.5 text-white/40" />
                    Pomezia (RM)
                </span>
                <div className={dividerClass} />
                <a href="https://www.linkedin.com/in/i-t-pulizie-475530412/" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="LinkedIn">
                    <FaLinkedin size={14} />
                </a>
                <a href="https://www.instagram.com/it_pulizie" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="Instagram">
                    <FaInstagram size={14} />
                </a>
                <a href="https://wa.me/393337382823" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="WhatsApp">
                    <FaWhatsapp size={14} />
                </a>
            </div>

            {/* Mobile ticker */}
            <div className="flex sm:hidden overflow-hidden py-2.5">
                <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: ticker 20s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
                <div className="ticker-track">
                    {[0, 1].map((_, j) => (
                        <div key={j} className="flex items-center">
                            <a href="tel:+393337382823" className={`${linkClass} mx-4`}>
                                <PhoneIcon className="w-3.5 h-3.5 text-white/40" />
                                +39 333 7382823
                            </a>
                            <div className={`${dividerClass} mx-1`} />
                            <a href="tel:+393381569737" className={`${linkClass} mx-4`}>
                                <PhoneIcon className="w-3.5 h-3.5 text-white/40" />
                                +39 338 1569737
                            </a>
                            <div className={`${dividerClass} mx-1`} />
                            <a href="mailto:itpulizie.info@gmail.com" className={`${linkClass} mx-4`}>
                                <EnvelopeIcon className="w-3.5 h-3.5 text-white/40" />
                                itpulizie.info@gmail.com
                            </a>
                            <div className={`${dividerClass} mx-1`} />
                            <span className={`${textClass} mx-4`}>
                                <MapPinIcon className="w-3.5 h-3.5 text-white/40" />
                                Pomezia (RM)
                            </span>
                            <div className={`${dividerClass} mx-1`} />
                            <a href="https://www.linkedin.com/in/i-t-pulizie-475530412/" target="_blank" rel="noopener noreferrer" className={`${iconLinkClass} mx-4`} aria-label="LinkedIn">
                                <FaLinkedin size={14} />
                            </a>
                            <a href="https://www.instagram.com/it_pulizie" target="_blank" rel="noopener noreferrer" className={`${iconLinkClass} mx-4`} aria-label="Instagram">
                                <FaInstagram size={14} />
                            </a>
                            <a href="https://wa.me/393337382823" target="_blank" rel="noopener noreferrer" className={`${iconLinkClass} mx-4`} aria-label="WhatsApp">
                                <FaWhatsapp size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}