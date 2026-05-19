# Guida 4 (Revisionata e Corretta): L'Armatura SEO e l'Ottimizzazione per i Motori di Ricerca

Finora abbiamo costruito una struttura visiva (Guida 2) e cablato i motori interni per gestire dati e contatti (Guida 3). Ma se Google non sa che esisti, la tua splendida infrastruttura rimane un'insegna spenta nel deserto.

Chi viene da WordPress è abituato a plugin mastodontici come Yoast SEO. Questi plugin fanno un buon lavoro, ma aggiungono script pesanti che rallentano il caricamento. Noi faremo tutto in modo nativo, leggero e integrato nel codice.

**Una precisazione importante:** React è una **SPA (Single Page Application)**. Il server invia un HTML quasi vuoto e JavaScript disegna tutto lato client. Googlebot (dal 2019) esegue JavaScript, quindi **indicizza comunque le SPA moderne**. Ma per crawler meno evoluti e per garantire la massima compatibilità, vedremo anche le opzioni di prerendering. I meta-tag dinamici (punto 1) e la sitemap (punto 4) risolvono la maggior parte dei problemi.

---

## 🔍 Cosa costruiremo in questa guida

Lavoriamo su quattro pilastri:

1. **Meta-tag dinamici** — Ogni pagina ha titolo, descrizione e tag Open Graph unici.
2. **Dati strutturati JSON-LD** — Google capisce il contesto del tuo business (Rich Snippet).
3. **Performance (Lighthouse 100/100)** — Core Web Vitals, immagini, font, bundle.
4. **Sitemap + robots.txt** — La mappa per i crawler.

---

## 🏷️ 1. Meta-Tag Dinamici con React Helmet Async

I robot di Google leggono il `<head>` della pagina per capire titolo, descrizione e immagini da mostrare nei risultati di ricerca e nei social (tag Open Graph).

### 1.1 Installazione e setup iniziale (passo critico che molti saltano)

Prima di usare `react-helmet-async`, devi avvolgere l'intera app in un `<HelmetProvider>`, altrimenti non funziona.

#### Istruzione per l'agente nel terminale:

> "Installa `react-helmet-async`. Poi apri il file principale dell'app (es. `src/main.jsx` o `src/App.jsx`) e importa `HelmetProvider` da `react-helmet-async`. Avvolgi l'intero albero dei componenti con `<HelmetProvider>`."

L'agente genererà qualcosa come:

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
```

*Perché `HelmetProvider`:* React Helmet Async usa il Context di React per passare i tag `<head>` dal componente figlio al provider. Senza questo wrapper, i meta-tag non vengono mai iniettati nell'HTML.

### 1.2 Creare il componente SEO riutilizzabile

#### Istruzione per l'agente:

> "Crea un componente `/src/components/SEO.jsx` che accetta queste props: `title`, `description`, `ogImage`, `ogType` (default 'website'), `canonicalUrl`, e `robots` (default 'index, follow'). Usa `Helmet` da `react-helmet-async` per impostare:
> - `<title>` con il formato 'Titolo | Nome Sito'
> - `<meta name="description">`
> - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`
> - `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
> - `<link rel="canonical" href="...">`
> - `<meta name="robots" content="...">`"

*Perché `canonicalUrl`:* Se la stessa pagina è raggiungibile da URL diversi (es. `/contatti` e `/contact`), Google potrebbe vederle come duplicati e penalizzarti. Il tag canonical dice a Google qual è l'URL principale da indicizzare.

*Perché `robots` separato:* Alcune pagine (es. una pagina "Grazie" post-form) non vanno indicizzate. Poter impostare `noindex` per-pagina è fondamentale.

Il risultato finale ti permetterà di usare in ogni pagina:

```jsx
<SEO 
  title="Chi Sono | Marco Andreoni"
  description="Studente in Comunicazione e Media Digitali, freelance specializzato in automazione AI e marketing strategico."
  ogImage="/images/og-default.jpg"
  canonicalUrl="https://miosito.com/chi-sono"
/>
```

---

## ⚠️ 1.3 Il problema della SPA e come risolverlo

**Problema reale:** React Helmet modifica il `<head>` via JavaScript *dopo* che la pagina è stata caricata. Googlebot esegue JS, quindi funziona. Ma alcuni crawler (Pinterest, Telegram, LinkedIn) potrebbero non aspettare il JS e leggere solo l'HTML iniziale, che è vuoto.

**Soluzioni in ordine di complessità crescente:**

| Soluzione | Cosa fa | Complessità |
|---|---|---|
| **SSR (Server-Side Rendering)** | React gira sul server, produce HTML già completo. Si usa con framework come Next.js o con Vite + `vite-plugin-ssr` | Alta (richiede riscrittura) |
| **SSG (Static Site Generation)** | L'HTML viene generato al build time. Vite lo supporta con `vite-plugin-ssg` | Media |
| **Prerender (es. prerender.io)** | Un servizio esterno cattura l'HTML renderizzato e lo serve ai crawler | Bassa (configurazione una tantum) |

**Consiglio per il tuo sito personal brand:** Inizia con React Helmet + Google Search Console (monitora se Google vede i meta-tag). Se noti problemi con social preview, aggiungi un prerender tramite Cloudflare Workers (lo vedremo in Guida 5). Se il sito cresce, valuta la migrazione a Next.js o Astro.

---

## 🧠 2. Dati Strutturati JSON-LD per i Rich Snippet

I dati strutturati sono blocchi JSON che dicono a Google esattamente cosa rappresenta il tuo sito: un'azienda locale, una persona, un servizio. Google li usa per mostrare **Rich Snippet** — quei risultati arricchiti con stelline, foto, orari.

### 2.1 Creare un file di configurazione dei dati strutturati

Invece di scrivere JSON-LD dentro SEO.jsx (confonderebbe le responsabilità), creiamo un file dedicato richiamabile da tutte le pagine.

#### Istruzione per l'agente:

> "Crea un file `/src/lib/structuredData.js` che esporti funzioni per generare JSON-LD. Per il sito personal brand, crea almeno queste:
> - `getOrganizationSchema()` — tipo 'Organization' con nome, logo, URL, contatti, indirizzo, social. Usa dati centralizzati modificabili.
> - `getPersonSchema()` — tipo 'Person' con nome, descrizione, jobTitle, sameAs (link social). Alternativa a Organization se ti presenti come persona fisica.
> - `getBreadcrumbSchema(items)` — tipo 'BreadcrumbList' per la navigazione. Accetta un array di label/url.
>
> Ogni funzione deve restituire l'array JSON-LD serializzato (con `JSON.stringify`) pronto per essere iniettato in un `<script type="application/ld+json">`."

### 2.2 Integrare JSON-LD in SEO.jsx

Poi aggiorna SEO.jsx per accettare una prop opzionale `structuredData` e iniettare lo script JSON-LD nell'head. Così ogni pagina può avere dati strutturati unici.

#### Istruzione per l'agente:

> "Modifica `/src/components/SEO.jsx` per accettare una prop `structuredData` (un oggetto o array di oggetti). Se fornita, inietta `<script type="application/ld+json">{JSON.stringify(structuredData)}</script>` nell'head tramite Helmet."

Esempio d'uso su una pagina:

```jsx
import SEO from '../components/SEO'
import { getOrganizationSchema, getBreadcrumbSchema } from '../lib/structuredData'

const HomePage = () => (
  <>
    <SEO 
      title="Home | Marco Andreoni"
      description="Professionista freelance in comunicazione digitale e automazione AI."
      structuredData={[getOrganizationSchema(), getBreadcrumbSchema([{ label: 'Home', url: '/' }])]}
    />
    {/* contenuto della pagina */}
  </>
)
```

*Perché separare in `/lib/structuredData.js`:*
- I dati dell'azienda sono centralizzati (se cambi indirizzo, lo cambi in un posto solo).
- Le funzioni sono testabili indipendentemente.
- SEO.jsx rimane generico e riutilizzabile.

---

## ⚡ 3. Performance (Lighthouse 100/100)

Google usa i **Core Web Vitals** come fattore di ranking:
- **LCP** (Largest Contentful Paint) — quanto ci mette l'elemento più grande a caricarsi (< 2.5s)
- **FID** (First Input Delay) — quanto è reattivo il sito (< 100ms)
- **CLS** (Cumulative Layout Shift) — quanto "saltano" gli elementi durante il caricamento (< 0.1)

Con Vite + Tailwind siamo già a buon punto. Ecco le ottimizzazioni concrete.

### 3.1 Immagini: il problema #1 delle performance

Le immagini non ottimizzate sono la causa principale di LCP alto.

#### Istruzione per l'agente:

> "Esamina tutti i componenti in `/src/components` e verifica che:
> 1. Ogni tag `<img>` abbia `loading="lazy"` (per immagini sotto la piega) o `loading="eager"` (per la hero sopra la piega).
> 2. Ogni `<img>` abbia `width` e `height` espliciti per eliminare il CLS.
> 3. Se ci sono immagini locali in `/src/assets`, convertile in formato WebP (usa l'estensione VSCode 'WebP Converter' o uno script).
> 4. Per immagini di sfondo CSS, usa `<img>` con object-fit invece di background-image (più performante e accessibile)."

*Perché `width` e `height` espliciti:* Senza dimensioni, il browser non sa quanto spazio riservare all'immagine finché non la carica. Quando arriva, la pagina si "sposta" (CLS). Anche con `loading="lazy"`, se non specifichi dimensioni il CLS peggiora.

### 3.2 Font: caricamento asincrono

Se carichi font da Google Fonts o simili, il browser blocca il rendering finché non li scarica.

#### Istruzione per l'agente:

> "Aggiungi nel file HTML principale (es. `index.html`) all'interno di `<head>`:
> - Un tag `<link rel="preconnect" href="https://fonts.googleapis.com">`
> - Un tag `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
>
> Poi, nel CSS globale, aggiungi `font-display: swap` per ogni regola `@font-face`. Questo mostra prima un font di sistema e poi lo sostituisce con il font custom quando caricato."

*Perché `font-display: swap`:* Senza questa proprietà, il browser nasconde il testo finché il font non è caricato (**FOIT — Flash of Invisible Text**). Con `swap`, il testo è leggibile immediatamente con un font di fallback, e il font custom arriva dopo senza bloccare la lettura.

### 3.3 Code splitting e bundle analysis

Le app React tendono a diventare pesanti. Dobbiamo assicurarci che il bundle sia minimo.

#### Istruzione per l'agente:

> "Installa `vite-plugin-imagemin` o usa il `import()` dinamico di React per il code splitting. Poi verifica che le pagine siano caricate con `React.lazy()` e `<Suspense>` invece di import statici. Ogni pagina deve essere un chunk separato che si carica solo quando serve."

*Perché:* Il carrello della spesa di un supermercato è più veloce da trasportare se lo fai in più viaggi. `React.lazy()` permette di caricare ogni pagina solo quando l'utente ci naviga, riducendo il JS iniziale del 60-80%.

### 3.4 Misurare, non indovinare

#### Istruzione per l'agente:

> "Aggiungi un commento all'inizio di `index.html` con le istruzioni di test: 'Apri il sito, premi F12, vai su Lighthouse, clicca Generate Report. Obiettivo: 100/100 in Performance, Accessibility, Best Practices, SEO.'"

*Perché:* Le ottimizzazioni vanno misurate. Potresti aver risolto tutto ma un singolo script esterno potrebbe abbassare il punteggio.

---

## 🗺️ 4. Sitemap e Robots.txt

Ogni sito professionale ha bisogno di:
- **sitemap.xml** — la mappa che dice a Google quali URL esistono, quando sono stati aggiornati e quanto sono importanti.
- **robots.txt** — dice ai crawler quali percorsi possono e non possono scansionare.

### 4.1 Generare la sitemap

Per un sito Vite + React con routing statico, `vite-plugin-sitemap` funziona ma devi specificare le rotte manualmente (Vite non può indovinare i percorsi di React Router).

#### Istruzione per l'agente:

> "Installa `vite-plugin-sitemap`. Poi in `vite.config.js`, configura il plugin con l'elenco delle rotte del sito (es. `/`, `/chi-sono`, `/portfolio`, `/contatti`), il nome del sito, e la data dell'ultima modifica. Assicurati che il `robots.txt` generato punti alla sitemap."

Configurazione esempio per `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://miosito.com',
      routes: [
        '/',
        '/chi-sono',
        '/portfolio',
        '/contatti',
        '/servizi',
      ],
      lastmod: new Date().toISOString(),
      priority: {
        '/': 1.0,
        '/chi-sono': 0.8,
        '/portfolio': 0.9,
        '/contatti': 0.7,
        '/servizi': 0.9,
      },
    }),
  ],
})
```

*Perché `priority`:* Dice a Google quali pagine sono più importanti. La home page ha priorità 1.0, le pagine secondarie scendono.

### 4.2 Configurare robots.txt

Se il plugin non genera robots.txt automaticamente, crealo manualmente.

#### Istruzione per l'agente:

> "Crea un file `/public/robots.txt` con:
> ```
> User-agent: *
> Allow: /
> Sitemap: https://miosito.com/sitemap.xml
> ```"

### 4.3 (Opzionale) Escludere pagine dalla scansione

Se hai pagine come "Grazie per il contatto", `/admin` o pagine in costruzione:

```txt
User-agent: *
Allow: /
Disallow: /grazie
Disallow: /admin

Sitemap: https://miosito.com/sitemap.xml
```

---

## 📋 5. Checklist finale SEO

Dopo aver implementato tutto, esegui queste verifiche prima del deploy:

- [ ] **React Helmet** — Apri ogni pagina, ispeziona il `<head>` (F12 → Elements): titolo, description, og:tag sono corretti?
- [ ] **JSON-LD** — Vai su [validator.schema.org](https://validator.schema.org/) e incolla l'URL (o il markup) del sito. Tutti i dati sono validi?
- [ ] **Lighthouse** — F12 → Lighthouse → Generate report. Tutti e 4 i punteggi sopra 90?
- [ ] **Sitemap** — Il file `sitemap.xml` esiste dopo la build? Contiene tutte le pagine?
- [ ] **Robots.txt** — Il file è accessibile su `https://miosito.com/robots.txt`? Punta alla sitemap?
- [ ] **Canonical** — Ogni pagina ha il suo tag canonical?
- [ ] **Immagini** — Tutte le immagini hanno `loading`, `width`, `height`? Sono in formato WebP?
- [ ] **Mobile** — Prova il sito da telefono o in modalità responsive (F12 → Toggle Device Toolbar). È tutto leggibile?
- [ ] **Google Search Console** — Dopo il deploy (Guida 5), invia la sitemap a Google Search Console e monitora gli errori.

---

## 📍 Riassunto — Cosa hai ora

1. **SEO.jsx** — Componente riutilizzabile per meta-tag, Open Graph, canonical e robots per-pagina.
2. **structuredData.js** — Funzioni centralizzate per JSON-LD Organization/Person/Breadcrumb.
3. **Performance** — Immagini lazy + dimensioni esplicite, font con `swap`, code splitting, WebP.
4. **Sitemap + robots.txt** — Generati automaticamente a ogni build.
5. **Checklist** — 10 punti da verificare prima del lancio.

Nella **Guida 5** vedremo come lanciare tutto su internet: GitHub per il codice, Cloudflare Pages per il deploy, dominio personalizzato, funzioni serverless per Resend, e Google Search Console per il monitoraggio.

Pronto a premere il pulsante rosso? 🚀
