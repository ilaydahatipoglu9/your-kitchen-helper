import { useEffect, useMemo, useState } from "react";
import { Bell, CalendarClock, ChevronRight, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

type Match = {
  id: string;
  status: "LIVE" | "UPCOMING";
  league: string;
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  startTime: string;
  highlight?: string;
};

type FeedItem = {
  id: string;
  type: "news" | "stat" | "recommendation";
  title: string;
  description: string;
  meta: string;
};

function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="group h-full border-white/10 bg-white/5 text-white shadow-sm backdrop-blur transition-colors hover:bg-white/10">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-medium text-white/70">{match.league}</div>
            <CardTitle className="text-base font-semibold text-white">
              {match.home} vs {match.away}
            </CardTitle>
            <CardDescription className="text-xs text-white/70">{match.startTime}</CardDescription>
          </div>
          <Badge variant={match.status === "LIVE" ? "destructive" : "secondary"} className="shrink-0">
            {match.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            {match.status === "LIVE" ? (
              <div className="text-3xl font-semibold tracking-tight" aria-live="polite">
                {match.homeScore}–{match.awayScore}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CalendarClock className="h-4 w-4" aria-hidden />
                <span>Next up</span>
              </div>
            )}
            {match.highlight ? <div className="text-xs text-white/70">{match.highlight}</div> : null}
          </div>
          <Button variant="secondary" className="bg-white/15 text-white hover:bg-white/25" size="sm">
            Details <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const icon =
    item.type === "news" ? (
      <Sparkles className="h-4 w-4" aria-hidden />
    ) : item.type === "stat" ? (
      <Star className="h-4 w-4" aria-hidden />
    ) : (
      <Bell className="h-4 w-4" aria-hidden />
    );

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              {icon}
              <span className="capitalize">{item.type}</span>
              <span aria-hidden>•</span>
              <span>{item.meta}</span>
            </div>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" aria-label="Save to favorites">
            <Star className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">Open for full details and related stats.</div>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomeDashboard() {
  const [loading, setLoading] = useState(true);
  const [hasFavorites, setHasFavorites] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(true);

  const matches = useMemo<Match[]>(
    () => [
      {
        id: "m1",
        status: "LIVE",
        league: "Premier League",
        home: "Seabrook FC",
        away: "Harbor United",
        homeScore: 2,
        awayScore: 1,
        startTime: "Live • 72'",
        highlight: "Goal: Seabrook FC (68')",
      },
      {
        id: "m2",
        status: "UPCOMING",
        league: "NBA",
        home: "Bay City Sharks",
        away: "Northport Eagles",
        startTime: "Today • 8:00 PM",
        highlight: "Your favorite player is starting",
      },
      {
        id: "m3",
        status: "UPCOMING",
        league: "MLB",
        home: "Coastline Mariners",
        away: "Riverside Bears",
        startTime: "Tomorrow • 1:10 PM",
      },
    ],
    [],
  );

  const feed = useMemo<FeedItem[]>(
    () => [
      {
        id: "f1",
        type: "news",
        title: "Harbor United announces late lineup change",
        description: "A defensive reshuffle could impact the second-half tempo.",
        meta: "2m ago",
      },
      {
        id: "f2",
        type: "stat",
        title: "Seabrook FC: 58% possession, 7 shots on target",
        description: "Efficiency in the final third has been the difference.",
        meta: "Live",
      },
      {
        id: "f3",
        type: "recommendation",
        title: "Follow Bay City Sharks for game alerts",
        description: "Enable notifications to get tip-off and highlight updates.",
        meta: "Suggested",
      },
    ],
    [],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-maritime-soft pb-20">
      {/* Hero */}
      <section className="bg-maritime">
        <div className="container max-w-[1200px] px-4 py-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-white/70">Welcome back</div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Your personalized sports dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Live scores, upcoming matches, and a calm feed tailored to your favorites.
              </p>
            </div>
            <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/80 md:flex">
              <div className="text-xs">Live updates</div>
              <Switch checked={liveUpdates} onCheckedChange={setLiveUpdates} aria-label="Toggle live updates" />
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-5">
                  <Skeleton className="h-4 w-24 bg-white/10" />
                  <Skeleton className="mt-3 h-6 w-3/4 bg-white/10" />
                  <Skeleton className="mt-6 h-10 w-28 bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="container max-w-[1200px] px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12" role="region" aria-label="Personalized content">
          {/* Left rail (desktop) */}
          <aside className="hidden lg:col-span-2 lg:block" aria-label="Quick navigation">
            <div className="space-y-2 rounded-lg border bg-background p-3 shadow-sm">
              <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground">Quick access</div>
              {["Favorites", "Notifications", "Discover"].map((t) => (
                <Button key={t} variant="ghost" className="w-full justify-start">
                  {t}
                </Button>
              ))}
            </div>
          </aside>

          {/* Main feed */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">For you</h2>
              <Button variant="outline" size="sm" onClick={() => setLoading(true)}>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="mt-2 h-6 w-3/4" />
                      <Skeleton className="mt-2 h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-9 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : feed.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No personalized items yet</CardTitle>
                  <CardDescription>Start by adding favorites to tailor your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setHasFavorites(true)}>Explore and add favorites</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {feed.map((item) => (
                  <FeedCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-3" aria-label="Preferences and quick actions">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Favorites</CardTitle>
                  <CardDescription>Stay close to the teams and leagues you care about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">You have favorites</div>
                    <Switch checked={hasFavorites} onCheckedChange={setHasFavorites} aria-label="Toggle having favorites" />
                  </div>
                  {!hasFavorites ? (
                    <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                      No favorites yet — explore and add your favorite teams.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {["Seabrook FC", "Bay City Sharks", "Premier League"].map((t) => (
                        <Badge key={t} variant="secondary" className="bg-secondary/70">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <CardDescription>Control which updates reach you first.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Live score changes", defaultChecked: true },
                    { label: "Game start reminders", defaultChecked: true },
                    { label: "Breaking news", defaultChecked: false },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between gap-3">
                      <div className="text-sm">{n.label}</div>
                      <Switch defaultChecked={n.defaultChecked} aria-label={`Toggle ${n.label}`} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
