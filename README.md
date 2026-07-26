# Vamsi Revada — Portfolio

A premium, dark-first freelance developer portfolio built with Next.js 15, React 19, and Tailwind CSS.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4**
- **Anime.js** for the hero letter-stagger reveal
- Plain JavaScript (no TypeScript)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — root layout, global styles, the single page route
- `components/` — page sections (Hero, About, Work, Services, Experience/Process, Skills, Stats, Contact, Footer) and shared chrome (nav, custom cursor, scroll progress, loader)
- `lib/content.js` — all site copy/data in one place (projects, services, skills, stats, etc.)

## Content to fill in

Several values are placeholders pending real assets:

- `lib/content.js` — email, LinkedIn/GitHub URLs, Calendly link, resume URL
- Project screenshots and the professional portrait — currently styled placeholders (`components/ImagePlaceholder.js`); swap in real images via `next/image` when available

## Build

```bash
npm run build
npm start
```

Note: use the default Webpack build (`next build`, not `--turbopack`) — Turbopack's font fetcher can fail to reach Google Fonts in some sandboxed environments.
