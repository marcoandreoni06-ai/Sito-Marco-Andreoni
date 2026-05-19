# Guida 3 (Revisionata e Corretta): Collegare il Database e il Form Contatti

Ora che la stazione di ingegneria su VSCode è configurata (Guida 2), dobbiamo attivare gli operai e dare loro le istruzioni per cablare i motori sotto il cofano.

Su WordPress eravamo abituati a installare un plugin per i moduli (Contact Form 7, Elementor Forms) che salvava i dati sul database dell'hosting, appesantendolo, e inviava le email tramite il server del sito (con il rischio perenne che finissero in spam).

Oggi separiamo la carrozzeria dal motore. Il sito è statico e leggerissimo in superficie, ma comunica via API con servizi esterni dedicati che gestiscono i dati in modo sicuro, scalabile e gratuito.

---

## 🤖 Cosa costruiremo in questa guida

Collegheremo il progetto React a due servizi esterni tramite **API**:

1. **Supabase** — Database PostgreSQL cloud. Ogni invio del form finisce qui.
2. **Resend** — API per email transazionali. Ti arriva una notifica a ogni nuovo contatto.

**Schema del flusso dei dati:**

```
Utente → ContactForm.jsx → servizio contact.js → Supabase (salva record)
                                              ↘ Funzione serverless → Resend (invia email)
```

Il sito React non comunica MAI direttamente con Resend. Lo fa attraverso una **funzione serverless** (Cloudflare Pages Functions), perché la chiave API di Resend deve rimanere segreta. Al contrario, la chiave "anon" di Supabase può stare nel codice lato client, ma solo se proteggi i dati con le **RLS (Row Level Security)** — lo vedremo tra poco.

---

## 🗄️ 1. Configurazione del Database (Supabase)

### 1.1 Creare il progetto su Supabase

1. Vai su [supabase.com](https://supabase.com) e registrati (gratuito).
2. Crea un nuovo progetto: scegli un nome, imposta una password sicura per il database, e scegli un datacenter geograficamente vicino (es. Europa centrale).
3. Attendi il provisioning (1-2 minuti).
4. Nella dashboard, vai su **Project Settings → API** e trova:
   - **Project URL** (es. `https://xxxxx.supabase.co`)
   - **anon public key** (una lunga stringa base64)

### 1.2 Perché la chiave anon può stare nel browser (con cautela)

La chiave `anon` di Supabase è **pubblica di progettazione** — può essere esposta nel codice lato client. La sicurezza non si basa sulla segretezza della chiave, ma sulle **RLS (Row Level Security)**: regole SQL che decidono chi può leggere/scrivere cosa.

**Cosa devi fare:** Dopo aver creato la tabella `contatti`, imposterai una policy RLS che permette l'**INSERT** a chiunque (permette agli utenti di inviare il form) ma **NON la SELECT** (impedisce a chiunque di leggere i dati). In questo modo anche se qualcuno trovasse la chiave anon, non potrebbe rubare i tuoi contatti.

### 1.3 Inserire le credenziali nel progetto

Apri il file `.env` nella radice del progetto. Aggiungi:

```env
VITE_SUPABASE_URL=https://tuo-id-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

*Perché `VITE_` prefisso?* Vite espone nel bundle lato client solo le variabili che iniziano con `VITE_`. È una protezione: se per sbaglio scrivessi una chiave segreta senza prefisso, Vite non la includerebbe nel codice inviato al browser.

### 1.4 Istruzione per l'agente — installare e configurare Supabase

Nel terminale, con l'agente attivo, dai questa direttiva:

> "Installa `@supabase/supabase-js` via npm. Poi crea un file `/src/lib/supabaseClient.js` che importa `createClient` da `@supabase/supabase-js` e inizializza la connessione usando le variabili d'ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Esporta il client come default."

Se l'agente lavora correttamente, il file generato sarà simile a questo:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Mancano le variabili d\'ambiente VITE_SUPABASE_URL e/o VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

*Perché il controllo `if (!supabaseUrl...)`:* Se dimentichi di impostare le variabili d'ambiente, il sito si rompe silenziosamente. Questo errore esplicito ti avvisa subito in console.

---

## 🗃️ 2. Creare la tabella nel database

Supabase offre un editor SQL nella dashboard. Ma possiamo farlo fare all'agente se configuriamo l'MCP giusto.

### 2.1 (Opzionale) Con MCP — l'agente crea la tabella da solo

Se configuri l'**MCP di PostgreSQL** (un protocollo che permette all'agente di eseguire query sul database direttamente), puoi dare questo comando:

> "Connettiti al database Supabase tramite MCP PostgreSQL. Crea una tabella chiamata `contatti` con le colonne: `id` (uuid, primary key, default `gen_random_uuid()`), `nome` (text, not null), `email` (text, not null), `messaggio` (text, not null), `creato_il` (timestamptz, default `now()`). Poi imposta una RLS policy che permette INSERT a tutti gli utenti anonimi ma blocca SELECT, UPDATE, DELETE."

### 2.2 Senza MCP — creala manualmente

Vai su Supabase dashboard → **SQL Editor** → esegui:

```sql
CREATE TABLE contatti (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  messaggio TEXT NOT NULL,
  creato_il TIMESTAMPTZ DEFAULT now()
);

-- Abilita RLS (di default è disattivata — se salti questo passo, i dati sono pubblici)
ALTER TABLE contatti ENABLE ROW LEVEL SECURITY;

-- Policy: chiunque può inserire
CREATE POLICY "allow_insert_anon" ON contatti
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: solo admin può leggere (impedisce leaks con la chiave anon)
CREATE POLICY "allow_select_admin" ON contatti
  FOR SELECT
  USING (auth.role() = 'service_role');
```

*Perché `TO anon` e `auth.role() = 'service_role'`:*
- `anon` è il ruolo associato alla chiave anon. Con `FOR INSERT ... TO anon` permetti al form di scrivere.
- `service_role` è il ruolo associato alla chiave `service_role` (che **non** metti nel codice lato client). Solo tu, dalla dashboard o da un backend, puoi leggere i dati.

---

## 📩 3. Configurare il servizio contatti (il ponte tra form e database)

Creiamo un modulo JavaScript dedicato che separa la logica di invio dalla UI. Questo è il file che il componente ContactForm chiamerà.

### Istruzione per l'agente

> "Crea un file `/src/services/contact.js` con una funzione asincrona `submitContactForm({ nome, email, messaggio })`. La funzione deve:
> 1. Inserire i dati nella tabella `contatti` di Supabase usando `supabase.from('contatti').insert([{ nome, email, messaggio }])`.
> 2. Gestire il caso di errore: se Supabase fallisce, lancia un errore con un messaggio leggibile.
> 3. Restituire un oggetto `{ success: true, data }` in caso di successo.
> 4. (Se c'è una funzione serverless configurata) chiamare anche l'endpoint `/api/send-email` per inviare la notifica via Resend."

---

## 📋 4. Creare il componente ContactForm

### Istruzione per l'agente

> "Crea un componente React `/src/components/ContactForm.jsx` che:
> 1. Usa React Hook Form (`react-hook-form`) per gestire i campi Nome, Email, Messaggio.
> 2. All'invio, chiama `submitContactForm` da `/src/services/contact.js`.
> 3. Mostra uno stato di caricamento (il pulsante si disabilita e appare uno spinner) durante la chiamata.
> 4. In caso di successo: mostra un messaggio di conferma verde e resetta il form.
> 5. In caso di errore: mostra un messaggio di errore rosso.
> 6. Non ricaricare mai la pagina — tutto avviene via JavaScript."

*Perché React Hook Form:* Rende il codice dell'agente più prevedibile (pattern standard), riduce i re-render e gestisce validazione e errori in modo dichiarativo.

*Perché gestire loading/error/success:* Senza feedback visivo, l'utente clicca "Invia" e non sa se ha funzionato. Un sito professionale comunica sempre lo stato all'utente.

---

## 🔐 5. La funzione serverless per Resend (notifica email)

**Problema:** Se chiamassi Resend direttamente dal browser, la chiave API di Resend sarebbe visibile a chiunque apra gli strumenti di sviluppo del browser.

**Soluzione:** Una **serverless function** — un pezzo di backend che Cloudflare Pages esegue su richiesta, senza che tu debba gestire un server. La chiave di Resend vive solo qui.

### Istruzione per l'agente

> "Crea una funzione serverless Cloudflare Pages in `/functions/api/send-email.js`. Deve accettare POST con body `{ nome, email, messaggio }`, chiamare l'API di Resend per inviare una email di notifica con i dati ricevuti, e restituire `{ success: true }`. Usa la variabile d'ambiente `RESEND_API_KEY` (senza prefisso VITE_, perché questa funzione gira lato server)."

*Perché `RESEND_API_KEY` senza `VITE_`:* Le funzioni serverless girano su Node.js (server), non nel browser. Non hanno bisogno del prefisso `VITE_` — e anzi, non usarlo evita che la chiave finisca nel bundle client.

*Nota importante:* Le Cloudflare Pages Functions si configurano nella dashboard di Cloudflare dopo il deploy (Guida 5). Per ora creiamo solo il file: non sarà attivo fino al deploy.

---

## 📍 Verifica e test

Prima di passare alla Guida 4, esegui questa checklist:

1. **Controlla la console del browser** — Apri il sito in locale, apri la console (F12) e verifica che non ci siano errori relativi a Supabase.
2. **Compila il form** — Invia un messaggio di test. Verifica che appaia il messaggio di successo.
3. **Controlla Supabase dashboard** — Vai su Supabase → Table Editor → `contatti`. Il record dovrebbe essere apparso.
4. **Testa l'errore** — Disconnetti internet, invia il form, verifica che appaia il messaggio di errore.
5. **Verifica le RLS** — Apri la dashboard, prova a fare una SELECT anonima via API (si può testare direttamente dall'API docs di Supabase). Dovrebbe essere bloccata.

---

## 📍 Il sistema è cablato

Facciamo il punto: il tuo cantiere ora ha:

- Un database PostgreSQL cloud (Supabase) che accetta scritture in sicurezza.
- Un form contatti con validazione, loading e feedback utente.
- Un servizio di notifica email tramite serverless function (pronto per il deploy).
- Una struttura a strati: UI → Servizio → API, dove ogni strato ha una responsabilità chiara.

Nella **Guida 4** passeremo a SEO e ottimizzazione: meta-tag dinamici con React Helmet, sitemap automatica, lighthouse 100/100 e performance tuning.

Pronto a rendere il sito visibile ai radar del web? 🚀
