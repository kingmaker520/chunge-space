import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

/**
 * 获取 Prisma 客户端。
 * - 本地 / Node 运行时：直接连接 SQLite 文件（DATABASE_URL=file:./dev.db）。
 * - Cloudflare Pages (next-on-pages)：通过 D1 绑定（env.DB）+ Prisma D1 适配器。
 *   D1 与 SQLite 兼容，所以 schema 的 provider 不需要切换。
 */
export async function getPrisma(): Promise<PrismaClient> {
  const isCloudflare =
    process.env.NEXT_PLUGIN_CLOUDFLARE === "1" || !!process.env.CF_PAGES;

  if (isCloudflare) {
    try {
      const { PrismaD1 } = await import("@prisma/adapter-d1");
      const mod = (await import("@cloudflare/next-on-pages")) as any;
      const getCloudflareContext =
        mod.getCloudflareContext ?? mod.default?.getCloudflareContext;
      const ctx = await getCloudflareContext({ async: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d1 = ctx.env.DB;
      return new PrismaClient({ adapter: new PrismaD1(d1) });
    } catch (e) {
      console.error("[prisma] Cloudflare D1 初始化失败:", e);
      throw new Error("数据库连接失败，请稍后重试");
    }
  }

  try {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    return global.__prisma;
  } catch (e) {
    console.error("[prisma] 本地 Prisma 初始化失败:", e);
    throw new Error("数据库连接失败，请稍后重试");
  }
}
