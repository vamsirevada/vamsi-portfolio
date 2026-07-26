import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import { differentiators, techStack } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-295 px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,80px)] md:grid-cols-[1.1fr_0.9fr]">
        <div
          data-reveal="true"
          className="translate-y-7.5 opacity-0 transition-[opacity,transform] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <SectionEyebrow label="About" />
          <h2 className="m-0 mb-6 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">
            I turn ambitious ideas into fast, reliable software.
          </h2>
          <p className="m-0 mb-5 text-[17px] leading-[1.8] text-ink-2">
            I&apos;m a full-stack developer and freelancer who partners directly with founders to design, build and
            ship products end-to-end. Over the past five years I&apos;ve shipped real-time platforms, mobile apps
            and AI-powered products for teams who need to move fast without cutting corners.
          </p>
          <p className="m-0 mb-9 text-[17px] leading-[1.8] text-ink-2">
            I care about the details most people skip — the loading state, the empty state, the millisecond of
            latency. That&apos;s what separates good software from great software.
          </p>

          <div className="mb-10 flex flex-col gap-5">
            {differentiators.map((d) => (
              <div key={d.n} className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-accent/25 bg-accent/10 text-[15px] font-bold text-accent">
                  {d.n}
                </div>
                <div>
                  <div className="mb-1 text-[15px] font-bold text-ink">{d.title}</div>
                  <div className="text-sm leading-[1.6] text-ink-3">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {techStack.map((t) => (
              <span
                key={t}
                data-cursor-hover="true"
                className="rounded-full border border-white/8 bg-card px-4 py-2.25 text-[13px] text-[#d4d4d4] transition-[transform,border-color,color] duration-250 ease-out hover:-translate-y-0.75 hover:border-accent/50 hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          data-reveal="true"
          className="flex translate-y-7.5 flex-col gap-5 opacity-0 transition-[opacity,transform] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] delay-150"
        >
          <div
            data-tilt="true"
            className="relative overflow-hidden rounded-3xl border border-white/8 transition-transform duration-200 ease-out"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src="/portrait.png"
              alt="Vamsi Revada"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/8 bg-card p-5">
              <div className="font-display text-[28px] font-bold text-ink">5+</div>
              <div className="mt-1 text-[13px] text-ink-3">Years experience</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-card p-5">
              <div className="font-display text-[28px] font-bold text-ink">7+</div>
              <div className="mt-1 text-[13px] text-ink-3">Projects shipped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
