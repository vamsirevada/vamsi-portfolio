"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { featuredProjects, otherProjects } from "@/lib/content";

const projects = [...featuredProjects, ...otherProjects];
const cardImageSizes = "(min-width: 1500px) 440px, (min-width: 960px) 29vw, (min-width: 620px) 44vw, 90vw";
const previewButtonClass = "min-h-11 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-ink hover:border-accent/50 hover:bg-white/5";

function Technologies({ items }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#a5c8b7]">
      {items.map((tech) => <li key={tech}>{tech}</li>)}
    </ul>
  );
}

function FeaturedProject({ project, lead, onPreview }) {
  return (
    <article className={lead ? "work-feature-lead" : undefined}>
      <div className="work-feature-card">
        <button
          type="button"
          className="work-preview-trigger work-feature-media block w-full overflow-hidden border-b border-white/12 bg-card"
          aria-label={`Preview ${project.name}`}
          aria-haspopup="dialog"
          onClick={onPreview}
        >
          <Image
            src={project.img}
            alt={project.imageAlt}
            width={1280}
            height={661}
            sizes={lead ? "(min-width: 1500px) 900px, (min-width: 960px) 59vw, 90vw" : cardImageSizes}
            priority={lead}
            className="block h-auto w-full"
          />
          <span className="work-preview-label" aria-hidden="true">Preview</span>
        </button>
        <div className="space-y-2 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight font-semibold tracking-tight text-ink">
              {project.name}
            </h3>
            {project.caseStudyHref && (
              <Link href={project.caseStudyHref} className="text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4">
                Read the <span className="sr-only">{project.name} </span>case study
              </Link>
            )}
          </div>
          <p className="text-base leading-snug text-ink-2">{project.oneLiner}</p>
          <Technologies items={project.tech} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeProject = projects[activeIndex];

  function openPreview(event, index) {
    trigger.current = event.currentTarget;
    setActiveIndex(index);
    dialog.current.showModal();
  }

  function closePreview() {
    dialog.current.close();
  }

  function restoreGalleryFocus() {
    setActiveIndex(null);
    trigger.current?.focus({ preventScroll: true });
  }

  function changeProject(direction) {
    setActiveIndex((index) => (index + direction + projects.length) % projects.length);
  }

  function handlePreviewKeys(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changeProject(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <section id="work" aria-labelledby="work-title" className="home-work">
      <h2 id="work-title" className="mb-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.065em] sm:mb-6">
        Selected work<span className="text-accent">.</span>
      </h2>

      <div className="work-feature-grid">
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.name} project={project} lead={index === 0} onPreview={(event) => openPreview(event, index)} />
        ))}
      </div>

      <div className="mt-10 border-t border-white/12 pt-6 sm:mt-12">
        <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">More projects</h3>
        <div className="work-secondary-grid grid gap-x-4 gap-y-7 min-[620px]:grid-cols-2">
          {otherProjects.map((project, index) => (
            <article key={project.name}>
              <button
                type="button"
                className="work-preview-trigger aspect-video w-full overflow-hidden rounded-xl border border-white/12 bg-card"
                aria-label={`Preview ${project.name}`}
                aria-haspopup="dialog"
                onClick={(event) => openPreview(event, featuredProjects.length + index)}
              >
                <Image
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top"
                  src={project.img}
                  sizes={cardImageSizes}
                />
                <span className="work-preview-label" aria-hidden="true">Preview</span>
              </button>
              <div className="space-y-2 pt-3">
                <h4 className="font-display text-xl font-semibold tracking-tight">{project.name}</h4>
                <p className="text-base leading-relaxed text-ink-2">{project.oneLiner}</p>
                <Technologies items={project.tech} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        className="project-preview"
        aria-labelledby="project-preview-title"
        onClose={restoreGalleryFocus}
        onKeyDown={handlePreviewKeys}
        onClick={(event) => { if (event.target === event.currentTarget) closePreview(); }}
      >
        <div className="project-preview-panel">
          <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <h2 id="project-preview-title" className="min-w-0 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {activeProject?.name ?? "Project preview"}
            </h2>
            <button type="button" className={previewButtonClass} onClick={closePreview}>Close</button>
          </header>

          {activeProject && (
            <>
              <div className="project-preview-media">
                <Image
                  key={activeProject.name}
                  src={activeProject.img}
                  alt={activeProject.imageAlt}
                  fill
                  loading="eager"
                  sizes="(min-width: 1320px) 1280px, 94vw"
                  className="project-preview-image object-contain"
                />
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button type="button" className={previewButtonClass} onClick={() => changeProject(-1)}>Previous</button>
                  <span role="status" aria-atomic="true" className="min-w-[3.2rem] text-center text-sm text-ink-2 tabular-nums">
                    <span className="sr-only">{activeProject.name}, project </span>{activeIndex + 1} of {projects.length}
                  </span>
                  <button type="button" className={previewButtonClass} onClick={() => changeProject(1)}>Next</button>
                </div>
                {activeProject.caseStudyHref && (
                  <Link href={activeProject.caseStudyHref} onClick={closePreview} className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4">
                    Read {activeProject.name} case study
                  </Link>
                )}
              </footer>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
