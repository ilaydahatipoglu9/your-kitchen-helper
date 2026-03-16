import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/appStore";
import type { Attachment, Message } from "@/lib/types";
import { Paperclip, Send, Sparkles } from "lucide-react";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
      data-usecases="UC_121"
      aria-label={isUser ? "User message" : "Assistant message"}
    >
      <div
        className={cn(
          "group max-w-[min(720px,85%)] rounded-2xl border px-4 py-3 shadow-sm transition-colors",
          isUser
            ? "bg-primary text-primary-foreground border-primary/30"
            : "bg-card text-card-foreground hover:bg-accent/30",
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md border px-2 py-1 text-xs",
                  isUser ? "border-primary-foreground/20 bg-primary/20" : "bg-background/40",
                )}
              >
                <div className="truncate">{a.name}</div>
                <div className={cn("shrink-0", isUser ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {Math.round(a.size / 1024)}KB
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={cn("mt-2 flex items-center justify-between text-xs", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          <span>{formatTime(message.createdAt)}</span>
          <span className="capitalize">{message.status === "sending" ? "sending" : message.status === "error" ? "error" : ""}</span>
        </div>
      </div>
    </div>
  );
}

export function ChatPanel({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { state, actions, models, tools } = useAppStore();
  const conv = state.conversations.find((c) => c.id === state.selectedConversationId) ?? null;

  const [draft, setDraft] = React.useState("");
  const [pendingAttachments, setPendingAttachments] = React.useState<Attachment[]>([]);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const messages = React.useMemo(() => {
    if (!conv) return [];
    return state.messages
      .filter((m) => m.conversationId === conv.id)
      .sort((a, b) => a.createdAt - b.createdAt);
  }, [state.messages, conv]);

  React.useEffect(() => {
    // auto-scroll to bottom on new messages
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, state.isStreaming]);

  const send = () => {
    if (!conv) return;
    actions.sendMessage(conv.id, draft, pendingAttachments.length ? pendingAttachments : undefined);
    setDraft("");
    setPendingAttachments([]);
  };

  const onPickFiles: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files ?? []);
    const mapped: Attachment[] = files.map((f) => ({
      id: `a_${Math.random().toString(16).slice(2)}`,
      name: f.name,
      size: f.size,
      type: f.type || "application/octet-stream",
    }));
    setPendingAttachments((cur) => [...cur, ...mapped]);
    e.target.value = "";
  };

  return (
    <section className="flex h-dvh min-w-0 flex-1 flex-col" aria-label="Chat">
      {/* Topbar */}
      <header className="flex items-center justify-between gap-3 border-b bg-background/60 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{conv?.title ?? "Welcome"}</div>
          <div className="truncate text-xs text-muted-foreground">
            Model: {models.find((m) => m.id === state.selectedModelId)?.label} · Tool: {tools.find((t) => t.id === state.selectedToolId)?.label}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <label className="sr-only" htmlFor="model">
              Model
            </label>
            <select
              id="model"
              value={state.selectedModelId}
              onChange={(e) => actions.setModel(e.target.value)}
              className="h-9 rounded-md border bg-background px-2 text-sm"
              aria-label="Select model"
              data-usecases="UC_207"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="tool">
              Tool
            </label>
            <select
              id="tool"
              value={state.selectedToolId}
              onChange={(e) => actions.setTool(e.target.value)}
              className="h-9 rounded-md border bg-background px-2 text-sm"
              aria-label="Select tool"
            >
              {tools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {state.auth.status !== "signed-in" && (
            <Button variant="outline" onClick={onOpenAuth} data-usecases="UC_233">
              Sign in
            </Button>
          )}
        </div>
      </header>

      {/* Feed */}
      <div className="flex min-h-0 flex-1 justify-center">
        <div className="flex w-full max-w-[1200px] min-w-0 flex-1 flex-col px-3 md:px-6">
          <div className="flex items-center justify-between gap-2 py-3">
            <Button
              variant="ghost"
              onClick={() => (conv ? actions.loadOlderMessages(conv.id) : undefined)}
              disabled={!conv}
              className="text-muted-foreground"
              data-usecases="UC_125"
            >
              Load older
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground" data-usecases="UC_123">
              <span
                className={cn(
                  "inline-flex h-2 w-2 rounded-full",
                  state.isStreaming ? "bg-primary animate-pulse" : "bg-muted-foreground/40",
                )}
                aria-hidden="true"
              />
              {state.isStreaming ? "Assistant is typing…" : "Ready"}
            </div>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-auto rounded-lg border bg-background/50 p-3 md:p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            data-usecases="UC_121,UC_125"
          >
            {messages.length === 0 && (
              <Card className="border-dashed bg-transparent p-6 text-center text-sm text-muted-foreground">
                Start the conversation by sending a message.
              </Card>
            )}
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>

          {/* Composer */}
          <div className="sticky bottom-0 mt-3 border-t bg-background/80 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {pendingAttachments.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2" data-usecases="UC_124">
                {pendingAttachments.map((a) => (
                  <span key={a.id} className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs">
                    <Paperclip className="h-3.5 w-3.5" />
                    <span className="max-w-[200px] truncate">{a.name}</span>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setPendingAttachments((cur) => cur.filter((x) => x.id !== a.id))}
                      aria-label={`Remove attachment ${a.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2" data-usecases="UC_122">
              <div className="flex-1">
                <label className="sr-only" htmlFor="composer">
                  Message
                </label>
                <Input
                  id="composer"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={conv ? "Message…" : "Select or start a conversation"}
                  disabled={!conv}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                />
              </div>

              <div className="flex items-center gap-2" data-usecases="UC_124">
                <label className="inline-flex">
                  <input type="file" className="sr-only" multiple onChange={onPickFiles} />
                  <Button variant="outline" size="icon" asChild>
                    <span aria-label="Add attachment">
                      <Paperclip />
                    </span>
                  </Button>
                </label>

                <Button onClick={send} disabled={!conv} data-usecases="UC_122">
                  <Send className="mr-2" />
                  Send
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="hidden lg:inline-flex" aria-label="Hint" title="Tips">
                <Sparkles />
              </Button>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Tip: use <span className="font-medium">Enter</span> to send. Attach files for context.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
