"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useAuthModal } from "./AuthModalProvider";
import { genderMeta } from "@/data/content";
import type { CommentDTO, Gender } from "@/lib/types";

const MAX_CONTENT_LENGTH = 500;

function avatarBorderClass(gender: Gender): string {
  return gender === "male"
    ? "border-2 border-[var(--color-male)]"
    : "border-2 border-[var(--color-female)]";
}

function genderSymbolClass(gender: Gender): string {
  return gender === "male"
    ? "text-[var(--color-male)]"
    : "text-[var(--color-female)]";
}

export function CommentSection({
  targetType,
  targetId,
  title = "评论",
}: {
  targetType: "article" | "project";
  targetId: string;
  title?: string;
}) {
  const { user, token } = useAuth();
  const { openAuth } = useAuthModal();
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(
        `/api/comments?targetType=${targetType}&targetId=${encodeURIComponent(targetId)}`,
      );
      if (!r.ok) throw new Error("加载评论失败");
      const d = (await r.json()) as { comments?: CommentDTO[] };
      setComments(d.comments || []);
    } catch {
      setError("加载评论失败，请刷新重试");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetType, targetId]);

  async function submitTopLevel() {
    if (!user || !token) {
      openAuth("login");
      return;
    }
    if (!text.trim()) return;
    if (text.trim().length > MAX_CONTENT_LENGTH) {
      setError(`评论不能超过 ${MAX_CONTENT_LENGTH} 字`);
      return;
    }
    setError("");
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetType, targetId, content: text.trim() }),
      });
      const data = (await r.json().catch(() => ({}))) as { error?: string };
      if (!r.ok) {
        setError(data.error || "发表失败，请重试");
        return;
      }
      setText("");
      await load();
    } catch {
      setError("网络错误，请重试");
    }
  }

  async function submitReply(parentId: string, replyContent: string) {
    if (!user || !token) {
      openAuth("login");
      return;
    }
    if (!replyContent.trim()) return;
    setError("");
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetType,
          targetId,
          content: replyContent.trim(),
          parentId,
        }),
      });
      const data = (await r.json().catch(() => ({}))) as { error?: string };
      if (!r.ok) {
        setError(data.error || "回复失败，请重试");
        return;
      }
      await load();
    } catch {
      setError("网络错误，请重试");
    }
  }

  const count = comments.reduce(
    (a, c) => a + 1 + (c.replies?.length || 0),
    0,
  );

  return (
    <section className="mx-auto max-w-[800px] px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-noto text-xl font-bold text-[var(--color-ink)]">
          {title} ({count})
        </h2>
        <button className="font-noto text-sm text-[var(--color-secondary)]">
          最新 ↓
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-noto text-sm text-red-600">
          {error}
        </div>
      )}

      {user ? (
        <div className="mb-8 flex gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] text-lg ${avatarBorderClass(
              user.gender,
            )}`}
          >
            {user.avatarEmoji}
          </span>
          <div className="flex-1">
            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && submitTopLevel()}
              placeholder="写下你的评论..."
              className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />
            <div className="mt-2 flex justify-between">
              <span className="font-noto text-xs text-[var(--color-muted)]">
                {text.length}/{MAX_CONTENT_LENGTH}
              </span>
              <button
                onClick={submitTopLevel}
                className="rounded-lg bg-[var(--color-ink)] px-4 py-2 font-noto text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                发表评论
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] py-8">
          <span className="font-noto text-[15px] text-[var(--color-muted)]">
            请先登录后评论
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => openAuth("login")}
              className="rounded-lg bg-[var(--color-ink)] px-4 py-2 font-noto text-sm font-medium text-white"
            >
              登录
            </button>
            <button
              onClick={() => openAuth("register")}
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 font-noto text-sm text-[var(--color-ink)]"
            >
              注册
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="font-noto text-sm text-[var(--color-muted)]">加载中…</p>
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((c) => (
            <CommentItem key={c.id} c={c} onReply={submitReply} />
          ))}
          {comments.length === 0 && (
            <p className="font-noto text-sm text-[var(--color-muted)]">
              还没有评论，来抢沙发吧。
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function CommentItem({
  c,
  onReply,
}: {
  c: CommentDTO;
  onReply: (parentId: string, content: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [rt, setRt] = useState("");
  const g = genderMeta[c.author.gender];

  return (
    <div className="flex gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] text-lg ${avatarBorderClass(
          c.author.gender,
        )}`}
      >
        {c.author.avatarEmoji}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className="font-noto text-[15px] font-semibold text-[var(--color-ink)]">
            {c.author.nickname}
          </span>
          <span className={`text-[11px] font-bold ${genderSymbolClass(c.author.gender)}`}>
            {g.symbol}
          </span>
          {c.isAuthor && (
            <span className="rounded bg-[var(--color-accent)] px-1.5 py-0.5 font-noto text-[10px] font-semibold text-white">
              作者
            </span>
          )}
          <span className="ml-auto font-mono-jb text-xs text-[var(--color-muted)]">
            {new Date(c.createdAt).toLocaleDateString("zh-CN")}
          </span>
        </div>
        <p className="mt-1 font-noto text-[15px] leading-relaxed text-[var(--color-secondary)]">
          {c.content}
        </p>
        <div className="mt-1 flex gap-5">
          <button className="font-noto text-[13px] text-[var(--color-secondary)]">
            赞
          </button>
          <button
            onClick={() => setReplying((v) => !v)}
            className="font-noto text-[13px] text-[var(--color-secondary)]"
          >
            回复
          </button>
        </div>

        {replying && (
          <div className="mt-2 flex gap-2">
            <input
              value={rt}
              onChange={(e) => setRt(e.target.value)}
              placeholder={`回复 ${c.author.nickname}`}
              className="h-9 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 font-noto text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />
            <button
              onClick={() => {
                if (rt.trim()) {
                  onReply(c.id, rt);
                  setRt("");
                  setReplying(false);
                }
              }}
              className="rounded-lg bg-[var(--color-ink)] px-3 py-1.5 font-noto text-sm text-white"
            >
              发送
            </button>
          </div>
        )}

        {c.replies && c.replies.length > 0 && (
          <div className="mt-4 flex flex-col gap-4 border-l-2 border-[var(--color-border)] pl-4">
            {c.replies.map((r) => (
              <CommentItem key={r.id} c={r} onReply={onReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
