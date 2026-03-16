import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  Clock,
  Cpu,
  FileText,
  Download,
  Eye,
  Trash2,
  BarChart3,
  Award,
  Zap,
  Filter,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationResult {
  id: string;
  prompt: string;
  models: string[];
  timestamp: string;
  duration: number;
  status: "completed" | "failed" | "partial";
  metrics: {
    modelName: string;
    latency: number;
    tokensPerSecond: number;
    totalTokens: number;
    judgeScore?: number;
  }[];
  outputs?: {
    modelName: string;
    output: string;
  }[];
}

const mockHistory: EvaluationResult[] = [
  {
    id: "1",
    prompt: "Explain quantum computing in simple terms that a high school student could understand.",
    models: ["GPT-4", "Claude 3 Opus", "Gemini Pro"],
    timestamp: "2024-01-15T14:30:00Z",
    duration: 8500,
    status: "completed",
    metrics: [
      { modelName: "GPT-4", latency: 2100, tokensPerSecond: 45.2, totalTokens: 312, judgeScore: 8.5 },
      { modelName: "Claude 3 Opus", latency: 2400, tokensPerSecond: 38.7, totalTokens: 287, judgeScore: 9.1 },
      { modelName: "Gemini Pro", latency: 1800, tokensPerSecond: 52.3, totalTokens: 245, judgeScore: 7.8 },
    ],
    outputs: [
      { modelName: "GPT-4", output: "Quantum computing is like having a super-powered calculator that can explore many possibilities at once..." },
      { modelName: "Claude 3 Opus", output: "Imagine you're trying to find your way through a maze. A regular computer would try one path at a time..." },
      { modelName: "Gemini Pro", output: "Think of quantum computing as a new way of processing information that uses the strange rules of quantum physics..." },
    ],
  },
  {
    id: "2",
    prompt: "Write a Python function to find the longest palindromic substring in a given string.",
    models: ["GPT-4", "GPT-3.5 Turbo"],
    timestamp: "2024-01-15T12:15:00Z",
    duration: 5200,
    status: "completed",
    metrics: [
      { modelName: "GPT-4", latency: 2800, tokensPerSecond: 42.1, totalTokens: 456, judgeScore: 9.2 },
      { modelName: "GPT-3.5 Turbo", latency: 1500, tokensPerSecond: 68.4, totalTokens: 389, judgeScore: 7.5 },
    ],
  },
  {
    id: "3",
    prompt: "Compare and contrast REST and GraphQL APIs. When should you use each?",
    models: ["Claude 3 Opus", "Claude 3 Sonnet"],
    timestamp: "2024-01-14T16:45:00Z",
    duration: 6800,
    status: "completed",
    metrics: [
      { modelName: "Claude 3 Opus", latency: 3200, tokensPerSecond: 35.8, totalTokens: 521, judgeScore: 8.9 },
      { modelName: "Claude 3 Sonnet", latency: 2100, tokensPerSecond: 48.2, totalTokens: 412, judgeScore: 8.2 },
    ],
  },
  {
    id: "4",
    prompt: "Explain the concept of machine learning bias and how to mitigate it.",
    models: ["GPT-4", "Claude 3 Opus", "Gemini Pro", "GPT-3.5 Turbo"],
    timestamp: "2024-01-14T10:20:00Z",
    duration: 12400,
    status: "partial",
    metrics: [
      { modelName: "GPT-4", latency: 2500, tokensPerSecond: 44.6, totalTokens: 398, judgeScore: 8.7 },
      { modelName: "Claude 3 Opus", latency: 2900, tokensPerSecond: 36.2, totalTokens: 445, judgeScore: 9.0 },
      { modelName: "Gemini Pro", latency: 0, tokensPerSecond: 0, totalTokens: 0 },
      { modelName: "GPT-3.5 Turbo", latency: 1400, tokensPerSecond: 72.1, totalTokens: 356, judgeScore: 7.2 },
    ],
  },
  {
    id: "5",
    prompt: "Create a marketing tagline for an eco-friendly water bottle company.",
    models: ["GPT-4", "Claude 3 Sonnet"],
    timestamp: "2024-01-13T09:00:00Z",
    duration: 3200,
    status: "completed",
    metrics: [
      { modelName: "GPT-4", latency: 1200, tokensPerSecond: 55.3, totalTokens: 89, judgeScore: 8.1 },
      { modelName: "Claude 3 Sonnet", latency: 980, tokensPerSecond: 62.4, totalTokens: 76, judgeScore: 8.4 },
    ],
  },
];

export default function HistoryPage() {
  const [history] = useState<EvaluationResult[]>(mockHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationResult | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModel = modelFilter === "all" || item.models.includes(modelFilter);
    // Date filtering would be implemented here
    return matchesSearch && matchesModel;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getStatusBadge = (status: EvaluationResult["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="status-badge-complete">Completed</Badge>;
      case "failed":
        return <Badge className="status-badge-error">Failed</Badge>;
      case "partial":
        return <Badge className="status-badge-warning">Partial</Badge>;
    }
  };

  const handleViewDetails = (evaluation: EvaluationResult) => {
    setSelectedEvaluation(evaluation);
    setIsDetailOpen(true);
  };

  const allModels = Array.from(new Set(history.flatMap((h) => h.models)));

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Evaluation History</h1>
            <p className="text-muted-foreground">
              Browse and analyze past evaluation runs
            </p>
          </div>
          <Button variant="outline" data-usecases="UC_045">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{history.length}</p>
                  <p className="text-sm text-muted-foreground">Total Evaluations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--status-complete))]/10 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-[hsl(var(--status-complete))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allModels.length}</p>
                  <p className="text-sm text-muted-foreground">Models Tested</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--chart-2))]/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-[hsl(var(--chart-2))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {(
                      history.reduce(
                        (acc, h) =>
                          acc +
                          h.metrics.reduce((a, m) => a + m.tokensPerSecond, 0) /
                            h.metrics.length,
                        0
                      ) / history.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Tokens/sec</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--chart-4))]/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-[hsl(var(--chart-4))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {(
                      history.reduce(
                        (acc, h) =>
                          acc +
                          h.metrics.filter((m) => m.judgeScore).reduce((a, m) => a + (m.judgeScore || 0), 0) /
                            h.metrics.filter((m) => m.judgeScore).length,
                        0
                      ) / history.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Judge Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-usecases="UC_146"
            />
          </div>
          <Select value={modelFilter} onValueChange={setModelFilter}>
            <SelectTrigger className="w-[180px]" data-usecases="UC_146">
              <SelectValue placeholder="Filter by model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {allModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]" data-usecases="UC_146">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* History Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Prompt</TableHead>
                <TableHead>Models</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No evaluations found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "Try adjusting your search query"
                          : "Run your first evaluation to see results here"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((evaluation) => (
                  <TableRow
                    key={evaluation.id}
                    className="cursor-pointer"
                    onClick={() => handleViewDetails(evaluation)}
                  >
                    <TableCell>
                      <p className="line-clamp-2 text-sm">{evaluation.prompt}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {evaluation.models.slice(0, 2).map((model) => (
                          <Badge key={model} variant="outline" className="text-xs">
                            {model}
                          </Badge>
                        ))}
                        {evaluation.models.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{evaluation.models.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(evaluation.timestamp)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDuration(evaluation.duration)}
                    </TableCell>
                    <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(evaluation);
                        }}
                        data-usecases="UC_044"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Evaluation Details</DialogTitle>
              <DialogDescription>
                {selectedEvaluation && formatDate(selectedEvaluation.timestamp)}
              </DialogDescription>
            </DialogHeader>

            {selectedEvaluation && (
              <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="outputs">Outputs</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="flex-1 overflow-auto">
                  <div className="space-y-4 py-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Prompt</h4>
                      <p className="text-sm bg-muted p-3 rounded-md">
                        {selectedEvaluation.prompt}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Models Compared</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvaluation.models.map((model) => (
                          <Badge key={model} variant="secondary">
                            {model}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-lg font-semibold">
                          {formatDuration(selectedEvaluation.duration)}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <div className="mt-1">
                          {getStatusBadge(selectedEvaluation.status)}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Best Score</p>
                        <p className="text-lg font-semibold">
                          {Math.max(
                            ...selectedEvaluation.metrics
                              .filter((m) => m.judgeScore)
                              .map((m) => m.judgeScore || 0)
                          ).toFixed(1)}
                          /10
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="outputs" className="flex-1 overflow-auto">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4 py-4">
                      {selectedEvaluation.outputs?.map((output) => (
                        <div key={output.modelName} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{output.modelName}</Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{output.output}</p>
                        </div>
                      )) || (
                        <p className="text-muted-foreground text-center py-8">
                          Output data not available
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="metrics" className="flex-1 overflow-auto">
                  <div className="py-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Model</TableHead>
                          <TableHead>Latency</TableHead>
                          <TableHead>Tokens/sec</TableHead>
                          <TableHead>Total Tokens</TableHead>
                          <TableHead>Judge Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEvaluation.metrics.map((metric) => (
                          <TableRow key={metric.modelName}>
                            <TableCell className="font-medium">
                              {metric.modelName}
                            </TableCell>
                            <TableCell>
                              {metric.latency > 0 ? `${metric.latency}ms` : "-"}
                            </TableCell>
                            <TableCell>
                              {metric.tokensPerSecond > 0
                                ? metric.tokensPerSecond.toFixed(1)
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {metric.totalTokens > 0 ? metric.totalTokens : "-"}
                            </TableCell>
                            <TableCell>
                              {metric.judgeScore ? (
                                <Badge
                                  className={cn(
                                    metric.judgeScore >= 8
                                      ? "status-badge-complete"
                                      : metric.judgeScore >= 6
                                      ? "status-badge-warning"
                                      : "status-badge-error"
                                  )}
                                >
                                  {metric.judgeScore.toFixed(1)}/10
                                </Badge>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
