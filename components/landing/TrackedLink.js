'use client'

import { pushEvent } from '@/lib/tracking'

// Link che invia un evento al dataLayer al click (es. click_phone, click_whatsapp).
// data-tracked evita il doppio conteggio con LinkClickTracker.
export default function TrackedLink({ event, location, onClick, children, ...props }) {
  return (
    <a
      {...props}
      data-tracked="true"
      onClick={(e) => {
        pushEvent(event, { link_location: location })
        if (onClick) onClick(e)
      }}
    >
      {children}
    </a>
  )
}
