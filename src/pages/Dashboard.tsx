import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { LiveMatchCard } from "@/components/matches/LiveMatchCard";
import { UpcomingMatchCard } from "@/components/matches/UpcomingMatchCard";
import { ContentCard } from "@/components/content/ContentCard";
import { QuickStats } from "@/components/widgets/QuickStats";
import { TrendingTopics } from "@/components/widgets/TrendingTopics";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Radio, Calendar, Newspaper } from "lucide-react";
import {
  mockLiveMatches,
  mockUpcomingMatches,
  mockContentItems,
  mockQuickStats,
  mockTrendingTopics,
} from "@/data/mockData";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [liveMatches] = useState(mockLiveMatches);
  const [upcomingMatches, setUpcomingMatches] = useState(mockUpcomingMatches);
  const [contentItems] = useState(mockContentItems);

  const handleSetNotification = (matchId: string) => {
    setUpcomingMatches((prev) =>
      prev.map((match) =>
        match.id === matchId
          ? { ...match, isNotificationSet: !match.isNotificationSet }
          : match
      )
    );
  };

  const rightPanel = (
    <div className="space-y-6">
      <QuickStats stats={mockQuickStats} title="Your Teams" />
      <TrendingTopics topics={mockTrendingTopics} />
    </div>
  );

  return (
    <MainLayout showRightPanel rightPanel={rightPanel}>
      <div className="space-y-8">
        {/* Live Matches Section */}
        <section aria-labelledby="live-matches-heading">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-live" />
              <h2
                id="live-matches-heading"
                className="text-xl font-bold text-foreground"
              >
                Live Matches
              </h2>
              {liveMatches.length > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-live bg-live/10 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-live animate-live-pulse" />
                  {liveMatches.length} Live
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/live" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} variant="match" />
              ))}
            </div>
          ) : liveMatches.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {liveMatches.slice(0, 3).map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              type="no-live-matches"
              onAction={() => {}}
              actionLabel="View Schedule"
            />
          )}
        </section>

        {/* Upcoming Matches Section */}
        <section aria-labelledby="upcoming-matches-heading">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-info" />
              <h2
                id="upcoming-matches-heading"
                className="text-xl font-bold text-foreground"
              >
                Upcoming Matches
              </h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/schedule" className="flex items-center gap-1">
                Full Schedule
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} variant="match" />
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {upcomingMatches.slice(0, 4).map((match) => (
                <UpcomingMatchCard
                  key={match.id}
                  match={match}
                  onSetNotification={handleSetNotification}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="no-upcoming-matches"
              onAction={() => {}}
              actionLabel="Explore Leagues"
            />
          )}
        </section>

        {/* Personalized Content Feed */}
        <section aria-labelledby="content-feed-heading">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              <h2
                id="content-feed-heading"
                className="text-xl font-bold text-foreground"
              >
                Your Feed
              </h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/feed" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <SkeletonCard variant="content" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} variant="content" />
                ))}
              </div>
            </div>
          ) : contentItems.length > 0 ? (
            <div className="space-y-6">
              {/* Featured Article */}
              <ContentCard content={contentItems[0]} variant="featured" />

              {/* Regular Articles Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contentItems.slice(1, 4).map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              type="no-content"
              onAction={() => {}}
              actionLabel="Manage Preferences"
            />
          )}
        </section>
      </div>
    </MainLayout>
  );
}
