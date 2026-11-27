import Image from "next/image";
import { portfolioHeadline, site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="home-intro">
      <div className="flex items-center gap-4">
        <Image
          src="/portrait.png"
          alt=""
          width={72}
          height={72}
          priority
          className="h-[72px] w-[72px] shrink-0 rounded-full object-cover object-[center_38%] ring-1 ring-[#153e2b]/20"
        />
        <div>
          <p className="font-display text-lg leading-tight font-bold">{site.name}</p>
          <p className="mt-1 text-sm text-[#334c41]">{site.role}</p>
        </div>
      </div>

      <h1 id="hero-title" className="mt-7 max-w-[16ch] text-balance font-display text-[clamp(2.1rem,4.2vw,3.7rem)] leading-[1.02] font-semibold tracking-[-0.065em]">
        {portfolioHeadline}<span className="text-[#176344]">.</span>
      </h1>
      <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-[#334c41]">
        I build web and mobile apps that help teams take reservations, track availability, and replace manual workflows.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <a href="#contact" className="inline-flex min-h-12 items-center rounded-full bg-[#193a2e] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#234d3d] focus-visible:outline-[#176344]">
          Tell me about your project
        </a>
        <a href="#work" className="inline-flex min-h-12 items-center rounded-sm text-sm font-bold text-[#173e30] underline decoration-[#176344]/50 underline-offset-4 hover:decoration-[#176344] focus-visible:outline-[#176344]">
          Explore selected work
        </a>
      </div>

      <p className="mt-5 flex items-center gap-2.5 border-t border-[#193a2e]/20 pt-4 text-sm font-semibold text-[#284c3c]">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#22744e]" />
        Available for freelance projects
      </p>
    </section>
  );
}
