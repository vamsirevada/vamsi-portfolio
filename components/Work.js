"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SectionEyebrow from "./SectionEyebrow";
import ImagePlaceholder from "./ImagePlaceholder";
import { featuredProjects, otherProjects } from "@/lib/content";

const WorkGeometry = dynamic(() => import("./WorkGeometry"), { ssr: false });
const [leadProject, ...supportingProjects] = featuredProjects;

function ProjectCard({ project, lead = false, featured = false }) {
  return (
    <article
      className={`group grid overflow-hidden rounded-2xl border border-white/12 bg-[#111713] transition-colors hover:border-accent/35 ${
        lead ? "md:grid-cols-[1.75fr_1fr]" : "grid-rows-[auto_1fr]"
      }`}
    >
      <div className={`relative overflow-hidden bg-[#0c110e] ${lead ? "aspect-[16/9] md:aspect-auto md:min-h-80" : "aspect-[16/9]"}`}>
        <ImagePlaceholder
          label={project.imgPlaceholder}
          src={project.img}
          sizes={lead ? "(min-width: 1280px) 740px, (min-width: 768px) 58vw, 90vw" : featured
            ? "(min-width: 1280px) 580px, (min-width: 640px) 45vw, 90vw"
            : "(min-width: 1280px) 375px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"}
        />
      </div>
      <div className={`flex min-w-0 flex-col gap-3 border-white/10 ${
        lead ? "justify-center border-t p-[clamp(1.5rem,3.5vw,3rem)] md:border-t-0 md:border-l" : "border-t p-5 sm:p-6"
      }`}>
        <h3 className={`font-display font-semibold tracking-[-0.035em] ${lead ? "text-[clamp(2rem,4vw,3.25rem)] leading-none" : "text-2xl leading-tight"}`}>
          {project.name}
        </h3>
        <p className="text-base leading-relaxed text-ink-2">{project.oneLiner}</p>
        <ul aria-label="Technologies" className={`flex flex-wrap gap-2 pt-2 ${lead ? "" : "mt-auto"}`}>
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-md border border-accent/15 bg-accent/6 px-2.5 py-1 text-[0.8125rem] text-accent">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Work() {
  const headingRef = useRef(null);
  const [showGeometry, setShowGeometry] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !headingRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowGeometry(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px 120px 0px" });

    observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="portfolio-shell relative isolate py-[clamp(3.75rem,8vw,7.5rem)]">
      {showGeometry && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-[320px] opacity-60 motion-reduce:hidden md:block">
          <WorkGeometry />
        </div>
      )}
      <div ref={headingRef} className="mb-9 sm:mb-12">
        <SectionEyebrow label="Portfolio" />
        <h2 id="work-title" className="font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-none tracking-[-0.07em]">
          Selected work<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="grid gap-4 sm:gap-5">
        <ProjectCard project={leadProject} lead />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {supportingProjects.map((project) => <ProjectCard key={project.name} project={project} featured />)}
        </div>
      </div>

      <div className="mt-14 border-t border-white/12 pt-8 sm:mt-20">
        <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">More projects</h3>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {otherProjects.map((project) => <ProjectCard key={project.name} project={project} />)}
        </div>
      </div>
    </section>
  );
}
