import { NextResponse } from "next/server";
import { isValidSessionToken, INVOICE_COOKIE_NAME } from "@/lib/auth";

const EXEMPT_PATHS = new Set(["/invoice/login", "/api/invoice/login", "/api/invoice/logout"]);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (EXEMPT_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(INVOICE_COOKIE_NAME)?.value;
  const valid = await isValidSessionToken(token);

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/invoice/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/invoice/:path*", "/api/invoice/:path*"],
};
