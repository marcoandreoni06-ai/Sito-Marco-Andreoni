# Il mio flusso di lavoro, dall'idea al sito live — in una sola lettura

Vi faccio una domanda scomoda.
Quanti strumenti AI avete aperti in questo momento? Cursor, Claude, Copilot, qualche trial di Windsurf che avete installato tre settimane fa e non avete più toccato? Quante subscription avete attive, quanti crediti API comprati e mai usati fino in fondo?

Ho passato mesi a "litigare" con questi tool e quando dico litigare, intendo proprio litigare: sessioni di debug alle 11 di sera, finestre aperte in parallelo, agenti che si contraddicono a vicenda. Alla fine ho capito una cosa sola: il problema non erano gli strumenti. Il problema era che non avevo un sistema.

C'è poi un altro problema, forse ancora più sottile. Riuscite a far costruire all'AI quello che volete e questa è già una cosa non banale. Ma il progetto esiste sul vostro PC, in quella cartella con il nome provvisorio che non avete mai cambiato. Ed è lì che muore. Portarlo online è un altro discorso. Aggiornarlo senza rompere tutto è un altro discorso ancora. La prossima volta, probabilmente, ripartite da zero.

Oggi vi mostro come ho risolto. Non perché il mio sia l'unico modo, ma perché funziona, l'ho testato sul campo, e sono convinto che possa funzionare anche per voi.

---

## 🧠 Due miti da sfatare, subito

Il primo: "Per creare app e tool serve saper programmare." Falso. O almeno, non più vero come lo era qualche anno fa.

Il secondo, molto più insidioso: "Basta dire all'AI cosa vuoi e lei fa tutto." Anche questo è falso. Ed è quello che sta creando più aspettative disattese in giro.

La verità? Sta nel mezzo. E una volta che la capite, cambia tutto.

Immaginate di voler costruire una casa. Potete assumere il miglior muratore del mondo — veloce, preciso, instancabile, disponibile 24 ore su 24. Ma se quel muratore non ha un progetto in mano, cosa fa? Tira su muri. A caso. Con le aperture dove capita. E i muri storti, con le finestre a caso, non li vuole nessuno.

L'AI è quel muratore: straordinaria nell'esecuzione, cieca senza una guida. Più consapevolezza avete voi, quando ha senso usare un database, quando no, che infrastruttura regge il traffico che volete, perché si sceglie uno stack invece di un altro, più lei riesce a fare il suo lavoro bene.

Il vostro ruolo non è scrivere codice. È fare l'architetto: avere il progetto in testa, conoscere i materiali, sapere il perché di ogni scelta, e poi affidarsi agli operai giusti per l'esecuzione.

VSCode è il cantiere. Gli agenti AI sono gli operai. Voi coordinate il progetto.

---

## 🗺️ La mappa — prima di tutto

Prima di installare qualsiasi cosa, voglio mostrarvi dove stiamo andando. Il mio sistema si regge su cinque livelli. Oggi li vedete tutti insieme, ad alta quota. Nelle prossime guide scenderemo su ognuno.

Questa guida vi porta attraverso tutti e cinque in velocità, dall'installazione al sito live. Nelle prossime, smontiamo ogni livello pezzo per pezzo.

Andiamo. 🛠️

---

## 🔌 Prima di tutto: l'impianto elettrico

Ogni cantiere ha bisogno di corrente. Senza, i trapani non si accendono.

Nel nostro caso l'impianto elettrico si chiama **Node.js**: un motore che gira in silenzio sotto a quasi tutto quello che useremo: Claude Code, Open Code, React, Vite. Se non è installato, il Terminale non capirà nessuno dei comandi che gli daremo. Installatelo prima di qualsiasi altra cosa.

1. Andate su [nodejs.org](https://nodejs.org).
2. Scaricate la versione **LTS** — è quella consigliata, la trovate a sinistra.
3. Installazione standard: avanti, accetto, avanti, fine.

Fatto. L'impianto è attivo. Ora apriamo il cantiere.

---

## 🏗️ Livello 1: Il Cantiere — VSCode

Visual Studio Code è un editor di testo e di codice gratuito, sviluppato da Microsoft. È lo strumento su cui lavora la stragrande maggioranza dei team di sviluppo professionali al mondo. Il motivo per cui lo uso come base non è per fare i "fighi": è semplicemente il più potente, il più estendibile e il più integrato con gli agenti AI che ci interessano.

Per installarlo:
1. [code.visualstudio.com](https://code.visualstudio.com) — scaricate la versione per il vostro sistema.
2. Installazione standard, niente di speciale.

### Orientarsi: i pezzi del cantiere

Quando lo aprite per la prima volta sembra complicato. Non lo è. Ci sono cinque zone che contano, e basta.

- **La Barra delle Attività** — la colonna di icone a sinistra. Le quattro che userete di più:
  - 📁 Explorer — la struttura ad albero del progetto. Tutti i file e le cartelle, in un colpo d'occhio.
  - 🔍 Search — cerca dentro tutti i file del progetto in un istante. Fondamentale quando il progetto cresce.
  - 🔀 Source Control — qui si gestisce Git, il sistema che tiene traccia delle versioni del codice.
  - 🧩 Extensions — il marketplace. È qui che installiamo tutto.
- **L'Area dell'Editor** — il centro, la parte più grande. I file aperti vivono qui, in tab, esattamente come un browser.
- **Il Pannello Inferiore** — la parte in basso. Le tab che userete subito:
  - Terminal — la riga di comando integrata. Si apre con `Ctrl+`` su Windows o `Cmd+`` su Mac.
  - Problems — VSCode vi segnala in tempo reale se qualcosa non va nei file aperti.
- **La Barra di Stato** — la striscetta colorata in fondo allo schermo.
- **La Command Palette** — `Ctrl+Shift+P` su Windows, `Cmd+Shift+P` su Mac: da qui potete fare qualsiasi cosa in VSCode scrivendo il nome del comando.

---

## 🤖 Livello 2: Gli Operai Intelligenti

Questi non sono chatbot. Sono agenti autonomi che leggono l'intero progetto, ne capiscono la struttura, e agiscono: creano file, modificano codice, riorganizzano cartelle — in risposta alle vostre istruzioni in linguaggio naturale.

### Claude Code

Creato da Anthropic — la stessa società dietro Claude. Non si installa come un'app: vive nel Terminale.

**Come si installa:**
```bash
npm install -g @anthropic-ai/claude-code
```

**💰** È incluso nell'abbonamento Claude Pro da $17/mese.

**Come funziona:** lo avviate nella cartella del vostro progetto, e da quel momento ha accesso a tutto — ogni file, ogni cartella, l'intera struttura. Dategli un'istruzione e la esegue in autonomia.

**Il limite da sapere:** è uno strumento proprietario. Il vostro codice transita sui server di Anthropic.

> **💡 Tips — Claude Code non è vincolato solo ad Anthropic**
> Claude Code si può configurare per usare le API di altri provider: OpenAI, Google Gemini, e altri. Stessa interfaccia, modello diverso sotto il cofano.

### Open Code

Stesso concetto — agente nel terminale, legge il progetto, agisce — ma con una differenza sostanziale: è **open source**.

**Come si installa:**
```bash
npm install -g opencode-ai
```

Al primo avvio vi chiede una chiave API — una sorta di pass digitale che prendete dal provider che scegliete.

**Perché esiste e perché conta:**
- **Privacy:** potete configurarlo per non inviare nulla fuori dal vostro PC.
- **Costi:** scegliete il modello più conveniente per ogni lavoro.
- **Libertà:** il sistema non dipende dalle scelte di una singola azienda.

### Continue.dev — menzione rapida

Continue.dev è un'estensione che aggiunge una chat AI direttamente nell'editor — non nel terminale, ma a lato dei file mentre li leggete. La combo Continue.dev + Open Code è una delle configurazioni più potenti e flessibili oggi.

---

## 🧪 L'Esperimento: dall'idea al sito live

Vi do un prompt da copiare esattamente così come lo vedete.

**Lo stack: React + Vite**

React è il materiale con cui si costruiscono i mattoni visibili della pagina. Vite è l'impalcatura che fa sì che i cambiamenti appaiano in tempo reale sullo schermo mentre l'agente lavora.

### Il Prompt

Create una cartella vuota sul vostro PC, apritela in VSCode (File → Apri Cartella), aprite il Terminale, avviate Claude Code con `claude`, e incollate questo:

> "Crea una landing page in React + Vite con design stile cartone animato in cui vendo un'esperienza di 3 giorni alla ricerca di unicorni a Vallefiorita. Tra tutti gli unicorni, il protagonista è quello che di solito indossa gli occhiali thug life. Usa le due immagini che hai in workspace."

### Dal vostro PC a Internet

1. **GitHub:** un servizio gratuito che funziona come un archivio cloud per il vostro codice.
2. **Cloudflare Pages:** si collega al vostro repository GitHub, legge il progetto e lo pubblica su internet in pochi minuti — gratis, con un URL reale.

🔗 **[Link Live](https://guida-ai-mpro.pages.dev/)**

---

## 📍 Dove andiamo da qui

Avete appena fatto il giro completo. Avete visto i cinque livelli, avete costruito qualcosa, avete un sito live. Tutto in velocità, tutto in macro.

Da qui, scendiamo in profondità — un livello alla volta.
