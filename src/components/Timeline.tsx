import { timeline } from "@/data/content";

export function Timeline() {
  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-2">
        <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
          TIMELINE
        </span>
        <h2 className="font-noto text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
          一路走来
        </h2>
      </div>

      <ol className="relative ml-2 border-l border-[var(--color-border)]">
        {timeline.map((item) => (
          <li key={item.year} className="relative pb-10 pl-8 last:pb-0">
            {/* 圆点 */}
            <span
              className={`absolute -left-[7px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                item.future
                  ? "border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg)]"
                  : item.now
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-ink)]"
              }`}
            />
            <div className="flex items-center gap-3">
              <span className="font-mono-jb text-sm text-[var(--color-muted)]">
                {item.year}
              </span>
              {item.now && (
                <span className="rounded-full bg-[var(--color-ink)] px-2 py-0.5 font-mono-jb text-[10px] tracking-widest text-white">
                  NOW
                </span>
              )}
            </div>
            <h3 className="mt-1 font-noto text-lg font-semibold text-[var(--color-ink)]">
              {item.title}
            </h3>
            <p className="mt-1 font-noto text-sm leading-relaxed text-[var(--color-secondary)]">
              {item.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
