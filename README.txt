CHOSENFEWRECORDS — WEBSITE BUILD PACKAGE
=========================================
Generated: August 2026

CONTENTS
--------
mockup/
  chosenfewrecords-mockup.html   — Full interactive homepage mockup (open in browser)

build-package.html               — Complete build spec, all prompts, integration docs

legal/
  impressum-page.tsx             — German Impressum (drop into app/[locale]/impressum/page.tsx)
  datenschutz-page.tsx           — GDPR Datenschutz (drop into app/[locale]/datenschutz/page.tsx)

assets/
  chosenfew_logo_white.png       — Logo (white, transparent bg)
  shortlord-photo.jpg            — Artist photo (Established album covershooting, Hamburg)
  top-floor-cover.png            — Top Floor single cover (clean, no text overlays)

QUICK START
-----------
1. npx create-next-app@latest chosenfewrecords --typescript --tailwind --eslint --app
2. Open in Cursor, press Cmd+I for Composer
3. Paste the Master Build Prompt from build-package.html (Section 04)
4. Create .env.local with your Too Lost credentials
5. npm run dev

KEY DETAILS
-----------
Address:   Maurice Holda, Chosenfewrecords, 20355 Hamburg
Email:     chosenfewrecords@hotmail.de
YouTube:   youtube.com/@chosenfewrecords (Channel ID: UCtLZrDerwIF9LjeVYqtTmLA)
Spotify:   open.spotify.com/artist/114s8gxO8QBSQnvDFSa9nj

Stack:     Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Vercel
Language:  Bilingual DE/EN (next-intl)
