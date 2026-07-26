export default function SectionEyebrow({ label, centered = false }) {
  return (
    <div className={`mb-5 flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
      <span className="h-px w-6 bg-accent" />
      <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{label}</span>
      {centered && <span className="h-px w-6 bg-accent" />}
    </div>
  );
}
