import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInvoiceById, isDbConfigured, updateInvoiceStatus } from "@/lib/db";
import { renderToBuffer } from "@react-pdf/renderer";
import InvoiceDocument, { getInvoiceProfile, formatMoney } from "@/lib/invoicePdf";

export async function POST(request, { params }) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, reason: "email_not_configured" }, { status: 200 });
  }

  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }
  if (!invoice.client_email) {
    return NextResponse.json({ ok: false, reason: "no_client_email" }, { status: 400 });
  }

  const profile = getInvoiceProfile();
  const buffer = await renderToBuffer(<InvoiceDocument invoice={invoice} profile={profile} />);
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
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
    });

    if (error) {
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  const updated = await updateInvoiceStatus(id, "sent");
  return NextResponse.json({ ok: true, invoice: updated });
}
