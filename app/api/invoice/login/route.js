import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, invoiceLoginKey, INVOICE_COOKIE_NAME, INVOICE_COOKIE_MAX_AGE } from "@/lib/auth";
import { isDbConfigured, takeInvoiceLoginAttempt } from "@/lib/db";

export async function POST(request) {
  if (!process.env.INVOICE_PASSWORD) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const password = typeof body?.password === "string" ? body.password : "";
  if (isDbConfigured()) {
    try {
      const clientIp = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for") : null;
      const attempt = await takeInvoiceLoginAttempt(await invoiceLoginKey(clientIp || "shared"));
      if (!attempt.allowed) {
        return NextResponse.json({ ok: false, reason: "rate_limited" }, {
          status: 429,
          headers: { "Retry-After": String(Math.max(attempt.retry_after, 1)) },
        });
      }
    } catch {
      return NextResponse.json({ ok: false, reason: "login_unavailable" }, { status: 503 });
    }
  } else if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, reason: "login_unavailable" }, { status: 503 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, reason: "invalid_password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(INVOICE_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: INVOICE_COOKIE_MAX_AGE,
  });
  return res;
}
