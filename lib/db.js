import { neon } from "@neondatabase/serverless";

let schemaReady;

const PAGE_SIZE = 25;
const LOCK_GROUP = 900126;

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return url ? neon(url) : null;
}

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

async function initializeSchema(sql) {
  const [schema] = await sql`
    SELECT to_regclass('invoices') IS NOT NULL
      AND to_regclass('invoice_email_deliveries') IS NOT NULL
      AND to_regclass('invoice_login_attempts') IS NOT NULL AS ready
  `;
  if (schema.ready) return;

  await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(${LOCK_GROUP}::int, 0)`,
    sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        invoice_number TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'draft',
        client_name TEXT NOT NULL,
        client_email TEXT,
        client_company TEXT,
        project_name TEXT,
        description TEXT,
        currency TEXT NOT NULL DEFAULT 'INR',
        line_items JSONB NOT NULL,
        tax_percent NUMERIC NOT NULL DEFAULT 0,
        subtotal NUMERIC NOT NULL DEFAULT 0,
        tax_amount NUMERIC NOT NULL DEFAULT 0,
        total NUMERIC NOT NULL DEFAULT 0,
        issue_date DATE NOT NULL,
        due_date DATE,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS invoice_email_deliveries (
        invoice_id INTEGER PRIMARY KEY REFERENCES invoices(id) ON DELETE CASCADE,
        attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        accepted_at TIMESTAMPTZ
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS invoice_login_attempts (
        client_key TEXT PRIMARY KEY,
        attempts INTEGER NOT NULL DEFAULT 1,
        expires_at TIMESTAMPTZ NOT NULL
      )
    `,
    sql`
      CREATE INDEX IF NOT EXISTS invoice_login_attempt_expiration
      ON invoice_login_attempts (expires_at)
    `,
  ]);
}

async function invoiceSql() {
  const sql = getSql();
  if (!sql) throw new Error("not_configured");

  schemaReady ??= initializeSchema(sql).catch((error) => {
    schemaReady = undefined;
    throw error;
  });
  await schemaReady;
  return sql;
}

function validInvoiceId(id) {
  return /^\d+$/.test(id) && Number(id) > 0 && Number(id) <= 2147483647;
}

export async function takeInvoiceLoginAttempt(clientKey) {
  const sql = await invoiceSql();
  const [attempt] = await sql`
    WITH expired AS (
      DELETE FROM invoice_login_attempts WHERE expires_at <= now() AND client_key <> ${clientKey}
    )
    INSERT INTO invoice_login_attempts (client_key, expires_at)
    VALUES (${clientKey}, now() + interval '15 minutes')
    ON CONFLICT (client_key) DO UPDATE SET
      attempts = CASE WHEN invoice_login_attempts.expires_at <= now() THEN 1 ELSE LEAST(invoice_login_attempts.attempts + 1, 9) END,
      expires_at = CASE WHEN invoice_login_attempts.expires_at <= now() THEN EXCLUDED.expires_at ELSE invoice_login_attempts.expires_at END
    RETURNING attempts <= 8 AS allowed,
      CEIL(EXTRACT(EPOCH FROM expires_at - now()))::integer AS retry_after
  `;
  return attempt;
}

export async function createInvoice(data) {
  const sql = await invoiceSql();
  const year = Number(/^INV-(\d{4})-\d+$/.exec(data.invoiceNumber)?.[1] ?? data.issueDate.slice(0, 4));

  const [, rows] = await sql.transaction([
    // The next statement reads after this lock is acquired, so concurrent saves
    // see the numbers committed by earlier saves for the same invoice year.
    sql`SELECT pg_advisory_xact_lock(${LOCK_GROUP}::int, ${year}::int)`,
    sql`
      WITH sequence AS (
        SELECT (COALESCE(MAX(substring(invoice_number FROM '[0-9]+$')::numeric), 0) + 1)::text AS next
        FROM invoices WHERE invoice_number ~ ${`^INV-${String(year).padStart(4, "0")}-[0-9]+$`}
      )
      INSERT INTO invoices (
        invoice_number, status, client_name, client_email, client_company,
        project_name, description, currency, line_items, tax_percent,
        subtotal, tax_amount, total, issue_date, due_date, notes
      )
      SELECT
        COALESCE(NULLIF(${data.invoiceNumber}, ''), ${`INV-${data.issueDate.slice(0, 4)}-`} || LPAD(next, GREATEST(3, LENGTH(next)), '0')),
        'draft', ${data.clientName}, ${data.clientEmail || null}, ${data.clientCompany || null},
        ${data.projectName || null}, ${data.description || null}, ${data.currency}, ${JSON.stringify(data.lineItems)}::jsonb, ${data.taxPercent},
        ${data.subtotal}, ${data.taxAmount}, ${data.total}, ${data.issueDate}::date, ${data.dueDate || null}::date, ${data.notes || null}
      FROM sequence
      RETURNING *, false AS email_sent
    `,
  ]);
  return rows[0];
}

export async function listInvoices(before) {
  const sql = await invoiceSql();
  const rows = await sql`
    SELECT i.id, i.invoice_number, i.client_name, i.client_company, i.client_email, i.total, i.currency, i.status,
      e.accepted_at IS NOT NULL AS email_sent,
      e.accepted_at IS NULL AND e.attempted_at < now() - interval '23 hours' AS email_needs_review
    FROM invoices AS i
    LEFT JOIN invoice_email_deliveries AS e ON e.invoice_id = i.id
    WHERE (${before}::integer IS NULL OR i.id < ${before}::integer)
    ORDER BY i.id DESC
    LIMIT ${PAGE_SIZE + 1}
  `;
  const invoices = rows.slice(0, PAGE_SIZE);
  return { invoices, nextCursor: rows.length > PAGE_SIZE ? invoices.at(-1).id : null };
}

export async function getInvoiceById(id) {
  if (!validInvoiceId(id)) return null;
  const sql = await invoiceSql();
  const rows = await sql`
    SELECT i.*, e.accepted_at IS NOT NULL AS email_sent
    FROM invoices AS i LEFT JOIN invoice_email_deliveries AS e ON e.invoice_id = i.id
    WHERE i.id = ${id}
  `;
  return rows[0] || null;
}

export async function updateInvoiceStatus(id, status) {
  if (!validInvoiceId(id)) return null;
  const sql = await invoiceSql();
  const rows = await sql`
    WITH updated AS (
      UPDATE invoices SET status = ${status} WHERE id = ${id} RETURNING *
    )
    SELECT updated.*, e.accepted_at IS NOT NULL AS email_sent,
      e.accepted_at IS NULL AND e.attempted_at < now() - interval '23 hours' AS email_needs_review
    FROM updated LEFT JOIN invoice_email_deliveries AS e ON e.invoice_id = updated.id
  `;
  return rows[0] || null;
}

export async function reserveInvoiceEmail(id) {
  const sql = await invoiceSql();
  const [delivery] = await sql`
    INSERT INTO invoice_email_deliveries (invoice_id) VALUES (${id})
    ON CONFLICT (invoice_id) DO UPDATE SET invoice_id = EXCLUDED.invoice_id
    RETURNING accepted_at IS NOT NULL AS already_accepted,
      attempted_at >= now() - interval '23 hours' AS can_retry
  `;
  return delivery;
}

export async function markInvoiceEmailAccepted(id) {
  const sql = await invoiceSql();
  const [, rows] = await sql.transaction([
    sql`
      UPDATE invoice_email_deliveries SET accepted_at = COALESCE(accepted_at, now())
      WHERE invoice_id = ${id}
    `,
    sql`
      UPDATE invoices SET status = CASE WHEN status = 'paid' THEN status ELSE 'sent' END
      WHERE id = ${id}
      RETURNING *, true AS email_sent
    `,
  ]);
  return rows[0];
}
