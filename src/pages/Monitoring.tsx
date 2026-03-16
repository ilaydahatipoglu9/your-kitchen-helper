import { useMemo, useState } from "react";
import { Activity, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type HealthRow = {
  component: string;
  status: "ok" | "degraded" | "down";
  latencyMs: number;
  lastChecked: string;
};

type LogRow = {
  ts: string;
  level: "INFO" | "WARN" | "ERROR";
  service: string;
  message: string;
};

export default function Monitoring() {
  const [query, setQuery] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const health = useMemo<HealthRow[]>(
    () => [
      { component: "Content Aggregator", status: "ok", latencyMs: 120, lastChecked: "Just now" },
      { component: "External Feeds", status: "degraded", latencyMs: 540, lastChecked: "1m ago" },
      { component: "Delivery API", status: "ok", latencyMs: 85, lastChecked: "Just now" },
    ],
    [],
  );

  const logs = useMemo<LogRow[]>(
    () => [
      { ts: "10:21:04", level: "INFO", service: "ingest", message: "Pulled 42 items from Feed A" },
      { ts: "10:20:12", level: "WARN", service: "normalize", message: "Missing leagueId for 3 items" },
      { ts: "10:19:44", level: "ERROR", service: "delivery", message: "Timeout calling provider X" },
    ],
    [],
  );

  const filteredLogs = logs.filter((l) => (l.message + l.service + l.level).toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-maritime-soft pb-20">
      <div className="container max-w-[1200px] px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" aria-hidden />
              <h1 className="text-2xl font-semibold">Monitoring</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Health checks and searchable system logs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" data-usecases="UC_062,UC_191">
              <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden />
              Time range / Filters
            </Button>
            <Button variant="outline" data-usecases="UC_062,UC_191">
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
              Refresh
            </Button>
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
              <div className="text-xs text-muted-foreground">Auto-refresh</div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} aria-label="Toggle auto-refresh" data-usecases="UC_062,UC_191" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-5">
            <CardHeader>
              <CardTitle>System health</CardTitle>
              <CardDescription>Current status across key components.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {health.map((h) => (
                    <TableRow key={h.component}>
                      <TableCell className="font-medium">{h.component}</TableCell>
                      <TableCell className="capitalize">{h.status}</TableCell>
                      <TableCell className="text-right">{h.latencyMs}ms</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>Logs & events</CardTitle>
              <CardDescription>Search across recent events for troubleshooting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  placeholder="Search logs and events…"
                  aria-label="Search logs"
                  data-usecases="UC_062,UC_191"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((l, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{l.ts}</TableCell>
                      <TableCell>{l.level}</TableCell>
                      <TableCell>{l.service}</TableCell>
                      <TableCell className="max-w-[28rem] truncate" title={l.message}>
                        {l.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
