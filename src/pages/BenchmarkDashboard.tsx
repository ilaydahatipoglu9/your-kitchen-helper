import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  Zap,
  Download,
  Filter,
  RefreshCw,
  Cpu,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { cn } from "@/lib/utils";

interface ModelBenchmark {
  name: string;
  avgLatency: number;
  avgThroughput: number;
  avgScore: number;
  totalEvaluations: number;
  trend: "up" | "down" | "stable";
}

const mockBenchmarks: ModelBenchmark[] = [
  {
    name: "GPT-4",
    avgLatency: 2100,
    avgThroughput: 45.2,
    avgScore: 8.7,
    totalEvaluations: 156,
    trend: "up",
  },
  {
    name: "Claude 3 Opus",
    avgLatency: 2400,
    avgThroughput: 38.7,
    avgScore: 9.1,
    totalEvaluations: 134,
    trend: "up",
  },
  {
    name: "GPT-3.5 Turbo",
    avgLatency: 1200,
    avgThroughput: 72.4,
    avgScore: 7.5,
    totalEvaluations: 189,
    trend: "stable",
  },
  {
    name: "Gemini Pro",
    avgLatency: 1800,
    avgThroughput: 52.3,
    avgScore: 7.8,
    totalEvaluations: 98,
    trend: "down",
  },
  {
    name: "Claude 3 Sonnet",
    avgLatency: 1600,
    avgThroughput: 48.2,
    avgScore: 8.2,
    totalEvaluations: 112,
    trend: "up",
  },
];

const latencyData = [
  { name: "GPT-4", value: 2100 },
  { name: "Claude 3 Opus", value: 2400 },
  { name: "GPT-3.5", value: 1200 },
  { name: "Gemini Pro", value: 1800 },
  { name: "Claude 3 Sonnet", value: 1600 },
];

const throughputData = [
  { name: "GPT-4", value: 45.2 },
  { name: "Claude 3 Opus", value: 38.7 },
  { name: "GPT-3.5", value: 72.4 },
  { name: "Gemini Pro", value: 52.3 },
  { name: "Claude 3 Sonnet", value: 48.2 },
];

const trendData = [
  { date: "Jan 1", "GPT-4": 8.2, "Claude 3": 8.8, "GPT-3.5": 7.2 },
  { date: "Jan 8", "GPT-4": 8.4, "Claude 3": 8.9, "GPT-3.5": 7.3 },
  { date: "Jan 15", "GPT-4": 8.5, "Claude 3": 9.0, "GPT-3.5": 7.4 },
  { date: "Jan 22", "GPT-4": 8.6, "Claude 3": 9.0, "GPT-3.5": 7.5 },
  { date: "Jan 29", "GPT-4": 8.7, "Claude 3": 9.1, "GPT-3.5": 7.5 },
];

const radarData = [
  { metric: "Accuracy", "GPT-4": 87, "Claude 3": 91, "GPT-3.5": 75 },
  { metric: "Relevance", "GPT-4": 85, "Claude 3": 89, "GPT-3.5": 78 },
  { metric: "Clarity", "GPT-4": 88, "Claude 3": 90, "GPT-3.5": 80 },
  { metric: "Completeness", "GPT-4": 86, "Claude 3": 88, "GPT-3.5": 72 },
  { metric: "Creativity", "GPT-4": 82, "Claude 3": 85, "GPT-3.5": 70 },
];

export default function BenchmarkDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "GPT-4",
    "Claude 3 Opus",
    "GPT-3.5 Turbo",
  ]);

  const getTrendIcon = (trend: ModelBenchmark["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-[hsl(var(--status-complete))]" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-[hsl(var(--status-error))]" />;
      case "stable":
        return <span className="h-4 w-4 text-muted-foreground">—</span>;
    }
  };

  const bestModel = mockBenchmarks.reduce((a, b) =>
    a.avgScore > b.avgScore ? a : b
  );
  const fastestModel = mockBenchmarks.reduce((a, b) =>
    a.avgLatency < b.avgLatency ? a : b
  );
  const highestThroughput = mockBenchmarks.reduce((a, b) =>
    a.avgThroughput > b.avgThroughput ? a : b
  );

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto" data-usecases="UC_122,UC_123,UC_124,UC_125">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Benchmarking Dashboard</h1>
            <p className="text-muted-foreground">
              Compare model performance across all evaluations
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" data-usecases="UC_126">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--chart-4))]/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-[hsl(var(--chart-4))]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Highest Rated</p>
                  <p className="text-xl font-bold">{bestModel.name}</p>
                  <p className="text-sm text-[hsl(var(--status-complete))]">
                    {bestModel.avgScore.toFixed(1)}/10 avg score
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--chart-1))]/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[hsl(var(--chart-1))]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fastest Response</p>
                  <p className="text-xl font-bold">{fastestModel.name}</p>
                  <p className="text-sm text-[hsl(var(--status-complete))]">
                    {fastestModel.avgLatency}ms avg latency
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-[hsl(var(--chart-2))]/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[hsl(var(--chart-2))]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Highest Throughput</p>
                  <p className="text-xl font-bold">{highestThroughput.name}</p>
                  <p className="text-sm text-[hsl(var(--status-complete))]">
                    {highestThroughput.avgThroughput.toFixed(1)} tok/s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Model Rankings */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Rankings</CardTitle>
                  <CardDescription>
                    Overall performance based on judge scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBenchmarks
                      .sort((a, b) => b.avgScore - a.avgScore)
                      .map((model, index) => (
                        <div key={model.name} className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                              index === 0
                                ? "bg-[hsl(var(--chart-4))] text-white"
                                : index === 1
                                ? "bg-gray-300 text-gray-700"
                                : index === 2
                                ? "bg-amber-600 text-white"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{model.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">
                                  {model.avgScore.toFixed(1)}
                                </span>
                                {getTrendIcon(model.trend)}
                              </div>
                            </div>
                            <Progress
                              value={model.avgScore * 10}
                              className="h-2"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Score Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Trends</CardTitle>
                  <CardDescription>
                    Judge scores over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis domain={[6, 10]} className="text-xs" />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="GPT-4"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="Claude 3"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="GPT-3.5"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latency Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Average Latency</CardTitle>
                  <CardDescription>
                    Response time in milliseconds (lower is better)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={latencyData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Throughput Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Token Throughput</CardTitle>
                  <CardDescription>
                    Tokens per second (higher is better)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={throughputData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics Comparison</CardTitle>
                  <CardDescription>
                    Multi-dimensional quality assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" className="text-xs" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="GPT-4"
                          dataKey="GPT-4"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Claude 3"
                          dataKey="Claude 3"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="GPT-3.5"
                          dataKey="GPT-3.5"
                          stroke="hsl(var(--chart-3))"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.3}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Breakdown */}
              <Card data-usecases="UC_079">
                <CardHeader>
                  <CardTitle>Quality Breakdown</CardTitle>
                  <CardDescription>
                    Detailed scores by evaluation criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {["Accuracy", "Relevance", "Clarity", "Completeness", "Creativity"].map(
                      (metric) => (
                        <div key={metric} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{metric}</span>
                          </div>
                          <div className="space-y-1">
                            {mockBenchmarks.slice(0, 3).map((model) => {
                              const score =
                                radarData.find((d) => d.metric === metric)?.[
                                  model.name.split(" ")[0] as keyof typeof radarData[0]
                                ] || 0;
                              return (
                                <div
                                  key={model.name}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-xs text-muted-foreground w-24 truncate">
                                    {model.name}
                                  </span>
                                  <Progress
                                    value={score as number}
                                    className="h-1.5 flex-1"
                                  />
                                  <span className="text-xs font-mono w-8">
                                    {score}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Model Comparison Table</CardTitle>
                <CardDescription>
                  Side-by-side comparison of all metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Model</th>
                        <th className="text-right py-3 px-4 font-medium">Avg Score</th>
                        <th className="text-right py-3 px-4 font-medium">Latency</th>
                        <th className="text-right py-3 px-4 font-medium">Throughput</th>
                        <th className="text-right py-3 px-4 font-medium">Evaluations</th>
                        <th className="text-right py-3 px-4 font-medium">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBenchmarks.map((model) => (
                        <tr key={model.name} className="border-b last:border-0">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{model.name}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Badge
                              className={cn(
                                model.avgScore >= 8.5
                                  ? "status-badge-complete"
                                  : model.avgScore >= 7.5
                                  ? "status-badge-warning"
                                  : "status-badge-error"
                              )}
                            >
                              {model.avgScore.toFixed(1)}
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4 font-mono text-sm">
                            {model.avgLatency}ms
                          </td>
                          <td className="text-right py-3 px-4 font-mono text-sm">
                            {model.avgThroughput.toFixed(1)} tok/s
                          </td>
                          <td className="text-right py-3 px-4 text-muted-foreground">
                            {model.totalEvaluations}
                          </td>
                          <td className="text-right py-3 px-4">
                            {getTrendIcon(model.trend)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
