import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export function formatMoney(amount, currency) {
  // Standard PDF base fonts don't cover currency glyphs like ₹/€ — use the
  // ISO 4217 code instead (also unambiguous, unlike "$" across USD/CAD/AUD).
  const n = Number(amount) || 0;
  const formatted = n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${currency || ""} ${formatted}`.trim();
}

export function getInvoiceProfile() {
  return {
    businessName: process.env.INVOICE_BUSINESS_NAME || "Your Business Name",
    email: process.env.INVOICE_BUSINESS_EMAIL || "",
    address: process.env.INVOICE_BUSINESS_ADDRESS || "",
    phone: process.env.INVOICE_BUSINESS_PHONE || "",
    gstNumber: process.env.INVOICE_GST_NUMBER || "",
    bankDetails: process.env.INVOICE_BANK_DETAILS || "",
    upiId: process.env.INVOICE_UPI_ID || "",
    paypalEmail: process.env.INVOICE_PAYPAL_EMAIL || "",
  };
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  right: { textAlign: "right" },
  bold: { fontFamily: "Helvetica-Bold" },
  businessName: { fontFamily: "Helvetica-Bold", fontSize: 16, marginBottom: 4 },
  muted: { color: "#666666", fontSize: 9, marginBottom: 2 },
  invoiceTitle: { fontFamily: "Helvetica-Bold", fontSize: 22, textAlign: "right", marginBottom: 6 },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 9, color: "#888888", marginBottom: 4 },
  table: { marginTop: 10, borderTopWidth: 1, borderTopColor: "#dddddd" },
  tableHeaderRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#dddddd", paddingVertical: 6 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eeeeee", paddingVertical: 8 },
  colDescription: { flex: 3 },
  colQty: { flex: 0.8, textAlign: "right" },
  colRate: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  totalsBlock: { marginTop: 10, alignItems: "flex-end" },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", width: 200, marginBottom: 4 },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
  },
  footer: { marginTop: 40, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#dddddd" },
});

export default function InvoiceDocument({ invoice, profile }) {
  const lineItems = Array.isArray(invoice.line_items)
    ? invoice.line_items
    : JSON.parse(invoice.line_items || "[]");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.businessName}>{profile.businessName}</Text>
            {profile.address ? <Text style={styles.muted}>{profile.address}</Text> : null}
            {profile.email ? <Text style={styles.muted}>{profile.email}</Text> : null}
            {profile.phone ? <Text style={styles.muted}>{profile.phone}</Text> : null}
            {profile.gstNumber ? <Text style={styles.muted}>GSTIN: {profile.gstNumber}</Text> : null}
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={[styles.muted, styles.right]}>#{invoice.invoice_number}</Text>
            <Text style={[styles.muted, styles.right]}>Issued {invoice.issue_date}</Text>
            {invoice.due_date ? <Text style={[styles.muted, styles.right]}>Due {invoice.due_date}</Text> : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>BILL TO</Text>
          <Text>{invoice.client_name}</Text>
          {invoice.client_company ? <Text style={styles.muted}>{invoice.client_company}</Text> : null}
          {invoice.client_email ? <Text style={styles.muted}>{invoice.client_email}</Text> : null}
        </View>

        {invoice.project_name || invoice.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FOR</Text>
            {invoice.project_name ? <Text>{invoice.project_name}</Text> : null}
            {invoice.description ? <Text style={styles.muted}>{invoice.description}</Text> : null}
          </View>
        ) : null}

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colDescription, styles.bold]}>Description</Text>
            <Text style={[styles.colQty, styles.bold]}>Qty</Text>
            <Text style={[styles.colRate, styles.bold]}>Rate</Text>
            <Text style={[styles.colAmount, styles.bold]}>Amount</Text>
          </View>
          {lineItems.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{formatMoney(item.rate, invoice.currency)}</Text>
              <Text style={styles.colAmount}>{formatMoney(item.amount, invoice.currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text>Subtotal</Text>
            <Text>{formatMoney(invoice.subtotal, invoice.currency)}</Text>
          </View>
          {Number(invoice.tax_percent) > 0 ? (
            <View style={styles.totalsRow}>
              <Text>Tax ({Number(invoice.tax_percent)}%)</Text>
              <Text>{formatMoney(invoice.tax_amount, invoice.currency)}</Text>
            </View>
          ) : null}
          <View style={styles.grandTotalRow}>
            <Text style={styles.bold}>Total Due</Text>
            <Text style={styles.bold}>{formatMoney(invoice.total, invoice.currency)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.sectionLabel}>PAYMENT INSTRUCTIONS</Text>
          {profile.bankDetails ? <Text style={styles.muted}>{profile.bankDetails}</Text> : null}
          {profile.upiId ? <Text style={styles.muted}>UPI: {profile.upiId}</Text> : null}
          {profile.paypalEmail ? <Text style={styles.muted}>PayPal: {profile.paypalEmail}</Text> : null}
          {invoice.notes ? <Text style={[styles.muted, { marginTop: 10 }]}>{invoice.notes}</Text> : null}
          <Text style={[styles.muted, { marginTop: 16 }]}>Thank you for your business.</Text>
        </View>
      </Page>
    </Document>
  );
}
