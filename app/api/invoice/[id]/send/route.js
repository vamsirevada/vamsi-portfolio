import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInvoiceById, isDbConfigured, markInvoiceEmailAccepted, reserveInvoiceEmail } from "@/lib/db";
import { renderToBuffer } from "@react-pdf/renderer";
import InvoiceDocument, { getInvoiceProfile, formatMoney } from "@/lib/invoicePdf";

export async function POST(request, { params }) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }
  const from = process.env.INVOICE_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !from) {
    return NextResponse.json({ ok: false, reason: "email_not_configured" }, { status: 200 });
  }

  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }
  if (invoice.email_sent) return NextResponse.json({ ok: true, invoice });
  if (!invoice.client_email) {
    return NextResponse.json({ ok: false, reason: "no_client_email" }, { status: 400 });
  }

  const profile = getInvoiceProfile();
  const buffer = await renderToBuffer(<InvoiceDocument invoice={invoice} profile={profile} />);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const delivery = await reserveInvoiceEmail(id);
  if (delivery.already_accepted) {
    return NextResponse.json({ ok: true, invoice: await getInvoiceById(id) });
  }
  if (!delivery.can_retry) {
    return NextResponse.json({ ok: false, reason: "delivery_needs_review" }, { status: 409 });
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: invoice.client_email,
      replyTo: profile.email || undefined,
      subject: `Invoice ${invoice.invoice_number} from ${profile.businessName}`,
      text: `Hi ${invoice.client_name},\n\nPlease find attached invoice ${invoice.invoice_number} for ${formatMoney(invoice.total, invoice.currency)}.\n\nThank you,\n${profile.businessName}`,
      attachments: [
        {
          filename: `${invoice.invoice_number}.pdf`,
          content: buffer.toString("base64"),
        },
      ],
    }, { idempotencyKey: `portfolio-invoice/${invoice.id}/${new Date(invoice.created_at).getTime()}` });

    if (error) {
      if (error.name === "invalid_idempotent_request") {
        return NextResponse.json({ ok: false, reason: "delivery_needs_review" }, { status: 409 });
      }
      if (error.name === "concurrent_idempotent_requests") {
        return NextResponse.json({ ok: false, reason: "delivery_pending" }, { status: 409 });
      }
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  try {
    const updated = await markInvoiceEmailAccepted(id);
    return NextResponse.json({ ok: true, invoice: updated });
  } catch {
    return NextResponse.json({ ok: false, reason: "delivery_pending" }, { status: 503 });
  }
}
