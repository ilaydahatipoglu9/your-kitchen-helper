import * as React from "react";

export type UserRole = "manager" | "owner" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type SessionState = {
  user: SessionUser | null;
  signIn: (payload: { email: string; role?: UserRole; name?: string }) => void;
  signUp: (payload: { name: string; email: string; role?: UserRole }) => void;
  signOut: () => void;
};

const SessionContext = React.createContext<SessionState | null>(null);

export const STORAGE_KEY = "pmt.session.user";

function safeParse(json: string | null): SessionUser | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as SessionUser;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(() => safeParse(localStorage.getItem(STORAGE_KEY)));

  React.useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const signIn = React.useCallback((payload: { email: string; role?: UserRole; name?: string }) => {
    const role: UserRole = payload.role ?? (payload.email.includes("owner") ? "owner" : "manager");
    setUser({
      id: crypto.randomUUID(),
      name: payload.name ?? (role === "owner" ? "Owner" : role === "admin" ? "Administrator" : "Property Manager"),
      email: payload.email,
      role,
    });
  }, []);

  const signUp = React.useCallback((payload: { name: string; email: string; role?: UserRole }) => {
    const role: UserRole = payload.role ?? "manager";
    setUser({ id: crypto.randomUUID(), name: payload.name, email: payload.email, role });
  }, []);

  const signOut = React.useCallback(() => setUser(null), []);

  const value = React.useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  const ctx = React.useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
