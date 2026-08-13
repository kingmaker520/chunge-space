"use client";

import { siteConfig } from "@/data/content";
import { useAuthModal } from "./AuthModalProvider";
import { useAuth } from "./AuthProvider";

export function Header() {
  const { openAuth } = useAuthModal();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-ink)] font-noto text-lg font-bold text-white">
            春
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-noto text-sm font-semibold text-[var(--color-ink)]">
              春哥空间
            </span>
            <span className="font-mono-jb text-[10px] tracking-[0.2em] text-[var(--color-muted)]">
              CHUNGE.SPACE
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-noto text-sm text-[var(--color-secondary)] transition-colors hover:text-[var(--color-ink)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg)] text-base ${
                  user.gender === "male"
                    ? "border-2 border-[var(--color-male)]"
                    : "border-2 border-[var(--color-female)]"
                }`}
              >
                {user.avatarEmoji}
              </span>
              <span className="font-noto text-sm text-[var(--color-ink)]">
                {user.nickname}
                <span
                  className="ml-0.5 text-xs"
                  style={{
                    color:
                      user.gender === "male"
                        ? "var(--color-male)"
                        : "var(--color-female)",
                  }}
                >
                  {user.gender === "male" ? "♂" : "♀"}
                </span>
              </span>
              <button
                onClick={logout}
                className="font-noto text-xs text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
              >
                退出
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuth("login")}
                className="font-noto text-sm text-[var(--color-secondary)] transition-colors hover:text-[var(--color-ink)]"
              >
                登录
              </button>
              <button
                onClick={() => openAuth("register")}
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 font-noto text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                NOW
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
