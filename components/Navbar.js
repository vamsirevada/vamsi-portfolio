import { navLinks, site } from "@/lib/content";
import { IconMenu, IconClose } from "./Icons";

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
              className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener"
            data-magnetic="true"
            data-cursor-hover="true"
            className="inline-flex items-center rounded-full bg-accent px-[22px] py-[10px] text-[13px] font-bold tracking-[-0.01em] text-canvas"
          >
            Book a Call
          </a>
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

      {menuOpen && (
        <div className="fixed inset-0 z-[899] flex flex-col items-center justify-center gap-7 bg-[rgba(5,5,5,0.97)] backdrop-blur-[20px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="font-display text-[32px] font-semibold text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener"
            onClick={toggleMenu}
            className="mt-3 rounded-full bg-accent px-8 py-3.5 font-bold text-canvas"
          >
            Book a Call
          </a>
        </div>
      )}
    </>
  );
}
