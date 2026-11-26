"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { site } from "@/lib/content";
import Shine from "./Shine";

const HeroNetwork = dynamic(() => import("./HeroNetwork"), { ssr: false });

export default function Hero() {
  const [showNetwork, setShowNetwork] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let timer;

    function updateNetwork() {
      clearTimeout(timer);
      if (query.matches) {
        timer = setTimeout(() => setShowNetwork(true), 2200);
      } else {
        setShowNetwork(false);
      }
    }

    updateNetwork();
    query.addEventListener("change", updateNetwork);
    return () => {
      clearTimeout(timer);
      query.removeEventListener("change", updateNetwork);
    };
  }, []);

  return (
    <section id="top" aria-labelledby="hero-title" className="portfolio-hero relative isolate">
      {showNetwork && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-3/4 opacity-50">
          <HeroNetwork />
        </div>
      )}

      <div className="portfolio-shell grid items-center gap-12 pt-28 pb-14 md:pt-32 md:pb-20 min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] min-[900px]:gap-16">
        <div>
          <div className="mb-7 flex items-center gap-2.5 text-sm font-semibold text-accent sm:mb-9">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_18px_#6ee7b766]" />
            Available for freelance projects
          </div>
          <p className="mb-3 font-mono text-[0.82rem] font-medium tracking-[0.14em] text-ink-2 uppercase">
            {site.role}
          </p>
          <h1 id="hero-title" className="font-display text-[clamp(3.25rem,8.2vw,7.25rem)] font-bold leading-[0.92] tracking-[-0.085em]">
            Vamsi<br />Revada<span className="text-accent">.</span>
          </h1>
          <p className="mt-7 max-w-md text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65] text-ink-2">
            I build web and mobile apps, from real-time platforms to AI-powered products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group relative isolate inline-flex min-h-12 items-center overflow-hidden rounded-lg bg-accent px-5 py-3 text-sm font-bold text-canvas"
            >
              <span className="relative z-10">View selected work</span>
              <Shine />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-lg border border-white/18 bg-canvas/35 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero-portrait relative mx-auto w-full max-w-[400px] min-[900px]:mr-2">
          <div className="relative aspect-[4/4.55] overflow-hidden rounded-[inherit] bg-card-2">
            <Image
              src="/portrait.png"
              alt={site.name}
              fill
              priority
              sizes="(min-width: 900px) 400px, (min-width: 465px) 400px, 90vw"
              className="object-cover object-[center_38%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
