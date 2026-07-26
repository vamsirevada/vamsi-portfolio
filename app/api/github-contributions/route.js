import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const revalidate = 3600; // refresh from GitHub at most once an hour

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function bucketLevel(count, max) {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 200 }
    );
  }

  let res;
  try {
    res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: site.githubUsername },
      }),
      next: { revalidate },
    });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "network_error" },
      { status: 200 }
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, reason: "github_error", status: res.status },
      { status: 200 }
    );
  }

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (json.errors || !calendar) {
    return NextResponse.json(
      { ok: false, reason: "github_error", detail: json.errors?.[0]?.message },
      { status: 200 }
    );
  }

  const allCounts = calendar.weeks.flatMap((w) =>
    w.contributionDays.map((d) => d.contributionCount)
  );
  const max = Math.max(0, ...allCounts);

  const weeks = calendar.weeks.map((w) => ({
    days: w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: bucketLevel(d.contributionCount, max),
    })),
  }));

  return NextResponse.json({
    ok: true,
    total: calendar.totalContributions,
    weeks,
    fetchedAt: new Date().toISOString(),
  });
}
