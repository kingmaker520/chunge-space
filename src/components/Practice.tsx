import { projects, type ProjectStatus } from "@/data/content";

function statusBadgeClass(status: ProjectStatus): string {
  if (status === "进行中")
    return "bg-[var(--color-ink)] text-white";
  if (status === "实验中") return "bg-[var(--color-accent)] text-white";
  return "border border-[var(--color-border)] text-[var(--color-secondary)]";
}

export function Practice() {
  return (
    <section
      id="practice"
      className="mx-auto max-w-[1200px] px-6 py-16 md:py-20"
    >
      <div className="mb-10 flex flex-col gap-2">
        <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
          PRACTICE
        </span>
        <h2 className="font-noto text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
          正在实践
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.targetId}
            className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-noto text-lg font-semibold text-[var(--color-ink)]">
                {p.name}
              </h3>
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-noto text-xs ${statusBadgeClass(
                  p.status,
                )}`}
              >
                {p.status === "进行中" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                )}
                {p.status === "实验中" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
                {p.status}
              </span>
            </div>
            <p className="font-noto text-sm leading-relaxed text-[var(--color-secondary)]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
