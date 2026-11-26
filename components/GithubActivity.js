"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const LEVEL_COLORS = ["#202923", "#244636", "#356b54", "#4d9b7b", "#6ee7b7"];

export default function GithubActivity() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-contributions", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) setActivity(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!activity) return null;

  return (
    <section aria-label="GitHub activity" className="portfolio-shell pt-10">
      <details className="rounded-xl border border-white/12 bg-card px-4 py-3 sm:px-6">
        <summary className="cursor-pointer py-1 text-base font-semibold">
          {activity.total.toLocaleString()} GitHub contributions in the last year
        </summary>
        <div aria-hidden="true" className="my-4 overflow-x-auto pb-2">
          <div
            className="grid w-max gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${activity.weeks.length}, 10px)`, gridTemplateRows: "repeat(7, 10px)" }}
          >
            {activity.weeks.flatMap(({ days }, week) => days.map(({ date, count, level }) => (
              <span
                key={date}
                title={`${count} contribution${count === 1 ? "" : "s"} on ${date}`}
                className="rounded-sm"
                style={{ backgroundColor: LEVEL_COLORS[level], gridColumn: week + 1, gridRow: new Date(date).getUTCDay() + 1 }}
              />
            )))}
          </div>
        </div>
        <a className="text-sm font-semibold underline" href={site.githubUrl}>View the full calendar on GitHub</a>
      </details>
    </section>
  );
}
