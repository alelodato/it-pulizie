'use client'

import { useState } from 'react'
import Image from 'next/image'

const photos = [
    'DSC05106.jpg',
    'DSC05114.jpg',
    'DSC05123.jpg',
    'DSC05121.jpg',
    'DSC05125.jpg',
    'DSC05126.jpg',
    'DSC05136.jpg',
    'DSC05140.jpg',
    'DSC05142.jpg',
    'DSC05145.jpg',
    'DSC05143.jpg',
    'DSC05147.jpg',
    'DSC05149.jpg',
    'DSC05155.jpg',
    'DSC05158.jpg',
    'DSC05168.jpg',
    'DSC05177.jpg',
    'DSC05204.jpg',
    'DSC05207.jpg',
    'DSC05212.jpg',
    'distingue-1.jpg',
    'distingue-3.jpg',
]

export default function Gallery() {
    const [selected, setSelected] = useState(null)

    const currentIndex = photos.indexOf(selected)

    function prev() {
        setSelected(photos[(currentIndex - 1 + photos.length) % photos.length])
    }

    function next() {
        setSelected(photos[(currentIndex + 1) % photos.length])
    }

    return (
        <>
            {/* Grid masonry */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {photos.map((photo, i) => (
                    <div
                        key={i}
                        className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group relative"
                        onClick={() => setSelected(photo)}
                    >
                        <Image
                            src={`/${photo}`}
                            alt={`I.T. Pulizie – foto ${i + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-blu/0 group-hover:bg-blu/20 transition-all duration-300 rounded-xl" />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selected && (
                <div
                    className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                    onClick={() => setSelected(null)}
                >
                    <button
                        className="absolute top-5 right-5 text-white/70 hover:text-white font-body text-sm z-10"
                        onClick={() => setSelected(null)}
                    >
                        ✕ Chiudi
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl px-2 z-10"
                        onClick={e => { e.stopPropagation(); prev() }}
                    >
                        ‹
                    </button>

                    <div
                        className="relative w-full h-full flex items-center justify-center px-12"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={`/${selected}`}
                                alt="Foto ingrandita"
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl px-2 z-10"
                        onClick={e => { e.stopPropagation(); next() }}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    )
}