import { PrismaClient } from "@prisma/client";
import type { D1Database } from "@cloudflare/workers-types";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
  interface CloudflareEnv {
    DB: D1Database;
  }
}

function isCloudflare(): boolean {
  try {
    return typeof caches !== "undefined" && typeof WebSocketPair !== "undefined";
  } catch {
    return false;
  }
}

export async function getPrisma(): Promise<PrismaClient> {
  if (isCloudflare()) {
    try {
      const { getRequestContext } = await import("@cloudflare/next-on-pages");
      const { PrismaD1 } = await import("@prisma/adapter-d1");
      const ctx = getRequestContext();
      return new PrismaClient({ adapter: new PrismaD1(ctx.env.DB) });
    } catch (e) {
      console.error("[prisma] Cloudflare D1 初始化失败:", e);
      throw new Error("数据库连接失败");
    }
  }

  try {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    return global.__prisma;
  } catch (e) {
    console.error("[prisma] 本地 Prisma 初始化失败:", e);
    throw new Error("数据库连接失败");
  }
}
