"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const STATUS_OPTIONS = ["draft", "sent", "paid"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function emptyLineItem() {
  return { description: "", quantity: 1, rate: 0 };
}

function emptyForm(invoiceNumber) {
  return {
    invoiceNumber: invoiceNumber || "",
    issueDate: todayISO(),
    dueDate: plusDaysISO(14),
    clientName: "",
    clientEmail: "",
    clientCompany: "",
    projectName: "",
    description: "",
    currency: "INR",
    taxPercent: 0,
    notes: "",
    lineItems: [emptyLineItem()],
  };
}

function computeTotals(lineItems, taxPercent) {
  const subtotal = lineItems.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0);
  const tax = subtotal * ((Number(taxPercent) || 0) / 100);
  return { subtotal, tax, total: subtotal + tax };
}

function formatMoney(n, currency) {
  return `${currency} ${(Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

async function downloadBlob(res, filename) {
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function InvoicePage() {
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading | ready | not_configured | error
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState(emptyForm(""));
  const [submitting, setSubmitting] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // { tone, text }
  const [rowBusy, setRowBusy] = useState(null); // id of row with an action in flight

  const totals = useMemo(() => computeTotals(form.lineItems, form.taxPercent), [form.lineItems, form.taxPercent]);

  const loadInvoices = async () => {
    try {
      const res = await fetch("/api/invoice");
      const data = await res.json();
      if (!data.ok) {
        setStatus(data.reason === "not_configured" ? "not_configured" : "error");
        return;
      }
      setInvoices(data.invoices);
      setForm((f) => (f.invoiceNumber ? f : { ...f, invoiceNumber: data.nextInvoiceNumber }));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateLineItem = (index, field, value) =>
    setForm((f) => ({
      ...f,
      lineItems: f.lineItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));

  const addLineItem = () => setForm((f) => ({ ...f, lineItems: [...f.lineItems, emptyLineItem()] }));

  const removeLineItem = (index) =>
    setForm((f) => ({ ...f, lineItems: f.lineItems.filter((_, i) => i !== index) }));

  const buildPayload = () => ({
    invoiceNumber: form.invoiceNumber,
    issueDate: form.issueDate,
    dueDate: form.dueDate,
    clientName: form.clientName,
    clientEmail: form.clientEmail,
    clientCompany: form.clientCompany,
    projectName: form.projectName,
    description: form.description,
    currency: form.currency,
    taxPercent: form.taxPercent,
    notes: form.notes,
    lineItems: form.lineItems,
  });

  const handlePreview = async () => {
    setPreviewing(true);
    setFormMessage(null);
    try {
      const res = await fetch("/api/invoice/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) {
        setFormMessage({ tone: "error", text: "Couldn't generate a preview." });
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      setFormMessage({ tone: "error", text: "Couldn't generate a preview." });
    } finally {
      setPreviewing(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim() || !form.invoiceNumber.trim() || form.lineItems.every((i) => !i.description.trim())) {
      setFormMessage({ tone: "error", text: "Client name, invoice number, and at least one line item are required." });
      return;
    }
    setSubmitting(true);
    setFormMessage(null);
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const messages = {
          duplicate_invoice_number: "That invoice number is already used.",
          no_line_items: "Add at least one line item.",
          not_configured: "Database isn't configured yet.",
        };
        setFormMessage({ tone: "error", text: messages[data.reason] || "Something went wrong." });
        return;
      }
      setFormMessage({ tone: "accent", text: `Invoice ${data.invoice.invoice_number} saved.` });
      setInvoices((prev) => [data.invoice, ...prev]);
      const nextRes = await fetch("/api/invoice");
      const nextData = await nextRes.json();
      setForm(emptyForm(nextData.ok ? nextData.nextInvoiceNumber : ""));
    } catch {
      setFormMessage({ tone: "error", text: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async (invoice) => {
    setRowBusy(invoice.id);
    try {
      const res = await fetch(`/api/invoice/${invoice.id}/pdf`);
      if (res.ok) await downloadBlob(res, `${invoice.invoice_number}.pdf`);
    } finally {
      setRowBusy(null);
    }
  };

  const handleEmail = async (invoice) => {
    setRowBusy(invoice.id);
    try {
      const res = await fetch(`/api/invoice/${invoice.id}/send`, { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setInvoices((prev) => prev.map((inv) => (inv.id === invoice.id ? data.invoice : inv)));
      } else {
        const messages = {
          email_not_configured: "Email sending isn't configured yet (RESEND_API_KEY).",
          no_client_email: "This invoice has no client email on file.",
          send_failed: "Email failed to send.",
        };
        alert(messages[data.reason] || "Something went wrong sending the email.");
      }
    } finally {
      setRowBusy(null);
    }
  };

  const handleStatusChange = async (invoice, newStatus) => {
    setRowBusy(invoice.id);
    try {
      const res = await fetch(`/api/invoice/${invoice.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.ok) {
        setInvoices((prev) => prev.map((inv) => (inv.id === invoice.id ? data.invoice : inv)));
      }
    } finally {
      setRowBusy(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/invoice/logout", { method: "POST" });
    router.push("/invoice/login");
    router.refresh();
  };

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-ink-3">Loading...</p>
      </main>
    );
  }

  if (status === "not_configured") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-center">
        <div>
          <h1 className="mb-3 font-display text-xl font-semibold text-ink">Invoice tool isn&apos;t set up yet</h1>
          <p className="text-ink-3">
            Add a <code className="text-ink-2">DATABASE_URL</code> environment variable (Vercel Postgres / Neon) and
            redeploy to enable invoice history.
          </p>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-center">
        <p className="text-red-400">Something went wrong loading invoices. Refresh to try again.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-16 text-ink">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Invoices</h1>
        <button onClick={handleLogout} className="text-sm text-ink-3 underline">
          Log out
        </button>
      </div>

      <form
        onSubmit={handleCreate}
        className="mb-16 rounded-[24px] border border-white/8 bg-card-2 p-[clamp(20px,3vw,32px)]"
      >
        <h2 className="mb-6 font-display text-lg font-semibold">New Invoice</h2>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Invoice Number">
            <input
              value={form.invoiceNumber}
              onChange={(e) => updateField("invoiceNumber", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Issue Date">
            <input
              type="date"
              value={form.issueDate}
              onChange={(e) => updateField("issueDate", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Due Date">
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => updateField("dueDate", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Client Name">
            <input
              value={form.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              className="input"
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Client Email">
            <input
              type="email"
              value={form.clientEmail}
              onChange={(e) => updateField("clientEmail", e.target.value)}
              className="input"
              placeholder="jane@company.com"
            />
          </Field>
          <Field label="Client Company">
            <input
              value={form.clientCompany}
              onChange={(e) => updateField("clientCompany", e.target.value)}
              className="input"
              placeholder="Acme Corp"
            />
          </Field>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Project Name">
            <input
              value={form.projectName}
              onChange={(e) => updateField("projectName", e.target.value)}
              className="input"
              placeholder="Waitless — Restaurant Reservation Platform"
            />
          </Field>
          <Field label="This Invoice Is For">
            <input
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="input"
              placeholder="Phase 1 — Design & Architecture (50% advance)"
            />
          </Field>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-[13px] text-ink-3">Line Items</label>
          <div className="flex flex-col gap-2.5">
            {form.lineItems.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_70px_110px_110px_28px] items-center gap-2">
                <input
                  value={item.description}
                  onChange={(e) => updateLineItem(i, "description", e.target.value)}
                  className="input"
                  placeholder="Description"
                />
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(i, "quantity", e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateLineItem(i, "rate", e.target.value)}
                  className="input"
                />
                <div className="px-2 text-[13px] text-ink-3">
                  {formatMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0), form.currency)}
                </div>
                <button
                  type="button"
                  onClick={() => removeLineItem(i)}
                  disabled={form.lineItems.length === 1}
                  className="text-ink-4 disabled:opacity-30"
                  aria-label="Remove line item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addLineItem} className="mt-3 text-sm font-semibold text-accent">
            + Add line item
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Currency">
            <select
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
              className="input"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tax %">
            <input
              type="number"
              min="0"
              value={form.taxPercent}
              onChange={(e) => updateField("taxPercent", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="mb-6">
          <Field label="Notes (optional)">
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="input resize-y"
              placeholder="Payment terms, thank-you note, etc."
            />
          </Field>
        </div>

        <div className="mb-6 flex flex-col items-end gap-1 text-sm">
          <div className="flex w-48 justify-between text-ink-3">
            <span>Subtotal</span>
            <span>{formatMoney(totals.subtotal, form.currency)}</span>
          </div>
          {Number(form.taxPercent) > 0 && (
            <div className="flex w-48 justify-between text-ink-3">
              <span>Tax ({form.taxPercent}%)</span>
              <span>{formatMoney(totals.tax, form.currency)}</span>
            </div>
          )}
          <div className="mt-1 flex w-48 justify-between border-t border-white/10 pt-1 font-bold text-ink">
            <span>Total</span>
            <span>{formatMoney(totals.total, form.currency)}</span>
          </div>
        </div>

        {formMessage && (
          <p className={`mb-4 text-sm ${formMessage.tone === "error" ? "text-red-400" : "text-accent"}`}>
            {formMessage.text}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePreview}
            disabled={previewing}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {previewing ? "Generating..." : "Preview PDF"}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Invoice"}
          </button>
        </div>
      </form>

      <h2 className="mb-4 font-display text-lg font-semibold">History</h2>
      {invoices.length === 0 ? (
        <p className="text-ink-3">No invoices yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-[20px] border border-white/8">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-ink-3">
                <th className="p-4 font-medium">Invoice #</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/6 last:border-0">
                  <td className="p-4">{inv.invoice_number}</td>
                  <td className="p-4">
                    {inv.client_name}
                    {inv.client_company ? <span className="text-ink-3"> · {inv.client_company}</span> : null}
                  </td>
                  <td className="p-4">{formatMoney(inv.total, inv.currency)}</td>
                  <td className="p-4">
                    <select
                      value={inv.status}
                      onChange={(e) => handleStatusChange(inv, e.target.value)}
                      disabled={rowBusy === inv.id}
                      className="rounded-lg border border-white/10 bg-card-3 px-2 py-1 text-xs text-ink"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(inv)}
                        disabled={rowBusy === inv.id}
                        className="text-accent disabled:opacity-50"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleEmail(inv)}
                        disabled={rowBusy === inv.id || !inv.client_email}
                        className="text-ink-2 disabled:opacity-40"
                        title={!inv.client_email ? "No client email on file" : undefined}
                      >
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--color-card-3);
          padding: 10px 14px;
          font-size: 14px;
          font-family: inherit;
          color: var(--color-ink);
        }
        .input:focus {
          outline: none;
          border-color: rgba(110, 231, 183, 0.5);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-ink-3">{label}</label>
      {children}
    </div>
  );
}
