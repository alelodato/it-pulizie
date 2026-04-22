'use client'

import { useEffect, useRef } from 'react'

export default function RevealWrapper({ children, className = '' }) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
            { threshold: 0.12 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div ref={ref} className={`reveal ${className}`}>
            {children}
        </div>
    )
}