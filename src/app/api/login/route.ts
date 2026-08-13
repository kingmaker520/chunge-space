export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { verifyPassword, signToken, verifyToken } from "@/lib/auth";
import type { Gender, PublicUser } from "@/lib/types";

function toPublic(
  u: { id: string; nickname: string; gender: string; avatarEmoji: string },
): PublicUser {
  return {
    id: u.id,
    nickname: u.nickname,
    gender: u.gender as Gender,
    avatarEmoji: u.avatarEmoji,
  };
}

// 会话校验（前端启动时携带 token 调用）
export async function GET(req: NextRequest) {
  const prisma = await getPrisma();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const userId = verifyToken(token);
  if (!userId) return NextResponse.json({ user: null }, { status: 401 });

  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (!u) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: toPublic(u) });
}

export async function POST(req: NextRequest) {
  const prisma = await getPrisma();
  const { account, password } = (await req.json()) as {
    account?: string;
    password?: string;
  };
  if (!account?.trim() || !password) {
    return NextResponse.json({ error: "请输入账号和密码" }, { status: 400 });
  }

  const u = await prisma.user.findFirst({
    where: { OR: [{ phone: account }, { nickname: account }] },
  });
  if (!u) return NextResponse.json({ error: "账号不存在" }, { status: 404 });

  const ok = await verifyPassword(password, u.passwordHash);
  if (!ok) return NextResponse.json({ error: "密码错误" }, { status: 401 });

  const token = signToken(u.id);
  return NextResponse.json({ token, user: toPublic(u) });
}
