# consultincusa-web

Marketing site + lead funnel for **consultincusa** — non-resident US LLC formation, in 5 languages, with humans.

- Stack: **Cloudflare Pages** + **React 19 / Vite** + **Tailwind v4** + **D1** (SQLite at edge) + Pages Functions
- Languages: EN / PT / ES (HI / ZH coming next)
- Domain: `consultincusa.com` (registered at Porkbun, DNS migrated to Cloudflare)
- WhatsApp drip: Meta Cloud API direct (no Wati / Twilio middleware)

---

## Quick start (local)

```bash
npm install
npm run dev          # vite dev server on :5173
```

For local Pages Functions + D1 emulation:

```bash
npm run pages:dev    # wrangler pages dev with D1 binding
```

For first-time D1 setup:

```bash
# Make sure CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID are exported
npm run db:create
# Wrangler prints the database_id — paste it into wrangler.toml
npm run db:migrate:local      # apply schema to local SQLite
npm run db:migrate:remote     # apply schema to production D1
```

---

## Project layout

```
consultincusa-web/
├── src/
│   ├── main.tsx              # entry
│   ├── routes.tsx            # React Router config (/:lang/...)
│   ├── i18n.ts               # i18next setup
│   ├── locales/              # EN / PT / ES JSON strings
│   ├── components/
│   │   ├── LocaleLayout.tsx  # /:lang wrapper, sets <html lang="">, persists choice
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LeadForm.tsx      # zod-validated, POSTs to /api/leads
│   │   └── LangSwitcher.tsx
│   ├── pages/
│   │   ├── Home.tsx          # landing per locale
│   │   ├── Article.tsx       # markdown article renderer
│   │   ├── Book.tsx          # Cal.com embed
│   │   ├── Form5472.tsx      # 5472 explainer
│   │   ├── MercuryRescue.tsx # Mercury rejection rescue page
│   │   └── NotFound.tsx
│   ├── content/              # Markdown SEO articles per locale
│   │   ├── en/
│   │   ├── pt/
│   │   └── es/
│   └── lib/
│       ├── articles.ts       # gray-matter loader + getArticle helper
│       └── seo.ts            # title/meta/OG/JSON-LD setter
├── functions/                # Cloudflare Pages Functions (server-side)
│   ├── api/
│   │   �