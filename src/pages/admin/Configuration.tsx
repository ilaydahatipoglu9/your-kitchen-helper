import { useState } from "react";
import { Settings, Database, Clock, Bell, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive";
  lastSync: string;
}

const mockDataSources: DataSource[] = [
  { id: "1", name: "Sports API v2", type: "REST API", status: "active", lastSync: "2 minutes ago" },
  { id: "2", name: "Live Scores Feed", type: "WebSocket", status: "active", lastSync: "Real-time" },
  { id: "3", name: "News Aggregator", type: "RSS Feed", status: "active", lastSync: "15 minutes ago" },
  { id: "4", name: "Legacy Stats DB", type: "Database", status: "inactive", lastSync: "2 days ago" },
];

export default function Configuration() {
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
  const [retentionDays, setRetentionDays] = useState("90");
  const [alertThreshold, setAlertThreshold] = useState("80");

  const handleDeleteDataSource = (id: string) => {
    setDataSources((prev) => prev.filter((ds) => ds.id !== id));
  };

  return (
    <div className="space-y-6" data-usecases="UC_260,UC_261,UC_262,UC_264">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Configuration
        </h1>
        <p className="text-muted-foreground">
          Manage data sources, retention policies, and system settings
        </p>
      </div>

      <Tabs defaultValue="data-sources">
        <TabsList>
          <TabsTrigger value="data-sources" data-usecases="UC_260">
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="retention" data-usecases="UC_261">
            Retention Policy
          </TabsTrigger>
          <TabsTrigger value="alerts" data-usecases="UC_264">
            Alert Thresholds
          </TabsTrigger>
          <TabsTrigger value="schedules" data-usecases="UC_262">
            Schedules
          </TabsTrigger>
        </TabsList>

        {/* Data Sources Tab */}
        <TabsContent value="data-sources" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Data Sources
                  </CardTitle>
                  <CardDescription>
                    Configure external data sources for sports content
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-usecases="UC_260">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Source
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Data Source</DialogTitle>
                      <DialogDescription>
                        Configure a new external data source
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="source-name">Source Name</Label>
                        <Input id="source-name" placeholder="Enter source name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="source-type">Source Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rest">REST API</SelectItem>
                            <SelectItem value="websocket">WebSocket</SelectItem>
                            <SelectItem value="rss">RSS Feed</SelectItem>
                            <SelectItem value="database">Database</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="source-url">Endpoint URL</Label>
                        <Input id="source-url" placeholder="https://api.example.com" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button data-usecases="UC_260">Add Source</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {source.type} - Last sync: {source.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={source.status === "active" ? "default" : "secondary"}
                        className={source.status === "active" ? "bg-success" : ""}
                      >
                        {source.status}
                      </Badge>
                      <Button variant="ghost" size="icon" data-usecases="UC_260">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteDataSource(source.id)}
                        data-usecases="UC_260"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Retention Policy Tab */}
        <TabsContent value="retention" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Data Retention Policy
              </CardTitle>
              <CardDescription>
                Configure how long data is retained in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="analytics-retention">Analytics Data Retention</Label>
                  <Select value={retentionDays} onValueChange={setRetentionDays}>
                    <SelectTrigger data-usecases="UC_261">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    User analytics and engagement data
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logs-retention">System Logs Retention</Label>
                  <Select defaultValue="30">
                    <SelectTrigger data-usecases="UC_261">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Application and error logs
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Auto-archive old data</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically archive data older than retention period
                  </p>
                </div>
                <Switch defaultChecked data-usecases="UC_261" />
              </div>
              <Button data-usecases="UC_261">Save Retention Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Thresholds Tab */}
        <TabsContent value="alerts" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>
                Configure when system alerts are triggered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cpu-threshold">CPU Usage Threshold (%)</Label>
                  <Input
                    id="cpu-threshold"
                    type="number"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    data-usecases="UC_264"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory-threshold">Memory Usage Threshold (%)</Label>
                  <Input id="memory-threshold" type="number" defaultValue="85" data-usecases="UC_264" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disk-threshold">Disk Usage Threshold (%)</Label>
                  <Input id="disk-threshold" type="number" defaultValue="75" data-usecases="UC_264" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latency-threshold">API Latency Threshold (ms)</Label>
                  <Input id="latency-threshold" type="number" defaultValue="500" data-usecases="UC_264" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Enable email notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Send email alerts when thresholds are exceeded
                  </p>
                </div>
                <Switch defaultChecked data-usecases="UC_264" />
              </div>
              <Button data-usecases="UC_264">Save Alert Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Reporting Schedules
              </CardTitle>
              <CardDescription>
                Configure automated report generation schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Daily Analytics Report", schedule: "Every day at 6:00 AM", enabled: true },
                { name: "Weekly Summary", schedule: "Every Monday at 9:00 AM", enabled: true },
                { name: "Monthly Performance Report", schedule: "1st of every month", enabled: false },
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.schedule}</p>
                  </div>
                  <Switch defaultChecked={report.enabled} data-usecases="UC_262" />
                </div>
              ))}
              <Button variant="outline" className="w-full" data-usecases="UC_262">
                <Plus className="h-4 w-4 mr-2" />
                Add New Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
