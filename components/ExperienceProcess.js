import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import { timelineItems, processSteps } from "@/lib/content";
import { fadeInUp, staggerContainer, staggerItem, staggerItemX, tileHover, revealViewport } from "@/lib/motion";

export default function ExperienceProcess() {
  return (
    <section
      id="process-experience"
      className="relative mx-auto max-w-[1180px] px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="grid grid-cols-1 gap-[clamp(40px,6vw,80px)] md:grid-cols-2">
        <div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mb-10"
          >
            <SectionEyebrow label="Experience" />
            <h2 className="m-0 font-display text-[clamp(26px,3.4vw,36px)] font-semibold tracking-[-0.02em]">
              A quick look back.
            </h2>
          </motion.div>
          <div className="relative pl-7">
            <div
              className="absolute top-1.5 bottom-1.5 left-[5px] w-px"
              style={{ background: "linear-gradient(to bottom, #6EE7B7, rgba(255,255,255,0.08))" }}
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              {timelineItems.map((item) => (
                <motion.div key={item.year} variants={staggerItemX} className="relative pb-9">
                  <div className="absolute top-[5px] left-[-28px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-canvas" />
                  <div className="mb-1.5 text-xs font-bold tracking-[0.05em] text-accent">{item.year}</div>
                  <div className="mb-1 font-display text-canvas font-bold text-ink">{item.title}</div>
                  <div className="text-sm leading-[1.6] text-ink-3">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div id="process">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mb-10"
          >
            <SectionEyebrow label="Process" />
            <h2 className="m-0 font-display text-[clamp(26px,3.4vw,36px)] font-semibold tracking-[-0.02em]">
              How we&apos;d work together.
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="flex flex-col gap-px overflow-hidden rounded-[20px] border border-white/8 bg-white/6"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.n}
                variants={staggerItem}
                {...tileHover}
                className="relative flex items-start gap-[18px] bg-card px-6 py-[22px] transition-colors duration-300 ease-out hover:bg-[#161616]"
              >
                <div className="shrink-0 font-display text-xl font-bold text-white/20">{step.n}</div>
                <div>
                  <div className="mb-1 text-[15px] font-bold text-ink">{step.title}</div>
                  <div className="text-[13.5px] leading-[1.5] text-ink-3">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
