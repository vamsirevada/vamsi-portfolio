"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        setError(
          data.reason === "not_configured"
            ? "The invoice tool isn't configured yet — set INVOICE_PASSWORD."
            : "Incorrect password."
        );
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
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/8 bg-card-2 p-8">
        <h1 className="mb-6 font-display text-xl font-semibold text-ink">Invoice Tool</h1>
        <label className="mb-2 block text-[13px] text-ink-3">Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-white/10 bg-card-3 px-4 py-3.5 text-[15px] font-[inherit] text-ink placeholder:text-ink-4 focus:border-accent/50 focus:outline-none"
          placeholder="Enter password"
        />
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-full border-none bg-accent p-4 text-[15px] font-bold text-canvas disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Checking..." : "Unlock"}
        </button>
      </form>
    </main>
  );
}
