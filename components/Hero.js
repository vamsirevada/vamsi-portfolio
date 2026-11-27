import Image from "next/image";
import Link from "next/link";
import { featuredProjects, site } from "@/lib/content";

const [leadProject] = featuredProjects;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="portfolio-hero relative isolate">
      <div className="portfolio-shell grid items-center gap-8 pt-24 pb-12 sm:pt-28 min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] min-[900px]:gap-16 min-[900px]:pt-32 min-[900px]:pb-20">
        <div>
          <div className="mb-5 flex items-center gap-2.5 text-sm font-semibold text-accent sm:mb-7">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_18px_#6ee7b766]" />
            Available for freelance projects
          </div>
          <h1 id="hero-title" className="max-w-[19ch] text-balance font-display text-[clamp(2.35rem,5.3vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.065em]">
            Booking and operations software for founders<span className="text-accent">.</span>
          </h1>
          <p className="mt-7 max-w-md text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65] text-ink-2">
            I build web and mobile apps that help teams take reservations, track availability, and replace manual workflows.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-canvas hover:bg-[#96f0cd]"
            >
              Tell me about your project
            </a>
            {leadProject.caseStudyHref && (
              <Link
                href={leadProject.caseStudyHref}
                className="inline-flex min-h-12 items-center rounded-lg border border-white/18 bg-canvas/35 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent/60 hover:text-accent"
              >
                See the {leadProject.name} case study
              </Link>
            )}
          </div>
        </div>

        <div className="hero-portrait relative w-full max-w-56 min-[900px]:mx-auto min-[900px]:mr-2 min-[900px]:max-w-[400px]">
          <div className="relative aspect-[4/3] min-[900px]:aspect-[4/4.55] overflow-hidden rounded-[inherit] bg-card-2">
            <Image
              src="/portrait.png"
              alt={site.name}
              fill
              priority
              sizes="(min-width: 900px) 400px, 224px"
              className="object-cover object-[center_38%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
