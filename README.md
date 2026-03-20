# PharmChat — Procurement Dashboard

An AI-powered procurement dashboard for pharmacies. Mira, the built-in assistant, monitors supplier emails, surfaces critical alerts (stock-outs, delivery delays, price changes, cancellations), and helps procurement teams review and send purchase orders.

## Features

- **Rx Deck** — live feed of supplier email events parsed into actionable alerts
- **PO Queue** — review, edit, and confirm purchase orders with SKU-level reasoning
- **Order Run** — send confirmed POs to suppliers via Gmail in one click
- **Mira Chat** — conversational assistant with full procurement context
- **Studio** — internal data editor for demo and development scenarios

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [NextAuth.js](https://next-auth.js.org) — Google OAuth sign-in
- [Groq](https://groq.com) — fast inference (email parsing, chat)
- Gmail API — reading supplier emails and sending POs
- [Zustand](https://zustand-demo.pmnd.rs) — client state
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS](https://tailwindcss.com) + SCSS modules
- [Storybook](https://storybook.js.org) — component development
- [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) — testing
- Yarn

---

## Prerequisites

- Node.js 18+
- Yarn 1.22+
- A Google Cloud project (free tier is fine)
- A Groq API key (free at [console.groq.com](https://console.groq.com/keys))

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/Yevhenbk/pharmchat.git
cd pharmchat
yarn install
```

### 2. Create your environment file

```bash
cp .env.example .env.local
```

Fill in each value as described below.

---

## Environment Variables

### `NEXT_PUBLIC_ENV_IS_LOCAL`

Set to `true` for local development. Enables demo data and bypasses production guards.

```
NEXT_PUBLIC_ENV_IS_LOCAL=true
```

---

### `GROQ_API_KEY`

Used to parse incoming supplier emails and power the Mira chat assistant.

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (free) and create an API key
3. Paste it in:

```
GROQ_API_KEY=gsk_...
```

---

### Gmail OAuth 2.0 — Full Setup

The app uses Gmail to **read supplier emails** and **send purchase orders**. This requires an OAuth 2.0 credential from Google Cloud. The same credential also powers the **Sign in with Google** button via NextAuth.

#### Step 1 — Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown → **New Project** → give it a name (e.g. `pharmchat`)
3. Select the project once created

#### Step 2 — Enable the Gmail API

1. In the left sidebar go to **APIs & Services → Library**
2. Search for **Gmail API** and click **Enable**

#### Step 3 — Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** → **Create**
3. Fill in:
   - App name: `PharmChat`
   - User support email: your Gmail address
   - Developer contact: your Gmail address
4. Click **Save and Continue** through the remaining steps
5. On the **Test users** step, add your Gmail address as a test user
6. Save

#### Step 4 — Create OAuth 2.0 credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `PharmChat Web`
5. Under **Authorised redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click **Create**
7. Copy the **Client ID** and **Client Secret** into `.env.local`:

```
GMAIL_CLIENT_ID=your_client_id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your_client_secret
```

#### Step 5 — Get a Gmail refresh token

This token lets the server send emails on behalf of your account without a live user session. Use Google's OAuth Playground:

1. Go to [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
2. Click the gear icon (top right) → check **Use your own OAuth credentials**
3. Enter your **Client ID** and **Client Secret** from Step 4
4. In the left panel, select these two scopes:
   ```
   https://www.googleapis.com/auth/gmail.readonly
   https://www.googleapis.com/auth/gmail.send
   ```
5. Click **Authorize APIs** → sign in with your Gmail account → allow access
6. Click **Exchange authorization code for tokens**
7. Copy the **Refresh token** into `.env.local`:

```
GMAIL_REFRESH_TOKEN=1//0...
GMAIL_USER_EMAIL=you@gmail.com
```

---

### `NEXTAUTH_URL` and `NEXTAUTH_SECRET`

```
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

Paste the output as:

```
NEXTAUTH_SECRET=your_generated_secret
```

---

### `FDA_API_KEY` (optional)

Used to fetch drug shortage data from the OpenFDA API.

1. Register at [open.fda.gov/apis/authentication](https://open.fda.gov/apis/authentication/)
2. Paste the key in:

```
FDA_API_KEY=your_fda_api_key
```

The app works without this key — shortage data will simply be unavailable.

---

## Running the app

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with the Gmail account you added as a test user in Step 3.

---

## Other commands

| Command | Description |
|---|---|
| `yarn build` | Production build |
| `yarn start` | Start production server |
| `yarn test` | Run unit tests (Vitest) |
| `yarn test:e2e` | Run end-to-end tests (Playwright) |
| `yarn storybook` | Launch Storybook on port 6006 |
| `yarn lint` | Run ESLint |
| `yarn format` | Format with Prettier |

---

## Project structure

```
app/
├── api/                  # Next.js API routes
│   ├── auth/             # NextAuth Google provider
│   ├── emails/           # Gmail inbox reader
│   ├── send-po/          # Send PO via Gmail
│   ├── mira-chat/        # Mira chat
│   ├── parse-supplier-emails/
│   ├── analyze-action-emails/
│   └── shortages/        # FDA drug shortage data
├── components/
│   ├── blocks/           # Feature-level components (each with .stories.tsx + .test.tsx)
│   ├── ui/               # Primitive UI components
│   ├── icons/            # SVG icon components
│   └── animations/       # Motion wrapper components
├── constants/            # Shared constants (API routes, etc.)
├── demo/                 # Mock data for development and Storybook
├── hooks/                # Custom React hooks
├── models/               # TypeScript interfaces
├── providers/            # React context providers
├── services/             # Business logic
├── stores/               # Zustand state stores
├── styles/               # Global CSS tokens and theme
└── studio/               # Internal data editor (dev only)
```

---

## Notes

- The app ships with demo data so all UI is visible on first load — no real emails or API keys are needed to explore the interface.
- To connect real Gmail: complete the OAuth setup above and sign in with your Google account.
- The OAuth consent screen stays in **Testing** mode until published. Only accounts added as test users can sign in while in testing mode.
