import { NextResponse } from "next/server";
import { isDbConfigured, updateInvoiceStatus } from "@/lib/db";

const VALID_STATUSES = new Set(["draft", "sent", "paid"]);

export async function PATCH(request, { params }) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  if (!VALID_STATUSES.has(body.status)) {
    return NextResponse.json({ ok: false, reason: "invalid_status" }, { status: 400 });
  }

  const invoice = await updateInvoiceStatus(id, body.status);
  if (!invoice) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, invoice });
}
