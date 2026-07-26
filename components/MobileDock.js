const items = [
  { href: "#top", label: "Home", icon: "⌂" },
  { href: "#work", label: "Work", icon: "◫" },
  { href: "#services", label: "Services", icon: "✦" },
  { href: "#contact", label: "Contact", icon: "✉" },
];

export default function MobileDock() {
  return (
    <div className="fixed bottom-[18px] left-1/2 z-[900] hidden -translate-x-1/2 items-center gap-[22px] rounded-full border border-white/8 bg-[rgba(17,17,17,0.85)] px-[18px] py-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[16px] max-[859px]:flex">
      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          aria-label={item.label}
          className={`text-xl ${i === 0 ? "text-ink" : "text-ink-2"}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
