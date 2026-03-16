import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, PencilLine } from "lucide-react";
import type { ModelConfig } from "@/components/workspace/ModelConfigPanel";

export type PromptItem = {
  id: string;
  title: string;
  body: string;
  suite?: string;
};

export default function PromptPanel({
  promptLibrary,
  activePromptId,
  onChangeActivePrompt,
  promptDraft,
  onChangePromptDraft,
  onCreatePrompt,
  onUpdateActivePrompt,
  selectedModels,
  evaluationStatus,
  onRun,
}: {
  promptLibrary: PromptItem[];
  activePromptId: string;
  onChangeActivePrompt: (id: string) => void;
  promptDraft: string;
  onChangePromptDraft: (v: string) => void;
  onCreatePrompt: (item: PromptItem) => void;
  onUpdateActivePrompt: (nextBody: string) => void;
  selectedModels: ModelConfig[];
  evaluationStatus: "idle" | "running" | "complete" | "error";
  onRun: () => void;
}) {
  const [promptQuery, setPromptQuery] = useState("");
  const [suiteFilter, setSuiteFilter] = useState<string>("all");

  const suites = useMemo(() => {
    const unique = Array.from(new Set(promptLibrary.map((p) => p.suite).filter(Boolean))) as string[];
    return unique.sort();
  }, [promptLibrary]);

  const filtered = useMemo(() => {
    const q = promptQuery.trim().toLowerCase();
    return promptLibrary.filter((p) => {
      const matchesQ = !q || `${p.title} ${p.body}`.toLowerCase().includes(q);
      const matchesSuite = suiteFilter === "all" || p.suite === suiteFilter;
      return matchesQ && matchesSuite;
    });
  }, [promptLibrary, promptQuery, suiteFilter]);

  const canRun = selectedModels.length > 0 && promptDraft.trim().length > 0 && evaluationStatus !== "running";

  return (
    <Card className="border-border/70 bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">Prompt & Run Controls</CardTitle>
            <div className="text-xs text-muted-foreground">
              Compose a prompt, choose models, and start a parallel run.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button data-usecases="UC_113" variant="secondary" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  New prompt
                </Button>
              </DrawerTrigger>
              <NewPromptDrawer suites={suites} onCreate={onCreatePrompt} />
            </Drawer>

            <Button
              data-usecases="UC_038"
              size="sm"
              className="gap-2"
              disabled={!canRun}
              onClick={onRun}
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Run Evaluation
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="prompt-search">
              Search prompts
            </Label>
            <div data-usecases="UC_117" className="space-y-2">
              <Input
                id="prompt-search"
                placeholder="Search your prompt library…"
                value={promptQuery}
                onChange={(e) => setPromptQuery(e.target.value)}
                aria-label="Search prompts"
              />
              <div className="flex flex-wrap gap-2">
                <Badge
                  data-usecases="UC_117"
                  variant={suiteFilter === "all" ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSuiteFilter("all")}
                >
                  All suites
                </Badge>
                {suites.map((s) => (
                  <Badge
                    key={s}
                    data-usecases="UC_117"
                    variant={suiteFilter === s ? "secondary" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSuiteFilter(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="max-h-[340px] overflow-auto rounded-md border p-1">
              {filtered.length === 0 ? (
                <div className="p-2 text-xs text-muted-foreground">No prompts match your search.</div>
              ) : (
                filtered.map((p) => {
                  const active = p.id === activePromptId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={
                        "w-full rounded-md px-3 py-2 text-left hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                        (active ? "bg-muted" : "")
                      }
                      onClick={() => onChangeActivePrompt(p.id)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-sm font-medium">{p.title}</div>
                        {p.suite ? (
                          <Badge variant="outline" className="text-[10px]">
                            {p.suite}
                          </Badge>
                        ) : null}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.body}</div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-xs" htmlFor="prompt-editor">
                Prompt editor
              </Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button data-usecases="UC_035" variant="outline" size="sm" className="gap-2">
                    <PencilLine className="h-4 w-4" aria-hidden="true" />
                    Apply to library
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update prompt</DialogTitle>
                    <DialogDescription>
                      Save the current draft back to the selected prompt in your library.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-xs text-muted-foreground">
                    This will overwrite the stored body for the active prompt.
                  </div>
                  <DialogFooter>
                    <Button
                      data-usecases="UC_113"
                      onClick={() => onUpdateActivePrompt(promptDraft)}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div data-usecases="UC_035" className="rounded-md border bg-background/60 p-2">
              <Textarea
                id="prompt-editor"
                value={promptDraft}
                onChange={(e) => onChangePromptDraft(e.target.value)}
                placeholder="Write a prompt to run across selected models…"
                className="min-h-[260px] resize-y bg-transparent"
                aria-label="Prompt input"
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <div>
                  Selected models: {selectedModels.length ? selectedModels.map((m) => m.name).join(", ") : "None"}
                </div>
                <div>Characters: {promptDraft.length}</div>
              </div>
            </div>

            {evaluationStatus === "error" ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
                Add at least one model and a non-empty prompt to run an evaluation.
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NewPromptDrawer({
  suites,
  onCreate,
}: {
  suites: string[];
  onCreate: (item: PromptItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [suite, setSuite] = useState<string>(suites[0] ?? "");
  const [body, setBody] = useState("");

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-[680px] px-4">
        <DrawerHeader>
          <DrawerTitle>New prompt</DrawerTitle>
          <DrawerDescription>Create a reusable prompt for repeatable evaluations.</DrawerDescription>
        </DrawerHeader>

        <div data-usecases="UC_113" className="space-y-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="newPromptTitle">Title</Label>
            <Input
              id="newPromptTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Summarize policy document"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPromptSuite">Suite (optional)</Label>
            <Input
              id="newPromptSuite"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
              placeholder={suites[0] ?? "NLP, Math, Code"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPromptBody">Prompt</Label>
            <Textarea
              id="newPromptBody"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your prompt…"
              className="min-h-[200px]"
            />
          </div>
        </div>

        <DrawerFooter>
          <Button
            data-usecases="UC_113"
            onClick={() => {
              const item: PromptItem = {
                id: `p_${Math.random().toString(16).slice(2)}`,
                title: title.trim() || "Untitled prompt",
                suite: suite.trim() || undefined,
                body: body.trim(),
              };
              onCreate(item);
              setTitle("");
              setSuite(suites[0] ?? "");
              setBody("");
            }}
            disabled={body.trim().length === 0}
          >
            Create
          </Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
