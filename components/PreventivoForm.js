'use client'

import { useState } from 'react'

export default function PreventivoForm() {
    const [status, setStatus] = useState('idle')

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('loading')
        const data = new FormData(e.target)

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
            })
            const json = await res.json()
            if (json.success) {
                setStatus('success')
                e.target.reset()
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const inputClass =
        'border border-celeste-light rounded-xl px-4 py-3 text-sm text-blu bg-site-white focus:outline-none focus:border-celeste transition-colors font-body w-full'
    const labelClass =
        'font-heading text-[0.68rem] tracking-[0.14em] uppercase text-blu mb-1 block'

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value="Nuova richiesta preventivo – I.T. Pulizie" />

            <div className="flex flex-col">
                <label className={labelClass} htmlFor="nome">Nome</label>
                <input className={inputClass} type="text" id="nome" name="nome" placeholder="Mario" required />
            </div>

            <div className="flex flex-col">
                <label className={labelClass} htmlFor="cognome">Cognome</label>
                <input className={inputClass} type="text" id="cognome" name="cognome" placeholder="Rossi" required />
            </div>

            <div className="flex flex-col">
                <label className={labelClass} htmlFor="email">Email</label>
                <input className={inputClass} type="email" id="email" name="email" placeholder="mario@example.com" required />
            </div>

            <div className="flex flex-col">
                <label className={labelClass} htmlFor="telefono">Telefono</label>
                <input className={inputClass} type="tel" id="telefono" name="telefono" placeholder="+39 333 000 0000" />
            </div>

            <div className="flex flex-col sm:col-span-2">
                <label className={labelClass} htmlFor="servizio">Tipo di servizio</label>
                <select className={inputClass} id="servizio" name="servizio">
                    <option value="">Seleziona un servizio...</option>
                    <option>Pulizia Uffici</option>
                    <option>Pulizia Civile / Abitazione</option>
                    <option>Post Cantiere</option>
                    <option>Strutture Ricettive</option>
                    <option>Condomini</option>
                    <option>Sanificazione</option>
                    <option>Altro</option>
                </select>
            </div>

            <div className="flex flex-col sm:col-span-2">
                <label className={labelClass} htmlFor="messaggio">Descrizione</label>
                <textarea
                    className={`${inputClass} resize-y min-h-[120px]`}
                    id="messaggio"
                    name="messaggio"
                    placeholder="Descrivi brevemente il tuo spazio e le tue esigenze..."
                />
            </div>

            <div className="sm:col-span-2 text-center pt-2">
                {status === 'success' ? (
                    <p className="text-celeste font-heading tracking-wide text-sm">
                        ✓ Richiesta inviata! Ti contatteremo presto.
                    </p>
                ) : status === 'error' ? (
                    <p className="text-red-400 font-heading tracking-wide text-sm">
                        Errore nell&apos;invio. Riprova o scrivici direttamente.
                    </p>
                ) : (
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-block bg-blu text-white font-heading text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-full shadow-lg hover:bg-celeste transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                    >
                        {status === 'loading' ? 'Invio...' : 'Invia richiesta →'}
                    </button>
                )}
            </div>
        </form>
    )
}