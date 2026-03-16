import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/appStore";
import { Archive, ChevronLeft, ChevronRight, MessageSquarePlus, Search, Settings, Tag, UserRound } from "lucide-react";

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function Sidebar({ onOpenSettings, onOpenProfile }: { onOpenSettings: () => void; onOpenProfile: () => void }) {
  const { state, actions } = useAppStore();

  const visible = state.conversations
    .filter((c) => !c.archived)
    .filter((c) => {
      const q = state.conversationQuery.trim().toLowerCase();
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q));
    })
    .filter((c) => (state.tagFilter ? c.tags.includes(state.tagFilter) : true))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    state.conversations.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [state.conversations]);

  return (
    <aside
      className={cn(
        "flex h-dvh flex-col border-r bg-sidebar text-sidebar-foreground",
        state.sidebarCollapsed ? "w-[68px]" : "w-[280px]",
      )}
      aria-label="Sidebar"
      data-usecases="UC_128,UC_129"
    >
      <div className="flex items-center gap-2 border-b px-3 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={actions.toggleSidebar}
          aria-label={state.sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-usecases="UC_128"
        >
          {state.sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        {!state.sidebarCollapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">ChatGPT Clone</div>
            <div className="truncate text-xs text-muted-foreground">Maritime Serenity</div>
          </div>
        )}
      </div>

      <div className={cn("grid gap-2 px-3 py-3", state.sidebarCollapsed && "px-2")}>
        <Button
          className={cn("justify-start", state.sidebarCollapsed && "justify-center")}
          onClick={actions.createConversation}
          data-usecases="UC_027"
        >
          <MessageSquarePlus className="mr-2" />
          {!state.sidebarCollapsed && "New chat"}
        </Button>

        {!state.sidebarCollapsed && (
          <div className="relative" data-usecases="UC_034">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={state.conversationQuery}
              onChange={(e) => actions.setConversationQuery(e.target.value)}
              placeholder="Search conversations"
              className="pl-9"
              aria-label="Search conversations"
            />
          </div>
        )}

        {!state.sidebarCollapsed && allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" data-usecases="UC_039">
            <button
              className={cn(
                "rounded-full border px-2 py-0.5 text-xs",
                !state.tagFilter ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60",
              )}
              onClick={() => actions.setTagFilter(null)}
            >
              All
            </button>
            {allTags.slice(0, 6).map((t) => (
              <button
                key={t}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
                  state.tagFilter === t ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60",
                )}
                onClick={() => actions.setTagFilter(t)}
                aria-label={`Filter by tag ${t}`}
              >
                <Tag className="h-3.5 w-3.5" />
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto px-2 pb-2">
        {!state.sidebarCollapsed && (
          <div className="px-2 pb-2 text-xs font-medium text-muted-foreground">Conversations</div>
        )}

        <div className="grid gap-1" data-usecases="UC_126">
          {visible.length === 0 && !state.sidebarCollapsed && (
            <div className="rounded-md border bg-background/40 p-3 text-sm text-muted-foreground">No conversations found.</div>
          )}

          {visible.map((c) => {
            const active = c.id === state.selectedConversationId;
            return (
              <button
                key={c.id}
                onClick={() => actions.selectConversation(c.id)}
                className={cn(
                  "group flex w-full items-start gap-2 rounded-md border px-2 py-2 text-left transition-colors hover:bg-sidebar-accent/60",
                  active && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
                aria-current={active ? "page" : undefined}
                data-usecases="UC_127"
              >
                <Archive className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-sidebar-primary" : "text-muted-foreground")} />
                {!state.sidebarCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{c.title}</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-xs text-muted-foreground">
                        {c.tags.slice(0, 2).join(" · ") || "No tags"}
                      </div>
                      <div className="text-xs text-muted-foreground">{formatRelative(c.updatedAt)}</div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn("grid gap-1 border-t p-2", state.sidebarCollapsed && "p-2")}>
        <Button
          variant="ghost"
          className={cn("justify-start", state.sidebarCollapsed && "justify-center")}
          onClick={onOpenSettings}
          data-usecases="UC_127"
        >
          <Settings className="mr-2" />
          {!state.sidebarCollapsed && "Settings"}
        </Button>
        <Button
          variant="ghost"
          className={cn("justify-start", state.sidebarCollapsed && "justify-center")}
          onClick={onOpenProfile}
        >
          <UserRound className="mr-2" />
          {!state.sidebarCollapsed && "Profile"}
        </Button>
      </div>
    </aside>
  );
}
