import { timelineItems, processSteps } from "@/lib/content";

export default function ExperienceProcess() {
  return (
    <div className="border-y border-white/10 bg-surface">
      <div id="process-experience" className="portfolio-shell grid gap-10 py-[clamp(3.25rem,7vw,6rem)] md:grid-cols-2 md:gap-16">
        <section aria-labelledby="experience-title">
          <h2 id="experience-title" className="mb-5 font-display text-3xl font-semibold tracking-tight">Experience</h2>
          <ol className="divide-y divide-white/12 border-t border-white/12">
            {timelineItems.map(({ year, title, desc }) => (
              <li key={year} className="py-4">
                <p className="mb-1 text-sm font-semibold text-accent">{year}</p>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{desc}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="process" aria-labelledby="process-title">
          <h2 id="process-title" className="mb-5 font-display text-3xl font-semibold tracking-tight">How we work together</h2>
          <ol className="divide-y divide-white/12 border-t border-white/12">
            {processSteps.map(({ n, title, desc }) => (
              <li key={title} className="flex gap-4 py-4">
                <span aria-hidden="true" className="text-sm font-semibold text-accent">{n}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
