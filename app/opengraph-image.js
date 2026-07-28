import { ImageResponse } from "next/og";
import { techStack } from "@/lib/content";

export const runtime = "edge";
export const alt = "Vamsi Revada — Full-Stack Developer & Freelancer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage: "radial-gradient(circle at 78% 28%, rgba(110,231,183,0.20), transparent 60%)",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#6ee7b7" }} />
          <div style={{ display: "flex", fontSize: 24, color: "#8a8a8a", letterSpacing: 3 }}>
            AVAILABLE FOR FREELANCE PROJECTS
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: "#ffffff" }}>
          Vamsi Revada<span style={{ color: "#6ee7b7" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#b4b4b4", marginTop: 22 }}>
          Full-Stack Developer &amp; Freelancer
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {techStack.slice(0, 4).map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#d4d4d4",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
