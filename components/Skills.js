import SectionEyebrow from "./SectionEyebrow";
import { skillCategories } from "@/lib/content";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y border-white/6 bg-surface px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          data-reveal="true"
          className="mx-auto mb-14 max-w-[640px] translate-y-6 text-center opacity-0 transition-[opacity,transform] duration-800 ease-out"
        >
          <SectionEyebrow label="Skills" centered />
          <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
            The stack behind the work.
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {skillCategories.map((cat) => (
            <div
              key={cat.cat}
              data-reveal="true"
              className="translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-out"
            >
              <div className="mb-3.5 text-[13px] font-bold tracking-[0.05em] text-accent">{cat.cat}</div>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((skill) => (
                  <div
                    key={skill}
                    data-cursor-hover="true"
                    className="rounded-[14px] border border-white/8 bg-card-2 px-5 py-3.5 text-sm font-semibold text-[#d4d4d4] transition-[transform,border-color,color,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:border-accent/40 hover:text-accent hover:shadow-[0_12px_30px_-10px_rgba(110,231,183,0.25)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
