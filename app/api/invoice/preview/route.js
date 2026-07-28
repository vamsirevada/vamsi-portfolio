import { renderToBuffer } from "@react-pdf/renderer";
import InvoiceDocument, { getInvoiceProfile } from "@/lib/invoicePdf";
import { computeTotals } from "@/lib/invoiceCalc";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid body", { status: 400 });
  }

  const { lineItems, subtotal, taxAmount, total } = computeTotals(body.lineItems, body.taxPercent);

  const invoice = {
    invoice_number: body.invoiceNumber || "PREVIEW",
    client_name: body.clientName || "",
    client_email: body.clientEmail || "",
    client_company: body.clientCompany || "",
    project_name: body.projectName || "",
    description: body.description || "",
    currency: body.currency || "INR",
    line_items: lineItems,
    tax_percent: body.taxPercent || 0,
    subtotal,
    tax_amount: taxAmount,
    total,
    issue_date: body.issueDate || new Date().toISOString().slice(0, 10),
    due_date: body.dueDate || null,
    notes: body.notes || "",
  };

  const buffer = await renderToBuffer(<InvoiceDocument invoice={invoice} profile={getInvoiceProfile()} />);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=preview.pdf",
    },
  });
}
