import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { site, waitless } from "@/lib/content";

const heading = "Waitless case study";
const description = "A restaurant booking workflow that puts live table availability, wait estimates, and reservations in one place.";

export const metadata = {
  title: `${heading} | ${site.name}`,
  description,
  alternates: { canonical: waitless.caseStudyHref },
  openGraph: {
    title: heading,
    description,
    url: waitless.caseStudyHref,
    siteName: site.name,
    type: "article",
  },
};

const bookingSteps = [
  {
    title: "Check current availability",
    description: "See which tables are available, occupied, or expected to open after a wait.",
  },
  {
    title: "Choose a table",
    description: "Compare seating options and wait estimates before deciding which table to book.",
  },
  {
    title: "Reserve a seat",
    description: "Use the same booking flow to reserve a table after checking its availability.",
  },
];

export default function WaitlessCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="portfolio-content">
        <article aria-labelledby="waitless-title">
          <header className="portfolio-hero relative isolate">
            <div className="portfolio-shell grid items-end gap-6 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-12">
              <div>
                <Link href="/#work" className="inline-flex min-h-10 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
                  Back to selected work
                </Link>
                <h1 id="waitless-title" className="mt-3 font-display text-[clamp(3.75rem,11vw,8rem)] font-bold leading-none tracking-[-0.08em]">
                  Waitless<span className="text-accent">.</span>
                </h1>
                <p className="mt-5 max-w-xl text-[clamp(1.2rem,2.5vw,1.75rem)] leading-[1.35] text-ink-2">
                  Live table availability for restaurant bookings.
                </p>
              </div>

              <dl className="border-t border-white/16 pt-4 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                <dt className="text-ink-2">Technologies</dt>
                <dd className="mt-1 font-semibold">Next.js, PostgreSQL, Socket.IO</dd>
              </dl>
            </div>
          </header>

          <div className="portfolio-shell py-10 sm:py-14">
            <figure>
              <div className="overflow-hidden rounded-xl border border-white/15 bg-card">
                <Image
                  src={waitless.img}
                  alt={waitless.imageAlt}
                  width={1280}
                  height={661}
                  priority
                  sizes="(min-width: 1300px) 1168px, 90vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-2">
                The Waitless landing page previews an available table, a wait estimate, and an occupied table.
              </figcaption>
            </figure>

            <section aria-labelledby="booking-problem" className="mt-11 grid gap-3 border-t border-white/12 pt-7 sm:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-12">
              <h2 id="booking-problem" className="font-display text-[clamp(1.75rem,4vw,2.7rem)] font-semibold leading-tight tracking-tight">
                The booking problem
              </h2>
              <p className="max-w-xl text-base leading-[1.75] text-ink-2">
                A table can open up or be taken while a diner is deciding where to eat. Waitless puts current table
                status and wait estimates in the booking flow, so diners can check their options before committing.
              </p>
            </section>

            <section aria-labelledby="booking-flow" className="mt-10 border-t border-white/12 pt-8 sm:mt-12">
              <h2 id="booking-flow" className="font-display text-[clamp(1.75rem,4vw,2.7rem)] font-semibold leading-tight tracking-tight">
                From availability to reservation
              </h2>
              <ol className="mt-5 grid gap-3 md:grid-cols-3">
                {bookingSteps.map(({ title, description }) => (
                  <li key={title} className="rounded-xl border border-white/12 bg-card px-5 py-5 sm:px-6">
                    <h3 className="font-display text-lg font-semibold text-accent">{title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-2">{description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="booking-decision" className="mt-10 grid gap-3 border-t border-white/12 pt-7 sm:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-12">
              <h2 id="booking-decision" className="font-display text-[clamp(1.75rem,4vw,2.7rem)] font-semibold leading-tight tracking-tight">
                Why the table state matters
              </h2>
              <p className="max-w-xl text-base leading-[1.75] text-ink-2">
                The preview distinguishes an occupied table from one with a wait estimate. That gives diners two
                different decisions to make. They can wait for a preferred table or choose one that&apos;s available now.
              </p>
            </section>

            <section aria-labelledby="waitless-contact" className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-accent/20 bg-[#101d16] p-5 sm:mt-16 sm:p-7">
              <h2 id="waitless-contact" className="max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Building a booking or operations workflow?
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
