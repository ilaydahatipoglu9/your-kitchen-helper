import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, Save, RotateCcw } from "lucide-react";

interface ModelConfig {
  name: string;
  provider: string;
  baseUrl: string;
  apiKey: string;
  version: string;
  isActive: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
}

interface ModelConfigDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialConfig?: Partial<ModelConfig>;
  onSave: (config: ModelConfig) => void;
}

const providers = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google" },
  { value: "mistral", label: "Mistral" },
  { value: "meta", label: "Meta" },
  { value: "custom", label: "Custom" },
];

const defaultConfig: ModelConfig = {
  name: "",
  provider: "",
  baseUrl: "",
  apiKey: "",
  version: "",
  isActive: true,
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1.0,
};

export function ModelConfigDrawer({
  open,
  onOpenChange,
  mode,
  initialConfig,
  onSave,
}: ModelConfigDrawerProps) {
  const [config, setConfig] = useState<ModelConfig>({
    ...defaultConfig,
    ...initialConfig,
  });
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  const handleReset = () => {
    setConfig({ ...defaultConfig, ...initialConfig });
  };

  const updateConfig = (updates: Partial<ModelConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Add LLM Model" : "Edit Model Configuration"}
          </SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Configure a new LLM model for evaluation"
              : "Update the model configuration and parameters"}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="space-y-6 py-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Basic Information
              </h4>

              <div className="space-y-2">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., GPT-4 Turbo"
                  value={config.name}
                  onChange={(e) => updateConfig({ name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  value={config.provider}
                  onValueChange={(value) => updateConfig({ provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.value} value={provider.value}>
                        {provider.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseUrl">Base URL</Label>
                <Input
                  id="baseUrl"
                  placeholder="https://api.openai.com/v1"
                  value={config.baseUrl}
                  onChange={(e) => updateConfig({ baseUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Model Version / ID</Label>
                <Input
                  id="version"
                  placeholder="e.g., gpt-4-turbo-preview"
                  value={config.version}
                  onChange={(e) => updateConfig({ version: e.target.value })}
                />
              </div>
            </div>

            {/* API Key */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Authentication
              </h4>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    placeholder={
                      mode === "edit"
                        ? "Leave blank to keep existing key"
                        : "Enter API key"
                    }
                    value={config.apiKey}
                    onChange={(e) => updateConfig({ apiKey: e.target.value })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  API keys are encrypted and stored securely
                </p>
              </div>
            </div>

            {/* Model Parameters */}
            <div className="space-y-4" data-usecases="UC_109">
              <h4 className="text-sm font-medium text-muted-foreground">
                Model Parameters
              </h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.temperature.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.temperature]}
                    onValueChange={([value]) =>
                      updateConfig({ temperature: value })
                    }
                    min={0}
                    max={2}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls randomness. Lower = more focused, higher = more creative
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Tokens</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.maxTokens}
                    </span>
                  </div>
                  <Slider
                    value={[config.maxTokens]}
                    onValueChange={([value]) =>
                      updateConfig({ maxTokens: value })
                    }
                    min={1}
                    max={8192}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of tokens in the response
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Top P</Label>
                    <span className="text-sm text-muted-foreground">
                      {config.topP.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.topP]}
                    onValueChange={([value]) => updateConfig({ topP: value })}
                    min={0}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Nucleus sampling threshold
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Status
              </h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable this model for evaluations
                  </p>
                </div>
                <Switch
                  checked={config.isActive}
                  onCheckedChange={(checked) =>
                    updateConfig({ isActive: checked })
                  }
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {mode === "add" ? "Add Model" : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
