import SectionEyebrow from "./SectionEyebrow";
import ImagePlaceholder from "./ImagePlaceholder";
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

      <div
        data-reveal-stagger="true"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {[...featuredProjects, ...otherProjects].map((proj) => (
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
