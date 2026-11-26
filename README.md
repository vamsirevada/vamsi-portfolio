# Vamsi Revada — Portfolio

A premium, dark-first freelance developer portfolio built with Next.js 15, React 19, and Tailwind CSS.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4**
- Plain JavaScript (no TypeScript)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` contains the public portfolio, private invoice pages, and API routes.
- `components/` contains portfolio sections and navigation.
- `lib/content.js` contains portfolio copy, projects, and links.
- `public/` contains the portrait, project screenshots, and résumé.

## GitHub activity graph

The collapsible GitHub activity summary (`components/GithubActivity.js`) fetches your real GitHub contribution calendar from GitHub's GraphQL API via a server route (`app/api/github-contributions/route.js`), cached/revalidated hourly.

To enable it:

1. Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) — a classic token with the `read:user` scope is enough.
2. Copy `.env.example` to `.env.local` and paste the token into `GITHUB_TOKEN`.
3. Restart the dev server.

In production, add the same `GITHUB_TOKEN` environment variable in your host's project settings (e.g. Vercel → Project → Settings → Environment Variables). Without a token configured, the activity summary is hidden and the GitHub link stays in the footer.

## Contact form

The contact form (`components/Contact.js`) sends real email via a server route (`app/api/contact/route.js`) using [Resend](https://resend.com), instead of relying on the visitor's own mail client.

To enable it:

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. Copy `.env.example` to `.env.local` and paste the key into `RESEND_API_KEY`.
3. Restart the dev server.

The default sender is Resend's test address `onboarding@resend.dev`. Once you verify your own domain in the Resend dashboard, set `CONTACT_FROM_EMAIL` (e.g. `Vamsi Revada <hello@vamsirevada.com>`) so mail sends from your own address instead.

In production, add `RESEND_API_KEY` (and `CONTACT_FROM_EMAIL` once you have a verified domain) as environment variables in your host's project settings. Without `RESEND_API_KEY` configured, the form shows a friendly fallback message pointing to a direct `mailto:` link instead of erroring.

The form also includes a hidden honeypot field to filter out basic spam bots.

## Invoice tool

`/invoice` is a private, password-gated page (not linked anywhere public, and blocked by middleware for anyone without a valid session) for generating client invoices during freelance projects — advance payments, phase milestones, final payments, etc. It's a personal tool, not part of the public portfolio.

What it does:
- Fill in client details, project/description, line items, tax %, currency, and due date; see subtotal/tax/total computed live.
- **Preview** the PDF before saving, or **Save** it as a draft. Leave the number blank to assign the next `INV-YYYY-NNN` for the issue year in Postgres when you save.
- From invoice history, **download** the PDF, **email** it to the client, or change its status. Use **Load older invoices** to see earlier records.

To enable it:

1. **Password** — copy `.env.example` to `.env.local` and set `INVOICE_PASSWORD` to something only you know. Optionally set `INVOICE_SESSION_SECRET` to a separate random string. Sessions expire after seven days. Changing the password or the signing secret signs out existing sessions.
2. **Database** — attach a Neon database in the Vercel project to populate `DATABASE_URL`. For local review, add a separate development database connection string to `.env.local`. The app initializes its invoice, delivery, and login tables on first use. Hosted sign-in uses the database to limit attempts.
3. **Your business details** — invoices use the portfolio name by default. Set `INVOICE_BUSINESS_NAME`, `INVOICE_BUSINESS_EMAIL`, `INVOICE_BUSINESS_ADDRESS`, `INVOICE_BUSINESS_PHONE`, or `INVOICE_GST_NUMBER` to customize the PDF header.
4. **Payment instructions** — fill in `INVOICE_BANK_DETAILS` (multi-line free text: account name/number/IFSC/bank), `INVOICE_UPI_ID`, and/or `INVOICE_PAYPAL_EMAIL` — shown in the PDF footer.
5. **Emailing invoices** — configure `RESEND_API_KEY` and set `INVOICE_FROM_EMAIL` to an address on a verified Resend domain. `CONTACT_FROM_EMAIL` works as a fallback when explicitly configured. The same invoice can be retried after a temporary error without sending a duplicate. If the previous attempt remains uncertain for more than 23 hours, verify it in Resend before sending a copy manually.

In production, add all of the above as environment variables in Vercel → Project → Settings → Environment Variables, then redeploy.

**Security note:** none of these values (password, bank details, database URL) live in the codebase — they're environment variables only, since this repo is public. Treat `INVOICE_PASSWORD` like any other credential; anyone with it can view your client list and invoice amounts.

## Build

```bash
npm run build
npm start
```

The Manrope and Space Grotesk fonts are bundled in `app/fonts`, so builds can compile without fetching fonts from Google.
