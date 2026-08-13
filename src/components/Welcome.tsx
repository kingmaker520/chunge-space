"use client";

import { useAuthModal } from "./AuthModalProvider";

export function Welcome() {
  const { openAuth } = useAuthModal();

  return (
    <section className="mx-auto max-w-[760px] px-6 py-20 text-center md:py-28">
      <h2 className="font-noto text-3xl font-bold text-[var(--color-ink)] md:text-4xl">
        欢迎来到春哥空间。
      </h2>
      <p className="mt-4 font-noto text-base text-[var(--color-secondary)]">
        注册后即可参与文章与项目的评论，一起把长期主义变成日常。
      </p>
      <button
        onClick={() => openAuth("register")}
        className="mt-8 rounded-lg bg-[var(--color-ink)] px-6 py-3 font-noto text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        进入空间 →
      </button>
    </section>
  );
}
