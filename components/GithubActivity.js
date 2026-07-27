"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import SectionEyebrow from "./SectionEyebrow";
import { site } from "@/lib/content";

const CELL = 11;
const GAP = 3;
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const LEVEL_BG = [
  "rgba(255,255,255,0.06)",
  "rgba(110,231,183,0.25)",
  "rgba(110,231,183,0.45)",
  "rgba(110,231,183,0.7)",
  "rgba(110,231,183,1)",
];

function skeletonWeeks() {
  return Array.from({ length: 53 }).map(() => ({
    days: Array.from({ length: 7 }).map(() => ({ level: 0, count: 0, date: null })),
  }));
}

function monthLabelsFor(weeks) {
  let lastMonth = null;
  return weeks.map((w) => {
    const first = w.days.find((d) => d.date);
    if (!first) return null;
    const month = new Date(first.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_NAMES[month];
    }
    return null;
  });
}

export default function GithubActivity() {
  const [state, setState] = useState({ status: "loading", total: 0, weeks: skeletonWeeks() });
  const gridRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) {
          setState({ status: "ready", total: data.total, weeks: data.weeks });
        } else {
          setState((s) => ({ ...s, status: "unavailable" }));
        }
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: "unavailable" }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state.status !== "ready" || !gridRef.current || animatedRef.current) return;
    animatedRef.current = true;
    const cells = gridRef.current.querySelectorAll("[data-gh-cell]");
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      cells.forEach((c) => {
        c.style.opacity = 1;
        c.style.transform = "scale(1)";
      });
      return;
    }
    anime({
      targets: cells,
      opacity: [0, 1],
      scale: [0.35, 1],
      delay: anime.stagger(4, { grid: [7, state.weeks.length], from: "center" }),
      duration: 500,
      easing: "easeOutQuad",
    });
  }, [state.status, state.weeks.length]);

  const months = monthLabelsFor(state.weeks);
  const gridWidth = state.weeks.length * CELL + (state.weeks.length - 1) * GAP;

  return (
    <section className="relative mx-auto max-w-[1180px] px-[clamp(20px,6vw,64px)] py-[clamp(70px,8vw,110px)]">
      <div
        data-reveal="true"
        className="mx-auto mb-12 max-w-[640px] translate-y-6 text-center opacity-0 transition-[opacity,transform] duration-800 ease-out"
      >
        <SectionEyebrow label="GitHub Activity" centered />
        <h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">
          Still shipping, every week.
        </h2>
      </div>

      <div
        data-reveal="true"
        className="translate-y-5 rounded-[24px] border border-white/6 bg-card p-6 opacity-0 transition-[opacity,transform] duration-700 ease-out sm:p-8"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-display text-lg font-semibold text-ink">
            {state.status === "ready" ? state.total.toLocaleString() : "—"}{" "}
            <span className="font-body text-sm font-normal text-ink-3">contributions in the last year</span>
          </div>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener"
            data-cursor-hover="true"
            className="text-[13px] font-semibold text-accent"
          >
            @{site.githubUsername} ↗
          </a>
        </div>

        {state.status === "unavailable" ? (
          <p className="m-0 text-sm text-ink-3">
            GitHub activity isn&apos;t available right now — check back shortly.
          </p>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div style={{ width: Math.max(gridWidth, 500) }}>
              <div
                className="mb-1 grid text-[10px] text-ink-4"
                style={{
                  gridTemplateColumns: `repeat(${state.weeks.length}, ${CELL}px)`,
                  gap: `${GAP}px`,
                  marginLeft: 28,
                }}
              >
                {months.map((m, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {m || ""}
                  </span>
                ))}
              </div>

              <div className="flex">
                <div
                  className="mr-2 flex flex-col text-[10px] text-ink-4"
                  style={{ gap: `${GAP}px`, width: 24 }}
                >
                  {WEEKDAY_LABELS.map((label, i) => (
                    <span key={i} style={{ height: CELL, lineHeight: `${CELL}px` }}>
                      {label}
                    </span>
                  ))}
                </div>

                <div
                  ref={gridRef}
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${state.weeks.length}, ${CELL}px)`,
                    gridTemplateRows: `repeat(7, ${CELL}px)`,
                    gridAutoFlow: "column",
                    gap: `${GAP}px`,
                  }}
                >
                  {state.weeks.map((w, wi) =>
                    w.days.map((d, di) => (
                      <div
                        key={`${wi}-${di}`}
                        data-gh-cell="true"
                        title={d.date ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                        className="rounded-[3px] opacity-0"
                        style={{
                          width: CELL,
                          height: CELL,
                          background: LEVEL_BG[d.level],
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-end gap-1.5 text-[11px] text-ink-4">
          <span>Less</span>
          {LEVEL_BG.map((bg, i) => (
            <span key={i} className="rounded-[3px]" style={{ width: CELL, height: CELL, background: bg }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
