export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import type { Gender, PublicUser } from "@/lib/types";

export async function POST(req: NextRequest) {
  const prisma = await getPrisma();
  const body = await req.json();
  const { nickname, phone, password, gender, avatarEmoji } = body as {
    nickname?: string;
    phone?: string;
    password?: string;
    gender?: Gender;
    avatarEmoji?: string;
  };

  if (!nickname?.trim() || !phone?.trim() || !password || !gender) {
    return NextResponse.json({ error: "请填写完整信息" }, { status: 400 });
  }
  if (!/^1\d{10}$/.test(phone)) {
    return NextResponse.json({ error: "手机号格式不正确" }, { status: 400 });
  }
  if (String(password).length < 6) {
    return NextResponse.json({ error: "密码至少 6 位" }, { status: 400 });
  }

  const existingByPhone = await prisma.user.findUnique({ where: { phone } });
  if (existingByPhone) {
    return NextResponse.json({ error: "该手机号已注册" }, { status: 409 });
  }
  const existingByNickname = await prisma.user.findUnique({ where: { nickname: nickname.trim() } });
  if (existingByNickname) {
    return NextResponse.json({ error: "该昵称已被使用" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      nickname: nickname.trim(),
      phone,
      passwordHash,
      gender: gender === "female" ? "female" : "male",
      avatarEmoji: avatarEmoji || "🚀",
    },
  });

  const token = await signToken(user.id);
  const publicUser: PublicUser = {
    id: user.id,
    nickname: user.nickname,
    gender: user.gender as Gender,
    avatarEmoji: user.avatarEmoji,
  };
  return NextResponse.json({ token, user: publicUser }, { status: 201 });
}
