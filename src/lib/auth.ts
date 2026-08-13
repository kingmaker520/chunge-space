import bcrypt from "bcryptjs";

const SECRET = process.env.AUTH_SECRET || "chunge-space-dev-secret-change-me";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function toHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) {
    s += bytes[i].toString(16).padStart(2, "0");
  }
  return s;
}

async function hmacSha256(key: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(data));
  return toHex(sig);
}

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function signToken(userId: string): Promise<string> {
  const payload = `${userId}.${Date.now()}`;
  const sig = await hmacSha256(SECRET, payload);
  return `${payload}.${sig}`;
}

export async function verifyToken(
  token: string | undefined | null,
): Promise<string | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, ts, sig] = parts;
  const tsNum = Number(ts);
  if (isNaN(tsNum) || Date.now() - tsNum > TOKEN_TTL_MS) return null;
  const expected = await hmacSha256(SECRET, `${userId}.${ts}`);
  if (sig !== expected) return null;
  return userId;
}
