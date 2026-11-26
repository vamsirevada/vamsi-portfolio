"use client";

import { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { site } from "@/lib/content";

const inputClass = "w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3.5 text-base text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none";
const labelClass = "mb-2 block text-sm font-semibold text-ink";

const profiles = [
  { label: "LinkedIn", href: site.linkedinUrl },
  { label: "GitHub", href: site.githubUrl },
  { label: "Résumé", href: site.resumeUrl },
];

const STATUS_MESSAGES = {
  validation: "Please fill in all fields.",
  error: "Your message could not be sent.",
  not_configured: "Online sending is currently unavailable.",
  success: "Thanks. I’ll review your brief and follow up by email.",
};

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function sendMessage(event) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = fields.get("name").trim();
    const email = fields.get("email").trim();
    const message = fields.get("message").trim();
    const company = fields.get("company");

    if (!name || !email || !message) {
      setStatus("validation");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus(result.reason === "not_configured" ? "not_configured" : "error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="portfolio-shell py-[clamp(3.75rem,8vw,7.5rem)]">
      <div className="grid gap-9 rounded-2xl border border-accent/20 bg-[linear-gradient(135deg,#14241b,#0b100d_65%)] p-[clamp(1.25rem,4vw,3.5rem)] lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionEyebrow label="Contact" />
          <h2 id="contact-title" className="font-display text-[clamp(2.5rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
            Tell me about your project<span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-2">
            I&apos;ll read your brief and follow up by email. If it looks like a fit, we&apos;ll set up a short call to discuss what you need.
          </p>
          <div className="mt-5 max-w-sm border-l border-accent/35 pl-4">
            <h3 className="text-sm font-semibold text-ink">Need help defining the scope?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
              We can start with a paid scoping sprint. You&apos;ll get a map of the workflow, a prioritized build plan, and an estimate.
            </p>
          </div>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block text-base font-bold text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent">
            {site.email}
          </a>
          <ul aria-label="Profiles and résumé" className="mt-7 flex flex-wrap gap-2">
            {profiles.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-10 items-center rounded-lg border border-white/15 px-3 text-sm font-semibold text-ink-2 hover:border-accent/60 hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={sendMessage} className="relative grid min-w-0 content-start gap-4">
          <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-label="Company" />
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="contact-name" className={labelClass}>Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={200} required className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="contact-email" className={labelClass}>Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={200} required className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className={labelClass}>What are you building or improving?</label>
            <p id="contact-message-help" className="mb-2 text-sm leading-relaxed text-ink-2">
              Share the workflow, who uses it, and when you&apos;d like to start. A rough brief is fine.
            </p>
            <textarea id="contact-message" aria-describedby="contact-message-help" name="message" rows={5} maxLength={5000} required className={`${inputClass} resize-y`} />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-12 cursor-pointer justify-self-start rounded-lg bg-accent px-6 py-3 text-sm font-bold text-canvas transition-colors hover:bg-[#96f0cd] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : "Send project inquiry"}
          </button>
          <div role="status" className={`text-sm leading-relaxed ${status === "success" ? "text-accent" : "text-red-300"}`}>
            {STATUS_MESSAGES[status]}
            {(status === "error" || status === "not_configured") && (
              <> Email me directly at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.</>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
