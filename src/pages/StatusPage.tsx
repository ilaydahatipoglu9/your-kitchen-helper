import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Server,
  Database,
  Cpu,
  Clock,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: number;
  uptime: number;
  lastChecked: string;
}

interface LLMProviderStatus {
  name: string;
  status: "online" | "offline" | "degraded";
  responseTime: number;
  successRate: number;
}

const systemServices: ServiceStatus[] = [
  {
    name: "API Gateway",
    status: "operational",
    latency: 45,
    uptime: 99.99,
    lastChecked: "1 min ago",
  },
  {
    name: "Evaluation Engine",
    status: "operational",
    latency: 120,
    uptime: 99.95,
    lastChecked: "1 min ago",
  },
  {
    name: "Database",
    status: "operational",
    latency: 12,
    uptime: 99.99,
    lastChecked: "1 min ago",
  },
  {
    name: "Cache Layer",
    status: "operational",
    latency: 3,
    uptime: 99.98,
    lastChecked: "1 min ago",
  },
  {
    name: "Job Queue",
    status: "operational",
    latency: 25,
    uptime: 99.97,
    lastChecked: "1 min ago",
  },
];

const llmProviders: LLMProviderStatus[] = [
  {
    name: "OpenAI",
    status: "online",
    responseTime: 850,
    successRate: 99.8,
  },
  {
    name: "Anthropic",
    status: "online",
    responseTime: 920,
    successRate: 99.5,
  },
  {
    name: "Google AI",
    status: "online",
    responseTime: 780,
    successRate: 99.2,
  },
  {
    name: "Mistral",
    status: "degraded",
    responseTime: 1500,
    successRate: 95.5,
  },
];

const backgroundJobs = [
  { name: "Evaluation Processing", active: 3, queued: 12, completed: 156 },
  { name: "Metrics Aggregation", active: 1, queued: 0, completed: 89 },
  { name: "Report Generation", active: 0, queued: 2, completed: 34 },
];

export default function StatusPage() {
  const getStatusIcon = (status: "operational" | "degraded" | "outage" | "online" | "offline") => {
    switch (status) {
      case "operational":
      case "online":
        return <CheckCircle className="h-5 w-5 text-[hsl(var(--status-complete))]" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-[hsl(var(--status-warning))]" />;
      case "outage":
      case "offline":
        return <XCircle className="h-5 w-5 text-[hsl(var(--status-error))]" />;
    }
  };

  const getStatusBadge = (status: "operational" | "degraded" | "outage" | "online" | "offline") => {
    switch (status) {
      case "operational":
      case "online":
        return <Badge className="status-badge-complete">Operational</Badge>;
      case "degraded":
        return <Badge className="status-badge-warning">Degraded</Badge>;
      case "outage":
      case "offline":
        return <Badge className="status-badge-error">Outage</Badge>;
    }
  };

  const overallStatus = systemServices.every((s) => s.status === "operational")
    ? "operational"
    : systemServices.some((s) => s.status === "outage")
    ? "outage"
    : "degraded";

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto" data-usecases="UC_127,UC_128,UC_131">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">System Status</h1>
            <p className="text-muted-foreground">
              Monitor the health of all platform services
            </p>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Overall Status Banner */}
        <Card
          className={cn(
            "mb-6",
            overallStatus === "operational"
              ? "border-[hsl(var(--status-complete))]/30 bg-[hsl(var(--status-complete))]/5"
              : overallStatus === "degraded"
              ? "border-[hsl(var(--status-warning))]/30 bg-[hsl(var(--status-warning))]/5"
              : "border-[hsl(var(--status-error))]/30 bg-[hsl(var(--status-error))]/5"
          )}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              {getStatusIcon(overallStatus)}
              <div>
                <h2 className="text-lg font-semibold">
                  {overallStatus === "operational"
                    ? "All Systems Operational"
                    : overallStatus === "degraded"
                    ? "Some Systems Degraded"
                    : "System Outage Detected"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Services
              </CardTitle>
              <CardDescription>
                Core platform infrastructure status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemServices.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.latency}ms • {service.uptime}% uptime
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {service.lastChecked}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* LLM Provider Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                LLM Providers
              </CardTitle>
              <CardDescription>
                External LLM service availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {llmProviders.map((provider) => (
                  <div
                    key={provider.name}
                    className="p-3 rounded-lg border space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(provider.status)}
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      {getStatusBadge(provider.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.responseTime}ms avg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.successRate}% success</span>
                      </div>
                    </div>
                    <Progress
                      value={provider.successRate}
                      className="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Background Jobs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Background Jobs
              </CardTitle>
              <CardDescription>
                Status of asynchronous processing tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {backgroundJobs.map((job) => (
                  <div key={job.name} className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-3">{job.name}</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold text-[hsl(var(--status-running))]">
                          {job.active}
                        </p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[hsl(var(--status-warning))]">
                          {job.queued}
                        </p>
                        <p className="text-xs text-muted-foreground">Queued</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[hsl(var(--status-complete))]">
                          {job.completed}
                        </p>
                        <p className="text-xs text-muted-foreground">Done</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>
                Past incidents and their resolution status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-[hsl(var(--status-complete))]" />
                <p className="font-medium">No recent incidents</p>
                <p className="text-sm">All systems have been running smoothly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
