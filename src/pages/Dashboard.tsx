import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import {
  MatchCard,
  ContentCard,
  QuickScoresWidget,
  TrendingWidget,
  MatchDetailModal,
  Match,
} from "@/components/sports";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, RefreshCw } from "lucide-react";
import { mockMatches, mockContent, mockTrendingItems } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get featured match (first live match or first upcoming)
  const featuredMatch = mockMatches.find((m) => m.status === "live") || mockMatches.find((m) => m.status === "upcoming");
  
  // Get live matches
  const liveMatches = mockMatches.filter((m) => m.status === "live");
  
  // Get upcoming matches
  const upcomingMatches = mockMatches.filter((m) => m.status === "upcoming");

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const RightSidebarContent = (
    <div className="p-4 space-y-6">
      <QuickScoresWidget
        matches={mockMatches}
        onMatchClick={(match) => setSelectedMatch(match)}
        onViewAll={() => navigate("/my-sports")}
        isLoading={isLoading}
        onRefresh={handleRefresh}
      />
      <TrendingWidget
        items={mockTrendingItems}
        onItemClick={(item) => navigate(`/search?q=${encodeURIComponent(item.title)}`)}
        onViewAll={() => navigate("/search")}
      />
    </div>
  );

  return (
    <MainLayout showRightSidebar rightSidebarContent={RightSidebarContent}>
      <div className="p-4 lg:p-6 space-y-8 max-w-5xl">
        {/* Hero Section - Featured Match */}
        {featuredMatch && (
          <section data-usecases="UC_046,UC_048">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl">Featured Match</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            {isLoading ? (
              <Skeleton className="h-64 w-full rounded-lg" />
            ) : (
              <MatchCard
                match={featuredMatch}
                variant="hero"
                onClick={() => setSelectedMatch(featuredMatch)}
              />
            )}
          </section>
        )}

        {/* Live Now Section */}
        {liveMatches.length > 0 && (
          <section data-usecases="UC_046,UC_048,UC_086">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <h2 className="font-heading font-bold text-xl">Live Now</h2>
                <span className="text-sm text-muted-foreground">({liveMatches.length})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/my-sports?filter=live")}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-4 pb-4">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-32 w-52 rounded-lg shrink-0" />
                    ))
                  : liveMatches.map((match) => (
                      <div key={match.id} className="shrink-0">
                        <MatchCard
                          match={match}
                          variant="compact"
                          onClick={() => setSelectedMatch(match)}
                        />
                      </div>
                    ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section data-usecases="UC_041">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl">Upcoming</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/my-sports?filter=upcoming")}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {isLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-lg" />
                  ))
                : upcomingMatches.slice(0, 4).map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                    />
                  ))}
            </div>
          </section>
        )}

        {/* Content Feed */}
        <section data-usecases="UC_040,UC_016,UC_017">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl">For You</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
            >
              Explore More
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Featured Content */}
          {mockContent.length > 0 && (
            <div className="mb-6">
              {isLoading ? (
                <Skeleton className="h-64 w-full rounded-lg" />
              ) : (
                <ContentCard
                  content={mockContent[0]}
                  variant="featured"
                  onClick={() => navigate(`/content/${mockContent[0].id}`)}
                />
              )}
            </div>
          )}

          {/* Content Grid */}
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-lg" />
                ))
              : mockContent.slice(1).map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onClick={() => navigate(`/content/${content.id}`)}
                  />
                ))}
          </div>
        </section>

        {/* Mobile Quick Scores (shown on smaller screens) */}
        <section className="xl:hidden" data-usecases="UC_046,UC_048">
          <QuickScoresWidget
            matches={mockMatches}
            onMatchClick={(match) => setSelectedMatch(match)}
            onViewAll={() => navigate("/my-sports")}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
        </section>

        {/* Mobile Trending (shown on smaller screens) */}
        <section className="xl:hidden" data-usecases="UC_016,UC_017">
          <TrendingWidget
            items={mockTrendingItems}
            onItemClick={(item) => navigate(`/search?q=${encodeURIComponent(item.title)}`)}
            onViewAll={() => navigate("/search")}
          />
        </section>
      </div>

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        open={!!selectedMatch}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      />
    </MainLayout>
  );
}
