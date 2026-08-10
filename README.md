<p align="center">
  <img src="https://pub.hyperagent.com/api/published/pbf01KZP56Y5F_KQRKYMBR0VFD1FQK/cfr-banner.jpg" alt="Chosen Few Records — Hamburg, since 2006" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=nextdotjs" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/i18n-DE%20%2F%20EN-c8302d?style=flat-square" alt="DE/EN">
  <img src="https://img.shields.io/badge/Vercel-ready-000?style=flat-square&logo=vercel" alt="Vercel ready">
</p>

# Chosen Few Records

Independent hip-hop & Caribbean music label. **Hamburg, since 2006.**

The source for the label's website — catalogue, artists, videos, demo submissions, and the full label story in German and English.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS |
| Animation | GSAP 3 + Framer Motion |
| i18n | next-intl (DE / EN) |
| Releases | Too Lost API (with static fallback) |
| Videos | YouTube Data API (with curated fallback) |
| Deploy | Vercel-ready |

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`.

---

## Environment variables

See `.env.example`. All vars are optional — the site runs on static fallbacks without any API keys.

| Variable | What it does |
|---|---|
| `TOOLOST_*` | Too Lost API for live release catalogue (server-only) |
| `YOUTUBE_API_KEY` | YouTube Data API for dynamic video archive |

Without these, static fallback releases and a curated video list are shown.

---

## Routes

| Path | Page |
|---|---|
| `/[locale]` | Home |
| `/[locale]/releases` | Full catalogue |
| `/[locale]/artists/shortlord` | Artist — Shortlord |
| `/[locale]/videos` | YouTube archive |
| `/[locale]/about` | Label story |
| `/[locale]/demo` | Demo submissions |
| `/[locale]/impressum` | Legal — Impressum |
| `/[locale]/datenschutz` | Legal — Datenschutz |

---

## Project structure

```
app/
  [locale]/         Next.js App Router, locale-wrapped
  layout.tsx        Root layout, fonts, providers
components/         Shared UI — nav, player, cards
lib/                API clients — Too Lost, YouTube
messages/           Translation strings (de.json, en.json)
public/             Static assets
assets/             Design source files
mockup/             Original HTML mockup
```

---

## Design files

The original design package lives in the repo for reference:

- `mockup/chosenfewrecords-mockup.html` — full HTML mockup
- `build-package.html` — annotated build spec
- `assets/` — fonts, logos, colour palette

---

## Links

- Label: [chosenfewrecords.de](https://chosenfewrecords.de) *(when live)*
- Artist: [@shortlord_hh](https://instagram.com/shortlord_hh) on Instagram
- YouTube: [Chosen Few Records channel](https://www.youtube.com/channel/UCOW8JoWtCoc_AO2ZPtsP6EQ)

---

*Built by [Naga Codex](https://mauriceholda.netlify.app/) — Maurice Holda, Hamburg.*
