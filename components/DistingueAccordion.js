'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function DistingueAccordion({ distingue }) {
    const [open, setOpen] = useState(null)

    return (
        <div className="flex flex-col gap-3 mt-4 md:hidden">
            {distingue.map(({ titolo, desc, img }, i) => (
                <div key={titolo} className="border-l-[3px] border-celeste rounded-r-xl overflow-hidden">
                    {/* Header */}
                    <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                        onClick={() => setOpen(open === i ? null : i)}
                    >
                        <strong className="font-heading text-white text-base">{titolo}</strong>
                        <span
                            className="text-celeste text-xl leading-none transition-transform duration-300 flex-shrink-0 ml-3"
                            style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        >
                            +
                        </span>
                    </button>

                    {/* Contenuto */}
                    <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: open === i ? '600px' : '0px' }}
                    >
                        <div className="bg-white/5">
                            {img && (
                                <Image
                                    src={img}
                                    alt={titolo}
                                    width={600}
                                    height={350}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <p className="font-body font-light text-white/70 text-sm leading-relaxed px-5 py-4">
                                {desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}