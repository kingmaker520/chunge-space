import { aboutParagraphs } from "@/data/content";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[760px] px-6 py-20 text-center md:py-24"
    >
      <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
        ABOUT ME
      </span>
      <h2 className="mt-4 font-noto text-3xl font-bold text-[var(--color-ink)] md:text-[42px]">
        我是李长春。
      </h2>

      <div className="mt-8 flex flex-col gap-5">
        {aboutParagraphs.map((p, i) => (
          <p
            key={i}
            className="font-noto text-base leading-relaxed text-[var(--color-secondary)]"
          >
            {p}
          </p>
        ))}
      </div>

      <a
        href="#thoughts"
        className="mt-8 inline-block font-noto text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        关于我 →
      </a>
    </section>
  );
}
