import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { LiveMatchCard } from "@/components/matches/LiveMatchCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Filter } from "lucide-react";
import { mockLiveMatches } from "@/data/mockData";
import { cn } from "@/lib/utils";

const leagues = [
  "All",
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Ligue 1",
];

export default function LiveScores() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [liveMatches] = useState(mockLiveMatches);

  const filteredMatches =
    selectedLeague === "All"
      ? liveMatches
      : liveMatches.filter((match) => match.league === selectedLeague);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-live" />
            <h1 className="text-2xl font-bold">Live Scores</h1>
            {liveMatches.length > 0 && (
              <Badge
                variant="destructive"
                className="animate-live-pulse bg-live text-live-foreground"
              >
                {liveMatches.length} Live
              </Badge>
            )}
          </div>
        </div>

        {/* League Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {leagues.map((league) => (
            <Button
              key={league}
              variant={selectedLeague === league ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLeague(league)}
              className="shrink-0"
            >
              {league}
            </Button>
          ))}
        </div>

        {/* Matches Grid */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} variant="match" />
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="no-live-matches"
            onAction={() => setSelectedLeague("All")}
            actionLabel="View All Leagues"
          />
        )}
      </div>
    </MainLayout>
  );
}
