'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/#chi-siamo', label: 'Chi Siamo' },
    { href: '/#servizi', label: 'Servizi' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#come-lavoriamo', label: 'Come lavoriamo' },
    { href: '/#preventivo', label: 'Preventivo' },
    { href: '/#contatti', label: 'Contatti' },
    { href: '/#lavora', label: 'Lavora con Noi' },
]

export default function SideNav() {
    const [active, setActive] = useState('home')
    const pathname = usePathname()

    useEffect(() => {
        // Le sezioni da osservare esistono solo in home: altre pagine
        // possono avere id uguali (es. #preventivo) ma i link portano alla home.
        if (pathname !== '/') return
        const ids = links.map(l => l.href.replace('/#', ''))
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
    }, [pathname])

    return (
        <nav className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1.5">
            {links.map(({ href, label }) => {
                const id = href.replace('/#', '')
                return (
                    <a
                        key={href}
                        href={href}
                        className={`sidenav-link ${pathname === '/' && active === id ? 'active' : ''}`}
                    >
                        <span className="sidenav-dot" />
                        {label}
                    </a>
                )
            })}
        </nav>
    )
}