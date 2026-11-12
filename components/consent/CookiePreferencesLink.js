'use client'

import { OPEN_PREFERENCES_EVENT } from '@/lib/tracking'

export default function CookiePreferencesLink({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Preferenze cookie
    </button>
  )
}
