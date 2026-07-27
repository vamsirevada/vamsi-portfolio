import { stats } from "@/lib/content";

export default function Stats({ statsRef }) {
  return (
    <section id="stats" className="relative mx-auto max-w-[1180px] px-[clamp(20px,6vw,64px)] py-[clamp(70px,8vw,110px)]">
      <div
        ref={statsRef}
        data-reveal-stagger="true"
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="translate-y-5 rounded-[20px] border border-white/6 bg-card px-5 py-8 text-center opacity-0"
          >
            <div className="font-display text-[clamp(36px,5vw,52px)] font-bold text-ink">
              <span data-counter="true" data-target={stat.value}>
                0
              </span>
              <span className="text-accent">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-sm text-ink-3">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
