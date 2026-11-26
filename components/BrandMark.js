import { brandMark } from "@/lib/brandMark";

export default function BrandMark({ className }) {
  const { size, radius, background, ink, path } = brandMark;

  return (
    <svg aria-hidden="true" viewBox={`0 0 ${size} ${size}`} className={className}>
      <rect width={size} height={size} rx={radius} fill={background} />
      <path d={path} fill={ink} />
    </svg>
  );
}
