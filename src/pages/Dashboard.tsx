import * as React from "react";
import { AlertTriangle, ArrowUpRight, CalendarClock, CheckCircle2, Clock, Coins, Home, Wrench } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/context/session";
import { cn } from "@/lib/utils";
import { QuickActions } from "@/components/dashboard/QuickActions";

type LoadState = "loading" | "ready" | "error";

type ActivityItem = {
  id: string;
  ts: string;
  title: string;
  detail: string;
  type: "payment" | "lease" | "maintenance";
};

type AlertItem = {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  icon: React.ReactNode;
};

function MetricCard({
  title,
  value,
  sub,
  icon,
  tone = "default",
  loading,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  tone?: "default" | "good" | "warn";
  loading?: boolean;
}) {
  return (
    <Card className="bg-card/60 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardDescription className="text-xs">{title}</CardDescription>
          <CardTitle className="text-2xl">{loading ? <Skeleton className="h-7 w-24" /> : value}</CardTitle>
        </div>
        <div
          className={cn(
            "mt-1 rounded-md p-2 ring-1",
            tone === "good"
              ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25"
              : tone === "warn"
                ? "bg-amber-500/10 text-amber-700 ring-amber-500/25"
                : "bg-primary/10 text-primary ring-primary/25",
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-4 w-44" /> : <p className="text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useSession();
  const [state, setState] = React.useState<LoadState>("loading");

  React.useEffect(() => {
    const t = window.setTimeout(() => setState("ready"), 650);
    return () => window.clearTimeout(t);
  }, []);

  const isOwner = user?.role === "owner";

  const activity: ActivityItem[] = [
    {
      id: "a1",
      ts: "Today, 9:10 AM",
      title: "Rent payment received",
      detail: "Unit 12B • $1,850 posted",
      type: "payment",
    },
    {
      id: "a2",
      ts: "Yesterday, 4:22 PM",
      title: "Work order updated",
      detail: "Unit 3A • Plumber scheduled",
      type: "maintenance",
    },
    {
      id: "a3",
      ts: "Mon, 11:05 AM",
      title: "Lease renewal initiated",
      detail: "Unit 8C • Awaiting signatures",
      type: "lease",
    },
  ];

  const alerts: AlertItem[] = [
    {
      id: "al1",
      title: "Lease expiring soon",
      detail: "Unit 5D expires in 21 days",
      severity: "medium",
      icon: <CalendarClock className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "al2",
      title: "Overdue rent",
      detail: "Unit 2C is 7 days overdue",
      severity: "high",
      icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "al3",
      title: "Urgent repair",
      detail: "Unit 10A flagged for same-day follow-up",
      severity: "high",
      icon: <Wrench className="h-4 w-4" aria-hidden="true" />,
    },
  ];

  const loading = state === "loading";
  const error = state === "error";

  return (
    <AppShell title="Unified Portfolio Dashboard">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <section className="grid min-w-0 gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Occupancy"
              value="92%"
              sub="22 of 24 units occupied"
              icon={<Home className="h-4 w-4" />}
              tone="good"
              loading={loading}
            />
            <MetricCard
              title="Rent collected"
              value="$38,420"
              sub="Month to date • 86% collected"
              icon={<Coins className="h-4 w-4" />}
              tone="default"
              loading={loading}
            />
            <MetricCard
              title="Open maintenance"
              value="7"
              sub="2 urgent • 5 standard"
              icon={<Wrench className="h-4 w-4" />}
              tone="warn"
              loading={loading}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/60 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Recent activity</CardTitle>
                    <CardDescription>Payments, lease events, and maintenance updates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    View all
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                    Unable to load activity. Try again.
                  </div>
                ) : loading ? (
                  <div className="grid gap-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : activity.length === 0 ? (
                  <div className="rounded-md border bg-background/50 p-4 text-sm">
                    <div className="font-medium">No recent activity</div>
                    <div className="text-xs text-muted-foreground">New payments and work updates will appear here.</div>
                  </div>
                ) : (
                  <ScrollArea className="h-[280px]">
                    <ul className="grid gap-3 pr-3" aria-label="Activity feed">
                      {activity.map((item) => (
                        <li
                          key={item.id}
                          className="rounded-md border bg-background/50 p-3 transition-shadow hover:shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium">{item.title}</div>
                              <div className="truncate text-xs text-muted-foreground">{item.detail}</div>
                            </div>
                            <div className="shrink-0 text-xs text-muted-foreground">{item.ts}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Prioritized alerts</CardTitle>
                <CardDescription>Expiring leases, overdue rent, and urgent repairs</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid gap-3">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="rounded-md border bg-background/50 p-4 text-sm">
                    <div className="font-medium">No alerts</div>
                    <div className="text-xs text-muted-foreground">You are all caught up.</div>
                  </div>
                ) : (
                  <ul className="grid gap-3" aria-label="Alerts">
                    {alerts.map((a) => (
                      <li
                        key={a.id}
                        className={cn(
                          "rounded-md border bg-background/50 p-3 transition-shadow hover:shadow-sm",
                          a.severity === "high" ? "border-amber-500/40" : a.severity === "medium" ? "border-primary/30" : "",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 gap-3">
                            <div
                              className={cn(
                                "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md ring-1",
                                a.severity === "high"
                                  ? "bg-amber-500/10 text-amber-700 ring-amber-500/25"
                                  : a.severity === "medium"
                                    ? "bg-primary/10 text-primary ring-primary/25"
                                    : "bg-muted text-foreground/70 ring-border",
                              )}
                            >
                              {a.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="truncate text-sm font-medium">{a.title}</div>
                                <Badge
                                  variant={a.severity === "high" ? "destructive" : a.severity === "medium" ? "default" : "secondary"}
                                >
                                  {a.severity === "high" ? "High" : a.severity === "medium" ? "Medium" : "Low"}
                                </Badge>
                              </div>
                              <div className="truncate text-xs text-muted-foreground">{a.detail}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0">
                            Resolve
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <aside className="grid gap-4">
          <QuickActions />

          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Owner insights</CardTitle>
              <CardDescription>{isOwner ? "Your portfolio snapshot" : "Preview of owner-facing KPIs"}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {loading ? (
                <div className="grid gap-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div className="rounded-md border bg-background/50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Net operating income</div>
                      <Badge variant="secondary">Month</Badge>
                    </div>
                    <div className="mt-1 text-2xl font-semibold">$14,280</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      On track vs. last month
                    </div>
                  </div>

                  <div className="rounded-md border bg-background/50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Market comparison</div>
                      <Badge variant="outline">Metro</Badge>
                    </div>
                    <div className="mt-1 text-sm">Avg. rent is 3.2% below comparable listings.</div>
                    <div className="mt-2 text-xs text-muted-foreground">Consider adjusting renewals for units with recent upgrades.</div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      Last refreshed
                    </div>
                    <div className="font-medium">2 minutes ago</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
