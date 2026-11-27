import { ImageResponse } from "next/og";
import { brandMark } from "@/lib/brandMark";
import { portfolioHeadline, site } from "@/lib/content";

export const runtime = "edge";
export const alt = `${portfolioHeadline} | ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#090e0b",
          backgroundImage: "radial-gradient(circle at 92% 0%, #1b3f30, transparent 65%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 42 }}>
          <svg width="72" height="72" viewBox={`0 0 ${brandMark.size} ${brandMark.size}`}>
            <rect width={brandMark.size} height={brandMark.size} rx={brandMark.radius} fill={brandMark.background} />
            <path d={brandMark.path} fill={brandMark.ink} />
          </svg>
          <span style={{ fontSize: 38, fontWeight: 700, color: brandMark.ink }}>{site.name}</span>
        </div>
        <div
          style={{
            maxWidth: 980,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#f5fbf7",
          }}
        >
          {`${portfolioHeadline}.`}
        </div>
      </div>
    ),
    size
  );
}
