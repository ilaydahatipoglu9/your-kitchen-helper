import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Settings2,
  Wrench,
  Clock,
  Tag,
  MessageSquare,
  Cpu,
  Thermometer,
  Hash,
} from "lucide-react";

interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
}

interface ToolExecution {
  id: string;
  name: string;
  timestamp: Date;
  duration: number;
  status: "success" | "error";
}

interface ConversationMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  tags: string[];
}

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  modelConfig?: ModelConfig;
  onModelConfigChange?: (config: ModelConfig) => void;
  toolExecutions?: ToolExecution[];
  conversationMetadata?: ConversationMetadata;
}

export function ContextPanel({
  isOpen,
  onClose,
  modelConfig = { temperature: 0.7, maxTokens: 4096, topP: 1 },
  onModelConfigChange,
  toolExecutions = [],
  conversationMetadata,
}: ContextPanelProps) {
  if (!isOpen) return null;

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-full w-[320px] bg-background border-l border-border",
        "flex flex-col z-40 animate-slide-in-right"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold">Details</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Model Configuration */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium text-sm">Model Settings</h4>
            </div>
            <div className="space-y-4">
              <ConfigSlider
                icon={<Thermometer className="h-4 w-4" />}
                label="Temperature"
                value={modelConfig.temperature}
                min={0}
                max={2}
                step={0.1}
                onChange={(value) =>
                  onModelConfigChange?.({ ...modelConfig, temperature: value })
                }
              />
              <ConfigSlider
                icon={<Hash className="h-4 w-4" />}
                label="Max Tokens"
                value={modelConfig.maxTokens}
                min={256}
                max={8192}
                step={256}
                onChange={(value) =>
                  onModelConfigChange?.({ ...modelConfig, maxTokens: value })
                }
              />
              <ConfigSlider
                icon={<Cpu className="h-4 w-4" />}
                label="Top P"
                value={modelConfig.topP}
                min={0}
                max={1}
                step={0.1}
                onChange={(value) =>
                  onModelConfigChange?.({ ...modelConfig, topP: value })
                }
              />
            </div>
          </section>

          <Separator />

          {/* Tool Executions */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium text-sm">Tool Executions</h4>
            </div>
            {toolExecutions.length > 0 ? (
              <div className="space-y-2">
                {toolExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="p-3 rounded-lg bg-muted/50 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{execution.name}</span>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          execution.status === "success"
                            ? "bg-success/20 text-success"
                            : "bg-destructive/20 text-destructive"
                        )}
                      >
                        {execution.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{execution.duration}ms</span>
                      <span>•</span>
                      <span>{formatTime(execution.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tools have been invoked yet.
              </p>
            )}
          </section>

          <Separator />

          {/* Conversation Metadata */}
          {conversationMetadata && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">Conversation Info</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages</span>
                  <span className="font-medium">
                    {conversationMetadata.messageCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {formatDate(conversationMetadata.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last updated</span>
                  <span className="font-medium">
                    {formatDate(conversationMetadata.updatedAt)}
                  </span>
                </div>
                {conversationMetadata.tags.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-2">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {conversationMetadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

interface ConfigSliderProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function ConfigSlider({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: ConfigSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{icon}</span>
          <span>{label}</span>
        </div>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
