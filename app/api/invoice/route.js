import { NextResponse } from "next/server";
import { isDbConfigured, listInvoices, createInvoice } from "@/lib/db";
import { computeTotals, INVOICE_CURRENCIES, isNonnegativeAmount } from "@/lib/invoiceCalc";

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000")) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export async function GET(request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }
  const cursor = request.nextUrl.searchParams.get("before");
  const before = cursor === null ? null : Number(cursor);
  if (cursor !== null && (!/^\d+$/.test(cursor) || before < 1 || before > 2147483647)) {
    return NextResponse.json({ ok: false, reason: "invalid_cursor" }, { status: 400 });
  }
  try {
    const page = await listInvoices(before);
    return NextResponse.json({ ok: true, ...page });
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

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const clientName = typeof body.clientName === "string" ? body.clientName.trim() : "";
  const invoiceNumber = typeof body.invoiceNumber === "string" ? body.invoiceNumber.trim() : "";
  const issueDate = typeof body.issueDate === "string" ? body.issueDate : "";

  const currency = body.currency || "INR";
  const taxPercent = body.taxPercent ?? 0;
  if (!clientName || !validDate(issueDate) || (body.dueDate && !validDate(body.dueDate)) || !INVOICE_CURRENCIES.includes(currency)) {
    return NextResponse.json({ ok: false, reason: "invalid_input" }, { status: 400 });
  }

  const items = Array.isArray(body.lineItems) ? body.lineItems : [];
  const validAmounts = items.every((item) => {
    if (typeof item?.description !== "string" || !item.description.trim()) return true;
    return isNonnegativeAmount(item.quantity) && isNonnegativeAmount(item.rate);
  });
  const { lineItems, subtotal, taxAmount, total } = computeTotals(items, taxPercent);
  if (!validAmounts || !isNonnegativeAmount(taxPercent) || !Number.isFinite(total)) {
    return NextResponse.json({ ok: false, reason: "invalid_amount" }, { status: 400 });
  }
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
      currency,
      lineItems,
      taxPercent,
      subtotal,
      taxAmount,
      total,
      issueDate,
      dueDate: body.dueDate,
      notes: body.notes,
    });
    return NextResponse.json({ ok: true, invoice });
  } catch (err) {
    if (err?.code === "23505") {
      return NextResponse.json({ ok: false, reason: "duplicate_invoice_number" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, reason: "db_error" }, { status: 500 });
  }
}
