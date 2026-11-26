"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { computeTotals, INVOICE_CURRENCIES } from "@/lib/invoiceCalc";

const STATUS_OPTIONS = ["draft", "sent", "paid"];

function localDate(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function emptyLineItem() {
  return { description: "", quantity: 1, rate: 0 };
}

function emptyForm() {
  return {
    invoiceNumber: "",
    issueDate: localDate(),
    dueDate: localDate(14),
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

function formatMoney(n, currency) {
  return `${currency} ${(Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function InvoicePage() {
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading | ready | not_configured | error
  const [invoices, setInvoices] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formMessage, setFormMessage] = useState(null); // { tone, text }
  const [rowBusy, setRowBusy] = useState(null);
  const [historyMessage, setHistoryMessage] = useState(null);

  const totals = useMemo(() => computeTotals(form.lineItems, form.taxPercent), [form.lineItems, form.taxPercent]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadInvoices() {
      try {
        const res = await fetch("/api/invoice", { signal: controller.signal });
        const data = await res.json();
        if (!data.ok) {
          setStatus(data.reason === "not_configured" ? "not_configured" : "error");
          return;
        }
        setInvoices(data.invoices);
        setNextCursor(data.nextCursor);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    loadInvoices();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (previewUrl) return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const loadMore = async () => {
    setLoadingMore(true);
    setHistoryMessage(null);
    try {
      const response = await fetch(`/api/invoice?before=${nextCursor}`);
      const page = await response.json();
      if (!response.ok || !page.ok) throw new Error("History request failed");
      setInvoices((current) => [...current, ...page.invoices]);
      setNextCursor(page.nextCursor);
    } catch {
      setHistoryMessage({ tone: "error", text: "Could not load older invoices." });
    } finally {
      setLoadingMore(false);
    }
  };

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateLineItem = (index, field, value) =>
    setForm((f) => ({
      ...f,
      lineItems: f.lineItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));

  const addLineItem = () => setForm((f) => ({ ...f, lineItems: [...f.lineItems, emptyLineItem()] }));

  const removeLineItem = (index) =>
    setForm((f) => ({ ...f, lineItems: f.lineItems.filter((_, i) => i !== index) }));

  const handlePreview = async () => {
    setPreviewing(true);
    setPreviewUrl(null);
    setFormMessage(null);
    try {
      const res = await fetch("/api/invoice/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setFormMessage({ tone: "error", text: "Couldn't generate a preview." });
        return;
      }
      setPreviewUrl(URL.createObjectURL(await res.blob()));
    } catch {
      setFormMessage({ tone: "error", text: "Couldn't generate a preview." });
    } finally {
      setPreviewing(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim() || form.lineItems.every((i) => !i.description.trim())) {
      setFormMessage({ tone: "error", text: "Client name and at least one line item are required." });
      return;
    }
    setSubmitting(true);
    setFormMessage(null);
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const messages = {
          duplicate_invoice_number: "That invoice number is already used.",
          no_line_items: "Add at least one line item.",
          not_configured: "Database isn't configured yet.",
          invalid_amount: "Enter valid, nonnegative amounts and tax.",
          invalid_input: "Check the client name, dates, and currency.",
        };
        setFormMessage({ tone: "error", text: messages[data.reason] || "Something went wrong." });
        return;
      }
      setFormMessage({ tone: "accent", text: `Invoice ${data.invoice.invoice_number} saved.` });
      setInvoices((prev) => [data.invoice, ...prev]);
      setForm(emptyForm());
      setPreviewUrl(null);
    } catch {
      setFormMessage({ tone: "error", text: "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmail = async (invoice) => {
    setRowBusy(invoice.id);
    setHistoryMessage(null);
    try {
      const res = await fetch(`/api/invoice/${invoice.id}/send`, { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setInvoices((prev) => prev.map((inv) => (inv.id === invoice.id ? data.invoice : inv)));
        setHistoryMessage({ tone: "accent", text: `Email accepted for invoice ${invoice.invoice_number}.` });
      } else {
        const messages = {
          email_not_configured: "Set a verified sender and a Resend API key to email invoices.",
          no_client_email: "This invoice has no client email on file.",
          send_failed: "The email could not be sent. You can retry this invoice.",
          delivery_pending: "Delivery is still being confirmed. It is safe to retry shortly.",
          delivery_needs_review: "Check this invoice in Resend before sending it again.",
        };
        setHistoryMessage({ tone: "error", text: messages[data.reason] || "Something went wrong sending the email." });
      }
    } catch {
      setHistoryMessage({ tone: "error", text: "Could not confirm the email was sent." });
    } finally {
      setRowBusy(null);
    }
  };

  const handleStatusChange = async (invoice, newStatus) => {
    setRowBusy(invoice.id);
    setHistoryMessage(null);
    try {
      const res = await fetch(`/api/invoice/${invoice.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Status update failed");
      setInvoices((prev) => prev.map((inv) => (inv.id === invoice.id ? data.invoice : inv)));
    } catch {
      setHistoryMessage({ tone: "error", text: "Could not update the invoice status." });
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
    <main className="mx-auto max-w-[1100px] px-4 py-8 text-ink sm:px-6 sm:py-12">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold">Invoices</h1>
        <div className="flex items-center gap-4 text-sm">
          <a href="#invoice-history" className="text-accent underline underline-offset-4">History</a>
          <button onClick={handleLogout} className="min-h-10 rounded-lg border border-white/15 px-3 font-semibold text-ink-2">Log out</button>
        </div>
      </header>

      <form
        onSubmit={handleCreate}
        className="invoice-form mb-10 rounded-2xl border border-white/12 bg-card-2 p-4 sm:p-7"
      >
        <h2 className="mb-6 font-display text-lg font-semibold">New Invoice</h2>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Invoice number">
            <input
              value={form.invoiceNumber}
              onChange={(e) => updateField("invoiceNumber", e.target.value)}
              placeholder="Assigned on save"
              className="input"
            />
          </Field>
          <Field label="Issue date">
            <input
              required
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
          <Field label="Client name">
            <input
              required
              value={form.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              className="input"
              autoComplete="off"
            />
          </Field>
          <Field label="Client Email">
            <input
              type="email"
              value={form.clientEmail}
              onChange={(e) => updateField("clientEmail", e.target.value)}
              className="input"
              autoComplete="off"
            />
          </Field>
        </div>

        <details className="mb-5 rounded-lg border border-white/12 px-3 py-2.5">
          <summary className="cursor-pointer text-sm font-semibold text-ink-2">Company and project details</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Field label="Client company">
              <input value={form.clientCompany} onChange={(e) => updateField("clientCompany", e.target.value)} className="input" />
            </Field>
            <Field label="Project name">
              <input value={form.projectName} onChange={(e) => updateField("projectName", e.target.value)} className="input" />
            </Field>
            <Field label="Invoice description">
              <input value={form.description} onChange={(e) => updateField("description", e.target.value)} className="input" />
            </Field>
          </div>
        </details>

        <fieldset className="mb-6 min-w-0">
          <legend className="mb-3 font-display text-lg font-semibold">Line items</legend>
          <div className="grid gap-3">
            {form.lineItems.map((item, i) => (
              <div key={i} className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end gap-2 rounded-lg border border-white/10 p-3 sm:grid-cols-[minmax(0,1fr)_5rem_6rem_7rem_2.75rem] sm:gap-3">
                <Field label="Description" className="col-span-full sm:col-span-1">
                  <input value={item.description} onChange={(e) => updateLineItem(i, "description", e.target.value)} className="input" />
                </Field>
                <Field label="Quantity">
                  <input type="number" min="0" step="any" value={item.quantity} onChange={(e) => updateLineItem(i, "quantity", e.target.value)} className="input" />
                </Field>
                <Field label="Rate">
                  <input type="number" min="0" step="any" value={item.rate} onChange={(e) => updateLineItem(i, "rate", e.target.value)} className="input" />
                </Field>
                <div className="col-span-2 min-w-0 self-center text-sm sm:col-span-1 sm:self-end sm:pb-2">
                  <span className="block text-xs text-ink-2">Amount</span>
                  <span className="font-semibold tabular-nums [overflow-wrap:anywhere]">{formatMoney(totals.amounts[i], form.currency)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeLineItem(i)}
                  disabled={form.lineItems.length === 1}
                  className="col-start-3 row-start-2 h-11 w-11 rounded-lg border border-white/12 text-ink-2 disabled:opacity-30 sm:col-start-auto sm:row-start-auto"
                  aria-label={`Remove line item ${i + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addLineItem} className="mt-2 min-h-11 text-sm font-semibold text-accent">
            Add line item
          </button>
        </fieldset>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Currency">
            <select
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
              className="input"
            >
              {INVOICE_CURRENCIES.map((c) => (
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
              step="any"
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
              <span>{formatMoney(totals.taxAmount, form.currency)}</span>
            </div>
          )}
          <div className="mt-1 flex w-48 justify-between border-t border-white/10 pt-1 font-bold text-ink">
            <span>Total</span>
            <span>{formatMoney(totals.total, form.currency)}</span>
          </div>
        </div>

        {formMessage && (
          <p role="status" className={`mb-4 text-sm ${formMessage.tone === "error" ? "text-red-400" : "text-accent"}`}>
            {formMessage.text}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePreview}
            disabled={previewing}
            className="rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {previewing ? "Generating..." : "Preview PDF"}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-canvas disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Invoice"}
          </button>
        </div>
        {previewUrl && (
          <div className="mt-4 border-t border-white/12 pt-4">
            <a href={previewUrl} target="_blank" rel="noopener" className="text-sm font-semibold underline underline-offset-4">Open generated PDF in a new tab</a>
          </div>
        )}
      </form>

      <section id="invoice-history" aria-labelledby="invoice-history-title">
        <h2 id="invoice-history-title" className="mb-4 font-display text-xl font-semibold">Invoice history</h2>
        {historyMessage && <p role="status" className={`mb-3 text-sm ${historyMessage.tone === "error" ? "text-red-300" : "text-accent"}`}>{historyMessage.text}</p>}
        {invoices.length === 0 ? (
          <p className="text-ink-2">No invoices yet.</p>
        ) : (
          <ul className="divide-y divide-white/10 rounded-xl border border-white/12">
            {invoices.map((inv) => (
              <li key={inv.id} className="grid min-w-0 grid-cols-2 items-center gap-3 px-3 py-3 text-sm sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1fr)_6rem_auto] sm:px-4">
                <span className="font-semibold [overflow-wrap:anywhere]">{inv.invoice_number}</span>
                <span className="min-w-0 text-ink-2 [overflow-wrap:anywhere]">
                  {inv.client_name}
                  {inv.client_company ? <span className="block text-xs">{inv.client_company}</span> : null}
                </span>
                <span className="tabular-nums [overflow-wrap:anywhere]">{formatMoney(inv.total, inv.currency)}</span>
                <select
                  aria-label={`Status for ${inv.invoice_number}`}
                  value={inv.status}
                  onChange={(e) => handleStatusChange(inv, e.target.value)}
                  disabled={rowBusy !== null}
                  className="min-h-10 w-full rounded-lg border border-white/15 bg-card-3 px-2 text-sm"
                >
                  {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <div className="col-span-2 flex flex-wrap gap-x-4 sm:col-span-1">
                  <a href={`/api/invoice/${inv.id}/pdf`} download className="inline-flex min-h-10 items-center text-accent underline-offset-4 hover:underline">PDF</a>
                  <button
                    type="button"
                    onClick={() => handleEmail(inv)}
                    disabled={rowBusy !== null || !inv.client_email || inv.email_sent || inv.email_needs_review}
                    className="min-h-10 text-ink-2 disabled:opacity-40"
                    title={inv.email_needs_review ? "Check the delivery in Resend" : !inv.client_email ? "No client email on file" : undefined}
                  >
                    {inv.email_needs_review ? "Review delivery" : inv.email_sent ? "Emailed" : "Email"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {nextCursor !== null && (
          <button type="button" onClick={loadMore} disabled={loadingMore} className="mt-4 min-h-11 rounded-lg border border-white/15 px-4 text-sm font-semibold disabled:opacity-60">
            {loadingMore ? "Loading…" : "Load older invoices"}
          </button>
        )}
      </section>

      <style jsx global>{`
        .invoice-form .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--color-card-3);
          padding: 10px 14px;
          font-size: 14px;
          font-family: inherit;
          color: var(--color-ink);
        }
        .invoice-form .input:focus {
          outline: none;
          border-color: rgba(110, 231, 183, 0.5);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <span className="text-sm text-ink-2">{label}</span>
      {children}
    </label>
  );
}
