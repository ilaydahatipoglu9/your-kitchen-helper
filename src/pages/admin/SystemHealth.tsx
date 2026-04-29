import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  threshold: number;
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: string;
  lastIncident?: string;
}

const systemMetrics: SystemMetric[] = [
  { name: "CPU Usage", value: 45, unit: "%", status: "healthy", threshold: 80 },
  { name: "Memory Usage", value: 62, unit: "%", status: "healthy", threshold: 85 },
  { name: "Disk Usage", value: 78, unit: "%", status: "warning", threshold: 75 },
  { name: "Network I/O", value: 234, unit: "MB/s", status: "healthy", threshold: 500 },
];

const services: ServiceStatus[] = [
  { name: "API Gateway", status: "operational", uptime: "99.99%" },
  { name: "Database Cluster", status: "operational", uptime: "99.95%" },
  { name: "Cache Layer", status: "operational", uptime: "99.98%" },
  { name: "Search Service", status: "degraded", uptime: "98.50%", lastIncident: "2 hours ago" },
  { name: "Notification Service", status: "operational", uptime: "99.90%" },
  { name: "Analytics Pipeline", status: "operational", uptime: "99.85%" },
];

const recentAlerts = [
  {
    id: "1",
    severity: "warning",
    message: "Disk usage exceeded 75% threshold",
    timestamp: "10 minutes ago",
  },
  {
    id: "2",
    severity: "info",
    message: "Search service latency increased",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    severity: "resolved",
    message: "Database connection pool recovered",
    timestamp: "5 hours ago",
  },
];

const statusColors = {
  operational: "bg-success text-success-foreground",
  degraded: "bg-warning text-warning-foreground",
  down: "bg-destructive text-destructive-foreground",
};

const statusIcons = {
  operational: CheckCircle,
  degraded: AlertTriangle,
  down: AlertTriangle,
};

const metricStatusColors = {
  healthy: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
};

export default function SystemHealth() {
  return (
    <div className="space-y-6" data-usecases="UC_254,UC_258">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <Activity className="h-6 w-6" />
          System Health
        </h1>
        <p className="text-muted-foreground">
          Monitor system performance and service status
        </p>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current operational status</CardDescription>
            </div>
            <Badge className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Systems Operational
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* System Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {metric.name}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    metric.status === "healthy" && "border-success text-success",
                    metric.status === "warning" && "border-warning text-warning",
                    metric.status === "critical" && "border-destructive text-destructive"
                  )}
                >
                  {metric.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {metric.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric.unit}
                </span>
              </div>
              <Progress
                value={metric.value}
                className={cn(
                  "h-2",
                  `[&>div]:${metricStatusColors[metric.status]}`
                )}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Threshold: {metric.threshold}{metric.unit}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Status of all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => {
              const StatusIcon = statusIcons[service.status];
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        service.status === "operational" && "bg-success/10",
                        service.status === "degraded" && "bg-warning/10",
                        service.status === "down" && "bg-destructive/10"
                      )}
                    >
                      <StatusIcon
                        className={cn(
                          "h-5 w-5",
                          service.status === "operational" && "text-success",
                          service.status === "degraded" && "text-warning",
                          service.status === "down" && "text-destructive"
                        )}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      {service.lastIncident && (
                        <p className="text-sm text-muted-foreground">
                          Last incident: {service.lastIncident}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={statusColors[service.status]}>
                      {service.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
          <CardDescription>System alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg",
                  alert.severity === "warning" && "bg-warning/10",
                  alert.severity === "info" && "bg-primary/10",
                  alert.severity === "resolved" && "bg-success/10"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                    alert.severity === "warning" && "bg-warning/20",
                    alert.severity === "info" && "bg-primary/20",
                    alert.severity === "resolved" && "bg-success/20"
                  )}
                >
                  {alert.severity === "resolved" ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle
                      className={cn(
                        "h-4 w-4",
                        alert.severity === "warning" && "text-warning",
                        alert.severity === "info" && "text-primary"
                      )}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {alert.timestamp}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    alert.severity === "warning" && "border-warning text-warning",
                    alert.severity === "info" && "border-primary text-primary",
                    alert.severity === "resolved" && "border-success text-success"
                  )}
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
