import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { portfolioDescription, portfolioHeadline, site } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  weight: "500 700",
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "400 800",
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://www.vamsirevada.com";
const title = `${portfolioHeadline} | ${site.name}`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: portfolioDescription,
  keywords: [
    "Vamsi Revada",
    "full-stack developer",
    "freelance developer",
    "Next.js developer",
    "React developer",
    "React Native developer",
  ],
  authors: [{ name: "Vamsi Revada" }],
  creator: "Vamsi Revada",
  openGraph: {
    title,
    description: portfolioDescription,
    url: siteUrl,
    siteName: "Vamsi Revada",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: portfolioDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="antialiased bg-canvas text-ink font-body">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
