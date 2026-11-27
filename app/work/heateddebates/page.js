import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { heatedDebates, site } from "@/lib/content";

const title = "HeatedDebates case study";
const description = "How the HeatedDebates lobby helps people find a topic, see which rooms are live, and join a debate.";

export const metadata = {
  title: `${title} | ${site.name}`,
  description,
  alternates: { canonical: heatedDebates.caseStudyHref },
  openGraph: {
    title,
    description,
    url: heatedDebates.caseStudyHref,
    siteName: site.name,
    type: "article",
    images: [{ url: heatedDebates.img, width: 1280, height: 661, alt: heatedDebates.imageAlt }],
  },
};

export default function HeatedDebatesCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="portfolio-content">
        <article aria-labelledby="heateddebates-title">
          <header className="portfolio-hero relative isolate">
            <div className="portfolio-shell grid items-end gap-6 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-12">
              <div>
                <Link href="/#work" className="inline-flex min-h-10 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
                  Back to selected work
                </Link>
                <h1 id="heateddebates-title" className="mt-3 font-display text-[clamp(2rem,8.4vw,7rem)] font-bold leading-none tracking-[-0.07em]">
                  HeatedDebates<span className="text-accent">.</span>
                </h1>
                <p className="mt-5 max-w-xl text-[clamp(1.2rem,2.5vw,1.75rem)] leading-[1.35] text-ink-2">
                  A lobby for finding and joining live debates.
                </p>
              </div>
              <dl className="border-t border-white/16 pt-4 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                <dt className="text-ink-2">Technologies</dt>
                <dd className="mt-1 font-semibold">{heatedDebates.tech.join(", ")}</dd>
              </dl>
            </div>
          </header>

          <div className="portfolio-shell py-10 sm:py-14">
            <figure>
              <div className="overflow-hidden rounded-xl border border-white/15 bg-card">
                <Image
                  src={heatedDebates.img}
                  alt={heatedDebates.imageAlt}
                  width={1280}
                  height={661}
                  priority
                  sizes="(min-width: 1300px) 1168px, 90vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-2">
                The lobby highlights a featured debate and gives live rooms their own section.
              </figcaption>
            </figure>

            <section aria-labelledby="debate-discovery" className="mt-11 grid gap-3 border-t border-white/12 pt-7 sm:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-12">
              <h2 id="debate-discovery" className="font-display text-[clamp(1.75rem,4vw,2.7rem)] font-semibold leading-tight tracking-tight">
                Find a debate worth joining
              </h2>
              <p className="max-w-xl text-base leading-[1.75] text-ink-2">
                Someone arriving at the lobby may have a topic in mind or simply want to see what&apos;s happening.
                Browse Topics gives the first visitor a place to start. Live Debates gives the second a list of rooms
                they can enter immediately.
              </p>
            </section>

            <section aria-labelledby="debate-status" className="mt-10 grid gap-3 border-t border-white/12 pt-7 sm:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-12">
              <h2 id="debate-status" className="font-display text-[clamp(1.75rem,4vw,2.7rem)] font-semibold leading-tight tracking-tight">
                Make it clear when to join
              </h2>
              <p className="max-w-xl text-base leading-[1.75] text-ink-2">
                The lobby separates live rooms from scheduled debates. A live badge answers whether a room is active,
                and the join button on the room card lets someone enter as soon as they find a debate that interests them.
                The scheduled view gives them a place to see what&apos;s coming up.
              </p>
            </section>

            <section aria-labelledby="heateddebates-contact" className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-accent/20 bg-[#101d16] p-5 sm:mt-16 sm:p-7">
              <h2 id="heateddebates-contact" className="max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Building a product with live rooms or real-time availability?
              </h2>
              <Link href="/#contact" className="inline-flex min-h-12 items-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-canvas hover:bg-[#96f0cd]">
                Tell me about your project
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
