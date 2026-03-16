import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, RefreshCw, Database, CheckCircle2, XCircle } from "lucide-react";

const MOCK_MODELS = [
  { id: "gpt-4", name: "GPT-4 Turbo", provider: "OpenAI", status: "connected", version: "gpt-4-0125-preview" },
  { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic", status: "connected", version: "claude-3-opus-20240229" },
  { id: "llama-3", name: "Llama 3 70B", provider: "Meta", status: "error", version: "llama-3-70b-instruct" },
  { id: "gemini-1.5", name: "Gemini 1.5 Pro", provider: "Google", status: "connected", version: "gemini-1.5-pro-latest" },
];

export default function ModelRegistry() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = MOCK_MODELS.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Model Registry
            </h1>
            <p className="text-sm text-muted-foreground">Manage LLM providers, versions, and API configurations.</p>
          </div>
          <Button 
            className="gap-2"
            data-usecases="UC_001,UC_018"
          >
            <Plus className="h-4 w-4" />
            Register New Model
          </Button>
        </div>

        <Card className="border-border/50 shadow-sm" data-usecases="UC_014,UC_156">
          <CardHeader className="py-4 px-6 border-b bg-muted/20 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">Configured Endpoints</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search models..."
                className="w-full bg-background border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-usecases="UC_014"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filteredModels.map((model) => (
                <div key={model.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center border">
                      <Database className="h-5 w-5 text-secondary-foreground/70" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{model.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="px-2 py-0.5 bg-background rounded border">{model.provider}</span>
                        <span>•</span>
                        <span className="font-mono">{model.version}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      {model.status === "connected" ? (
                        <span className="flex items-center gap-1.5 text-emerald-500">
                          <CheckCircle2 className="h-4 w-4" />
                          Connected
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-destructive">
                          <XCircle className="h-4 w-4" />
                          Connection Error
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        data-usecases="UC_003"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Test
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        data-usecases="UC_003"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredModels.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No models found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
