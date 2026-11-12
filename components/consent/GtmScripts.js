import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// Consent Mode v2: default "denied" per tutto ciò che non è tecnico.
// Se l'utente ha già scelto (localStorage 'itp_consent_v1'), l'update
// viene inviato subito, prima che GTM venga caricato.
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var stored = JSON.parse(localStorage.getItem('itp_consent_v1') || 'null');
  if (stored && (stored.choice === 'accepted' || stored.choice === 'rejected')) {
    var v = stored.choice === 'accepted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v
    });
  }
} catch (e) {}
`

export function GtmHead() {
  if (!GTM_ID) return null

  const gtmSnippet = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});
`

  return (
    <>
      {/* Nell'App Router beforeInteractive va nel root layout, dove questo
          componente è montato: l'avviso della regola riguarda il router pages/. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {consentDefaultScript}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {gtmSnippet}
      </Script>
    </>
  )
}

export function GtmNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
