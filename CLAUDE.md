# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build — use plain `next build`, NOT `--turbopack`
                 # (Turbopack's font fetcher can fail to reach Google Fonts in sandboxed envs)
npm start        # serve the production build
npm run lint     # eslint (flat config via next/core-web-vitals)
```

There is no test suite in this repo.

## Architecture

Single-page Next.js 15 (App Router) portfolio, plain JavaScript (no TypeScript), Tailwind CSS v4.

- **`app/page.js`** — the only route; renders `<Portfolio />`.
- **`components/Portfolio.js`** — the orchestrator. It's a big client component (`"use client"`) that composes every section (Hero, About, Work, Services, ExperienceProcess, Skills, GithubActivity, Stats, Contact, Footer) in order, and owns *all* cross-cutting browser behavior in one large `useEffect`: hero letter reveal (anime.js), scroll progress bar, custom cursor + magnetic/tilt hover effects, `IntersectionObserver`-driven scroll reveals (`[data-reveal]`) and stat counters (`[data-counter]`/`[data-target]`), reduced-motion handling, and the mailto-based contact form submission. Section components read from refs/props passed down from here rather than managing this state themselves — when adding scroll/animation behavior, it likely belongs in this effect, not a new component-local one.
- **`lib/content.js`** — single source of truth for all site copy/data (bio, projects, services, skills, stats, timeline, nav links). Prefer editing data here over hardcoding strings in components.
- **`app/api/github-contributions/route.js`** — server route that fetches the real GitHub contribution calendar via GitHub's GraphQL API, bucketed into intensity levels client-side (`bucketLevel`). Revalidated hourly (`revalidate = 3600`). Requires a `GITHUB_TOKEN` env var (classic PAT, `read:user` scope); without it, returns `{ ok: false, reason: "not_configured" }` and `components/GithubActivity.js` shows a quiet fallback instead of erroring. Copy `.env.example` to `.env.local` to configure locally.
- Animation styling is driven by data attributes (`data-hero-letter`, `data-reveal`, `data-counter`/`data-target`, `data-magnetic`, `data-tilt`, `data-cursor-hover`) that `Portfolio.js` queries via `document.querySelectorAll` — components opt into shared scroll/cursor/counter behavior by adding these attributes rather than wiring their own observers/listeners.
- Design tokens (colors, fonts) are defined once in `app/globals.css` under `@theme inline` (`--color-canvas`, `--color-ink`, `--color-accent`, etc.) and consumed as Tailwind utility classes (`bg-canvas`, `text-ink`, etc.) — add new design tokens there, not as one-off hex values in components.
- `@/*` path alias maps to the repo root (see `jsconfig.json`).
- Project screenshots are placeholders (`components/ImagePlaceholder.js`) keyed by `imgId` in `lib/content.js`; swap in real images via `next/image` when available.

## Git commits

- Never add a `Co-Authored-By: Claude` (or any Claude/Anthropic attribution) line to commit messages, in this repo or when pushing from it.
- Never commit any Claude-related files to this repo — `.claude/` and `CLAUDE.md` itself are both gitignored; keep it that way rather than tracking them.