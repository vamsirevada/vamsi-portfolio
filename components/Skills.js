import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import { skillCategories } from "@/lib/content";
import { fadeInUp, staggerContainer, staggerItem, revealViewport } from "@/lib/motion";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y border-white/6 bg-surface px-[clamp(20px,6vw,64px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mx-auto mb-14 max-w-[640px] text-center"
        >
          <SectionEyebrow label="Skills" centered />
          <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
            The stack behind the work.
          </h2>
        </motion.div>
        <div className="flex flex-col gap-8">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.cat}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <div className="mb-3.5 text-[13px] font-bold tracking-[0.05em] text-accent">{cat.cat}</div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                className="flex flex-wrap gap-3"
              >
                {cat.items.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    data-cursor-hover="true"
                    className="rounded-[14px] border border-white/8 bg-card-2 px-5 py-3.5 text-sm font-semibold text-[#d4d4d4] transition-[transform,border-color,color,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:border-accent/40 hover:text-accent hover:shadow-[0_12px_30px_-10px_rgba(110,231,183,0.25)]"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
