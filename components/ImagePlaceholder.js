import Image from "next/image";

export default function ImagePlaceholder({ label, src, className = "" }) {
  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-card ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-card ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span className="pointer-events-none select-none rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-center font-mono text-[11px] leading-snug tracking-tight text-ink-3">
        {label}
      </span>
    </div>
  );
}
