export default function Loader({ loaded }) {
  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-5 bg-canvas transition-[opacity,visibility] duration-800 ease-out"
      style={{
        opacity: loaded ? 0 : 1,
        visibility: loaded ? "hidden" : "visible",
        pointerEvents: loaded ? "none" : "auto",
      }}
    >
      <div className="overflow-hidden font-display text-[15px] uppercase tracking-[0.3em] text-ink">
        {"Vamsi Revada".split("").map((ch, i) => (
          <span
            key={i}
            data-loader-letter="true"
            className="inline-block opacity-0"
            style={{ transform: "translateY(14px)" }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
      <div className="h-[2px] w-[160px] overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full bg-accent transition-[width] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${loaded ? 100 : 70}%` }}
        />
      </div>
    </div>
  );
}
