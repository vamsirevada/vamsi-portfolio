import Image from "next/image";
import { portfolioHeadline, site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="home-hero">
      <div className="portfolio-shell home-hero-layout">
        <div className="min-w-0">
          <div className="mb-6 sm:mb-8">
            <p className="text-sm font-bold text-ink">{site.role}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Available for freelance projects
            </p>
          </div>

          <h1 id="hero-title" className="max-w-[18ch] text-balance font-display text-[clamp(2.5rem,4.7vw,4.65rem)] font-semibold leading-[1.01] tracking-[-0.065em]">
            {portfolioHeadline}<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-[40ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.65] text-ink-2">
            I build web and mobile apps that help teams take reservations, track availability, and replace manual workflows.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#contact" className="inline-flex min-h-12 items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-canvas hover:bg-[#96f0cd]">
              Tell me about your project
            </a>
            <a href="#work" className="inline-flex min-h-12 items-center text-sm font-bold text-ink underline decoration-white/35 underline-offset-4 hover:text-accent">
              Explore selected work
            </a>
          </div>
        </div>

        <div className="home-hero-portrait">
          <Image
            src="/portrait.png"
            alt={site.name}
            width={1087}
            height={1447}
            sizes="(min-width: 880px) 350px, 192px"
            priority
            className="aspect-square w-full rounded-[inherit] object-cover object-[center_38%] min-[880px]:aspect-[4/4.5]"
          />
        </div>
      </div>
    </section>
  );
}
