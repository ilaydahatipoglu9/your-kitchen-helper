import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Play,
  Square,
  FileText,
  Settings2,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  provider: string;
  isActive: boolean;
}

interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}

interface PromptInputProps {
  models: Model[];
  selectedModels: string[];
  onModelSelect: (modelIds: string[]) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isRunning?: boolean;
  templates?: PromptTemplate[];
  onTemplateSelect?: (template: PromptTemplate) => void;
}

export function PromptInput({
  models,
  selectedModels,
  onModelSelect,
  prompt,
  onPromptChange,
  onSubmit,
  onStop,
  isRunning = false,
  templates = [],
  onTemplateSelect,
}: PromptInputProps) {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleModelToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      onModelSelect(selectedModels.filter((id) => id !== modelId));
    } else if (selectedModels.length < 4) {
      onModelSelect([...selectedModels, modelId]);
    }
  };

  const handleRemoveModel = (modelId: string) => {
    onModelSelect(selectedModels.filter((id) => id !== modelId));
  };

  const activeModels = models.filter((m) => m.isActive);

  return (
    <div
      className="border-b border-border bg-card p-4 space-y-4"
      data-usecases="UC_035"
    >
      {/* Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Select Models (max 4)</label>
          <span className="text-xs text-muted-foreground">
            {selectedModels.length}/4 selected
          </span>
        </div>

        {/* Selected Models Chips */}
        <div className="flex flex-wrap gap-2">
          {selectedModels.map((modelId) => {
            const model = models.find((m) => m.id === modelId);
            if (!model) return null;
            return (
              <Badge
                key={modelId}
                variant="secondary"
                className="pl-2 pr-1 py-1 flex items-center gap-1"
              >
                <span className="text-xs">{model.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 hover:bg-destructive/20"
                  onClick={() => handleRemoveModel(modelId)}
                  disabled={isRunning}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}

          {/* Add Model Dropdown */}
          {selectedModels.length < 4 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  disabled={isRunning}
                  data-usecases="UC_015"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Model
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="start">
                <div className="space-y-1">
                  {activeModels
                    .filter((m) => !selectedModels.includes(m.id))
                    .map((model) => (
                      <button
                        key={model.id}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
                        onClick={() => handleModelToggle(model.id)}
                      >
                        <span>{model.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.provider}
                        </span>
                      </button>
                    ))}
                  {activeModels.filter((m) => !selectedModels.includes(m.id))
                    .length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No more models available
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Prompt Input Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Prompt</label>
          <div className="flex items-center gap-2">
            {templates.length > 0 && (
              <Popover open={showTemplates} onOpenChange={setShowTemplates}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    disabled={isRunning}
                    data-usecases="UC_114"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Templates
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-2" align="end">
                  <div className="space-y-1">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
                        onClick={() => {
                          onTemplateSelect?.(template);
                          setShowTemplates(false);
                        }}
                      >
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {template.content}
                        </p>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="relative">
          <Textarea
            placeholder="Enter your prompt here... (e.g., 'Explain quantum computing in simple terms')"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isRunning}
            className="min-h-[120px] pr-24 resize-none border-2 focus:border-primary"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {isRunning ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={onStop}
                className="h-8"
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={onSubmit}
                disabled={!prompt.trim() || selectedModels.length === 0}
                className="h-8 bg-primary hover:bg-primary/90"
                data-usecases="UC_022"
              >
                <Play className="h-4 w-4 mr-1" />
                Run Evaluation
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Press Ctrl+Enter to submit • {prompt.length} characters
        </p>
      </div>
    </div>
  );
}
