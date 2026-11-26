import { site } from "@/lib/content";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 border-t border-white/6 px-[clamp(20px,6vw,64px)] py-9">
      <div className="flex items-center gap-2.5">
        <BrandMark className="h-7 w-7 shrink-0 rounded-md ring-1 ring-accent/20" />
        <span className="text-[13px] text-ink-3">© {site.year} {site.name}</span>
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
