import React from "react";

export type AuthUser = {
  email: string;
  role: "user" | "admin";
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (params: { email: string; role?: AuthUser["role"] }) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "fm_auth_user_v1";

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(() => readStoredUser());

  const signIn = React.useCallback((params: { email: string; role?: AuthUser["role"] }) => {
    const next: AuthUser = { email: params.email, role: params.role ?? "user" };
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = React.useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
