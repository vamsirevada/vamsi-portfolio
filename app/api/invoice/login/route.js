import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, INVOICE_COOKIE_NAME, INVOICE_COOKIE_MAX_AGE } from "@/lib/auth";

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

  const password = typeof body.password === "string" ? body.password : "";
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
