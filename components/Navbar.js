import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/content";
import { IconMenu, IconClose } from "./Icons";

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1, when: "afterChildren" } },
};

const menuLinkVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function Navbar({ navRef, menuOpen, toggleMenu }) {
  return (
    <>
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[900] flex items-center justify-between border-b border-white/6 bg-[rgba(5,5,5,0.4)] px-[clamp(20px,5vw,64px)] py-[18px] backdrop-blur-[16px] transition-[background] duration-300 ease-out"
      >
        <a
          href="#top"
          data-cursor-hover="true"
          className="font-display text-[18px] font-bold tracking-[-0.01em] text-ink"
        >
          VR<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-9 min-[860px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover="true"
              data-nav-link={link.href.slice(1)}
              className="relative inline-block text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
              <span
                data-nav-underline="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-cursor-hover="true"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/3 text-ink min-[860px]:hidden"
          >
            {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[899] flex flex-col items-center justify-center gap-7 bg-[rgba(5,5,5,0.97)] backdrop-blur-[20px]"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                variants={menuLinkVariants}
                className="font-display text-[32px] font-semibold text-ink"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
