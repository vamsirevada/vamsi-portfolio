import { neon } from "@neondatabase/serverless";

let schemaReady = false;

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureSchema(sql) {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      invoice_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'sent',
      client_name TEXT NOT NULL,
      client_email TEXT,
      client_company TEXT,
      project_name TEXT,
      description TEXT,
      currency TEXT NOT NULL DEFAULT 'INR',
      line_items JSONB NOT NULL,
      tax_percent NUMERIC NOT NULL DEFAULT 0,
      subtotal NUMERIC NOT NULL,
      tax_amount NUMERIC NOT NULL DEFAULT 0,
      total NUMERIC NOT NULL,
      issue_date DATE NOT NULL,
      due_date DATE,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  schemaReady = true;
}

export function isDbConfigured() {
  return !!(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export async function suggestNextInvoiceNumber() {
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema(sql);
  const year = new Date().getFullYear();
  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM invoices WHERE invoice_number LIKE ${"INV-" + year + "-%"}
  `;
  const next = (rows[0]?.count || 0) + 1;
  return `INV-${year}-${String(next).padStart(3, "0")}`;
}

export async function createInvoice(data) {
  const sql = getSql();
  if (!sql) throw new Error("not_configured");
  await ensureSchema(sql);
  const rows = await sql`
    INSERT INTO invoices (
      invoice_number, status, client_name, client_email, client_company,
      project_name, description, currency, line_items, tax_percent,
      subtotal, tax_amount, total, issue_date, due_date, notes
    ) VALUES (
      ${data.invoiceNumber}, ${data.status || "sent"}, ${data.clientName}, ${data.clientEmail || null}, ${data.clientCompany || null},
      ${data.projectName || null}, ${data.description || null}, ${data.currency}, ${JSON.stringify(data.lineItems)}, ${data.taxPercent || 0},
      ${data.subtotal}, ${data.taxAmount || 0}, ${data.total}, ${data.issueDate}, ${data.dueDate || null}, ${data.notes || null}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function listInvoices() {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema(sql);
  return sql`SELECT * FROM invoices ORDER BY created_at DESC`;
}

export async function getInvoiceById(id) {
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema(sql);
  const rows = await sql`SELECT * FROM invoices WHERE id = ${id}`;
  return rows[0] || null;
}

export async function updateInvoiceStatus(id, status) {
  const sql = getSql();
  if (!sql) throw new Error("not_configured");
  await ensureSchema(sql);
  const rows = await sql`UPDATE invoices SET status = ${status} WHERE id = ${id} RETURNING *`;
  return rows[0] || null;
}
