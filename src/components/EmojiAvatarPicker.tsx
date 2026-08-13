"use client";

import { emojiOptions } from "@/data/content";

export function EmojiAvatarPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {emojiOptions.map((e) => (
        <button
          key={e}
          type="button"
          onClick={() => onChange(e)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition ${
            value === e
              ? "bg-[var(--color-bg)] ring-2 ring-[var(--color-accent)]"
              : "bg-[var(--color-bg)] hover:bg-[var(--color-border)]"
          }`}
        >
          {e}
        </button>
      ))}
    </div>
  );
}
