import './globals.css'

export const metadata = {
  title: 'I.T. Pulizie – Servizi di Pulizia Professionale',
  description: 'Servizi di pulizia civile e industriale per uffici, condomini, strutture ricettive e privati. Roma e Provincia.',
  keywords: 'pulizie professionali, pulizie Roma, pulizie uffici, pulizie condomini, sanificazione',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}