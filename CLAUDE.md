# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Architecture

- The Next.js App Router serves the public portfolio at `/` and the private invoice tool under `/invoice`.
- Portfolio sections live in `components/`, with shared content in `lib/content.js`.
- Invoice totals are calculated in `lib/invoiceCalc.js`. The invoice API uses Neon Postgres, React PDF, and Resend.
- Colors and fonts are defined in `app/globals.css`. The `@/` alias maps to the repository root.
- See the README for environment variables and local setup.

## Git commits

- Never add a `Co-Authored-By: Claude` (or any Claude/Anthropic attribution) line to commit messages, in this repo or when pushing from it.
- Keep personal Claude configuration out of commits.
