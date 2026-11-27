"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { featuredProjects, otherProjects } from "@/lib/content";

const projects = [...featuredProjects, ...otherProjects];
const cardImageSizes = "(min-width: 1500px) 440px, (min-width: 960px) 29vw, (min-width: 620px) 44vw, 90vw";
const icons = {
  close: "m6 6 12 12M18 6 6 18",
  previous: "m14 6-6 6 6 6",
  next: "m10 6 6 6-6 6",
  play: "m9 5 11 7-11 7z",
  pause: "M9 5v14m6-14v14",
  caseStudy: "M6 3h8l4 4v14H6zm8 0v5h4M9 12h6m-6 4h6",
};

function PreviewIcon({ name }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
}

function ProjectTile({ project, featured, lead = false, onPreview }) {
  const Heading = featured ? "h3" : "h4";
  const descriptionId = useId();

  return (
    <article className={lead ? "work-feature-lead" : undefined}>
      <Heading className="sr-only">{project.name}</Heading>
      <button
        type="button"
        className="work-preview-trigger"
        aria-label={`Preview ${project.name}`}
        aria-describedby={descriptionId}
        aria-haspopup="dialog"
        onClick={onPreview}
      >
        <Image
          src={project.previewClip?.poster ?? project.img}
          alt=""
          fill
          sizes={lead ? "(min-width: 1500px) 900px, (min-width: 960px) 59vw, 90vw" : cardImageSizes}
          priority={lead}
          className="object-cover object-top"
        />
      </button>
      <p id={descriptionId} className="sr-only">{project.oneLiner}</p>
    </article>
  );
}

function ProjectPreviewMedia({ project, autoPlay }) {
  const video = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const clip = project.previewClip;

  async function togglePlayback() {
    const player = video.current;
    if (!player.paused) {
      player.pause();
      return;
    }

    try {
      await player.play();
    } catch {
      setPlaying(false);
    }
  }

  return (
    <div className="project-preview-media">
      {clip && !videoFailed ? (
        <>
          <video
            ref={video}
            className="project-preview-image h-full w-full object-contain"
            src={clip.src}
            poster={clip.poster}
            aria-label={clip.description}
            autoPlay={autoPlay}
            muted
            playsInline
            preload="metadata"
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setVideoFailed(true)}
          />
          <button
            type="button"
            className="project-icon-button project-playback"
            aria-label={playing ? "Pause video" : "Play video"}
            onClick={togglePlayback}
          >
            <PreviewIcon name={playing ? "pause" : "play"} />
          </button>
        </>
      ) : (
        <Image
          src={project.img}
          alt={project.imageAlt}
          fill
          loading="eager"
          sizes="(min-width: 1320px) 1280px, 94vw"
          className="project-preview-image object-contain"
        />
      )}
    </div>
  );
}

export default function Work() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const activeProject = projects[activeIndex];

  function openPreview(event, index) {
    trigger.current = event.currentTarget;
    setAutoPlay(window.matchMedia("(prefers-reduced-motion: no-preference)").matches);
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
    if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLVideoElement) return;
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
          <ProjectTile key={project.name} project={project} featured lead={index === 0} onPreview={(event) => openPreview(event, index)} />
        ))}
      </div>

      <div className="mt-10 border-t border-white/12 pt-6 sm:mt-12">
        <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">More projects</h3>
        <div className="work-secondary-grid grid gap-4 min-[620px]:grid-cols-2">
          {otherProjects.map((project, index) => (
            <ProjectTile key={project.name} project={project} onPreview={(event) => openPreview(event, featuredProjects.length + index)} />
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
        <h2 id="project-preview-title" className="sr-only">{activeProject?.name ?? "Project preview"}</h2>
        <div className="project-preview-panel">
          <button type="button" className="project-icon-button project-preview-close" aria-label="Close preview" onClick={closePreview}>
            <PreviewIcon name="close" />
          </button>
          {activeProject && (
            <ProjectPreviewMedia key={activeProject.name} project={activeProject} autoPlay={autoPlay} />
          )}
        </div>

        {activeProject && (
          <footer className="project-preview-dock">
            <button type="button" className="project-icon-button" aria-label="Previous project" onClick={() => changeProject(-1)}>
              <PreviewIcon name="previous" />
            </button>
            <span role="status" aria-atomic="true" className="project-preview-position">
              <span className="sr-only">{activeProject.name}, project </span>{activeIndex + 1} / {projects.length}
            </span>
            <button type="button" className="project-icon-button" aria-label="Next project" onClick={() => changeProject(1)}>
              <PreviewIcon name="next" />
            </button>
            {activeProject.caseStudyHref && (
              <Link
                href={activeProject.caseStudyHref}
                className="project-icon-button"
                aria-label={`Read ${activeProject.name} case study`}
                title="Read case study"
                onClick={closePreview}
              >
                <PreviewIcon name="caseStudy" />
              </Link>
            )}
          </footer>
        )}
      </dialog>
    </section>
  );
}
