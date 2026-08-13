import { siteConfig } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-6 py-14 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-noto text-lg font-bold text-[var(--color-ink)]">
              春
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-noto text-sm font-semibold">春哥空间</span>
              <span className="font-mono-jb text-[10px] tracking-[0.2em] text-white/50">
                CHUNGE.SPACE
              </span>
            </span>
          </div>
          <p className="font-noto text-sm text-white/60">
            {siteConfig.owner} 的个人数字总部
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono-jb text-xs tracking-widest text-white/40">
            NAV
          </span>
          {siteConfig.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-noto text-sm text-white/70 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono-jb text-xs tracking-widest text-white/40">
            CONNECT
          </span>
          {siteConfig.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-noto text-sm text-white/70 transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1200px] border-t border-white/10 pt-6">
        <p className="font-noto text-xs text-white/40">
          Copyright 2026 {siteConfig.owner}｜春哥空间 CHUNGE.SPACE
        </p>
      </div>
    </footer>
  );
}
