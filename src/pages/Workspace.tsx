import React, { useEffect, useMemo, useRef, useState } from "react";
import WorkspaceTopBar from "@/components/workspace/WorkspaceTopBar";
import ModelConfigPanel, { type ModelConfig, type ModelProfile } from "@/components/workspace/ModelConfigPanel";
import PromptPanel, { type PromptItem } from "@/components/workspace/PromptPanel";
import OutputComparisonGrid, {
  type EvaluationModelResult,
  type EvaluationStatus,
} from "@/components/workspace/OutputComparisonGrid";

const seedModels: ModelConfig[] = [
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 mini",
    provider: "OpenAI",
    version: "2025-01",
    status: "online",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    version: "2024-10",
    status: "online",
  },
  {
    id: "llama-3.1-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    version: "instruct",
    status: "degraded",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    version: "latest",
    status: "online",
  },
];

const seedPrompts: PromptItem[] = [
  {
    id: "p1",
    title: "JSON extraction",
    body: "Extract the entities from the text and return strict JSON with keys: people, orgs, places.",
    suite: "NLP",
  },
  {
    id: "p2",
    title: "Reasoning (step-free)",
    body: "Solve the problem and provide only the final answer (no steps). Problem: 17*23.",
    suite: "Math",
  },
  {
    id: "p3",
    title: "Code review",
    body: "Review this function for bugs and edge cases. Provide a short list of issues and fixes.",
    suite: "Code",
  },
];

function nowMs() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

export default function Workspace() {
  const [systemStatus, setSystemStatus] = useState<"healthy" | "degraded" | "down">("healthy");
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([seedModels[0].id, seedModels[1].id]);

  const [params, setParams] = useState({
    temperature: 0.3,
    topP: 0.9,
    maxTokens: 512,
  });

  const [profiles, setProfiles] = useState<ModelProfile[]>([
    {
      id: "profile_default",
      name: "Balanced",
      params: { temperature: 0.3, topP: 0.9, maxTokens: 512 },
    },
    {
      id: "profile_creative",
      name: "Creative",
      params: { temperature: 0.9, topP: 0.95, maxTokens: 768 },
    },
  ]);

  const [promptLibrary, setPromptLibrary] = useState<PromptItem[]>(seedPrompts);
  const [activePromptId, setActivePromptId] = useState<string>(seedPrompts[0].id);
  const activePrompt = useMemo(
    () => promptLibrary.find((p) => p.id === activePromptId) ?? promptLibrary[0],
    [activePromptId, promptLibrary]
  );

  const [draftPrompt, setDraftPrompt] = useState<string>(activePrompt?.body ?? "");
  useEffect(() => {
    setDraftPrompt(activePrompt?.body ?? "");
  }, [activePromptId, activePrompt?.body]);

  const [evaluationStatus, setEvaluationStatus] = useState<EvaluationStatus>("idle");
  const [results, setResults] = useState<EvaluationModelResult[]>([]);
  const timersRef = useRef<number[]>([]);

  const selectedModels = useMemo(
    () => seedModels.filter((m) => selectedModelIds.includes(m.id)),
    [selectedModelIds]
  );

  function clearTimers() {
    timersRef.current.forEach((t) => window.clearInterval(t));
    timersRef.current = [];
  }

  useEffect(() => () => clearTimers(), []);

  const handleToggleModel = React.useCallback((id: string) => {
    setSelectedModelIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const handleSaveProfile = React.useCallback((profile: ModelProfile) => {
    setProfiles((prev) => [profile, ...prev]);
  }, []);

  const handleLoadProfile = React.useCallback(
    (profileId: string) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (profile) setParams(profile.params);
    },
    [profiles]
  );

  const handleCreatePrompt = React.useCallback((item: PromptItem) => {
    setPromptLibrary((prev) => [item, ...prev]);
    setActivePromptId(item.id);
  }, []);

  const handleUpdateActivePrompt = React.useCallback(
    (nextBody: string) => {
      setPromptLibrary((prev) => prev.map((p) => (p.id === activePromptId ? { ...p, body: nextBody } : p)));
    },
    [activePromptId]
  );

  const handleParamsChange = React.useCallback((next: { temperature: number; topP: number; maxTokens: number }) => {
    setParams(next);
  }, []);

  const handleChangeActivePromptId = React.useCallback((id: string) => {
    setActivePromptId(id);
  }, []);

  const handleChangePromptDraft = React.useCallback((value: string) => {
    setDraftPrompt(value);
  }, []);

  const handleRun = React.useCallback(() => {
    clearTimers();

    const models = selectedModels;
    const prompt = draftPrompt.trim();

    if (!models.length || !prompt) {
      setEvaluationStatus("error");
      setResults([]);
      return;
    }

    setEvaluationStatus("running");

    const start = nowMs();
    const base: EvaluationModelResult[] = models.map((m) => ({
      modelId: m.id,
      modelName: m.name,
      provider: m.provider,
      status: "streaming",
      output: "",
      latencyMs: null,
      tokensPerSecond: null,
      judgeRating: null,
    }));
    setResults(base);

    // Demo streaming: reveal a canned response with slight variation per model
    models.forEach((m, idx) => {
      const sample =
        `Model: ${m.name}\n\n` +
        `Prompt (truncated): ${prompt.slice(0, 160)}${prompt.length > 160 ? "…" : ""}\n\n` +
        `Response:\n` +
        [
          "Here is a concise, structured answer.",
          "Key points first, followed by a short justification.",
          "Output formatted for comparison across models.",
          "No secrets or API keys are ever displayed.",
        ].join(" ") +
        `\n\nNotes: temperature=${params.temperature}, top_p=${params.topP}, max_tokens=${params.maxTokens}.\n`;

      const tokens = sample.split(/(\s+)/);
      let i = 0;
      let firstTokenAt: number | null = null;

      const interval = window.setInterval(() => {
        i += 1;
        if (i > tokens.length) {
          window.clearInterval(interval);
          setResults((prev) =>
            prev.map((r) =>
              r.modelId === m.id
                ? {
                  ...r,
                  status: "complete",
                  judgeRating: r.judgeRating ?? (idx % 3 === 0 ? "A" : idx % 3 === 1 ? "B" : "C"),
                }
                : r
            )
          );
          return;
        }

        if (firstTokenAt === null) firstTokenAt = nowMs();

        setResults((prev) =>
          prev.map((r) => {
            if (r.modelId !== m.id) return r;
            const nextOutput = r.output + tokens[i - 1];
            const tokenCount = Math.max(1, nextOutput.trim().split(/\s+/).length);
            const latencyMs = r.latencyMs ?? Math.max(1, Math.round((firstTokenAt ?? start) - start));
            const elapsedSec = Math.max(0.25, (nowMs() - start) / 1000);
            const tps = Math.round((tokenCount / elapsedSec) * 10) / 10;
            return {
              ...r,
              output: nextOutput,
              latencyMs,
              tokensPerSecond: tps,
            };
          })
        );
      }, 30 + idx * 10);

      timersRef.current.push(interval);
    });

    // Simulate system health shifting if any model degraded
    const hasDegraded = models.some((m) => m.status !== "online");
    setSystemStatus(hasDegraded ? "degraded" : "healthy");
  }, [selectedModels, draftPrompt, params]);

  useEffect(() => {
    if (
      evaluationStatus === "running" &&
      results.length > 0 &&
      results.every((r) => r.status !== "streaming")
    ) {
      setEvaluationStatus("complete");
    }
  }, [evaluationStatus, results]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WorkspaceTopBar systemStatus={systemStatus} />

      <main className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-6">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <section className="lg:sticky lg:top-20 lg:self-start">
            <ModelConfigPanel
              models={seedModels}
              selectedModelIds={selectedModelIds}
              onToggleModel={handleToggleModel}
              params={params}
              onParamsChange={handleParamsChange}
              profiles={profiles}
              onSaveProfile={handleSaveProfile}
              onLoadProfile={handleLoadProfile}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_520px]">
            <div className="order-2 lg:order-1">
              <PromptPanel
                promptLibrary={promptLibrary}
                activePromptId={activePromptId}
                onChangeActivePrompt={handleChangeActivePromptId}
                promptDraft={draftPrompt}
                onChangePromptDraft={handleChangePromptDraft}
                onCreatePrompt={handleCreatePrompt}
                onUpdateActivePrompt={handleUpdateActivePrompt}
                selectedModels={selectedModels}
                evaluationStatus={evaluationStatus}
                onRun={handleRun}
              />
            </div>

            <div className="order-1 lg:order-2">
              <OutputComparisonGrid
                status={evaluationStatus}
                models={selectedModels}
                results={results}
                onRetry={handleRun}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
