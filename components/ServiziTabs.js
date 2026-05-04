'use client'

import { useState } from 'react'
import Image from 'next/image'

const servizi = [
    {
        tab: 'Condomini',
        icon: '🏢',
        titolo: 'Pulizia e manutenzione condominiale',
        desc: 'Manteniamo gli spazi comuni del tuo condominio in condizioni costanti di ordine e pulizia. Scale, ingressi, androni, ascensori e aree comuni trattati con regolarità e professionalità.',
        punti: [
            'Interventi programmati su misura',
            'Pulizia scale, ingressi e androni',
            'Manutenzione ascensori e aree comuni',
            'Controllo costante delle condizioni generali',
        ],
        img: '/images/condomini.jpg',
    },
    {
        tab: 'Uffici',
        icon: '🏠',
        titolo: 'Pulizia per ambienti di lavoro',
        desc: 'Servizi strutturati per uffici e ambienti professionali. Pianificazione degli interventi costruita sulle esigenze operative della struttura, con attenzione alle superfici più utilizzate.',
        punti: [
            'Pulizia quotidiana o periodica',
            'Attenzione alle zone di passaggio e contatto',
            'Prodotti professionali adatti agli ambienti civili',
            'Flessibilità negli orari di intervento',
        ],
        img: '/images/uffici.jpg',
    },
    {
        tab: 'Post Cantiere',
        icon: '🏗️',
        titolo: 'Sgrossi e rifiniture post-lavori',
        desc: 'Pulizia professionale dopo lavori edili o ristrutturazioni. Rimuoviamo polvere, residui e detriti, restituendo gli ambienti puliti, sicuri e pronti all\'uso.',
        punti: [
            'Rimozione polvere e residui da costruzione',
            'Pulizia profonda di superfici e pavimenti',
            'Trattamento infissi, vetri e serramenti',
            'Smaltimento materiali di risulta leggeri',
        ],
        img: '/images/post-cantiere.jpg',
    },
    {
        tab: 'Pavimentazioni',
        icon: '✨',
        titolo: 'Trattamenti professionali per pavimenti',
        desc: 'Trattamenti specifici per ogni tipo di pavimentazione. Dalla pulizia profonda alla lucidatura, fino alla manutenzione periodica per mantenere le superfici in condizioni ottimali.',
        punti: [
            'Lavaggio e sanificazione profonda',
            'Lucidatura e cristallizzazione',
            'Trattamenti protettivi anti-macchia',
            'Adatto a marmo, gres, parquet e altro',
        ],
        img: '/images/pavimentazioni.jpg',
    },
    {
        tab: 'Aree Verdi',
        icon: '🌿',
        titolo: 'Gestione aree verdi',
        desc: 'Cura e manutenzione delle aree verdi condominiali e private. Un servizio continuativo per mantenere gli spazi esterni ordinati e curati durante tutto l\'anno.',
        punti: [
            'Sfalcio erba e potatura siepi',
            'Pulizia e raccolta foglie stagionale',
            'Manutenzione periodica programmata',
            'Cura di giardini condominiali e privati',
        ],
        img: '/images/aree-verdi.jpg',
    },
    {
        tab: 'Garage',
        icon: '🚗',
        titolo: 'Garage e aree esterne',
        desc: 'Pulizia di garage, parcheggi coperti e spazi esterni con attrezzature e macchinari specifici. Interventi puntuali o programmati in base alle esigenze.',
        punti: [
            'Lavaggio pavimentazioni con macchinari',
            'Pulizia corsie, box e aree di manovra',
            'Rimozione oli e macchie persistenti',
            'Interventi straordinari su richiesta',
        ],
        img: '/images/garage.jpg',
    },
]

export default function ServiziTabs() {
    const [active, setActive] = useState(0)
    const s = servizi[active]

    return (
        <div>
            {/* Tab bar — scroll orizzontale su mobile */}
            <div className="overflow-x-auto pb-1 -mx-6 px-6">
                <div className="flex gap-2 w-max min-w-full">
                    {servizi.map((item, i) => (
                        <button
                            key={item.tab}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-xs tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${active === i
                                    ? 'bg-blu text-white shadow-[0_4px_16px_rgba(26,63,111,0.25)]'
                                    : 'bg-white text-site-gray border border-celeste-light hover:border-celeste hover:text-blu'
                                }`}
                        >
                            <span>{item.icon}</span>
                            {item.tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenuto tab */}
            <div
                key={active}
                className="mt-8 bg-white rounded-2xl shadow-[0_4px_24px_rgba(26,63,111,0.08)] overflow-hidden"
                style={{ animation: 'fadeUp 0.35s ease both' }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Testo */}
                    <div className="p-10 flex flex-col justify-center order-2 md:order-1">
                        <div className="text-4xl mb-4">{s.icon}</div>
                        <h3 className="font-heading text-blu text-2xl mb-4 leading-tight">{s.titolo}</h3>
                        <p className="font-body font-light text-site-gray text-sm leading-relaxed mb-6">{s.desc}</p>
                        <ul className="flex flex-col gap-2.5">
                            {s.punti.map((p) => (
                                <li key={p} className="flex items-start gap-3 font-body font-light text-site-gray text-sm">
                                    <span className="text-celeste mt-0.5 flex-shrink-0">→</span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Immagine */}
                    <div className="relative min-h-[280px] md:min-h-[400px] order-1 md:order-2">
                        <Image
                            src={s.img}
                            alt={s.titolo}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blu/30 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5">
                                <p className="font-heading text-white text-xs tracking-widest uppercase">
                                    I.T. Pulizie · {s.tab}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}