import { useState, useEffect } from "react";
import { Activity, Calendar, TrendingUp, Star } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HeroSection from "@/components/sports/HeroSection";
import MatchCard from "@/components/sports/MatchCard";
import ContentCard from "@/components/sports/ContentCard";
import SectionHeader from "@/components/sports/SectionHeader";
import EmptyState from "@/components/ui/empty-state";
import {
  MatchCardSkeleton,
  ContentCardSkeleton,
  HeroSkeleton,
} from "@/components/ui/skeleton-loader";
import {
  liveMatches,
  upcomingMatches,
  trendingContent,
} from "@/data/mockData";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const featuredMatch = liveMatches[0];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <HeroSkeleton />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <MatchCardSkeleton key={i} className="min-w-[280px]" />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <ContentCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section - Featured Live Match */}
      <section aria-label="Featured Match">
        <HeroSection match={featuredMatch} />
      </section>

      {/* Live Scores Section */}
      <section aria-label="Live Scores" data-usecases="UC_046,UC_086,UC_048">
        <SectionHeader
          title="Live Scores"
          icon={<Activity className="h-5 w-5 text-live" />}
          seeAllHref="/live"
        />
        
        {liveMatches.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {liveMatches.map((match) => (
                <div key={match.id} className="min-w-[280px] md:min-w-[320px]">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyState type="no-live" />
        )}
      </section>

      {/* My Sports Section - Personalized Content */}
      <section aria-label="My Sports" data-usecases="UC_007,UC_009">
        <SectionHeader
          title="My Sports"
          icon={<Star className="h-5 w-5 text-amber-500" />}
          seeAllHref="/my-sports"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingContent.slice(0, 3).map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section aria-label="Upcoming Matches" data-usecases="UC_041">
        <SectionHeader
          title="Upcoming Matches"
          icon={<Calendar className="h-5 w-5 text-primary" />}
          seeAllHref="/schedule"
        />
        
        {upcomingMatches.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="min-w-[280px] md:min-w-[320px]">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyState type="no-matches" />
        )}
      </section>

      {/* Trending Content Section */}
      <section aria-label="Trending Content" data-usecases="UC_040">
        <SectionHeader
          title="Trending"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          seeAllHref="/content"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingContent.slice(3, 6).map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
