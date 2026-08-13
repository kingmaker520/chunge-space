"use client";

import { heroStats } from "@/data/content";
import { useAuthModal } from "./AuthModalProvider";

export function Hero() {
  const { openAuth } = useAuthModal();

  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 font-mono-jb text-xs tracking-[0.3em] text-[var(--color-muted)]">
          <span className="text-[var(--color-ink)]">春哥</span>
          <span>/</span>
          <span>CHUNGE SPACE</span>
        </div>

        <h1 className="mt-6 font-noto text-4xl font-bold leading-[1.15] text-[var(--color-ink)] md:text-[56px]">
          一个普通人的
          <br />
          长期创业实验
        </h1>

        <div className="mt-6 h-0.5 w-12 bg-[var(--color-accent)]" />

        <p className="mt-6 max-w-md font-noto text-base leading-relaxed text-[var(--color-secondary)]">
          这里记录一个普通人的创业实验：思考、实践、失败与坚持。不追风口，只做长期正确的事。
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => openAuth("register")}
            className="rounded-lg bg-[var(--color-ink)] px-6 py-3 font-noto text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            进入空间 →
          </button>
          <a
            href="#about"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-3 font-noto text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            了解更多
          </a>
        </div>

        <div className="mt-12 flex gap-10">
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-noto text-2xl font-bold text-[var(--color-ink)]">
                {s.value}
              </span>
              <span className="mt-1 font-noto text-xs text-[var(--color-secondary)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 肖像占位：部署时替换为真实照片 */}
      <div className="relative">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#e9e9e6] to-[#cfcfca]">
          <div className="flex h-full w-full items-center justify-center">
            <span className="select-none font-noto text-[120px] font-bold text-white/60">
              春
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-[var(--color-ink)]/80 px-3 py-1 font-mono-jb text-xs tracking-widest text-white">
          李长春 / CHUNGE
        </div>
      </div>
    </section>
  );
}
