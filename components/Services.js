import SectionEyebrow from "./SectionEyebrow";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-y border-white/6 bg-surface px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          data-reveal="true"
          className="mx-auto mb-16 max-w-[640px] translate-y-6 text-center opacity-0 transition-[opacity,transform] duration-800 ease-out"
        >
          <SectionEyebrow label="Services" centered />
          <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
            What I can build for you.
          </h2>
        </div>
        <div
          data-reveal-stagger="true"
          className="grid gap-px overflow-hidden rounded-[24px] border border-white/6 bg-white/6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {services.map((s, i) => (
            <div
              key={s.n}
              className={`translate-y-5 bg-card px-7 py-9 opacity-0 transition-colors duration-300 ease-out hover:bg-[#161616] ${
                i === services.length - 1 ? "col-span-2" : ""
              }`}
            >
              <div className="mb-[18px] font-display text-[13px] font-bold text-accent">{s.n}</div>
              <h4 className="m-0 mb-2.5 font-display text-lg font-semibold text-ink">{s.title}</h4>
              <p className="m-0 text-sm leading-[1.6] text-ink-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
