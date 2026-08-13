"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { AuthModal } from "./AuthModal";

type Mode = "login" | "register";

interface AuthModalCtx {
  openAuth: (mode?: Mode) => void;
}

const Ctx = createContext<AuthModalCtx | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode | null>(null);

  const openAuth = (m: Mode = "login") => setMode(m);

  return (
    <Ctx.Provider value={{ openAuth }}>
      {children}
      {mode && (
        <AuthModal
          mode={mode}
          onClose={() => setMode(null)}
          onSwitch={(m) => setMode(m)}
        />
      )}
    </Ctx.Provider>
  );
}

export function useAuthModal() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuthModal must be used within AuthModalProvider");
  return c;
}
