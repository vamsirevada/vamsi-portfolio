import Portfolio from "@/components/Portfolio";
import { site } from "@/lib/content";

const title = `Booking and Operations Software | ${site.name}`;
const description = "Full-stack development for founders building booking tools, live availability, and operational workflows.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: site.name, type: "website" },
};

export default function Home() {
  return <Portfolio />;
}
