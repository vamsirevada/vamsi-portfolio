import SectionEyebrow from "./SectionEyebrow";
import { site } from "@/lib/content";
import { IconArrowUpRight, IconDownload } from "./Icons";

const links = (site) => [
  { label: "Book a Call", href: site.calendlyUrl, external: true, icon: "arrow" },
  { label: "Email", href: `mailto:${site.email}`, external: false, text: site.email },
  { label: "LinkedIn", href: site.linkedinUrl, external: true, icon: "arrow" },
  { label: "GitHub", href: site.githubUrl, external: true, icon: "arrow" },
  { label: "Resume", href: site.resumeUrl, external: true, icon: "download" },
];

const STATUS_MESSAGES = {
  validation: { tone: "error", text: "Please fill in all fields." },
  error: { tone: "error", text: `Something went wrong — email me directly at ${site.email} instead.` },
  not_configured: { tone: "error", text: `Direct sending isn't set up yet — email me directly at ${site.email} instead.` },
  success: { tone: "accent", text: "Thanks — I'll get back to you soon." },
};

export default function Contact({ nameRef, emailRef, messageRef, honeypotRef, sendMessage, sendStatus }) {
  const statusMessage = STATUS_MESSAGES[sendStatus];
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1000px] px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,160px)] text-center"
    >
      <div data-reveal="true" className="translate-y-6 opacity-0 transition-[opacity,transform] duration-800 ease-out">
        <SectionEyebrow label="Contact" centered />
        <h2 className="m-0 mb-5 font-display text-[clamp(34px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">
          Let&apos;s build something great.
        </h2>
        <p className="mx-auto mb-12 max-w-[520px] text-canvas leading-[1.7] text-ink-2">
          Have a project in mind? Tell me about it, or grab time on my calendar directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-[1.1fr_0.9fr]">
        <div
          data-reveal="true"
          className="translate-y-5 rounded-[24px] border border-white/8 bg-card-2 p-[clamp(24px,3vw,36px)] opacity-0 transition-[opacity,transform] duration-800 ease-out [transition-delay:0.1s]"
        >
          <div className="flex flex-col gap-[18px]">
            <input
              ref={honeypotRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
              style={{ left: "-9999px" }}
            />
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-ink-3">Name</label>
              <input
                ref={nameRef}
                type="text"
                placeholder="Your name"
                className="rounded-xl border border-white/10 bg-card-3 px-4 py-3.5 text-[15px] font-[inherit] text-ink placeholder:text-ink-4 focus:border-accent/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-ink-3">Email</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@company.com"
                className="rounded-xl border border-white/10 bg-card-3 px-4 py-3.5 text-[15px] font-[inherit] text-ink placeholder:text-ink-4 focus:border-accent/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-ink-3">Project details</label>
              <textarea
                ref={messageRef}
                rows={4}
                placeholder="Tell me a bit about what you're building..."
                className="resize-y rounded-xl border border-white/10 bg-card-3 px-4 py-3.5 text-[15px] font-[inherit] text-ink placeholder:text-ink-4 focus:border-accent/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={sendMessage}
              disabled={sendStatus === "sending"}
              data-magnetic="true"
              data-cursor-hover="true"
              className="mt-1.5 cursor-pointer rounded-full border-none bg-accent p-4 text-[15px] font-bold text-canvas disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sendStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
            {statusMessage && (
              <p className={`text-sm ${statusMessage.tone === "error" ? "text-red-400" : "text-accent"}`}>
                {statusMessage.text}
              </p>
            )}
          </div>
        </div>

        <div
          data-reveal="true"
          className="flex translate-y-5 flex-col gap-3.5 opacity-0 transition-[opacity,transform] duration-800 ease-out [transition-delay:0.2s]"
        >
          {links(site).map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener" : undefined}
              data-cursor-hover="true"
              className="flex items-center justify-between rounded-[18px] border border-white/8 bg-card-2 px-6 py-[22px] text-ink"
            >
              <span className="text-[15px] font-semibold">{l.label}</span>
              {l.text ? (
                <span className="text-[13px] text-ink-3">{l.text}</span>
              ) : l.icon === "download" ? (
                <IconDownload className="h-4 w-4 text-accent" />
              ) : (
                <IconArrowUpRight className="h-4 w-4 text-accent" />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
