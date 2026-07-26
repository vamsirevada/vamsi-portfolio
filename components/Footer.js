import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 border-t border-white/6 px-[clamp(20px,6vw,64px)] pt-12 pb-[100px]">
      <div className="flex items-center gap-2.5">
        <span className="font-display text-base font-bold text-ink">
          VR<span className="text-accent">.</span>
        </span>
        <span className="text-[13px] text-ink-4">© {site.year} Vamsi Revada. Built with care.</span>
      </div>
      <div className="flex gap-6">
        <a href={site.githubUrl} target="_blank" rel="noopener" className="text-[13px] text-ink-3">
          GitHub
        </a>
        <a href={site.linkedinUrl} target="_blank" rel="noopener" className="text-[13px] text-ink-3">
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} className="text-[13px] text-ink-3">
          Email
        </a>
      </div>
    </footer>
  );
}
