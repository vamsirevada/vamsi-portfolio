import { Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://www.vamsirevada.com";
const title = "Vamsi Revada — Full-Stack Developer & Freelancer";
const description =
  "I build premium web and mobile applications that scale — from real-time platforms to AI-powered products. Full-stack developer available for freelance projects.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
    description,
    url: siteUrl,
    siteName: "Vamsi Revada",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
