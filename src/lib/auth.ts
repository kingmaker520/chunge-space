import crypto from "node:crypto";
import bcrypt from "bcryptjs";

const SECRET = process.env.AUTH_SECRET || "chunge-space-dev-secret-change-me";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天后过期

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

/** 轻量级 token：userId.timestamp.hmac，前端存 localStorage，部署时建议换成 NextAuth/JWT。 */
export function signToken(userId: string): string {
  const payload = `${userId}.${Date.now()}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, ts, sig] = parts;
  const tsNum = Number(ts);
  if (isNaN(tsNum) || Date.now() - tsNum > TOKEN_TTL_MS) return null;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(`${userId}.${ts}`)
    .digest("hex");
  if (sig !== expected) return null;
  return userId;
}
