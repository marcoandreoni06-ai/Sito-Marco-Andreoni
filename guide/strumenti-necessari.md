# Lista completa degli strumenti necessari

Tutto ciò che serve per costruire il sito, dal primo clic al deploy. Ogni voce include: a cosa serve, se è gratuito, e dove trovarlo.

---

## 1. Runtime di base (obbligatorio — installare per primo)

| Strumento | A cosa serve | Costo | Download |
|---|---|---|---|
| **Node.js (LTS)** | Motore JavaScript che esegue comandi nel terminale, installa pacchetti e fa girare il progetto in locale. Senza questo non si avvia nulla. | Gratuito | [nodejs.org](https://nodejs.org) — versione LTS a sinistra |

---

## 2. Editor (obbligatorio)

| Strumento | A cosa serve | Costo | Download |
|---|---|---|---|
| **Visual Studio Code** | Editor di codice professionale. È il "cantiere" dove lavorano l'agente AI e i file del progetto. | Gratuito | [code.visualstudio.com](https://code.visualstudio.com) |

---

## 3. Estensioni VSCode

### 3.1 Sviluppo React e codice

| Estensione | ID | A cosa serve | Costo |
|---|---|---|---|
| **ES7+ React/Redux/React-Native snippets** | `dsznajder.es7-react-js-snippets` | Scorciatoie per generare componenti React, hook, import. Riduce il boilerplate manuale. | Gratuito |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Autocompletamento classi Tailwind, preview colori, linting CSS-in-JS. | Gratuito |
| **Auto Rename Tag** | `formulahendry.auto-rename-tag` | Rinomina automaticamente il tag di chiusura quando modifichi quello di apertura (JSX/HTML). | Gratuito |

### 3.2 Gestione codice sorgente e Git

| Estensione | ID | A cosa serve | Costo |
|---|---|---|---|
| **GitLens** | `eamodio.gitlens` | Mostra chi ha scritto ogni riga, cronologia file, blame annotator. Indispensabile quando lavori con agenti AI per tenere traccia delle modifiche. | Gratuito (GitLens+ a pagamento, funzioni base gratis) |
| **GitHub Pull Requests** | `GitHub.vscode-pull-request-github` | Gestione PR, issue e review direttamente da VSCode. | Gratuito |

### 3.3 Qualità e debug

| Estensione | ID | A cosa serve | Costo |
|---|---|---|---|
| **Error Lens** | `usernamehw.errorlens` | Mostra errori e warning direttamente sulla riga di codice, non solo nel pannello Problems. Vedere gli errori in tempo reale mentre l'agente scrive codice velocizza le correzioni. | Gratuito |
| **ESLint** | `dbaeumer.vscode-eslint` | Analisi statica del codice: trova errori, stili non conformi e potenziali bug in JS/JSX. | Gratuito |
| **Prettier** | `esbenp.prettier-vscode` | Formattatore automatico: allinea indentazione, virgolette, virgole. Codice uniforme senza pensarci. | Gratuito |
| **Path Intellisense** | `christian-kohler.path-intellisense` | Autocompletamento percorsi file nelle import e nei tag. Riduce errori di path. | Gratuito |

### 3.4 Produttività e ambiente

| Estensione | ID | A cosa serve | Costo |
|---|---|---|---|
| **Dotenv** | `mikestead.dotenv` | Syntax highlighting per file `.env`. Leggibilità delle variabili d'ambiente. | Gratuito |
| **vscode-icons** | `vscode-icons-team.vscode-icons` | Icone chiare per ogni tipo di file nell'Explorer. Riconoscimento visivo immediato. | Gratuito |

---

## 4. Agenti AI (almeno uno dei due)

| Strumento | A cosa serve | Costo |
|---|---|---|
| **Claude Code** | Agente AI nel terminale che legge tutto il progetto (file, cartelle, struttura) e modifica codice su istruzioni in linguaggio naturale. Si installa con: `npm install -g @anthropic-ai/claude-code` e si avvia con `claude`. | Incluso in abbonamento **Claude Pro** ($17/mese). Oppure configurabile con chiave API propria di Anthropic, OpenAI, o Google Gemini. |
| **Open Code** | Alternativa open source a Claude Code. Stesso concetto (agente nel terminale), ma il codice è pubblico, la privacy è garantita (puoi non inviare nulla fuori dal PC), e puoi scegliere qualsiasi modello AI senza lock-in. Si installa con: `npm install -g opencode-ai`. | **Gratuito** (paghi solo le API del modello che scegli: Gemini gratis via tier gratuito, GPT costa in base all'uso) |

**Consiglio:** Usa Claude Code se hai già Claude Pro e vuoi partire subito. Usa Open Code se vuoi controllo totale su privacy, costi e modello AI.

### Opzionale: Continue.dev

| Strumento | A cosa serve | Costo |
|---|---|---|
| **Continue.dev** | Estensione VSCode che aggiunge una chat AI a fianco dell'editor. Non sostituisce Claude/Open Code (che lavorano su tutto il progetto), ma è utile per modifiche rapide sui file aperti. | **Gratuito** (open source, richiede chiave API del modello) |

---

## 5. Servizi cloud (account gratuiti da creare)

| Servizio | A cosa serve | Costo |
|---|---|---|
| **GitHub** | Archivio cloud del codice, tracciamento versioni (Git), base per il deploy automatico su Cloudflare. | **Gratuito** (repo pubblici illimitati). Abbonamento Pro opzionale per repo privati avanzati. |
| **Supabase** | Database PostgreSQL cloud. Salva contatti, lead, portfolio. Offre API REST, autenticazione e storage. | **Gratuito** (fino a 500MB database, 2GB storage, 50.000 richieste/mese). Abbastanza per un personal brand. |
| **Cloudflare Pages** | Hosting statico + serverless functions. Compila il progetto Vite, lo pubblica su CDN globale, e gestisce dominio + SSL. Le Pages Functions fanno da backend sicuro per Resend. | **Gratuito** (500 build/mese, 1GB storage, 100.000 richieste/giorno). Dominio personalizzato gratis. |
| **Resend** | API per invio email transazionali. Invia notifiche del form contatti senza server SMTP, con alta recapitabilità. | **Gratuito** (100 email/giorno). 3.000 email/mese gratis. |
| **Google Search Console** | Monitoraggio indicizzazione Google, invio sitemap, analisi errori di scansione e parole chiave. | **Gratuito** |

---

## 6. Dipendenze npm (si installano nel progetto via agente AI)

Queste non si installano una volta sola — vanno aggiunte progetto per progetto con `npm install` (o tramite prompt dell'agente).

| Pacchetto | A cosa serve | Costo |
|---|---|---|
| `@supabase/supabase-js` | Client ufficiale Supabase per connettere React al database PostgreSQL. | Gratuito (open source, MIT) |
| `react-helmet-async` | Gestione dinamica dei meta-tag nel `<head>` per SEO per-pagina. | Gratuito (MIT) |
| `react-router-dom` | Routing lato client: navigazione tra pagine senza ricaricare il browser. | Gratuito (MIT) |
| `react-hook-form` | Gestione form con validazione, minimi re-render, pattern dichiarativo. | Gratuito (MIT) |
| `tailwindcss` + `postcss` + `autoprefixer` | Framework CSS utility-first. Styling rapido, bundle minimo in produzione. | Gratuito (MIT) |
| `vite-plugin-sitemap` | Generazione automatica di `sitemap.xml` a ogni build. | Gratuito (MIT) |

---

## 7. Riepilogo: cosa si paga davvero

| Categoria | Costo mensile |
|---|---|
| Node.js | **€0** |
| VSCode | **€0** |
| Estensioni VSCode (tutte) | **€0** |
| Claude Code (se scegli Claude) | €17/mese (se hai già Claude Pro, non paghi extra) |
| Open Code (se scegli Open Code) | **€0** + costo API modello (Gemini: €0 con tier gratuito / GPT: pochi centesimi a sessione) |
| GitHub | **€0** |
| Supabase | **€0** (fino a 500MB) |
| Cloudflare Pages | **€0** |
| Resend | **€0** (100 email/giorno) |
| Google Search Console | **€0** |
| **Totale con Claude Code** | **€17/mese** (se già non hai Claude Pro) |
| **Totale con Open Code** | **€0** + API model (possibile €0 se usi Gemini free tier) |

---

## Ordine di installazione consigliato

1. **Node.js LTS** — prerequisito di tutto
2. **VSCode** — il cantiere
3. **Estensioni VSCode** — 11 estensioni dalla sezione 3
4. **Claude Code** o **Open Code** — l'operaio
5. **GitHub** + **Git** — account e CLI
6. **Supabase** — account e progetto
7. **Resend** — account e chiave API
8. **Cloudflare Pages** — account (collegato a GitHub)
9. **Dipendenze npm** — installate via agente nel primo prompt
10. **Google Search Console** — dopo il deploy
