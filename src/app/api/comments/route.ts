import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import type { CommentDTO, Gender } from "@/lib/types";

const MAX_CONTENT_LENGTH = 500;
const MAX_REPLY_DEPTH = 3;

export async function GET(req: NextRequest) {
  const prisma = await getPrisma();
  const { searchParams } = new URL(req.url);
  const targetType = searchParams.get("targetType") || "article";
  const targetId = searchParams.get("targetId") || "";
  if (!targetId) {
    return NextResponse.json({ error: "缺少 targetId" }, { status: 400 });
  }

  const rows = await prisma.comment.findMany({
    where: { targetType, targetId },
    include: { author: true },
    orderBy: { createdAt: "asc" },
  });

  const map = new Map<string, CommentDTO>();
  const roots: CommentDTO[] = [];
  for (const r of rows) {
    const dto: CommentDTO = {
      id: r.id,
      targetType: r.targetType as "article" | "project",
      targetId: r.targetId,
      content: r.content,
      createdAt: r.createdAt.toISOString(),
      parentId: r.parentId,
      author: {
        id: r.author.id,
        nickname: r.author.nickname,
        gender: r.author.gender as Gender,
        avatarEmoji: r.author.avatarEmoji,
      },
      isAuthor: r.author.isOwner,
    };
    map.set(dto.id, dto);
  }
  for (const dto of map.values()) {
    if (dto.parentId && map.has(dto.parentId)) {
      const parent = map.get(dto.parentId)!;
      parent.replies = parent.replies || [];
      parent.replies.push(dto);
    } else {
      roots.push(dto);
    }
  }
  return NextResponse.json({ comments: roots });
}

export async function POST(req: NextRequest) {
  const prisma = await getPrisma();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const userId = verifyToken(token);
  if (!userId) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const { targetType, targetId, content, parentId } = (await req.json()) as {
    targetType?: string;
    targetId?: string;
    content?: string;
    parentId?: string;
  };
  if (!targetId || !content?.trim()) {
    return NextResponse.json({ error: "评论内容不能为空" }, { status: 400 });
  }
  if (content.trim().length > MAX_CONTENT_LENGTH) {
    return NextResponse.json(
      { error: `评论内容不能超过 ${MAX_CONTENT_LENGTH} 字` },
      { status: 400 },
    );
  }

  if (parentId) {
    const ancestorDepth = await getReplyDepth(prisma, parentId, MAX_REPLY_DEPTH);
    if (ancestorDepth >= MAX_REPLY_DEPTH) {
      return NextResponse.json(
        { error: `评论回复最多 ${MAX_REPLY_DEPTH} 层` },
        { status: 400 },
      );
    }
  }

  const created = await prisma.comment.create({
    data: {
      targetType: targetType === "project" ? "project" : "article",
      targetId,
      content: content.trim(),
      parentId: parentId || null,
      authorId: userId,
    },
    include: { author: true },
  });

  const dto: CommentDTO = {
    id: created.id,
    targetType: created.targetType as "article" | "project",
    targetId: created.targetId,
    content: created.content,
    createdAt: created.createdAt.toISOString(),
    parentId: created.parentId,
    author: {
      id: created.author.id,
      nickname: created.author.nickname,
      gender: created.author.gender as Gender,
      avatarEmoji: created.author.avatarEmoji,
    },
    isAuthor: created.author.isOwner,
  };
  return NextResponse.json({ comment: dto }, { status: 201 });
}

async function getReplyDepth(
  prisma: Awaited<ReturnType<typeof getPrisma>>,
  parentId: string,
  max: number,
): Promise<number> {
  let depth = 0;
  let currentId: string | null = parentId;
  while (currentId && depth < max) {
    const parent: { parentId: string | null } | null = await prisma.comment.findUnique({
      where: { id: currentId },
      select: { parentId: true },
    });
    if (!parent?.parentId) break;
    depth++;
    currentId = parent.parentId;
  }
  return depth;
}
