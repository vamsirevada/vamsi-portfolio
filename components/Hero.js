import Image from "next/image";
import Link from "next/link";
import { featuredProjects, portfolioHeadline, site } from "@/lib/content";

const showcasedProjects = featuredProjects.filter((project) => project.caseStudyHref).slice(0, 2);
const [leadProject] = showcasedProjects;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="home-hero">
      <div className="portfolio-shell home-hero-layout">
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-3.5 sm:mb-8">
            <Image
              src="/portrait.png"
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-[52px] shrink-0 rounded-full object-cover object-[center_38%] ring-1 ring-white/15"
            />
            <div>
              <p className="text-sm font-bold text-ink">{site.role}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Available for freelance projects
              </p>
            </div>
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
            {leadProject && (
              <Link href={leadProject.caseStudyHref} className="inline-flex min-h-12 items-center text-sm font-bold text-ink underline decoration-white/35 underline-offset-4 hover:text-accent">
                See the {leadProject.name} case study
              </Link>
            )}
          </div>
        </div>

        <div className="home-project-gallery" role="group" aria-label="Featured case studies">
          {showcasedProjects.map((project, index) => (
            <Link key={project.name} href={project.caseStudyHref} className="home-project-preview">
              <div className="home-project-image">
                <Image
                  src={project.img}
                  alt=""
                  width={1280}
                  height={661}
                  sizes="(min-width: 1280px) 500px, (min-width: 880px) 43vw, (min-width: 600px) 44vw, 90vw"
                  priority={index === 0}
                  className="h-auto w-full"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <span className="block font-display text-xl leading-tight font-semibold tracking-tight text-ink">{project.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink-2">{project.oneLiner}</span>
                </div>
                <span className="home-project-label text-right text-sm font-semibold text-accent">Case study</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
