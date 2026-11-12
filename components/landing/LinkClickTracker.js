'use client'

import { useEffect } from 'react'
import { pushEvent } from '@/lib/tracking'

// Traccia anche i link tel: e WhatsApp già presenti nei componenti del sito
// (TopBar e footer) senza modificarli. I link della landing usano TrackedLink
// (data-tracked) e qui vengono ignorati.
export default function LinkClickTracker() {
  useEffect(() => {
    function onClick(e) {
      const link = e.target.closest && e.target.closest('a[href]')
      if (!link || link.dataset.tracked) return

      const href = link.getAttribute('href') || ''
      let event = null
      if (href.startsWith('tel:')) event = 'click_phone'
      else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) event = 'click_whatsapp'
      if (!event) return

      const location = link.closest('footer') ? 'footer' : 'header'
      pushEvent(event, { link_location: location })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
