import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field, bots often do.
  // Pretend success so bots don't learn to look for a different signal.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid_input" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `Project inquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
