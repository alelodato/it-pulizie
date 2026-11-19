'use client'

import { useEffect, useState } from 'react'
import { isExcluded, setExcluded } from '@/lib/visit-client'

export default function ExcludeToggle() {
  const [excluded, setState] = useState(null) // null = non ancora letto

  useEffect(() => {
    setState(isExcluded())
  }, [])

  if (excluded === null) {
    return <p className="font-body text-sm text-[#5a6e82]">Verifica in corso…</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <p role="status" className="font-body text-base text-blu">
        Stato su questo browser:{' '}
        <strong className={excluded ? 'text-[#1f7e9a]' : 'text-blu'}>
          {excluded ? 'visite escluse dalle statistiche' : 'tracciamento anonimo attivo'}
        </strong>
      </p>
      <button
        type="button"
        onClick={() => setState(setExcluded(!excluded))}
        className="w-full sm:w-auto bg-blu text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#1f7e9a] transition-colors"
      >
        {excluded ? 'Riattiva il conteggio delle mie visite' : 'Escludi le mie visite'}
      </button>
    </div>
  )
}
