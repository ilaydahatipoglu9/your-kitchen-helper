import { Link } from "react-router-dom";
import { TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LiveScore {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  league: string;
  sport: string;
}

interface TrendingItem {
  id: string;
  title: string;
  type: "team" | "player" | "match" | "news";
  href: string;
}

const mockLiveScores: LiveScore[] = [
  {
    id: "1",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    league: "Premier League",
    sport: "Football",
  },
  {
    id: "2",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 1,
    awayScore: 1,
    minute: 45,
    league: "La Liga",
    sport: "Football",
  },
  {
    id: "3",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeScore: 98,
    awayScore: 102,
    minute: 0,
    league: "NBA",
    sport: "Basketball",
  },
];

const mockTrending: TrendingItem[] = [
  {
    id: "1",
    title: "Champions League Quarter-Finals Draw",
    type: "news",
    href: "/news/champions-league-draw",
  },
  {
    id: "2",
    title: "Cristiano Ronaldo",
    type: "player",
    href: "/players/cristiano-ronaldo",
  },
  {
    id: "3",
    title: "Manchester City",
    type: "team",
    href: "/teams/manchester-city",
  },
  {
    id: "4",
    title: "NBA Playoffs Preview",
    type: "news",
    href: "/news/nba-playoffs",
  },
];

function LiveScoreCard({ score }: { score: LiveScore }) {
  return (
    <Link
      to={`/matches/${score.id}`}
      className="block rounded-lg border bg-card p-3 transition-all hover:shadow-md hover:-translate-y-0.5"
      data-usecases="UC_041,UC_086"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{score.league}</span>
        <Badge variant="destructive" className="bg-live text-live-foreground animate-pulse-live text-xs px-2 py-0">
          LIVE {score.minute > 0 ? `${score.minute}'` : ""}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate max-w-[120px]">{score.homeTeam}</span>
          <span className="text-lg font-bold">{score.homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate max-w-[120px]">{score.awayTeam}</span>
          <span className="text-lg font-bold">{score.awayScore}</span>
        </div>
      </div>
    </Link>
  );
}

function TrendingItemCard({ item }: { item: TrendingItem }) {
  const typeColors = {
    team: "bg-primary/10 text-primary",
    player: "bg-secondary/20 text-secondary-foreground",
    match: "bg-live/10 text-live",
    news: "bg-muted text-muted-foreground",
  };

  return (
    <Link
      to={item.href}
      className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
      data-usecases="UC_103,UC_114"
    >
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={typeColors[item.type]}>
          {item.type}
        </Badge>
        <span className="text-sm font-medium truncate max-w-[150px]">{item.title}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 border-l bg-card h-[calc(100vh-4rem)] sticky top-16">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Live Scores Widget */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-live animate-pulse-live" />
                  Live Scores
                </span>
                <Link
                  to="/matches?status=live"
                  className="text-xs text-primary hover:underline"
                  data-usecases="UC_041"
                >
                  View All
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLiveScores.length > 0 ? (
                mockLiveScores.map((score) => (
                  <LiveScoreCard key={score.id} score={score} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No live matches right now
                </p>
              )}
            </CardContent>
          </Card>

          {/* Trending Widget */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Trending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {mockTrending.map((item) => (
                <TrendingItemCard key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
}
