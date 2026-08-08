# Chosenfewrecords

Independent hip-hop & Caribbean music label website — Hamburg, since 2006.

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- next-intl (DE/EN)
- Framer Motion (available)
- Vercel-ready

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to `/en`.

## Env vars

See `.env.example`:

- `TOOLOST_*` — Too Lost API (server-only). Without these, static fallback releases are shown.
- `YOUTUBE_API_KEY` — optional; curated video list is used when unset.

## Routes

| Path | Page |
|------|------|
| `/[locale]` | Home |
| `/[locale]/releases` | Catalogue |
| `/[locale]/artists/shortlord` | Artist |
| `/[locale]/videos` | YouTube archive |
| `/[locale]/about` | Label story |
| `/[locale]/demo` | Demo submit |
| `/[locale]/impressum` | Impressum |
| `/[locale]/datenschutz` | Datenschutz |

## Design package

Original mockup + build spec still live in:

- `mockup/chosenfewrecords-mockup.html`
- `build-package.html`
- `assets/` (also copied to `public/`)
