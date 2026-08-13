"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { EmojiAvatarPicker } from "./EmojiAvatarPicker";
import { genderMeta } from "@/data/content";
import type { Gender } from "@/lib/types";

export function AuthModal({
  mode,
  onClose,
  onSwitch,
}: {
  mode: "login" | "register";
  onClose: () => void;
  onSwitch: (m: "login" | "register") => void;
}) {
  const { register, login } = useAuth();
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [avatar, setAvatar] = useState("🚀");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await register({ nickname, phone, password, gender, avatarEmoji: avatar });
      } else {
        await login(phone || nickname, password);
      }
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "操作失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-16">
      <div className="relative w-full max-w-[440px] rounded-2xl bg-white p-10 shadow-xl">
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--color-secondary)] transition-colors hover:bg-[var(--color-bg)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-ink)] font-noto text-lg font-bold text-white">
            春
          </span>
          <span className="font-noto text-base font-semibold text-[var(--color-ink)]">
            春哥空间
          </span>
        </div>

        <h2 className="mt-6 font-noto text-2xl font-bold text-[var(--color-ink)]">
          {mode === "register" ? "注册账号" : "登录"}
        </h2>
        <p className="mt-1 font-noto text-sm text-[var(--color-secondary)]">
          {mode === "register"
            ? "加入春哥空间，参与评论与交流"
            : "欢迎回到春哥空间"}
        </p>

        {mode === "register" && (
          <>
            <label className="mt-6 font-noto text-sm font-medium text-[var(--color-ink)]">
              昵称
            </label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入昵称"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />

            <label className="mt-4 font-noto text-sm font-medium text-[var(--color-ink)]">
              性别
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {(["male", "female"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl border font-noto text-[15px] transition ${
                    gender === g
                      ? g === "male"
                        ? "border-[var(--color-male)] bg-[#EFF6FF] text-[var(--color-male)]"
                        : "border-[var(--color-female)] bg-[#FDF2F8] text-[var(--color-female)]"
                      : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-secondary)]"
                  }`}
                >
                  <span className="text-xl">{genderMeta[g].symbol}</span>
                  {genderMeta[g].label}
                </button>
              ))}
            </div>

            <label className="mt-4 font-noto text-sm font-medium text-[var(--color-ink)]">
              头像（Emoji）
            </label>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] text-2xl">
                {avatar}
              </span>
              <span className="font-noto text-xs text-[var(--color-muted)]">
                当前选择的头像
              </span>
            </div>
            <div className="mt-3">
              <EmojiAvatarPicker value={avatar} onChange={setAvatar} />
            </div>

            <label className="mt-4 font-noto text-sm font-medium text-[var(--color-ink)]">
              手机号
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号"
              inputMode="numeric"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />

            <label className="mt-4 font-noto text-sm font-medium text-[var(--color-ink)]">
              密码
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="至少6位密码"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />
          </>
        )}

        {mode === "login" && (
          <>
            <label className="mt-6 font-noto text-sm font-medium text-[var(--color-ink)]">
              手机号 / 昵称
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号或昵称"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />
            <label className="mt-4 font-noto text-sm font-medium text-[var(--color-ink)]">
              密码
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="请输入密码"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 font-noto text-[15px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
            />
          </>
        )}

        {error && (
          <p className="mt-4 font-noto text-sm text-red-500">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 h-[52px] w-full rounded-xl bg-[var(--color-ink)] font-noto text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading
            ? "处理中…"
            : mode === "register"
              ? "注册"
              : "登录"}
        </button>

        <p className="mt-4 text-center font-noto text-sm text-[var(--color-secondary)]">
          {mode === "register" ? (
            <>
              已有账号？
              <button
                className="text-[var(--color-ink)] hover:underline"
                onClick={() => onSwitch("login")}
              >
                立即登录 →
              </button>
            </>
          ) : (
            <>
              没有账号？
              <button
                className="text-[var(--color-ink)] hover:underline"
                onClick={() => onSwitch("register")}
              >
                注册新账号 →
              </button>
            </>
          )}
        </p>

        {mode === "register" && (
          <p className="mt-3 text-center font-noto text-xs text-[var(--color-muted)]">
            注册即表示同意《用户协议》和《隐私政策》
          </p>
        )}
      </div>
    </div>
  );
}
