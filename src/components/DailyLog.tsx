import { dailyLogs } from "@/data/content";

export function DailyLog() {
  return (
    <section id="log" className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mb-10 flex items-end gap-3">
        <span className="font-noto text-4xl font-bold text-[var(--color-ink)] md:text-[48px]">
          2026
        </span>
        <span className="mb-1 font-noto text-lg text-[var(--color-secondary)]">
          8月
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {dailyLogs.map((log) => (
          <div
            key={log.date}
            className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <span className="font-mono-jb text-sm text-[var(--color-muted)]">
              {log.date}
            </span>
            <div className="flex flex-col gap-1">
              <span className="w-fit rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 font-noto text-xs font-medium text-[var(--color-accent)]">
                {log.type}
              </span>
              <p className="font-noto text-sm leading-relaxed text-[var(--color-secondary)]">
                {log.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
