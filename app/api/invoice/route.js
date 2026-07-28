import { NextResponse } from "next/server";
import { isDbConfigured, listInvoices, createInvoice, suggestNextInvoiceNumber } from "@/lib/db";
import { computeTotals } from "@/lib/invoiceCalc";

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }
  try {
    const [invoices, nextInvoiceNumber] = await Promise.all([listInvoices(), suggestNextInvoiceNumber()]);
    return NextResponse.json({ ok: true, invoices, nextInvoiceNumber });
  } catch {
    return NextResponse.json({ ok: false, reason: "db_error" }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const clientName = typeof body.clientName === "string" ? body.clientName.trim() : "";
  const invoiceNumber = typeof body.invoiceNumber === "string" ? body.invoiceNumber.trim() : "";
  const issueDate = typeof body.issueDate === "string" ? body.issueDate : "";

  if (!clientName || !invoiceNumber || !issueDate) {
    return NextResponse.json({ ok: false, reason: "invalid_input" }, { status: 400 });
  }

  const { lineItems, subtotal, taxAmount, total } = computeTotals(body.lineItems, body.taxPercent);
  if (lineItems.length === 0) {
    return NextResponse.json({ ok: false, reason: "no_line_items" }, { status: 400 });
  }

  try {
    const invoice = await createInvoice({
      invoiceNumber,
      clientName,
      clientEmail: body.clientEmail,
      clientCompany: body.clientCompany,
      projectName: body.projectName,
      description: body.description,
      currency: body.currency || "INR",
      lineItems,
      taxPercent: body.taxPercent || 0,
      subtotal,
      taxAmount,
      total,
      issueDate,
      dueDate: body.dueDate,
      notes: body.notes,
      status: "sent",
    });
    return NextResponse.json({ ok: true, invoice });
  } catch (err) {
    if (String(err?.message || err).toLowerCase().includes("duplicate")) {
      return NextResponse.json({ ok: false, reason: "duplicate_invoice_number" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, reason: "db_error" }, { status: 500 });
  }
}
