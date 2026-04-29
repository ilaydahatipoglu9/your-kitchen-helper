import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MatchCard, NewsCard } from "@/components/sports";
import { EmptyState } from "@/components/ui/empty-state";
import { FeedSkeleton } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Radio } from "lucide-react";
import {
  mockLiveMatches,
  mockUpcomingMatches,
  mockRecentResults,
  mockNews,
} from "@/data/mockData";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFollowedTeams] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (!hasFollowedTeams) {
    return (
      <EmptyState
        variant="no-teams"
        onAction={() => navigate("/discover")}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Live Matches Section */}
      {mockLiveMatches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
              </span>
              <h2 className="text-lg font-heading font-bold">Live Now</h2>
              <span className="text-sm text-muted-foreground">
                ({mockLiveMatches.length} games)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => navigate("/live")}
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {mockLiveMatches.slice(0, 4).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* No Live Matches */}
      {mockLiveMatches.length === 0 && (
        <section className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Radio className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-heading font-bold">Live Scores</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            No live games right now. Check back later or view the schedule.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/schedules")}>
            View Schedule
          </Button>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold">Upcoming Matches</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => navigate("/schedules")}
          >
            Full Schedule
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockUpcomingMatches.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Recent Results Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold">Recent Results</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => navigate("/schedules?tab=results")}
          >
            All Results
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockRecentResults.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* News Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold">Latest News</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockNews.slice(0, 4).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </div>
  );
}
