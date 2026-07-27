"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { IconArrowRight } from "./Icons";

const mk = (s, accentLast) =>
  s.split("").map((c, i) => ({
    ch: c === " " ? " " : c,
    color: accentLast && i === s.length - 1 ? "#6EE7B7" : accentLast ? "#ffffff" : "#b4b4b4",
    big: !!accentLast,
  }));

const heroLine1 = mk("Hi, I'm", false);
const heroLine2 = mk("Vamsi Revada.", true);

export default function Hero({ blob1Ref, blob2Ref, blob3Ref, heroSubRef, heroCtaRef }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }).map(() => ({
        left: Math.random() * 100,
        top: 40 + Math.random() * 55,
        size: 2 + Math.random() * 3,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-[clamp(20px,6vw,64px)] pt-[140px] pb-[80px] text-center"
    >
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute top-[-10%] left-[-10%] h-[520px] w-[520px] animate-[blobFloatA_14s_ease-in-out_infinite] rounded-full blur-[40px]"
        style={{ background: "radial-gradient(circle, rgba(110,231,183,0.22), transparent 70%)" }}
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute right-[-10%] bottom-[-15%] h-[600px] w-[600px] animate-[blobFloatB_18s_ease-in-out_infinite] rounded-full blur-[50px]"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.15), transparent 70%)" }}
      />
      <div
        ref={blob3Ref}
        className="pointer-events-none absolute top-[30%] right-[20%] h-[380px] w-[380px] animate-[blobFloatC_16s_ease-in-out_infinite] rounded-full blur-[45px]"
        style={{ background: "radial-gradient(circle, rgba(110,231,183,0.12), transparent 70%)" }}
      />

      {particles.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full bg-accent"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `particleFloat ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="relative z-3 flex max-w-[900px] flex-col items-center gap-7">
        <div
          data-hero-badge="true"
          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-2 opacity-0"
        >
          <span data-status-dot="true" className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_#6EE7B7]" />
          <span className="text-[13px] tracking-[0.02em] text-ink-2">Available for freelance projects</span>
        </div>

        <h1 className="m-0 font-display text-[clamp(44px,8vw,92px)] font-bold leading-[1.02] tracking-[-0.03em]">
          <div className="overflow-hidden pb-1.5">
            <div className="flex flex-wrap justify-center">
              {heroLine1.map((ch, i) => (
                <span
                  key={i}
                  data-hero-letter="true"
                  className="inline-block text-[clamp(20px,3vw,32px)] font-semibold opacity-0"
                  style={{ color: ch.color, transform: "translateY(40px)" }}
                >
                  {ch.ch}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden pb-2.5">
            <div className="flex flex-wrap justify-center">
              {heroLine2.map((ch, i) => (
                <span
                  key={i}
                  data-hero-letter="true"
                  className="inline-block opacity-0"
                  style={{ color: ch.color, transform: "translateY(40px)" }}
                >
                  {ch.ch}
                </span>
              ))}
            </div>
          </div>
        </h1>

        <p
          ref={heroSubRef}
          className="m-0 max-w-[560px] text-[clamp(16px,1.6vw,19px)] leading-[1.7] text-ink-2 opacity-0"
          style={{ transform: "translateY(16px)" }}
        >
          I build premium web and mobile applications that scale — from real-time platforms to AI-powered products.
        </p>

        <div
          ref={heroCtaRef}
          className="flex flex-wrap justify-center gap-4 opacity-0"
          style={{ transform: "translateY(16px)" }}
        >
          <a
            href="#work"
            data-magnetic="true"
            data-cursor-hover="true"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-bold text-canvas shadow-[0_20px_50px_-12px_rgba(110,231,183,0.4)]"
          >
            View Projects
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener"
            data-magnetic="true"
            data-cursor-hover="true"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-8 py-4 text-[15px] font-semibold text-ink"
          >
            Book a Call
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 animate-[bounceCue_2.4s_ease-in-out_infinite]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-4">Scroll</span>
        <div
          className="h-9 w-px"
          style={{ background: "linear-gradient(to bottom, #6EE7B7, transparent)" }}
        />
      </div>
    </section>
  );
}
