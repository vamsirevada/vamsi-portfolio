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

export async function createSessionToken() {
  const secret = process.env.INVOICE_SESSION_SECRET || process.env.INVOICE_PASSWORD || "";
  return hmac(secret, "invoice-session");
}

export async function isValidSessionToken(token) {
  if (!token || !process.env.INVOICE_PASSWORD) return false;
  const expected = await createSessionToken();
  return timingSafeEqualStr(token, expected);
}

export function checkPassword(password) {
  const real = process.env.INVOICE_PASSWORD || "";
  if (!real || !password) return false;
  return timingSafeEqualStr(password, real);
}
