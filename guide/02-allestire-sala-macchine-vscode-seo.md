# Guida 2 (Revisionata e Corretta): Allestire la Sala Macchine — VSCode per siti dinamici e SEO-Ready

Se vogliamo che il nostro agente AI costruisca un sito con un database, un form contatti funzionante e una struttura SEO da manuale, dobbiamo dargli gli attrezzi giusti nel nostro cantiere (VSCode). Non bastano più i componenti estetici; servono estensioni e configurazioni che gestiscano i dati e i metadati. Qui sotto ogni azione è spiegata con **cosa fa**, **perché serve** e **a cosa prepara il progetto**.

---

## 🧩 1. Il Marketplace delle Estensioni: Gli attrezzi infrastrutturali

Apri la tab Extensions in VSCode (`Ctrl+Shift+X`). Installa queste estensioni reali e verificate:

### Per la gestione del codice e dei dati

- **Dotenv** (`mikestead.dotenv`) — *Cosa fa:* Aggiunge syntax highlighting ai file `.env`, rendendo leggibili le variabili d'ambiente. *Perché:* Le chiavi API di Supabase, Resend e altri servizi vanno tenute in file `.env` (mai nel codice). Questo file **non va caricato su GitHub** — lo escluderai con `.gitignore`. L'estensione ti aiuta a non sbagliare sintassi.

- **GitLens** (`eamodio.gitlens`) — *Cosa fa:* Mostra chi ha scritto ogni riga di codice, la cronologia delle modifiche, e integra strumenti Git avanzati. *Perché:* Essendo un progetto da zero, GitLens ti dà visibilità su ogni cambiamento dell'agente AI, così puoi accettare, confrontare o annullare modifiche con precisione.

### Per la SEO e i dati strutturati

- **Schema.org Snippet Generator** non serve come estensione separata: i dati strutturati JSON-LD si scrivono a mano (o tramite l'agente AI) come semplici blocchi JSON in un file `.jsx`. Per Google è fondamentale avere questi dati per il posizionamento locale e i rich snippet. *Perché:* Quando l'agente creerà il componente SEO centralizzato, i dati strutturati (tipo, indirizzo, telefono, recensioni) saranno in un unico file JSON richiamabile.

### Per lo sviluppo React

- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) — *Cosa fa:* Fornisce scorciatoie per generare componenti React, hook, import. *Perché:* Riduce il tempo speso a digitare boilerplate e permette all'agente (o a te in revisione manuale) di scrivere componenti più velocemente.

- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — *Cosa fa:* Autocompletamento, preview dei colori e controllo errori per classi Tailwind. *Perché:* Tailwind CSS sarà probabilmente la scelta migliore per lo styling di questo progetto (nei prossimi passi decideremo se usarlo o alternative come CSS Modules).

### Per il debugging e la qualità

- **Error Lens** (`usernamehw.errorlens`) — *Cosa fa:* Mostra errori e warning direttamente sulla riga di codice (non solo nel pannello Problems). *Perché:* Quando l'agente genera codice, Error Lens ti fa vedere in tempo reale se c'è un errore di sintassi o un tipo sbagliato, senza aspettare la compilazione.

---

## ⚙️ 2. La Strategia dei File: Preparare lo scheletro "Infrastrutturale"

Per evitare che l'IA crei una "casa vuota", dobbiamo impostare una struttura di cartelle che preveda già la logica dei dati, del routing e della SEO. Quando l'agente crea il progetto, l'architettura deve essere organizzata così:

```
/src
├── /components      # Componenti UI riutilizzabili (Header, Footer, ContactForm, Hero, etc.)
├── /pages           # Ogni file rappresenta una pagina (Home, About, Contact, etc.)
├── /services        # Logica di backend: chiamate API a Supabase, Resend, etc.
├── /seo             # Componenti per meta-tag dinamici e dati strutturati JSON-LD
├── /assets          # Immagini, font, icone
├── /hooks           # Custom hook React (es. useContactForm, useSEO)
├── /lib             # Utility e configurazioni (es. client Supabase, costanti)
├── .env             # Variabili d'ambiente (NON va su GitHub)
└── .gitignore       # Esclude .env, node_modules, /dist
```

*Cosa fa ogni cartella:*
- **components/** — Pezzi visivi atomici. L'agente li costruirà su indicazione.
- **pages/** — Qui React Router (libreria necessaria per navigare tra pagine) decide quale componente mostrare in base all'URL. *Perché senza routing non puoi avere pagine separate.*
- **services/** — Contiene funzioni asincrone pulite (es. `sendContactForm()`, `fetchProjects()`). Separare i servizi dalla UI rende il codice testabile e modificabile senza toccare l'interfaccia.
- **seo/** — Un componente `<SEOProvider>` o `<PageMeta>` che l'agente applica a ogni pagina. *Perché:* Google legge i meta-tag per capire il contenuto di ogni URL. Un unico componente centralizzato evita di dimenticare titoli e descrizioni.
- **.env** e **.gitignore** — Protezione. Se `.env` finisce su GitHub, le tue chiavi API sono pubbliche. Il `.gitignore` è il vero strumento di sicurezza.

---

## 🗄️ 3. L'Infrastruttura Sotto il Cofano: La scelta dei componenti

Queste sono le librerie e i servizi reali che useremo. Ogni scelta è motivata.

### Il Form Contatti e le Email

**Scelta: Resend** (API per email transazionali) + **React Hook Form** (gestione form lato client).

*Cosa fa:* L'utente compila nome, email e messaggio. Il componente ContactForm valida i campi (React Hook Form) e invia i dati a una funzione in `/services/contact.js` che chiama l'API di Resend. L'email arriva nella tua casella, tracciata e senza finire nello spam.

*Perché Resend e non PHP o Formspree:*
- PHP richiede un server che lo esegua e spesso finisce in spam.
- Formspree è più semplice ma meno controllabile (i dati passano da un terzo intermediario).
- Resend è un'API moderna, ha una SDK per JavaScript/React, offre tracking e piani gratuiti (100 email/giorno). Il codice è pulito e tutto sotto il tuo controllo.

*Perché React Hook Form:* Riduce i re-render del componente durante la digitazione. Per l'agente AI, è una libreria prevedibile con una sintassi chiara.

### Il Database

**Scelta: Supabase.**

*Cosa fa:* Supabase è un database PostgreSQL con API REST e SDK in tempo reale. Salveremo i contatti (nome, email, messaggio, data) in una tabella `contacts` e, se serve, i progetti del portfolio in una tabella `projects`.

*Perché Supabase e non Firebase:*
- Firebase usa Firestore, un database NoSQL (documenti, non tabelle relazionali).
- Supabase usa PostgreSQL (tabelle, relazioni, SQL). È più potente per dati strutturati come un portfolio o un CRM.
- Entrambi hanno piani gratuiti, ma PostgreSQL è uno standard universale del settore. Se in futuro volessi migrare o connettere altri tool, con Supabase hai più compatibilità.

*Perché ti serve:* Per non perdere i lead del form contatti, per gestire i progetti del portfolio dinamicamente (aggiungere/rimuovere senza toccare codice) e per qualsiasi dato tu voglia rendere persistente.

### L'Armatura SEO

**Scelta: React Helmet** (`react-helmet-async`).

*Cosa fa:* Ogni pagina avrà un componente `<Helmet>` che imposta dinamicamente `<title>`, `<meta name="description">`, `<meta property="og:...">` (Open Graph per social), `<script type="application/ld+json">` (dati strutturati).

*Perché React Helmet e non "funzioni native di Vite":* Vite non ha funzioni SEO native. Next.js (un altro framework) le ha, ma noi usiamo Vite+React (scelto in Guida 1). **React Helmet è la libreria standard per le SPA React** e funziona su qualsiasi stack.

*Perché ti serve:* Senza meta-tag, Google non capisce cosa tratta ogni pagina. Con Helmet, l'agente può impostare titoli e descrizioni unici per Home, About, Portfolio, Contatti — esattamente come fa Yoast su WordPress, ma lato codice e senza plugin.

### Il Routing

**Scelta: React Router** (`react-router-dom`).

*Cosa fa:* Permette di definire percorsi (es. `/`, `/about`, `/contact`) e associare a ciascuno un componente pagina.

*Perché ti serve:* Senza routing hai una pagina sola. Per un sito personal brand servono almeno Home, Portfolio, Chi Sono, Contatti. React Router è lo standard de facto, supportato da ogni guida e da qualsiasi agente AI.

### Lo Styling

**Scelta consigliata: Tailwind CSS.**

*Cosa fa:* Invece di scrivere CSS personalizzato, applichi classi direttamente nel JSX (`className="text-xl font-bold text-blue-600"`).

*Perché:* L'agente AI produce codice con Tailwind in modo molto più rapido e coerente rispetto al CSS custom. Le classi sono semantiche, il bundle finale è piccolo (Tailwind elimina il CSS non usato in produzione) e il design system è prevedibile. Per un personal brand, è la via più veloce per un risultato professionale.

*Alternativa:* CSS Modules (se preferisci fogli di stile separati). L'agente le supporta entrambe. Scegli in base alle tue preferenze.

---

## 💬 4. Come istruire l'Agente nel Terminale (Livello Direzione Lavori)

Ora che il cantiere è configurato con questa mentalità, il linguaggio da Architetto diventa strutturale. Non chiedere "disegnami una pagina contatti" — dai specifiche tecniche.

Nel terminale di VSCode, usando l'agente, il primo comando sarà:

> "Crea un nuovo progetto Vite + React con JavaScript. Installa e configura: react-router-dom per il routing, react-helmet-async per i meta-tag SEO, e tailwindcss per lo styling. Predisponi la struttura di cartelle: /pages, /components, /services, /seo, /assets, /hooks. Crea un file .env vuoto e un .gitignore che escluda .env e node_modules. Poi installa @supabase/supabase-js e prepara un file /lib/supabaseClient.js con la connessione al database (lascia le chiavi come placeholder nel .env). Infine installa @react-hook-form e prepara uno scheletro di servizio contatti in /services/contact.js con un TODO per l'integrazione Resend."

*Perché questo prompt e non uno più generico:*
- Nomina librerie specifiche (l'agente non deve "indovinare").
- Chiede file e cartelle concrete (non interpretazioni astratte).
- Lascia placeholder e TODO (evita che l'agente scriva codice incompleto e lo dia per finito).
- Include sicurezza (.gitignore) fin dal primo comando.

---

## 📍 Il Cantiere è Solido

La differenza tra questa guida e la precedente è fondamentale: prima costruivamo una demo. Ora impostiamo un'infrastruttura professionale. L'agente sa che:
- ogni pagina ha routing, meta-tag e dati strutturati
- ogni form invia dati a un servizio esterno via API
- ogni credenziale sensibile sta in `.env`, fuori da GitHub
- ogni componente è separato per responsabilità

Nella Guida 3 vedremo come connettere Supabase, attivare il form contatti con Resend, e far parlare il database con l'interfaccia attraverso gli agenti AI.
