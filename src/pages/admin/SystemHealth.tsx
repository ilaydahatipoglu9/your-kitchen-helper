import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Server,
  Database,
  Wifi,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Mock data
const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, requests: 1200 },
  { time: "04:00", cpu: 32, memory: 58, requests: 800 },
  { time: "08:00", cpu: 68, memory: 71, requests: 2400 },
  { time: "12:00", cpu: 82, memory: 78, requests: 3200 },
  { time: "16:00", cpu: 75, memory: 74, requests: 2800 },
  { time: "20:00", cpu: 58, memory: 68, requests: 1800 },
  { time: "Now", cpu: 52, memory: 65, requests: 1500 },
];

const services = [
  { name: "API Gateway", status: "healthy", uptime: "99.99%", latency: "12ms" },
  { name: "Database Primary", status: "healthy", uptime: "99.95%", latency: "5ms" },
  { name: "Database Replica", status: "healthy", uptime: "99.90%", latency: "8ms" },
  { name: "Cache Server", status: "healthy", uptime: "99.99%", latency: "2ms" },
  { name: "WebSocket Server", status: "healthy", uptime: "99.85%", latency: "15ms" },
  { name: "Search Index", status: "degraded", uptime: "98.50%", latency: "45ms" },
  { name: "Notification Service", status: "healthy", uptime: "99.92%", latency: "20ms" },
  { name: "Analytics Pipeline", status: "healthy", uptime: "99.80%", latency: "100ms" },
];

const recentAlerts = [
  {
    id: "1",
    type: "warning",
    message: "Search Index latency above threshold",
    timestamp: "10 minutes ago",
    resolved: false,
  },
  {
    id: "2",
    type: "info",
    message: "Scheduled maintenance completed",
    timestamp: "2 hours ago",
    resolved: true,
  },
  {
    id: "3",
    type: "error",
    message: "Database connection pool exhausted",
    timestamp: "5 hours ago",
    resolved: true,
  },
  {
    id: "4",
    type: "warning",
    message: "High memory usage detected",
    timestamp: "1 day ago",
    resolved: true,
  },
];

export default function SystemHealthPage() {
  const [timeRange, setTimeRange] = useState("24h");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "down":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500/20 text-green-600">Healthy</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-600">Degraded</Badge>;
      case "down":
        return <Badge variant="destructive">Down</Badge>;
      default:
        return null;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const totalServices = services.length;
  const overallHealth = Math.round((healthyCount / totalServices) * 100);

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto" data-usecases="UC_254,UC_258,UC_259">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              System Health
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor application performance and service status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Overall Health */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    overallHealth >= 90
                      ? "bg-green-500/20"
                      : overallHealth >= 70
                      ? "bg-yellow-500/20"
                      : "bg-destructive/20"
                  }`}
                >
                  <Activity
                    className={`h-8 w-8 ${
                      overallHealth >= 90
                        ? "text-green-500"
                        : overallHealth >= 70
                        ? "text-yellow-500"
                        : "text-destructive"
                    }`}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-heading">{overallHealth}%</h2>
                  <p className="text-muted-foreground">Overall System Health</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{healthyCount}</p>
                  <p className="text-sm text-muted-foreground">Healthy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {services.filter((s) => s.status === "degraded").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Degraded</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">
                    {services.filter((s) => s.status === "down").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Down</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className="text-lg font-bold">52%</span>
              </div>
              <Progress value={52} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <span className="text-lg font-bold">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Disk Usage</span>
                </div>
                <span className="text-lg font-bold">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>CPU, Memory, and Request volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stackId="1"
                    stroke="#6A89A7"
                    fill="#6A89A7"
                    fillOpacity={0.3}
                    name="CPU %"
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stackId="2"
                    stroke="#8FAFCC"
                    fill="#8FAFCC"
                    fillOpacity={0.3}
                    name="Memory %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Services Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Real-time status of all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Latency: {service.latency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {service.uptime}
                      </span>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card data-usecases="UC_256">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.resolved ? "bg-muted/50" : "bg-yellow-500/10"
                    }`}
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${alert.resolved ? "text-muted-foreground" : "font-medium"}`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                    {alert.resolved ? (
                      <Badge variant="outline" className="text-xs">Resolved</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
