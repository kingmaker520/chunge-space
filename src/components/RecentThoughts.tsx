import { thoughts } from "@/data/content";

export function RecentThoughts() {
  return (
    <section
      id="thoughts"
      className="mx-auto max-w-[1200px] px-6 py-16 md:py-20"
    >
      <div className="mb-10 flex flex-col gap-2">
        <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
          RECENT THOUGHTS
        </span>
        <h2 className="font-noto text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
          最近的思考
        </h2>
      </div>

      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {thoughts.map((t) => (
          <a
            key={t.title}
            href="#"
            className="group flex flex-col gap-2 py-6 transition-colors md:flex-row md:items-center md:gap-8"
          >
            <span className="font-mono-jb text-sm text-[var(--color-muted)] md:w-28">
              {t.date}
            </span>
            <span className="w-fit rounded-full bg-[var(--color-bg)] px-3 py-1 font-noto text-xs font-medium text-[var(--color-accent)]">
              {t.category}
            </span>
            <span className="flex-1 font-noto text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
              {t.title}
            </span>
            <span className="font-noto text-sm text-[var(--color-muted)]">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
