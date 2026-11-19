'use client'

import { useState } from 'react'

export default function CopySummary({ text }) {
  const [state, setState] = useState('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('ok')
    } catch {
      // ripiego per browser senza Clipboard API
      try {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(area)
        setState(ok ? 'ok' : 'error')
      } catch {
        setState('error')
      }
    }
    window.setTimeout(() => setState('idle'), 2500)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex-1 bg-blu text-white font-body font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#1f7e9a] transition-colors"
    >
      {state === 'ok' ? 'Copiato ✓' : state === 'error' ? 'Copia non riuscita' : 'Copia riepilogo'}
    </button>
  )
}
