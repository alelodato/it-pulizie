'use client'

import { useState } from 'react'
import Image from 'next/image'

const servizi = [
    {
        tab: 'Condomini',
        icon: '🏢',
        titolo: 'Pulizia e manutenzione condominiale',
        desc: 'Gestiamo la pulizia e il mantenimento degli spazi comuni con interventi programmati e continui. \nScale, ingressi, androni, ascensori e aree condivise vengono trattati con attenzione e regolarità.',
        punti: [
            'Interventi programmati in base alle esigenze dello stabile',
            'Pulizia di scale, ingressi, androni e ascensori',
            'Cura delle aree comuni interne ed esterne',
            'Controllo costante delle condizioni generali',
        ],
        img: '/condomini.webp',
    },
    {
        tab: 'Uffici',
        icon: '🏠',
        titolo: 'Pulizia per ambienti di lavoro',
        desc: 'Servizi di pulizia organizzati per uffici e ambienti professionali, con interventi pianificati in base agli orari e alle necessità operative della struttura.',
        punti: [
            'Pulizia quotidiana o periodica',
            'Attenzione alle superfici e alle zone di maggiore utilizzo',
            'Utilizzo di prodotti professionali adatti agli ambienti civili',
            'Flessibilità negli orari di intervento',
        ],
        img: '/ufficio.webp',
    },
    {
        tab: 'Ambienti Civili e Commerciali',
        icon: '🏪',
        titolo: 'Ambienti civili e commerciali',
        desc: 'Offriamo servizi di pulizia per attività commerciali, locali, strutture ricettive, spazi dedicati agli eventi e altri ambienti aperti al pubblico. Garantiamo interventi efficaci e ambienti sempre puliti, ordinati e accoglienti.',
        punti: [
            'Pulizia di locali commerciali e attività aperte al pubblico',
            'Interventi per strutture ricettive e spazi dedicati agli eventi',
            'Utilizzo di attrezzature e prodotti professionali',
            'Servizi programmati in base alle esigenze della struttura',
            'Flessibilità negli orari e nella frequenza degli interventi',
        ],
        img: '/commerciali.webp',
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
        img: '/aree-verdi.webp',
    },
    {
        tab: 'Post Cantiere',
        icon: '🏗️',
        titolo: 'Sgrossi e pulizie post-lavori',
        desc: `Interventi dedicati alla pulizia di ambienti dopo lavori edili o ristrutturazioni.   Rimuoviamo polvere, residui e sporco da cantiere per riconsegnare spazi puliti e pronti all’uso.`,
        punti: [
            'Pulizia profonda di pavimenti e superfici',
            'Trattamento vetri, infissi e serramenti',
            'Rimozione di polvere e residui superficiali da lavorazione edile',
        ],
        img: '/post-cantiere.webp',
    },
    {
        tab: 'Garage',
        icon: '🚗',
        titolo: 'Garage e aree esterne',
        desc: 'Pulizia di garage, parcheggi coperti e spazi esterni con attrezzature professionali adatte a superfici ad alto utilizzo.',
        punti: [
            'Lavaggio pavimentazioni con macchinari professionali',
            'Pulizia di corsie, box e aree di manovra',
            'Rimozione di macchie, oli e sporco persistente',
            'Interventi programmati o straordinari su richiesta',
        ],
        img: '/garage.webp',
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