import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.itpulizie.it'),
  title: {
    default: 'I.T. Pulizie – Impresa di Pulizie a Pomezia e Roma',
    template: '%s | I.T. Pulizie',
  },
  description: 'Servizi di pulizia professionale per condomini, uffici e ambienti civili. Interventi programmati, attrezzature professionali. Sede a Pomezia, operiamo in tutta la provincia di Roma.',
  keywords: [
    'impresa di pulizie Pomezia',
    'pulizie professionali Roma',
    'pulizie condomini Roma',
    'pulizie uffici Pomezia',
    'pulizie post cantiere',
    'sanificazione ambienti',
    'manutenzione aree verdi',
    'pulizie pavimentazioni',
    'I.T. Pulizie',
  ],
  authors: [{ name: 'I.T. Pulizie' }],
  creator: 'I.T. Pulizie',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.itpulizie.it',
    siteName: 'I.T. Pulizie',
    title: 'I.T. Pulizie – Impresa di Pulizie a Pomezia e Roma',
    description: 'Servizi di pulizia professionale per condomini, uffici e ambienti civili. Sede a Pomezia, provincia di Roma.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'I.T. Pulizie – Impresa di Pulizie Professionale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I.T. Pulizie – Impresa di Pulizie a Pomezia e Roma',
    description: 'Servizi di pulizia professionale per condomini, uffici e ambienti civili.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.itpulizie.it',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Nunito:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}