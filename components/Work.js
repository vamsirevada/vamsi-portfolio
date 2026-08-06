"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import ImagePlaceholder from "./ImagePlaceholder";
import { featuredProjects, otherProjects } from "@/lib/content";
import { fadeInUp, staggerContainer, staggerItem, revealViewport } from "@/lib/motion";

const WorkGeometry = dynamic(() => import("./WorkGeometry"), { ssr: false });

export default function Work() {
  const sectionRef = useRef(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow3D(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative mx-auto max-w-[1180px] px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      {show3D && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[clamp(320px,40vw,480px)]"
        >
          <WorkGeometry />
        </motion.div>
      )}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative z-10 mx-auto mb-16 max-w-[640px] text-center"
      >
        <SectionEyebrow label="Selected Work" centered />
        <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
          Products people actually use.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {[...featuredProjects, ...otherProjects].map((proj) => (
          <motion.div
            key={proj.name}
            variants={staggerItem}
            data-tilt="true"
            className="group flex flex-col overflow-hidden rounded-[20px] border border-white/8 bg-card-2"
          >
            <div style={{ aspectRatio: "16/10" }}>
              <ImagePlaceholder label={proj.imgPlaceholder} src={proj.img} />
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <h4 className="m-0 font-display text-lg font-semibold text-ink">{proj.name}</h4>
              <p className="m-0 flex-1 text-[13.5px] leading-[1.6] text-ink-3">{proj.oneLiner}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {proj.tech.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-[5px] text-[11px] text-ink-2">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
