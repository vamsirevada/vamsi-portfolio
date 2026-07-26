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

Several values are still placeholders:

- `lib/content.js` — email, LinkedIn/GitHub URLs, Calendly link
- Project screenshots — currently styled placeholders (`components/ImagePlaceholder.js`); swap in real images via `next/image` when available
- `public/portrait.jpg` — a real headshot, but low-res; swap for a proper photo when you have one (keep it roughly square, it's cropped to 4:5)

## GitHub activity graph

The "Still shipping, every week" section (`components/GithubActivity.js`) fetches your real GitHub contribution calendar from GitHub's GraphQL API via a server route (`app/api/github-contributions/route.js`), cached/revalidated hourly.

To enable it:

1. Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) — a classic token with the `read:user` scope is enough.
2. Copy `.env.example` to `.env.local` and paste the token into `GITHUB_TOKEN`.
3. Restart the dev server.

In production, add the same `GITHUB_TOKEN` environment variable in your host's project settings (e.g. Vercel → Project → Settings → Environment Variables). Without a token configured, that section shows a quiet fallback message instead of erroring.

## Build

```bash
npm run build
npm start
```

Note: use the default Webpack build (`next build`, not `--turbopack`) — Turbopack's font fetcher can fail to reach Google Fonts in some sandboxed environments.
