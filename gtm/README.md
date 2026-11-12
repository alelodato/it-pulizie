# Google Tag Manager – I.T. Pulizie

Contenitore pronto da importare per la campagna Google Ads **Pulizie condominiali Roma Sud / EUR**
(landing `/pulizie-condominiali-roma-sud`, lancio 23 novembre 2026).

## Cosa fa il sito (già nel codice)

- **Consent Mode v2**: prima di GTM il sito imposta il consenso predefinito `denied` per
  `ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage` (`wait_for_update: 500`),
  insieme a `ads_data_redaction` e `url_passthrough`. Se il visitatore ha già scelto, l'`update` parte subito,
  prima di `gtm.js`. Il banner cookie invia `gtag('consent','update')` e l'evento `consent_choice`.
- **Eventi nel dataLayer** (senza dati personali):

| Evento | Quando | Parametri |
|---|---|---|
| `generate_lead` | invio del modulo sopralluogo riuscito | `form_name` = `sopralluogo_condomini`, `lead_role` (`amministratore`, `consigliere`, `condomino`, `altro`) |
| `click_phone` | click su un link `tel:` della landing | `link_location` (`hero`, `contatti`, `header`, `footer`) |
| `click_whatsapp` | click su un link WhatsApp della landing | `link_location` (`preventivo`, `contatti`, `header`, `footer`) |
| `consent_choice` | scelta nel banner cookie | `consent_choice` (`accepted`, `rejected`) |

## Contenuto del contenitore

- **Costanti** da sostituire: `CONST - GA4 ID misurazione`, `CONST - Ads ID conversione`,
  `CONST - Ads label Lead modulo`, `CONST - Ads label Click WhatsApp`, `CONST - Ads label Click telefono`
- **Variabili dataLayer**: `DLV - form_name`, `DLV - lead_role`, `DLV - link_location`
- **Variabili integrate**: Page URL, Page Hostname, Page Path, Referrer, Event
- **Trigger**: `CE - generate_lead`, `CE - click_whatsapp`, `CE - click_phone`
- **Tag**:
  - `Google tag - GA4` → Initialization - All Pages
  - `Linker conversioni` (con URL passthrough) → All Pages
  - `GA4 - generate_lead`, `GA4 - click_whatsapp`, `GA4 - click_phone`
  - `Ads - Lead modulo`, `Ads - Click WhatsApp`, `Ads - Click telefono`

I tag Google rispettano in automatico Consent Mode: non serve aggiungere trigger di consenso.

Per controllare il file dopo una modifica: `npm run check:gtm`.

## Passi manuali

### 1. Creare le conversioni in Google Ads

In **Obiettivi > Conversioni > Riepilogo > + Nuova azione di conversione > Sito web**, scegli
"Configura manualmente con il codice" e crea tre azioni:

| Nome | Categoria | Obiettivo | Valore | Conteggio |
|---|---|---|---|---|
| Lead modulo sopralluogo | Invia modulo per i lead | **Principale** | (facoltativo) | **Una** |
| Click WhatsApp | Contatto | **Secondaria** | – | **Una** |
| Click telefono | Contatto | **Secondaria** | – | **Una** |

Per ognuna, in "Configurazione del tag > Utilizza Google Tag Manager", annota **ID conversione** e
**Etichetta conversione**. L'ID conversione è lo stesso per tutte e tre.

> La campagna va ottimizzata solo sulla conversione principale (lead modulo). WhatsApp e telefono restano
> secondarie: si vedono nei report ma non guidano le offerte. Se in seguito vuoi farle contare, impostale
> come principali.

### 2. Importare il contenitore

1. GTM > **Amministrazione > Importa contenitore**
2. File: `gtm/gtm-itpulizie-container.json`
3. Area di lavoro: quella esistente (o una nuova)
4. Opzione di importazione: **Unisci**, poi **Rinomina tag, trigger e variabili in conflitto**
5. Controlla l'anteprima delle modifiche e conferma

### 3. Sostituire le 5 costanti

In **Variabili > Variabili definite dall'utente**:

| Costante | Valore da inserire |
|---|---|
| `CONST - GA4 ID misurazione` | ID dello stream web GA4, es. `G-AB12CD34EF` |
| `CONST - Ads ID conversione` | **solo le cifre** dell'ID conversione, es. `123456789` (non `AW-123456789`: il tag di conversione aggiunge già `AW-`) |
| `CONST - Ads label Lead modulo` | etichetta della conversione "Lead modulo sopralluogo" |
| `CONST - Ads label Click WhatsApp` | etichetta della conversione "Click WhatsApp" |
| `CONST - Ads label Click telefono` | etichetta della conversione "Click telefono" |

### 4. Collegare il sito

Nell'hosting (es. Vercel > Settings > Environment Variables) imposta `NEXT_PUBLIC_GTM_ID` con l'ID del
contenitore (`GTM-XXXXXXX`) e fai un nuovo deploy: le variabili `NEXT_PUBLIC_` vengono lette al momento della build.

### 5. Provare in Anteprima

1. GTM > **Anteprima**, inserisci `https://www.itpulizie.it/pulizie-condominiali-roma-sud?gclid=test123&utm_source=google&utm_medium=cpc`
2. Prima di accettare i cookie, in Tag Assistant > Consenso: tutto `Denied` tranne functionality e security
3. Clicca **Accetta**: in Consenso ad e analytics diventano `Granted`
4. Clicca il numero di telefono e il link WhatsApp: devono partire `GA4 - click_*` e `Ads - Click *`
5. Invia il modulo con dati di prova: devono partire `GA4 - generate_lead` e `Ads - Lead modulo`.
   La richiesta di prova arriva davvero via email, quindi avvisa la cliente.
6. Riapri "Preferenze cookie" dal footer, clicca **Rifiuta** e verifica il ritorno a `Denied`

### 6. Pubblicare

**Invia > Pubblica**, con nome versione per esempio "Landing condomini Roma Sud – conversioni".

### 7. Segnare generate_lead come evento chiave in GA4

GA4 > **Amministrazione > Visualizzazione dati > Eventi**: quando `generate_lead` compare (dopo il primo invio,
anche fino a 24 ore), attiva **Contrassegna come evento chiave**. In alternativa crealo subito da
**Eventi chiave > Nuovo evento chiave** con nome `generate_lead`.

Non importare in Google Ads l'evento chiave GA4 come conversione: la conversione principale è già
misurata dal tag Ads e si otterrebbe un doppio conteggio.
