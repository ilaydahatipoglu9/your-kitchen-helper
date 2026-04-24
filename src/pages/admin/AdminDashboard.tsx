import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Users,
  Database,
  Bell,
  AlertTriangle,
  TrendingUp,
  Server,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton-loader";
import { mockSystemHealth, mockDataSources, mockAlertRules } from "@/data/mockData";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const activeDataSources = mockDataSources.filter((ds) => ds.status === "active").length;
  const enabledAlerts = mockAlertRules.filter((ar) => ar.enabled).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-usecases="UC_250,UC_258">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and health monitoring
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card data-usecases="UC_259">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockSystemHealth.uptime}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card data-usecases="UC_254">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemHealth.responseTime}ms</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemHealth.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card data-usecases="UC_254">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockSystemHealth.errorRate}%</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card data-usecases="UC_258">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Disk Usage</span>
                <span className="text-sm font-medium">38%</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Network I/O</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Request Volume
            </CardTitle>
            <CardDescription>Requests per minute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              {mockSystemHealth.requestsPerMinute.toLocaleString()}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>API Requests</span>
                <span className="font-medium">6,234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>WebSocket Messages</span>
                <span className="font-medium">2,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Cache Hits</span>
                <span className="font-medium text-success">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/admin/data-sources">
          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" data-usecases="UC_050,UC_165">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Data Sources</p>
                <p className="text-sm text-muted-foreground">
                  {activeDataSources} of {mockDataSources.length} active
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/alerts">
          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" data-usecases="UC_264,UC_100">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">Alert Rules</p>
                <p className="text-sm text-muted-foreground">
                  {enabledAlerts} of {mockAlertRules.length} enabled
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/users">
          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]" data-usecases="UC_005,UC_263">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium">User Management</p>
                <p className="text-sm text-muted-foreground">
                  Manage accounts and permissions
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
