import { IconHome, IconGrid, IconSparkle, IconMail } from "./Icons";

const items = [
  { href: "#top", label: "Home", Icon: IconHome },
  { href: "#work", label: "Work", Icon: IconGrid },
  { href: "#services", label: "Services", Icon: IconSparkle },
  { href: "#contact", label: "Contact", Icon: IconMail },
];

export default function MobileDock() {
  return (
    <div className="fixed bottom-[18px] left-1/2 z-[900] hidden -translate-x-1/2 items-center gap-[22px] rounded-full border border-white/8 bg-[rgba(17,17,17,0.85)] px-[18px] py-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[16px] max-[859px]:flex">
      {items.map(({ href, label, Icon }, i) => (
        <a key={href} href={href} aria-label={label} className={i === 0 ? "text-ink" : "text-ink-2"}>
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
