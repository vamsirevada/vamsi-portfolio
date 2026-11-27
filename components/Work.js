import Image from "next/image";
import Link from "next/link";
import { featuredProjects, otherProjects } from "@/lib/content";

function Technologies({ items }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-accent">
      {items.map((tech) => <li key={tech}>{tech}</li>)}
    </ul>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="portfolio-shell py-[clamp(3rem,7vw,6rem)]">
      <h2 id="work-title" className="mb-7 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none font-semibold tracking-[-0.07em] sm:mb-9">
        Selected work<span className="text-accent">.</span>
      </h2>

      <div className="divide-y divide-white/12 border-y border-white/12">
        {featuredProjects.map((project) => (
          <article key={project.name} className="grid items-start gap-x-8 gap-y-3 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] sm:py-7 min-[920px]:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,13rem)]">
            <h3 className="font-display text-[clamp(1.65rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-tight">
              {project.name}
            </h3>
            <div className="min-w-0 space-y-2">
              <p className="font-semibold text-ink">{project.oneLiner}</p>
              <p className="max-w-xl text-base leading-relaxed text-ink-2">{project.workflow}</p>
              <Technologies items={project.tech} />
            </div>
            {project.caseStudyHref ? (
              <Link
                href={project.caseStudyHref}
                className="inline-flex min-h-11 w-fit items-center text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent sm:max-[919px]:col-start-2 min-[920px]:justify-self-end"
              >
                Read the {project.name} case study
              </Link>
            ) : (
              <Image
                src={project.img}
                alt={project.imageAlt}
                width={1280}
                height={661}
                sizes="208px"
                className="aspect-video w-full max-w-52 rounded-lg border border-white/12 object-cover object-top sm:max-[919px]:col-start-2 min-[920px]:justify-self-end"
              />
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 sm:mt-16">
        <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">More projects</h3>
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <article key={project.name}>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-white/12 bg-card">
                <Image
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top"
                  src={project.img}
                  sizes="(min-width: 1280px) 375px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
              <div className="space-y-2 pt-3">
                <h4 className="font-display text-xl font-semibold tracking-tight">{project.name}</h4>
                <p className="text-base leading-relaxed text-ink-2">{project.oneLiner}</p>
                <Technologies items={project.tech} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
