import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, List, Settings, Clock, Zap, Activity } from "lucide-react";

const MOCK_MODELS = [
  { id: "gpt-4", name: "GPT-4 Turbo", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "llama-3", name: "Llama 3 70B", provider: "Meta" },
];

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>(["gpt-4", "claude-3"]);

  const handleRun = () => {
    if (!prompt) return;
    setIsStreaming(true);
    // Simulate streaming completion
    setTimeout(() => setIsStreaming(false), 3000);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        {/* Command Bar */}
        <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Parallel Evaluation Workbench</h1>
            <p className="text-sm text-muted-foreground">Session: Untitled-Eval-001</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              data-usecases="UC_108,UC_109"
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Select Models
            </Button>
            <Button 
              variant="outline" 
              data-usecases="UC_109"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Parameters
            </Button>
          </div>
        </div>

        {/* Prompt Editor */}
        <Card className="border-primary/20 shadow-md" data-usecases="UC_035,UC_116">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {selectedModels.map(modelId => {
                const model = MOCK_MODELS.find(m => m.id === modelId);
                return (
                  <div key={modelId} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium flex items-center gap-2 border">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {model?.name}
                  </div>
                );
              })}
            </div>
            <textarea
              className="w-full min-h-[120px] bg-background border rounded-md p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              placeholder="Enter your prompt here to evaluate across selected models..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleRun} 
                disabled={isStreaming || !prompt}
                className="gap-2 w-32"
                data-usecases="UC_116"
              >
                {isStreaming ? (
                  <Activity className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isStreaming ? "Running..." : "Run Eval"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-auto pb-6"
          data-usecases="UC_036,UC_119"
        >
          {selectedModels.map(modelId => {
            const model = MOCK_MODELS.find(m => m.id === modelId);
            return (
              <Card key={modelId} className="flex flex-col h-[400px] border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="py-3 px-4 border-b bg-muted/30 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    {model?.name}
                    <span className="text-xs text-muted-foreground font-normal px-2 py-0.5 bg-background rounded border">
                      {model?.provider}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1" title="Time To First Token">
                      <Clock className="h-3 w-3" />
                      {isStreaming ? "--" : "0.42s"}
                    </div>
                    <div className="flex items-center gap-1" title="Tokens Per Second">
                      <Zap className="h-3 w-3" />
                      {isStreaming ? "--" : "84 t/s"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 overflow-auto font-mono text-sm leading-relaxed">
                  {isStreaming ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      Generating response...
                    </div>
                  ) : prompt ? (
                    <div className="text-foreground/90">
                      This is a simulated response from {model?.name} based on the prompt: "{prompt}". 
                      In a real environment, this area would stream tokens via WebSockets, updating in real-time.
                      The Maritime Serenity theme provides a calm backdrop for this high-density data.
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground italic">
                      Waiting for prompt...
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
