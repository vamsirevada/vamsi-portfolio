import { getInvoiceById, isDbConfigured } from "@/lib/db";
import { renderToBuffer } from "@react-pdf/renderer";
import InvoiceDocument, { getInvoiceProfile } from "@/lib/invoicePdf";

export async function GET(request, { params }) {
  if (!isDbConfigured()) {
    return new Response("Not configured", { status: 404 });
  }

  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await renderToBuffer(<InvoiceDocument invoice={invoice} profile={getInvoiceProfile()} />);
  const filename = `${invoice.invoice_number}.pdf`;
  const fallback = filename.replace(/[^\x20-\x7e]|["\\]/g, "_");
  const encoded = encodeURIComponent(filename).replace(/['()*]/g, (character) => `%${character.charCodeAt(0).toString(16)}`);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`,
    },
  });
}
