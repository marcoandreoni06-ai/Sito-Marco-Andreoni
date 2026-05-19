# Guida 5 (Revisionata e Corretta): La Consegna — Serverless Functions, Dominio Personalizzato e Live nel Mondo Reale

Ci siamo. Questo è il momento in cui separiamo definitivamente i dilettanti dai professionisti. Abbiamo un cantiere strutturato, un motore di backend che salva i dati in un database reale e un'armatura SEO nativa pronta a scalare le classifiche di Google.

Con WordPress dovresti comprare un hosting, configurare record DNS, sperare che il server regga il traffico e gestire chiavi esposte. Noi useremo **GitHub + Cloudflare Pages** con architettura **Serverless**: il sito è online in pochi minuti, gratis, e le chiavi del database rimangono invisibili.

**⚠️ Prima di iniziare, risolvi un problema critico:** React Router gestisce le rotte lato client (`.com/chi-sono`), ma Cloudflare Pages cerca file fisici a quegli URL. Al refresh di una pagina diversa dalla home, vedresti un 404. La soluzione è un file `_redirects` — lo creeremo al passo 2.

---

## 🚀 Panoramica del deploy

```
Codice locale → GitHub (archivio sicuro) → Cloudflare Pages (build + hosting)
                                                ├── Variabili d'ambiente (chiavi segrete)
                                                ├── Pages Functions (backend API per Resend)
                                                ├── Dominio personalizzato + SSL
                                                └── Deploy automatico a ogni push
```

---

## 🔑 1. Preparare il progetto per GitHub

Prima di caricare il codice, dobbiamo assicurarci che **nessun segreto** finisca online e che il progetto sia pronto per la build su Cloudflare.

### 1.1 Verificare .gitignore (fondamentale: l'ordine conta)

Se fai il primo commit prima di creare `.gitignore` e `.env` è già tracciato, rimuoverlo dalla cronologia Git è complesso. L'agente deve creare `.gitignore` **prima** del primo `git add`.

#### Istruzione per l'agente:

> "Apri il file `.gitignore` nella radice del progetto. Se non esiste, crealo. Deve contenere almeno:
> ```
> .env
> node_modules/
> dist/
> .vercel
> *.local
> ```
> Poi crea un file `.env.example` copiando `.env` ma sostituendo i valori reali con placeholder (es. `VITE_SUPABASE_URL=la_tua_url`). Questo file può essere committato e serve a chiunque (o al te futuro) per sapere quali variabili d'ambiente servono."

*Perché `.env.example`:* Se cloni il progetto su un altro PC o un collaboratore lo recupera, sa esattamente quali chiavi deve impostare. Nessuno cerca di indovinare i nomi delle variabili.

### 1.2 Inizializzare Git e push su GitHub

#### Istruzione per l'agente:

> "Inizializza Git nella cartella del progetto con `git init`. Fai `git add .` e `git commit -m 'Primo commit: sito personal brand'`. Poi crea un repository su GitHub (dalla dashboard o con `gh repo create`). Collega il remoto con `git remote add origin <url>`. Infine fai `git push -u origin main`."

*Perché `-u origin main`:* Imposta il branch main come upstream locale. I prossimi push saranno semplicemente `git push`.

### 1.3 (Opzionale) Testare la build di produzione prima del deploy

Prima di collegare Cloudflare, verifica che la build funzioni:

```bash
npm run build
```

Se non ci sono errori, la cartella `dist/` è stata creata. Puoi anche fare un test locale con:

```bash
npx vite preview
```

Cloudflare non accetta progetti che falliscono la build. Questo test ti evita di scoprire l'errore dopo il deploy.

---

## 🛡️ 2. Il file _redirects (passaggio salvavita per SPA)

**Problema:** Cloudflare Pages cerca file fisici. Se l'utente va su `miosito.com/chi-sono` e fa refresh, Cloudflare cerca un file `/chi-sono.html` o `/chi-sono/index.html` — non trovandolo, restituisce 404.

**Soluzione:** Un file `_redirects` nella cartella `/public` (Vite la copia automaticamente in `dist/`).

#### Istruzione per l'agente:

> "Crea un file `/public/_redirects` con il contenuto:
> ```
> /*    /index.html   200
> ```
> Questo dice a Cloudflare: 'per qualsiasi percorso (/*), serva index.html e restituisci status 200 (non 301/302)'. React Router si occuperà del resto."

*Perché `200` alla fine:* Senza il `200`, Cloudflare interpreta la regola come un redirect (status 302). Noi vogliamo un **rewrite** — servire `index.html` senza cambiare l'URL nella barra del browser.

---

## ⚡ 3. Cloudflare Pages: collegare il repository

### 3.1 Collegare GitHub a Cloudflare Pages

1. Vai su [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages**.
2. Clicca **Create a project** → **Connect to Git**.
3. Autorizza Cloudflare ad accedere ai tuoi repository GitHub.
4. Seleziona il repository del progetto.
5. Nella schermata **Configure build**, imposta:
   - **Framework preset:** `Vite` (Cloudflare riempie automaticamente build command e output directory)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory (lascia vuoto)**
   - **Node.js version:** Scegli la versione LTS più recente (es. 20.x)
6. Clicca **Save and Deploy**.

*Perché Node.js version:* Se il progetto usa una sintassi moderna (optional chaining, etc.), Node.js 16+ è necessario. Cloudflare di default usa una versione recente, ma è bene controllare.

### 3.2 Aggiungere le variabili d'ambiente di produzione

In GitHub il file `.env` non c'è (lo abbiamo escluso con `.gitignore`). Dobbiamo dire a Cloudflare quali sono i valori reali.

Vai su Pages → Nome progetto → **Settings** → **Environment variables** (sezione **Build**). Aggiungi:

| Nome | Valore |
|---|---|
| `VITE_SUPABASE_URL` | `https://tuo-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` |
| `RESEND_API_KEY` | `re_...` (per la funzione serverless di Resend — vedi passo 4) |

Poi clicca **Save** e, se vuoi ri-deployare subito, vai su **Deployments** → clicca sui tre puntini dell'ultimo deploy → **Retry deployment**.

*Perché le variabili d'ambiente in Cloudflare:* Il file `.env` non è su GitHub. Cloudflare le inietta durante la build e nel runtime delle Pages Functions. Senza questo passaggio, il sito si connetterebbe a Supabase con URL vuoto e il form non funzionerebbe.

---

## 🔌 4. Attivare la Cloudflare Pages Function per Resend

Nella Guida 3 abbiamo creato il file `/functions/api/send-email.js`. Cloudflare Pages rileva automaticamente la cartella `/functions` e trasforma ogni file in un endpoint serverless.

### 4.1 Verifica che la funzione sia pronta

#### Istruzione per l'agente:

> "Controlla che `/functions/api/send-email.js` esista e sia nel formato corretto per Cloudflare Pages Functions (esporta un `onRequest` handler). Se non è compatibile, riscrivilo con:
> ```js
> export async function onRequest(context) {
>   const { request, env } = context
>   // env.RESEND_API_KEY è disponibile qui
>   // ...
>   return new Response(JSON.stringify({ success: true }), {
>     headers: { 'Content-Type': 'application/json' }
>   })
> }
> ```"

*Perché `context.env`:* Cloudflare Pages Functions riceve le variabili d'ambiente tramite l'oggetto `context.env`, non `process.env`. È una differenza fondamentale rispetto a Node.js standard. L'agente deve usare questa sintassi, altrimenti la funzione non legge le chiavi.

### 4.2 Testare la funzione in produzione

Dopo il deploy, puoi testare l'endpoint visitando:
```
https://iltuosito.pages.dev/api/send-email
```
Dovresti vedere un JSON (o un errore se il metodo non è POST). Se vedi `404`, Cloudflare non ha riconosciuto la cartella `/functions` — controlla che sia nella root del progetto (non dentro `/src`).

---

## 🌐 5. Collegare il Dominio Personalizzato

Per uscire dall'URL generico `.pages.dev` e dare autorevolezza SEO al sito:

1. Su Cloudflare Pages → Nome progetto → **Custom domains**.
2. Clicca **Set up a custom domain** e digita il dominio (es. `www.marcandreoni.it` o `marcandreoni.it`).
3. Cloudflare gestisce automaticamente i record DNS e il **certificato SSL gratuito** (Let's Encrypt). Attendere 1-5 minuti per la propagazione.
4. **Scegli il dominio nudo o www:** Cloudflare ti chiede quale dominio vuoi come primario. È consigliato usare `www` con redirect dal dominio nudo, ma entrambi funzionano.

**Nota:** Se il dominio non è già su Cloudflare (registrato altrove), Cloudflare Pages ti guiderà a importarlo o a cambiare i nameserver. Il processo richiede circa 5-10 minuti per la propagazione DNS.

*Perché SSL gratuito:* Google penalizza i siti senza HTTPS. Con Cloudflare hai SSL automatico, rinnovato senza che tu muova un dito.

---

## 🗺️ 6. Google Search Console: farsi trovare

Il sito è online con dominio personalizzato. Ora dobbiamo dire a Google che esiste.

### 6.1 Aggiungere il sito a Search Console

1. Vai su [search.google.com/search-console](https://search.google.com/search-console).
2. Inserisci l'URL del dominio (es. `https://www.marcandreoni.it`).
3. Scegli il metodo di verifica **DNS** (record TXT).
4. Google mostra un record TXT unico, tipo: `google-site-verification=xxxxxxxxx`.

### 6.2 Aggiungere il record TXT su Cloudflare

1. Vai su Cloudflare Dashboard → Account → **DNS** → **Records**.
2. Clicca **Add record**:
   - **Type:** TXT
   - **Name:** `@` (o lascia vuoto)
   - **Value:** incolla il codice di verifica di Google
   - **TTL:** Auto
3. Salva.
4. Torna su Google Search Console e clicca **Verifica**.

*Perché la verifica:* Google deve essere sicuro che il sito ti appartenga prima di mostrarti i dati di indicizzazione. Il record TXT è la prova che controlli i DNS.

### 6.3 Inviare la sitemap

1. In Search Console, vai su **Sitemaps** (nel menu a sinistra).
2. Inserisci `sitemap.xml` (es. `https://www.marcandreoni.it/sitemap.xml`).
3. Clicca **Invia**.

Google ora sa che il tuo sito esiste, ha una mappa e deve essere indicizzato. I primi risultati potrebbero comparire in 24-72 ore.

---

## 🔄 7. Deploy automatico (CI/CD) — come funziona

Ogni volta che fai una modifica e fai push su GitHub, Cloudflare Pages:

1. Rileva il push.
2. Scarica l'ultima versione del codice.
3. Esegue `npm run build`.
4. Distribuisce la nuova cartella `dist/`.
5. Mostra l'URL di anteprima (se branch non `main`) o aggiorna il sito live.

**Flusso di lavoro tipico:**

```bash
# Modifichi codice
git add .
git commit -m "Aggiornato testo hero e meta descrizione"
git push
# Dopo 60-90 secondi, il sito è online.
```

Non devi più fare upload FTP, accedere a pannelli di controllo o premere pulsanti.

---

## 📋 Checklist finale pre-lancio

Prima di dichiarare il sito finito, verifica ogni punto:

- [ ] **Build locale funziona** — `npm run build` termina senza errori
- [ ] **`_redirects`** esiste in `/public` con `/* /index.html 200`
- [ ] **GitHub** — `.env` NON è tracciato (controlla con `git status`). `.env.example` SÌ
- [ ] **Cloudflare Pages** — Deploy completato con successo (verde)
- [ ] **Variabili d'ambiente** — Tutte inserite: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `RESEND_API_KEY`
- [ ] **Pages Functions** — L'endpoint `/api/send-email` risponde (testalo dal browser)
- [ ] **Dominio personalizzato** — SSL attivo (lucchetto verde nel browser)
- [ ] **Test completo** — Compila il form contatti dal sito live, controlla su Supabase che il record sia arrivato e che l'email ti sia stata notificata
- [ ] **Google Search Console** — Verifica completata, sitemap inviata
- [ ] **Lighthouse** — Testa l'URL live su Lighthouse. Obiettivo: 90+ in tutte le categorie

Se tutto è verde: **il sito è in produzione.** 🎉

---

## 🏛️ Il Sistema è Completo

Fai un respiro profondo e guarda cosa hai costruito:

| Guida | Cosa hai fatto |
|---|---|
| **1** | Capito il ruolo di architetto: l'AI esegue, tu progetti |
| **2** | Allestito VSCode con estensioni reali, folder structure professionale, routing, SEO |
| **3** | Cablato Supabase (database PostgreSQL cloud) + form contatti con validazione |
| **4** | Corazzato il sito con SEO nativa: meta-tag dinamici, JSON-LD, performance 100/100 |
| **5** | Bloccato la sicurezza, deployato su Cloudflare Pages con dominio reale, online |

Non hai creato una casa vuota. Hai costruito un'infrastruttura moderna, scalabile, sicura, ottimizzata per i motori di ricerca e pronta a gestire utenti reali. E hai orchestrato l'Intelligenza Artificiale come un vero Direttore dei Lavori.

La suite di guide si conclude qui. Ora hai il sistema, hai la mappa. Non ti resta che avviare il terminale e dare vita alla tua prossima grande idea. Buon lavoro! 🛠️🚀
