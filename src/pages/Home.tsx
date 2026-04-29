import { useState } from "react";
import { Zap, Calendar, Clock, Newspaper } from "lucide-react";
import { MatchCard } from "@/components/sports/MatchCard";
import { NewsCard } from "@/components/sports/NewsCard";
import { SectionHeader, StatusFilterBar, SportFilterBar, EmptyState } from "@/components/common";
import { MatchCardSkeleton, NewsCardSkeleton } from "@/components/common/LoadingState";
import {
  mockLiveMatches,
  mockUpcomingMatches,
  mockCompletedMatches,
  mockNews,
  mockSports,
} from "@/data/mockData";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");
  const [sportFilter, setSportFilter] = useState<string | null>(null);
  const [isLoading] = useState(false);

  // Filter matches based on status and sport
  const filterMatches = (matches: typeof mockLiveMatches) => {
    return matches.filter((match) => {
      if (sportFilter && match.sport.toLowerCase() !== sportFilter.toLowerCase()) {
        return false;
      }
      return true;
    });
  };

  const filteredLiveMatches = filterMatches(mockLiveMatches);
  const filteredUpcomingMatches = filterMatches(mockUpcomingMatches);
  const filteredCompletedMatches = filterMatches(mockCompletedMatches);

  const showLive = statusFilter === "all" || statusFilter === "live";
  const showUpcoming = statusFilter === "all" || statusFilter === "upcoming";
  const showCompleted = statusFilter === "all" || statusFilter === "completed";

  const counts = {
    all: mockLiveMatches.length + mockUpcomingMatches.length + mockCompletedMatches.length,
    live: mockLiveMatches.length,
    upcoming: mockUpcomingMatches.length,
    completed: mockCompletedMatches.length,
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-usecases="UC_041,UC_086">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold mb-2">Live Sports Dashboard</h1>
        <p className="text-muted-foreground">
          Stay updated with live scores, upcoming matches, and recent results
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <StatusFilterBar
          activeStatus={statusFilter}
          onStatusChange={setStatusFilter}
          counts={counts}
        />
        <SportFilterBar
          sports={mockSports}
          activeSport={sportFilter}
          onSportChange={setSportFilter}
        />
      </div>

      {/* Live Matches Section */}
      {showLive && (
        <section aria-labelledby="live-matches-heading">
          <SectionHeader
            title="Live Now"
            subtitle={`${filteredLiveMatches.length} matches in progress`}
            icon={<Zap className="h-4 w-4" />}
            viewAllHref="/matches?status=live"
            useCases="UC_041,UC_086"
          />
          
          {filteredLiveMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLiveMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  variant="featured"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="no-matches"
              action={{
                label: "View Upcoming Matches",
                onClick: () => setStatusFilter("upcoming"),
                useCases: "UC_041",
              }}
            />
          )}
        </section>
      )}

      {/* Upcoming Matches Section */}
      {showUpcoming && (
        <section aria-labelledby="upcoming-matches-heading">
          <SectionHeader
            title="Upcoming Matches"
            subtitle="Scheduled games for your followed teams"
            icon={<Calendar className="h-4 w-4" />}
            viewAllHref="/matches?status=upcoming"
            useCases="UC_041"
          />
          
          {filteredUpcomingMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  variant="default"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="no-upcoming"
              action={{
                label: "Discover Teams",
                onClick: () => window.location.href = "/discover",
                useCases: "UC_103",
              }}
            />
          )}
        </section>
      )}

      {/* Recent Results Section */}
      {showCompleted && (
        <section aria-labelledby="recent-results-heading">
          <SectionHeader
            title="Recent Results"
            subtitle="Final scores from completed matches"
            icon={<Clock className="h-4 w-4" />}
            viewAllHref="/matches?status=completed"
            useCases="UC_041"
          />
          
          {filteredCompletedMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCompletedMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  variant="default"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="custom"
              title="No recent results"
              description="Check back later for completed match results."
            />
          )}
        </section>
      )}

      {/* Personalized News Feed */}
      <section aria-labelledby="news-feed-heading">
        <SectionHeader
          title="Personalized Feed"
          subtitle="News and updates from your followed teams"
          icon={<Newspaper className="h-4 w-4" />}
          viewAllHref="/news"
        />
        
        {mockNews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {mockNews.slice(0, 2).map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                variant={index === 0 ? "featured" : "default"}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        )}
        
        {mockNews.length > 2 && (
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {mockNews.slice(2, 4).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
