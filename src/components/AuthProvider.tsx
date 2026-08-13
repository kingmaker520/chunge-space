"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Gender, PublicUser } from "@/lib/types";

interface RegisterInput {
  nickname: string;
  phone: string;
  password: string;
  gender: Gender;
  avatarEmoji: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  token: string | null;
  loading: boolean;
  login: (account: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = "chunge_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) {
      setLoading(false);
      return;
    }
    setToken(t);
    fetch("/api/login", {
      method: "GET",
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) =>
        setUser((d as { user?: PublicUser | null })?.user ?? null),
      )
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (account: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, password }),
    });
    const data = (await res.json()) as {
      error?: string;
      token?: string;
      user?: PublicUser | null;
    };
    if (!res.ok) throw new Error(data?.error || "登录失败");
    setToken(data.token ?? null);
    setUser(data.user ?? null);
    localStorage.setItem(TOKEN_KEY, data.token ?? "");
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const d = (await res.json()) as {
      error?: string;
      token?: string;
      user?: PublicUser | null;
    };
    if (!res.ok) throw new Error(d?.error || "注册失败");
    setToken(d.token ?? null);
    setUser(d.user ?? null);
    localStorage.setItem(TOKEN_KEY, d.token ?? "");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
