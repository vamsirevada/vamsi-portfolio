import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="portfolio-shell py-[clamp(3.25rem,7vw,6rem)]">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.05em]">Services</h2>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {services.map(({ title, desc }) => (
            <li key={title} className="border-t border-white/12 py-4">
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
