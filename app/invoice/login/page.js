"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandMark from "@/components/BrandMark";

const SIGN_IN_ERRORS = {
  not_configured: "Set INVOICE_PASSWORD to enable sign-in.",
  invalid_password: "Incorrect password.",
  rate_limited: "Too many sign-in attempts. Try again in a few minutes.",
  login_unavailable: "Sign-in is unavailable. Check the invoice database connection.",
};

export default function InvoiceLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/invoice/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(SIGN_IN_ERRORS[data.reason] || "Sign-in failed. Try again.");
        setLoading(false);
        return;
      }
      router.push("/invoice");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/12 bg-card-2 p-6 sm:p-8">
        <BrandMark className="mb-4 h-10 w-10 rounded-lg ring-1 ring-accent/20" />
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Invoice sign-in</h1>
        <label htmlFor="invoice-password" className="mb-2 block text-sm text-ink-2">Password</label>
        <input
          id="invoice-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/15 bg-card-3 px-4 py-3 text-base text-ink"
        />
        {error && <p role="alert" className="mb-4 text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-accent p-3 text-sm font-bold text-canvas disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
