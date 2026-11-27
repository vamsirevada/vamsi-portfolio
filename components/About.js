import SectionEyebrow from "./SectionEyebrow";

export default function About() {
  return (
    <section id="about" className="border-y border-white/10 bg-[#0c100e]">
      <div className="portfolio-shell grid items-start gap-10 py-[clamp(3.75rem,8vw,7rem)] md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <SectionEyebrow label="About" />
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
            Work directly with the person building your software.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.8] text-ink-2">
            I partner with founders as an independent developer, so we can discuss product decisions and technical trade-offs together.
          </p>
        </div>

        <dl id="stats" className="border-t border-white/12 pt-4">
          <dt className="text-sm text-ink-2">Years of experience</dt>
          <dd className="mt-2 font-display text-4xl font-bold text-accent">5+</dd>
        </dl>
      </div>
    </section>
  );
}
