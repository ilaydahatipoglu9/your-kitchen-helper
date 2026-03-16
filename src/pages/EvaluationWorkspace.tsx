import { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PromptInput } from "@/components/evaluation/PromptInput";
import { ModelOutputCard, ModelStatus } from "@/components/evaluation/ModelOutputCard";
import { MetricsPanel } from "@/components/evaluation/MetricsPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Cpu,
  Plus,
  History,
  BookOpen,
  Settings2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", isActive: true },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", provider: "OpenAI", isActive: true },
  { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic", isActive: true },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", isActive: true },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google", isActive: true },
  { id: "llama-3", name: "Llama 3 70B", provider: "Meta", isActive: false },
];

const mockTemplates = [
  {
    id: "1",
    name: "Code Explanation",
    content: "Explain the following code and suggest improvements:",
  },
  {
    id: "2",
    name: "Creative Writing",
    content: "Write a short story about:",
  },
  {
    id: "3",
    name: "Technical Analysis",
    content: "Analyze the following technical concept:",
  },
];

interface ModelOutput {
  modelId: string;
  status: ModelStatus;
  output: string;
  isStreaming: boolean;
  latency?: number;
  tokensPerSecond?: number;
  totalTokens?: number;
  error?: string;
}

export default function EvaluationWorkspace() {
  const [selectedModels, setSelectedModels] = useState<string[]>(["gpt-4", "claude-3"]);
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [outputs, setOutputs] = useState<Record<string, ModelOutput>>({});
  const [evaluationComplete, setEvaluationComplete] = useState(false);

  // Simulate streaming output
  const simulateStreaming = useCallback((modelId: string, fullText: string) => {
    const words = fullText.split(" ");
    let currentIndex = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(interval);
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        setOutputs((prev) => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            status: "complete",
            isStreaming: false,
            latency: totalTime,
            tokensPerSecond: (words.length / totalTime) * 1000,
            totalTokens: words.length,
          },
        }));
        return;
      }

      const wordsToAdd = Math.floor(Math.random() * 3) + 1;
      const newWords = words.slice(currentIndex, currentIndex + wordsToAdd).join(" ");
      currentIndex += wordsToAdd;

      setOutputs((prev) => ({
        ...prev,
        [modelId]: {
          ...prev[modelId],
          output: prev[modelId].output + (prev[modelId].output ? " " : "") + newWords,
        },
      }));
    }, 50 + Math.random() * 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!prompt.trim() || selectedModels.length === 0) return;

    setIsRunning(true);
    setEvaluationComplete(false);

    // Initialize outputs for all selected models
    const initialOutputs: Record<string, ModelOutput> = {};
    selectedModels.forEach((modelId) => {
      initialOutputs[modelId] = {
        modelId,
        status: "running",
        output: "",
        isStreaming: true,
      };
    });
    setOutputs(initialOutputs);

    // Simulate different responses for each model
    const responses: Record<string, string> = {
      "gpt-4": `This is a simulated response from GPT-4. The model would provide a comprehensive and detailed answer to your prompt: "${prompt.slice(0, 50)}...". GPT-4 is known for its advanced reasoning capabilities and ability to handle complex tasks with nuance and accuracy. It can understand context deeply and provide well-structured responses.`,
      "gpt-3.5": `Here's a response from GPT-3.5 Turbo. This model offers fast and efficient responses to your query about "${prompt.slice(0, 50)}...". While slightly less capable than GPT-4, it provides excellent value for many use cases and responds quickly.`,
      "claude-3": `Claude 3 Opus responding to your prompt. This model excels at thoughtful, nuanced responses. Regarding "${prompt.slice(0, 50)}...", I would approach this by considering multiple perspectives and providing a balanced analysis. Claude models are designed to be helpful, harmless, and honest.`,
      "claude-3-sonnet": `Claude 3 Sonnet here with a response. This model balances capability and speed effectively. For your query "${prompt.slice(0, 50)}...", I can provide a clear and concise answer while maintaining quality and accuracy.`,
      "gemini-pro": `Gemini Pro's response to your prompt. Google's model brings strong multimodal capabilities and reasoning. Addressing "${prompt.slice(0, 50)}...", I can leverage my training to provide informative and accurate responses.`,
    };

    // Start streaming for each model with slight delays
    selectedModels.forEach((modelId, index) => {
      setTimeout(() => {
        const response = responses[modelId] || `Response from ${modelId} for prompt: ${prompt}`;
        simulateStreaming(modelId, response);
      }, index * 200);
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    // Mark all running outputs as complete
    setOutputs((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key].status === "running") {
          updated[key] = {
            ...updated[key],
            status: "complete",
            isStreaming: false,
          };
        }
      });
      return updated;
    });
  };

  // Check if all outputs are complete
  useEffect(() => {
    if (Object.keys(outputs).length > 0) {
      const allComplete = Object.values(outputs).every(
        (o) => o.status === "complete" || o.status === "error"
      );
      if (allComplete && isRunning) {
        setIsRunning(false);
        setEvaluationComplete(true);
      }
    }
  }, [outputs, isRunning]);

  // Prepare metrics data
  const metricsData = Object.values(outputs)
    .filter((o) => o.status === "complete")
    .map((o) => ({
      modelName: mockModels.find((m) => m.id === o.modelId)?.name || o.modelId,
      latency: o.latency || 0,
      tokensPerSecond: o.tokensPerSecond || 0,
      totalTokens: o.totalTokens || 0,
    }));

  // Mock judge ratings
  const judgeRatings = evaluationComplete
    ? metricsData.map((m) => ({
        modelName: m.modelName,
        score: 6 + Math.random() * 4,
        reasoning: "Response demonstrates good understanding and clarity.",
      }))
    : undefined;

  // Sidebar content
  const sidebarContent = (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Quick Actions
        </h4>
        <div className="space-y-1">
          <Link to="/models">
            <Button variant="ghost" size="sm" className="w-full justify-start" data-usecases="UC_001">
              <Plus className="h-4 w-4 mr-2" />
              Add Model
            </Button>
          </Link>
          <Link to="/prompts">
            <Button variant="ghost" size="sm" className="w-full justify-start" data-usecases="UC_113">
              <BookOpen className="h-4 w-4 mr-2" />
              Prompt Library
            </Button>
          </Link>
          <Link to="/history">
            <Button variant="ghost" size="sm" className="w-full justify-start" data-usecases="UC_044">
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Models */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Available Models
        </h4>
        <div className="space-y-1">
          {mockModels.filter((m) => m.isActive).map((model) => (
            <div
              key={model.id}
              className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm">{model.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {model.provider}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Prompts */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Recent Prompts
        </h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="px-2 py-1 truncate hover:bg-muted/50 rounded cursor-pointer">
            Explain quantum computing...
          </p>
          <p className="px-2 py-1 truncate hover:bg-muted/50 rounded cursor-pointer">
            Write a Python function...
          </p>
          <p className="px-2 py-1 truncate hover:bg-muted/50 rounded cursor-pointer">
            Compare REST vs GraphQL...
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout showSidebar sidebarContent={sidebarContent}>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Prompt Input Area */}
        <PromptInput
          models={mockModels}
          selectedModels={selectedModels}
          onModelSelect={setSelectedModels}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
          onStop={handleStop}
          isRunning={isRunning}
          templates={mockTemplates}
          onTemplateSelect={(template) => setPrompt(template.content)}
        />

        {/* Model Output Comparison Grid */}
        <div className="flex-1 overflow-auto p-4">
          {selectedModels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Cpu className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Models Selected</h3>
              <p className="text-muted-foreground text-sm max-w-md mb-4">
                Select up to 4 LLM models to compare their responses side-by-side.
                Click "Add Model" above to get started.
              </p>
              <Link to="/models">
                <Button data-usecases="UC_001">
                  <Plus className="h-4 w-4 mr-2" />
                  Configure Models
                </Button>
              </Link>
            </div>
          ) : Object.keys(outputs).length === 0 && !isRunning ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Evaluate</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Enter a prompt above and click "Run Evaluation" to compare responses
                from {selectedModels.length} selected model{selectedModels.length > 1 ? "s" : ""}.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 h-full ${
                selectedModels.length === 1
                  ? "grid-cols-1"
                  : selectedModels.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : selectedModels.length === 3
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {selectedModels.map((modelId) => {
                const model = mockModels.find((m) => m.id === modelId);
                const output = outputs[modelId];
                return (
                  <ModelOutputCard
                    key={modelId}
                    modelName={model?.name || modelId}
                    modelProvider={model?.provider}
                    status={output?.status || "idle"}
                    output={output?.output || ""}
                    isStreaming={output?.isStreaming}
                    latency={output?.latency}
                    tokensPerSecond={output?.tokensPerSecond}
                    totalTokens={output?.totalTokens}
                    error={output?.error}
                    onRetry={() => {
                      // Retry logic would go here
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Metrics Panel */}
        {metricsData.length > 0 && (
          <MetricsPanel
            metrics={metricsData}
            isEvaluationComplete={evaluationComplete}
            judgeRatings={judgeRatings}
          />
        )}
      </div>
    </MainLayout>
  );
}
