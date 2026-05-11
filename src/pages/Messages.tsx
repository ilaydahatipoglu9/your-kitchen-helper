import * as React from "react";
import { Paperclip, Plus, Send } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Thread = { id: string; title: string; participants: string[] };
type Msg = { id: string; threadId: string; from: string; text: string; ts: string; status: "Sent" | "Read" };

export default function MessagesPage() {
  const [threads, setThreads] = React.useState<Thread[]>([
    { id: "th1", title: "Unit 12B: Payment confirmation", participants: ["Avery", "Manager"] },
    { id: "th2", title: "Owner Q2 statement", participants: ["Owner", "Manager"] },
  ]);

  const [messages, setMessages] = React.useState<Msg[]>([
    { id: "m1", threadId: "th1", from: "Avery", text: "Payment submitted this morning.", ts: "9:05 AM", status: "Read" },
    { id: "m2", threadId: "th1", from: "Manager", text: "Received, thank you.", ts: "9:12 AM", status: "Sent" },
  ]);

  const [activeId, setActiveId] = React.useState("th1");
  const [compose, setCompose] = React.useState("");
  const [newThreadOpen, setNewThreadOpen] = React.useState(false);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  const activeMsgs = messages.filter((m) => m.threadId === active?.id);

  return (
    <AppShell title="Messages">
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Threads</CardTitle>
            <Button size="sm" onClick={() => setNewThreadOpen(true)} data-usecases="UC_112">
              <Plus className="h-4 w-4" aria-hidden="true" />
              New
            </Button>
          </CardHeader>
          <CardContent>
            {threads.length === 0 ? (
              <div className="rounded-md border bg-background/50 p-6 text-sm">
                <div className="font-medium">No threads</div>
                <div className="mt-1 text-xs text-muted-foreground">Start a conversation to coordinate work.</div>
              </div>
            ) : (
              <ul className="grid gap-2" aria-label="Message threads">
                {threads.map((t) => (
                  <li key={t.id}>
                    <Button
                      variant={t.id === activeId ? "secondary" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveId(t.id)}
                      data-usecases="UC_112"
                    >
                      <div className="min-w-0 text-left">
                        <div className="truncate text-sm font-medium">{t.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{t.participants.join(" • ")}</div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{active?.title ?? "Conversation"}</CardTitle>
            <div className="text-xs text-muted-foreground">Read status is shown per message.</div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ScrollArea className="h-[360px] rounded-md border bg-background/50">
              <div className="grid gap-3 p-3" aria-label="Message list">
                {activeMsgs.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No messages in this thread.</div>
                ) : (
                  activeMsgs.map((m) => (
                    <div key={m.id} className="rounded-md border bg-background p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-medium">{m.from}</div>
                        <div className="text-xs text-muted-foreground">{m.ts}</div>
                      </div>
                      <div className="mt-1 text-sm">{m.text}</div>
                      <div className="mt-2 text-xs text-muted-foreground" data-usecases="UC_114">
                        Status: {m.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <Separator />

            <div className="grid gap-2">
              <Textarea value={compose} onChange={(e) => setCompose(e.target.value)} placeholder="Write a message" />
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => alert("Upload attachment")}
                  data-usecases="UC_115"
                >
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                  Add attachment
                </Button>
                <Button
                  onClick={() => {
                    if (!compose.trim() || !active) return;
                    setMessages((p) => [
                      ...p,
                      {
                        id: crypto.randomUUID(),
                        threadId: active.id,
                        from: "Manager",
                        text: compose.trim(),
                        ts: "Now",
                        status: "Sent",
                      },
                    ]);
                    setCompose("");
                  }}
                  data-usecases="UC_113"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={newThreadOpen} onOpenChange={setNewThreadOpen}>
          <DialogContent aria-label="New thread">
            <DialogHeader>
              <DialogTitle>New thread</DialogTitle>
              <DialogDescription>Create a new conversation between stakeholders.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="thread-title">
                  Subject
                </label>
                <Input id="thread-title" placeholder="Example: Unit 10A repair timeline" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="thread-participants">
                  Participants
                </label>
                <Input id="thread-participants" placeholder="Names or emails" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewThreadOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setThreads((p) => [{ id: crypto.randomUUID(), title: "New thread", participants: ["Manager"] }, ...p]);
                  setNewThreadOpen(false);
                }}
                data-usecases="UC_112"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
