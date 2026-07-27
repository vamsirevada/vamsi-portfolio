import SectionEyebrow from "./SectionEyebrow";
import ImagePlaceholder from "./ImagePlaceholder";
import { IconArrowUpRight } from "./Icons";
import { featuredProjects, otherProjects } from "@/lib/content";

export default function Work() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-[1180px] px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div
        data-reveal="true"
        className="mx-auto mb-16 max-w-[640px] translate-y-6 text-center opacity-0 transition-[opacity,transform] duration-800 ease-out"
      >
        <SectionEyebrow label="Selected Work" centered />
        <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
          Products people actually use.
        </h2>
      </div>

      <div className="mb-8 flex flex-col gap-8">
        {featuredProjects.map((proj) => (
          <div
            key={proj.name}
            data-reveal="true"
            data-tilt="true"
            className="group grid translate-y-[30px] grid-cols-1 overflow-hidden rounded-[24px] border border-white/8 bg-card-2 opacity-0 transition-[opacity,transform,box-shadow] duration-300 ease-out md:grid-cols-2"
          >
            <div className="relative" style={{ aspectRatio: "16/11" }}>
              <ImagePlaceholder label={proj.imgPlaceholder} src={proj.img} />
            </div>
            <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,3vw,48px)]">
              <div>
                <div className="mb-2.5 text-xs font-bold tracking-[0.15em] text-accent uppercase">{proj.tag}</div>
                <h3 className="m-0 mb-2.5 font-display text-[clamp(22px,2.4vw,30px)] font-semibold text-ink">
                  {proj.name}
                </h3>
                <p className="m-0 text-[15px] leading-[1.7] text-ink-2">{proj.oneLiner}</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-sm text-ink-3">
                  <span className="font-semibold text-ink">Problem — </span>
                  {proj.problem}
                </div>
                <div className="text-sm text-ink-3">
                  <span className="font-semibold text-ink">Solution — </span>
                  {proj.solution}
                </div>
                <div className="text-sm text-ink-3">
                  <span className="font-semibold text-ink">Outcome — </span>
                  {proj.outcome}
                </div>
              </div>
              <div data-reveal-stagger="true" className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span key={t} className="opacity-0 rounded-full bg-white/5 px-3 py-1.5 text-xs text-[#d4d4d4]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-1.5 flex gap-5">
                <a href={proj.demo} target="_blank" rel="noopener" data-cursor-hover="true" className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  Live Demo <IconArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href={proj.github} target="_blank" rel="noopener" data-cursor-hover="true" className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  GitHub <IconArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        data-reveal-stagger="true"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {otherProjects.map((proj) => (
          <div
            key={proj.name}
            data-tilt="true"
            className="group flex translate-y-[30px] flex-col overflow-hidden rounded-[20px] border border-white/8 bg-card-2 opacity-0"
          >
            <div style={{ aspectRatio: "16/10" }}>
              <ImagePlaceholder label={proj.imgPlaceholder} src={proj.img} />
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <h4 className="m-0 font-display text-lg font-semibold text-ink">{proj.name}</h4>
              <p className="m-0 flex-1 text-[13.5px] leading-[1.6] text-ink-3">{proj.oneLiner}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {proj.tech.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-[5px] text-[11px] text-ink-2">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
