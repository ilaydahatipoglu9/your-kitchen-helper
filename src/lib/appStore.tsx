import * as React from "react";
import type { Attachment, Conversation, Message, Model, Tool, User } from "@/lib/types";
import { mockConversations, mockMessages, mockModels, mockTools, mockUser } from "@/lib/mockData";

type AuthState =
  | { status: "signed-out" }
  | { status: "mfa-required"; pendingEmail: string }
  | { status: "signed-in"; user: User };

type AppState = {
  auth: AuthState;
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: Message[];
  selectedModelId: string;
  selectedToolId: string;
  sidebarCollapsed: boolean;
  conversationQuery: string;
  tagFilter: string | null;
  isStreaming: boolean;
  lastError?: string | null;
};

type AppActions = {
  signIn: (email: string, _password: string) => void;
  signInWithProvider: (provider: "google" | "facebook") => void;
  submitMfa: (code: string) => void;
  signOut: () => void;

  toggleDarkMode: () => void;

  createConversation: () => void;
  selectConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  restoreConversation: (id: string) => void;
  endConversation: (id: string) => void;

  setConversationQuery: (q: string) => void;
  setTagFilter: (tag: string | null) => void;

  toggleSidebar: () => void;

  setModel: (id: string) => void;
  setTool: (id: string) => void;

  sendMessage: (conversationId: string, content: string, attachments?: Attachment[]) => void;
  loadOlderMessages: (conversationId: string) => void;

  updateProfile: (partial: Pick<User, "name" | "email">) => void;
};

type AppContextValue = {
  state: AppState;
  actions: AppActions;
  models: Model[];
  tools: Tool[];
};

const AppStoreContext = React.createContext<AppContextValue | null>(null);

function applyThemeClass(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
}

const initialDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

const initialState: AppState = {
  auth: { status: "signed-out" },
  conversations: mockConversations,
  selectedConversationId: mockConversations[0]?.id ?? null,
  messages: mockMessages,
  selectedModelId: mockModels[0]?.id ?? "gpt-4o-mini",
  selectedToolId: mockTools[0]?.id ?? "none",
  sidebarCollapsed: false,
  conversationQuery: "",
  tagFilter: null,
  isStreaming: false,
  lastError: null,
};

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(initialState);
  const [isDark, setIsDark] = React.useState<boolean>(!!initialDark);

  React.useEffect(() => {
    applyThemeClass(isDark);
  }, [isDark]);

  const actions = React.useMemo<AppActions>(() => {
    return {
      signIn: (email) => {
        // Mock behavior: require MFA if email contains "+mfa"
        if (email.includes("+mfa")) {
          setState((s) => ({ ...s, auth: { status: "mfa-required", pendingEmail: email } }));
          return;
        }
        setState((s) => ({ ...s, auth: { status: "signed-in", user: { ...mockUser, email } } }));
      },
      signInWithProvider: (_provider) => {
        setState((s) => ({ ...s, auth: { status: "signed-in", user: mockUser } }));
      },
      submitMfa: (code) => {
        if (code.trim().length < 4) {
          setState((s) => ({ ...s, lastError: "Invalid MFA code" }));
          return;
        }
        setState((s) => ({ ...s, auth: { status: "signed-in", user: mockUser }, lastError: null }));
      },
      signOut: () => setState((s) => ({ ...s, auth: { status: "signed-out" } })),

      toggleDarkMode: () => setIsDark((d) => !d),

      createConversation: () => {
        const id = `c_${Math.random().toString(16).slice(2)}`;
        const now = Date.now();
        const conv: Conversation = { id, title: "New chat", updatedAt: now, tags: [] };
        setState((s) => ({
          ...s,
          conversations: [conv, ...s.conversations],
          selectedConversationId: id,
          messages: s.messages,
        }));
      },
      selectConversation: (id) => setState((s) => ({ ...s, selectedConversationId: id })),
      archiveConversation: (id) =>
        setState((s) => ({
          ...s,
          conversations: s.conversations.map((c) => (c.id === id ? { ...c, archived: true } : c)),
        })),
      restoreConversation: (id) =>
        setState((s) => ({
          ...s,
          conversations: s.conversations.map((c) => (c.id === id ? { ...c, archived: false } : c)),
        })),
      endConversation: (id) =>
        setState((s) => ({
          ...s,
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, title: c.title === "New chat" ? "Ended conversation" : c.title } : c,
          ),
        })),

      setConversationQuery: (q) => setState((s) => ({ ...s, conversationQuery: q })),
      setTagFilter: (tag) => setState((s) => ({ ...s, tagFilter: tag })),

      toggleSidebar: () => setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed })),

      setModel: (id) => setState((s) => ({ ...s, selectedModelId: id })),
      setTool: (id) => setState((s) => ({ ...s, selectedToolId: id })),

      sendMessage: (conversationId, content, attachments) => {
        if (!content.trim() && (!attachments || attachments.length === 0)) return;
        const now = Date.now();
        const userMsg: Message = {
          id: `m_${Math.random().toString(16).slice(2)}`,
          conversationId,
          role: "user",
          content: content.trim(),
          createdAt: now,
          attachments,
          status: "sending",
        };
        setState((s) => ({
          ...s,
          isStreaming: true,
          messages: [...s.messages, userMsg],
          conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, updatedAt: now } : c)),
        }));

        // Mock streaming assistant reply
        const assistantId = `m_${Math.random().toString(16).slice(2)}`;
        const start = now + 250;
        setTimeout(() => {
          setState((s) => ({
            ...s,
            messages: s.messages.map((m) => (m.id === userMsg.id ? { ...m, status: "sent" } : m)),
          }));
        }, 200);

        setTimeout(() => {
          const assistantMsg: Message = {
            id: assistantId,
            conversationId,
            role: "assistant",
            content: "",
            createdAt: start,
            status: "sending",
          };
          setState((s) => ({ ...s, messages: [...s.messages, assistantMsg] }));

          const full =
            "I can help with that. Share a bit more context and I’ll produce a clear, structured answer.\n\n(Streaming simulated in the UI.)";
          let i = 0;
          const interval = setInterval(() => {
            i += 2;
            setState((s) => ({
              ...s,
              messages: s.messages.map((m) =>
                m.id === assistantId ? { ...m, content: full.slice(0, i), status: i >= full.length ? "sent" : "sending" } : m,
              ),
              isStreaming: i < full.length,
            }));
            if (i >= full.length) {
              clearInterval(interval);
            }
          }, 40);
        }, 350);
      },

      loadOlderMessages: (conversationId) => {
        const older: Message = {
          id: `m_${Math.random().toString(16).slice(2)}`,
          conversationId,
          role: "assistant",
          content: "Older message loaded (mock).",
          createdAt: Date.now() - 1000 * 60 * 60,
          status: "sent",
        };
        setState((s) => ({ ...s, messages: [older, ...s.messages] }));
      },

      updateProfile: (partial) => {
        setState((s) => {
          if (s.auth.status !== "signed-in") return s;
          return { ...s, auth: { status: "signed-in", user: { ...s.auth.user, ...partial } } };
        });
      },
    };
  }, []);

  const value: AppContextValue = React.useMemo(
    () => ({ state, actions, models: mockModels, tools: mockTools }),
    [state, actions],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppStore() {
  const ctx = React.useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
