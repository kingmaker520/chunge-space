"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[春哥空间] 页面错误:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[600px] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
        ERROR
      </span>
      <h2 className="font-noto text-2xl font-bold text-[var(--color-ink)]">
        页面出了点问题
      </h2>
      <p className="font-noto text-sm text-[var(--color-secondary)]">
        别担心，春哥正在修复中。你可以试试刷新页面。
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-[var(--color-ink)] px-6 py-3 font-noto text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        重新加载
      </button>
    </div>
  );
}
