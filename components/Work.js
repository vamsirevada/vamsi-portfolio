import Image from "next/image";
import Link from "next/link";
import { featuredProjects, otherProjects } from "@/lib/content";

function Technologies({ items }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#a5c8b7]">
      {items.map((tech) => <li key={tech}>{tech}</li>)}
    </ul>
  );
}

function FeaturedProject({ project, lead }) {
  const card = (
    <>
      <Image
        src={project.img}
        alt={project.imageAlt}
        width={1280}
        height={661}
        sizes={lead
          ? "(min-width: 1500px) 900px, (min-width: 960px) 59vw, 90vw"
          : "(min-width: 1500px) 440px, (min-width: 960px) 29vw, (min-width: 620px) 44vw, 90vw"}
        priority={lead}
        className="block h-auto w-full border-b border-white/12 bg-card"
      />
      <div className="space-y-2 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight font-semibold tracking-tight text-ink">
            {project.name}
          </h3>
          {project.caseStudyHref && <span className="text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4">Read case study</span>}
        </div>
        <p className="text-base leading-snug text-ink-2">{project.oneLiner}</p>
        <Technologies items={project.tech} />
      </div>
    </>
  );

  return (
    <article className={lead ? "work-feature-lead" : undefined}>
      {project.caseStudyHref ? (
        <Link
          href={project.caseStudyHref}
          aria-label={`Open the ${project.name} case study`}
          className="work-feature-card work-feature-link"
        >
          {card}
        </Link>
      ) : (
        <div className="work-feature-card">{card}</div>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="home-work">
      <h2 id="work-title" className="mb-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.065em] sm:mb-6">
        Selected work<span className="text-accent">.</span>
      </h2>

      <div className="work-feature-grid">
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.name} project={project} lead={index === 0} />
        ))}
      </div>

      <div className="mt-10 border-t border-white/12 pt-6 sm:mt-12">
        <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">More projects</h3>
        <div className="grid gap-x-4 gap-y-7 min-[620px]:grid-cols-2">
          {otherProjects.map((project) => (
            <article key={project.name}>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/12 bg-card">
                <Image
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top"
                  src={project.img}
                  sizes="(min-width: 1500px) 440px, (min-width: 960px) 29vw, (min-width: 620px) 44vw, 90vw"
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
