import { nowItems, type NowItem } from "@/data/content";

function NowIcon({ icon }: { icon: NowItem["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 15c-1 2-1 4-1 4s2 0 4-1m-3-3l9-9a3 3 0 014 4l-9 9-4-4z" />
          <circle cx="14" cy="10" r="1.5" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 21v-7M12 14c-3 0-5-2-5-5a5 5 0 0110 0c0 3-2 5-5 5z" />
        </svg>
      );
  }
}

export function NowDoing() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-2">
        <span className="font-mono-jb text-xs tracking-[0.3em] text-[var(--color-accent)]">
          NOW DOING
        </span>
        <h2 className="font-noto text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
          现在在做什么
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {nowItems.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-shadow hover:shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-ink)]">
              <NowIcon icon={item.icon} />
            </span>
            <h3 className="mt-4 font-noto text-lg font-semibold text-[var(--color-ink)]">
              {item.title}
            </h3>
            <p className="mt-2 font-noto text-sm leading-relaxed text-[var(--color-secondary)]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
