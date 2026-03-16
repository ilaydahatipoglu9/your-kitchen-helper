import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Filter, RefreshCcw, Search } from "lucide-react";
import type { ModelConfig } from "@/components/workspace/ModelConfigPanel";

export type EvaluationStatus = "idle" | "running" | "complete" | "error";

export type EvaluationModelResult = {
  modelId: string;
  modelName: string;
  provider: string;
  status: "streaming" | "complete" | "error";
  output: string;
  latencyMs: number | null;
  tokensPerSecond: number | null;
  judgeRating: "A" | "B" | "C" | "D" | null;
};

export default function OutputComparisonGrid({
  status,
  models,
  results,
  onRetry,
}: {
  status: EvaluationStatus;
  models: ModelConfig[];
  results: EvaluationModelResult[];
  onRetry: () => void;
}) {
  const [query, setQuery] = useState("");
  const [visibleModelIds, setVisibleModelIds] = useState<string[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [syncPanes, setSyncPanes] = useState(false);

  const effectiveVisible = useMemo(() => {
    const base = visibleModelIds.length ? visibleModelIds : models.map((m) => m.id);
    const q = query.trim().toLowerCase();

    const byText = (r: EvaluationModelResult) => {
      if (!q) return true;
      return `${r.modelName} ${r.provider} ${r.output}`.toLowerCase().includes(q);
    };

    return results.filter((r) => base.includes(r.modelId) && byText(r));
  }, [models, results, query, visibleModelIds]);

  const summary = useMemo(() => {
    const total = results.length;
    const streaming = results.filter((r) => r.status === "streaming").length;
    const complete = results.filter((r) => r.status === "complete").length;
    const error = results.filter((r) => r.status === "error").length;
    return { total, streaming, complete, error };
  }, [results]);

  return (
    <Card className="border-border/70 bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">Outputs & Metrics</CardTitle>
            <div className="text-xs text-muted-foreground">
              Side-by-side streaming outputs, performance metrics, and judge ratings.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-usecases="UC_038"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={onRetry}
              disabled={status === "running"}
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Rerun
            </Button>
          </div>
        </div>

        <div className="mt-3 rounded-md border bg-background/60 p-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary" className="text-[11px]">
                Models: {summary.total || models.length}
              </Badge>
              {status === "running" ? (
                <Badge className="text-[11px]">Streaming: {summary.streaming}</Badge>
              ) : null}
              {summary.complete ? (
                <Badge variant="outline" className="text-[11px]">
                  Complete: {summary.complete}
                </Badge>
              ) : null}
              {summary.error ? (
                <Badge variant="destructive" className="text-[11px]">
                  Errors: {summary.error}
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  data-usecases="UC_036"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search within outputs…"
                  className="h-9 w-[200px] pl-8 text-sm"
                  aria-label="Search within outputs"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-usecases="UC_036" variant="secondary" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" aria-hidden="true" />
                    Filter models
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Visible models</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {models.map((m) => {
                    const checked = (visibleModelIds.length ? visibleModelIds : models.map((x) => x.id)).includes(m.id);
                    return (
                      <DropdownMenuCheckboxItem
                        key={m.id}
                        checked={checked}
                        onCheckedChange={(next) => {
                          setVisibleModelIds((prev) => {
                            const current = prev.length ? prev : models.map((x) => x.id);
                            const has = current.includes(m.id);
                            const updated = next ? [...current, m.id] : current.filter((id) => id !== m.id);
                            return updated;
                          });
                        }}
                      >
                        {m.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div data-usecases="UC_036" className="flex items-center gap-2 rounded-md border bg-background/60 px-2 py-1">
                <Switch id="autoScroll" checked={autoScroll} onCheckedChange={setAutoScroll} />
                <Label htmlFor="autoScroll" className="text-xs">
                  Auto-scroll
                </Label>
              </div>
              <div data-usecases="UC_036" className="flex items-center gap-2 rounded-md border bg-background/60 px-2 py-1">
                <Switch id="syncPanes" checked={syncPanes} onCheckedChange={setSyncPanes} />
                <Label htmlFor="syncPanes" className="text-xs">
                  Sync panes
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {status === "idle" ? (
          <EmptyState />
        ) : status === "error" ? (
          <ErrorState onRetry={onRetry} />
        ) : (
          <div
            data-usecases="UC_036,UC_037,UC_119"
            className="grid gap-3 md:grid-cols-2"
          >
            {effectiveVisible.length === 0 ? (
              <div className="col-span-full rounded-md border p-4 text-sm text-muted-foreground">
                No outputs match your current filters.
              </div>
            ) : (
              effectiveVisible.map((r) => (
                <OutputCard
                  key={r.modelId}
                  result={r}
                  autoScroll={autoScroll}
                  syncPanes={syncPanes}
                />
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border bg-background/60 p-6">
      <div className="text-sm font-medium">No evaluation running</div>
      <div className="mt-1 text-xs text-muted-foreground">
        Select models, enter a prompt, and click “Run Evaluation” to see side-by-side outputs.
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-md border border-destructive/40 bg-destructive/5 p-6">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" aria-hidden="true" />
        <div>
          <div className="text-sm font-medium text-destructive">Unable to start evaluation</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Ensure at least one model is selected and the prompt is not empty.
          </div>
          <div className="mt-4">
            <Button data-usecases="UC_038" onClick={onRetry} variant="secondary" size="sm">
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-5 w-14 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-3 h-3 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-52 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-24 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}

function OutputCard({
  result,
  autoScroll,
  syncPanes,
}: {
  result: EvaluationModelResult;
  autoScroll: boolean;
  syncPanes: boolean;
}) {
  // Note: actual scroll syncing would require refs + listeners; omitted by design.
  const rating = result.judgeRating;
  const ratingVariant = rating === "A" ? "secondary" : rating === "B" ? "outline" : rating ? "destructive" : "outline";

  return (
    <section
      className="group rounded-md border bg-card/70 p-3 shadow-sm transition-shadow hover:shadow-md"
      aria-label={`Output for ${result.modelName}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{result.modelName}</div>
          <div className="text-xs text-muted-foreground">{result.provider}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={result.status === "streaming" ? "default" : result.status === "complete" ? "secondary" : "destructive"} className="text-[10px]">
            {result.status}
          </Badge>
          {rating ? (
            <Badge variant={ratingVariant} className="text-[10px]">
              Judge: {rating}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              Judge: pending
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <Metric label="Latency" value={result.latencyMs !== null ? `${result.latencyMs} ms` : "—"} />
        <Metric
          label="Token speed"
          value={result.tokensPerSecond !== null ? `${result.tokensPerSecond} tok/s` : "—"}
        />
      </div>

      <div
        className="mt-3 max-h-[240px] overflow-auto rounded-md border bg-background/60 p-2"
        aria-live={result.status === "streaming" ? "polite" : undefined}
        aria-busy={result.status === "streaming"}
        data-usecases="UC_036"
      >
        <pre className="whitespace-pre-wrap break-words text-xs leading-5">
          {result.output || (result.status === "streaming" ? "Streaming…" : "No output")}
        </pre>
        {autoScroll ? (
          <div className="mt-2 text-[10px] text-muted-foreground">
            Auto-scroll: on {syncPanes ? "• Sync panes: on" : ""}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background/60 p-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xs font-medium">{value}</div>
    </div>
  );
}
