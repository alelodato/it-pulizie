'use client'

import { useEffect, useState } from 'react'

const links = [
    { href: '#home', label: 'Home' },
    { href: '#chi-siamo', label: 'Chi Siamo' },
    { href: '#servizi', label: 'Servizi' },
    { href: '#preventivo', label: 'Preventivo' },
    { href: '#contatti', label: 'Contatti' },
    { href: '#lavora', label: 'Lavora con Noi' },
]

export default function SideNav() {
    const [active, setActive] = useState('home')

    useEffect(() => {
        const ids = links.map(l => l.href.replace('#', ''))
        const observers = []

        ids.forEach(id => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id) },
                { threshold: 0.3 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [])

    return (
        <nav className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1.5">
            {links.map(({ href, label }) => {
                const id = href.replace('#', '')
                return (
                    <a
                        key={href}
                        href={href}
                        className={`sidenav-link ${active === id ? 'active' : ''}`}
                    >
                        <span className="sidenav-dot" />
                        {label}
                    </a>
                )
            })}
        </nav>
    )
}