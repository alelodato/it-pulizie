'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const photos = [
    'DSC05106.webp',
    'DSC05114.webp',
    'DSC05123.webp',
    'DSC05121.webp',
    'DSC05126.webp',
    'DSC05136.webp',
    'DSC05140.webp',
    'DSC05142.webp',
    'DSC05145.webp',
    'DSC05143.webp',
    'DSC05147.webp',
    'DSC05149.webp',
    'DSC05155.webp',
    'DSC05158.webp',
    'DSC05168.webp',
    'DSC05177.webp',
    'DSC05204.webp',
    'DSC05207.webp',
    'DSC05212.webp',
    'distingue-1.webp',
    'distingue-3.webp',
]

export default function Gallery() {
    const [index, setIndex] = useState(null)
    const isOpen = index !== null

    useEffect(() => {
        if (!isOpen) return

        const html = document.documentElement
        const body = document.body
        html.style.overflow = 'hidden'
        body.style.overflow = 'hidden'

        function onKey(e) {
            if (e.key === 'Escape') setIndex(null)
            if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % photos.length)
            if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + photos.length) % photos.length)
        }
        window.addEventListener('keydown', onKey)

        return () => {
            html.style.overflow = ''
            body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [isOpen])

    function close() {
        setIndex(null)
    }

    function prev(e) {
        e.stopPropagation()
        setIndex((i) => (i - 1 + photos.length) % photos.length)
    }

    function next(e) {
        e.stopPropagation()
        setIndex((i) => (i + 1) % photos.length)
    }

    const lightbox = isOpen ? (
        <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center overscroll-contain"
            onClick={close}
        >
            {/* Chiudi */}
            <button
                className="absolute top-5 right-5 z-10 bg-white/10 hover:bg-white/20 text-white font-body text-sm px-4 py-2 rounded-full transition-colors"
                onClick={close}
            >
                ✕ Chiudi
            </button>

            {/* Prev */}
            <button
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
                onClick={prev}
                aria-label="Foto precedente"
            >
                ‹
            </button>

            {/* Immagine */}
            <div className="w-full h-full flex items-center justify-center px-14 py-16">
                <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
                    <Image
                        src={'/' + photos[index]}
                        alt={'IT Pulizie foto ' + (index + 1)}
                        fill
                        sizes="100vw"
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Next */}
            <button
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
                onClick={next}
                aria-label="Foto successiva"
            >
                ›
            </button>

            {/* Contatore */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 font-body text-xs">
                {index + 1} / {photos.length}
            </div>
        </div>
    ) : null

    return (
        <>
            {/* Grid masonry */}
            <div className="columns-2 sm:columns-3 lg:columns-5 xl:columns-6 gap-3 space-y-3">
                {photos.map((photo, i) => (
                    <div
                        key={photo}
                        className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group relative"
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={'/' + photo}
                            alt={'IT Pulizie foto ' + (i + 1)}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-blu/0 group-hover:bg-blu/20 transition-all duration-300 rounded-xl" />
                    </div>
                ))}
            </div>

            {/* Lightbox renderizzato direttamente nel body */}
            {isOpen && createPortal(lightbox, document.body)}
        </>
    )
}