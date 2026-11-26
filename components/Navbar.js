"use client";

import { useRef } from "react";
import Link from "next/link";
import { navLinks, site } from "@/lib/content";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const menu = useRef(null);

  function closeMenu() {
    menu.current.open = false;
  }

  function closeOnEscape(event) {
    if (event.key === "Escape" && menu.current.open) {
      closeMenu();
      menu.current.querySelector("summary").focus();
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-canvas/90 backdrop-blur-md">
      <nav aria-label="Main" className="portfolio-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/#top" onClick={closeMenu} className="inline-flex min-h-10 items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight text-ink hover:text-accent">
          <BrandMark className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-accent/20" />
          {site.name}
        </Link>
        <ul className="hidden items-center gap-7 min-[720px]:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}><Link href={`/${href}`} className="text-sm font-semibold text-ink-2 hover:text-accent">{label}</Link></li>
          ))}
        </ul>
        <details ref={menu} onKeyDown={closeOnEscape} className="relative min-[720px]:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            Menu
          </summary>
          <ul className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/15 bg-card p-1.5 shadow-xl">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={`/${href}`} onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-white/8 hover:text-accent">{label}</Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
