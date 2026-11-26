const encoder = new TextEncoder();

export const INVOICE_COOKIE_NAME = "invoice_session";
export const INVOICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualStr(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return bufferToHex(signature);
}

function signingSecret() {
  return process.env.INVOICE_SESSION_SECRET || process.env.INVOICE_PASSWORD || "";
}

export async function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + INVOICE_COOKIE_MAX_AGE;
  const nonce = bufferToHex(crypto.getRandomValues(new Uint8Array(16)));
  const payload = `${expiresAt}.${nonce}`;
  const signature = await hmac(signingSecret(), `invoice-session:${payload}:${process.env.INVOICE_PASSWORD}`);
  return `${payload}.${signature}`;
}

export async function isValidSessionToken(token) {
  if (!token || !process.env.INVOICE_PASSWORD) return false;
  const match = /^(\d{10})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const [, expiresAt, nonce, signature] = match;
  const now = Math.floor(Date.now() / 1000);
  if (Number(expiresAt) <= now || Number(expiresAt) > now + INVOICE_COOKIE_MAX_AGE) return false;
  const expected = await hmac(signingSecret(), `invoice-session:${expiresAt}.${nonce}:${process.env.INVOICE_PASSWORD}`);
  return timingSafeEqualStr(signature, expected);
}

export function invoiceLoginKey(ip) {
  return hmac(signingSecret(), `invoice-login:${ip}`);
}

export function checkPassword(password) {
  const real = process.env.INVOICE_PASSWORD || "";
  if (!real || !password) return false;
  return timingSafeEqualStr(password, real);
}
