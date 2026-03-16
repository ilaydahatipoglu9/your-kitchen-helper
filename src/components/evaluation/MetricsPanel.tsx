import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Zap,
  BarChart3,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModelMetrics {
  modelName: string;
  latency: number;
  tokensPerSecond: number;
  totalTokens: number;
  timeToFirstToken?: number;
  qualityScore?: number;
}

interface MetricsPanelProps {
  metrics: ModelMetrics[];
  isEvaluationComplete?: boolean;
  judgeRatings?: {
    modelName: string;
    score: number;
    reasoning?: string;
  }[];
}

export function MetricsPanel({
  metrics,
  isEvaluationComplete = false,
  judgeRatings,
}: MetricsPanelProps) {
  const [expanded, setExpanded] = useState(true);

  // Calculate best performers
  const bestLatency = metrics.length > 0 
    ? metrics.reduce((a, b) => (a.latency < b.latency ? a : b))
    : null;
  const bestThroughput = metrics.length > 0
    ? metrics.reduce((a, b) => (a.tokensPerSecond > b.tokensPerSecond ? a : b))
    : null;

  // Normalize values for progress bars
  const maxLatency = Math.max(...metrics.map((m) => m.latency), 1);
  const maxThroughput = Math.max(...metrics.map((m) => m.tokensPerSecond), 1);

  return (
    <div
      className={cn(
        "border-t border-border bg-card transition-all duration-300",
        expanded ? "max-h-[400px]" : "max-h-12"
      )}
      data-usecases="UC_037"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Performance Metrics</span>
          {isEvaluationComplete && (
            <Badge variant="secondary" className="text-xs">
              Evaluation Complete
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Latency Comparison */}
          <Card className="border-border">
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-[hsl(var(--chart-1))]" />
                Latency (ms)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-3">
              {metrics.map((m) => (
                <div key={m.modelName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="truncate max-w-[120px]">{m.modelName}</span>
                    <span className="font-mono flex items-center gap-1">
                      {m.latency.toFixed(0)}ms
                      {bestLatency?.modelName === m.modelName && (
                        <TrendingUp className="h-3 w-3 text-[hsl(var(--status-complete))]" />
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(m.latency / maxLatency) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
              {metrics.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  No data yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Throughput Comparison */}
          <Card className="border-border">
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-[hsl(var(--chart-2))]" />
                Throughput (tok/s)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-3">
              {metrics.map((m) => (
                <div key={m.modelName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="truncate max-w-[120px]">{m.modelName}</span>
                    <span className="font-mono flex items-center gap-1">
                      {m.tokensPerSecond.toFixed(1)}
                      {bestThroughput?.modelName === m.modelName && (
                        <TrendingUp className="h-3 w-3 text-[hsl(var(--status-complete))]" />
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(m.tokensPerSecond / maxThroughput) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
              {metrics.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  No data yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Judge Ratings */}
          <Card className="border-border" data-usecases="UC_075,UC_076">
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-[hsl(var(--chart-4))]" />
                Judge Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-3">
              {judgeRatings && judgeRatings.length > 0 ? (
                judgeRatings.map((rating) => (
                  <div key={rating.modelName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate max-w-[120px]">
                        {rating.modelName}
                      </span>
                      <span className="font-mono font-semibold">
                        {rating.score.toFixed(1)}/10
                      </span>
                    </div>
                    <Progress value={rating.score * 10} className="h-1.5" />
                    {rating.reasoning && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {rating.reasoning}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  {isEvaluationComplete
                    ? "Judge evaluation pending..."
                    : "Complete evaluation to see ratings"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
