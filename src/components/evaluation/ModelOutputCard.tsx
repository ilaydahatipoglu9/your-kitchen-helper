import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  Check,
  MoreVertical,
  RefreshCw,
  Maximize2,
  Clock,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ModelStatus = "idle" | "running" | "complete" | "error";

interface ModelOutputCardProps {
  modelName: string;
  modelProvider?: string;
  status: ModelStatus;
  output: string;
  isStreaming?: boolean;
  latency?: number;
  tokensPerSecond?: number;
  totalTokens?: number;
  error?: string;
  onRetry?: () => void;
  onExpand?: () => void;
}

const statusConfig: Record<ModelStatus, { label: string; className: string }> = {
  idle: { label: "Ready", className: "bg-muted text-muted-foreground" },
  running: { label: "Running", className: "status-badge-running" },
  complete: { label: "Complete", className: "status-badge-complete" },
  error: { label: "Error", className: "status-badge-error" },
};

export function ModelOutputCard({
  modelName,
  modelProvider,
  status,
  output,
  isStreaming = false,
  latency,
  tokensPerSecond,
  totalTokens,
  error,
  onRetry,
  onExpand,
}: ModelOutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusInfo = statusConfig[status];

  return (
    <Card
      className={cn(
        "maritime-card flex flex-col h-full transition-all duration-200",
        status === "running" && "ring-2 ring-[hsl(var(--status-running))]/30"
      )}
      data-usecases="UC_036"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 pt-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-semibold text-sm">{modelName}</h3>
            {modelProvider && (
              <p className="text-xs text-muted-foreground">{modelProvider}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", statusInfo.className)}>
            {status === "running" && (
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            )}
            {statusInfo.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Output
              </DropdownMenuItem>
              {onExpand && (
                <DropdownMenuItem onClick={onExpand}>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Expand View
                </DropdownMenuItem>
              )}
              {onRetry && status === "error" && (
                <DropdownMenuItem onClick={onRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-4 pb-4">
        {/* Output Area */}
        <ScrollArea className="flex-1 rounded-md border border-border bg-muted/30 p-3 min-h-[200px]">
          {status === "idle" && !output && (
            <p className="text-muted-foreground text-sm italic">
              Waiting for prompt submission...
            </p>
          )}
          {status === "running" && !output && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating response...
            </div>
          )}
          {status === "error" && error && (
            <div className="text-destructive text-sm">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
          {output && (
            <div
              className={cn(
                "text-sm whitespace-pre-wrap leading-relaxed",
                isStreaming && "streaming-cursor"
              )}
            >
              {output}
            </div>
          )}
        </ScrollArea>

        {/* Metrics Bar */}
        {(latency !== undefined || tokensPerSecond !== undefined || totalTokens !== undefined) && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            {latency !== undefined && (
              <div className="flex items-center gap-1.5" data-usecases="UC_031">
                <Clock className="h-3.5 w-3.5" />
                <span>{latency.toFixed(0)}ms latency</span>
              </div>
            )}
            {tokensPerSecond !== undefined && (
              <div className="flex items-center gap-1.5" data-usecases="UC_032">
                <Zap className="h-3.5 w-3.5" />
                <span>{tokensPerSecond.toFixed(1)} tok/s</span>
              </div>
            )}
            {totalTokens !== undefined && (
              <div className="flex items-center gap-1.5">
                <span>{totalTokens} tokens</span>
              </div>
            )}
          </div>
        )}

        {/* Copy Button */}
        {output && status === "complete" && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 self-end"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
