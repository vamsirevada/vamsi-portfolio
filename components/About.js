import SectionEyebrow from "./SectionEyebrow";
import { differentiators, techStack } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-y border-white/10 bg-[#0c100e]">
      <div className="portfolio-shell grid items-start gap-10 py-[clamp(3.75rem,8vw,7rem)] md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <SectionEyebrow label="About" />
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
            I turn ambitious ideas into fast, reliable software.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.8] text-ink-2">
            I&apos;m a full-stack developer and freelancer who partners directly with founders to design, build and ship products end to end. I&apos;ve worked on real-time platforms, mobile apps and AI-powered products.
          </p>
          <ul aria-label="Technology stack" className="mt-7 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li key={tech} className="rounded-md border border-white/12 bg-white/4 px-3 py-1.5 text-[0.8125rem] text-ink-2">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-5 border-b border-white/12 pb-6">
            <div>
              <dt className="text-sm text-ink-2">Years of experience</dt>
              <dd className="mt-2 font-display text-4xl font-bold text-accent">5+</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-2">Projects shipped</dt>
              <dd className="mt-2 font-display text-4xl font-bold text-accent">7+</dd>
            </div>
          </dl>
          <ul className="divide-y divide-white/12">
            {differentiators.map(({ title, desc }) => (
              <li key={title} className="py-4">
                <h3 className="text-base font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
