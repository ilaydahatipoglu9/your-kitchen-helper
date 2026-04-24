import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Activity, Calendar, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MatchCard from "@/components/sports/MatchCard";
import ContentCard from "@/components/sports/ContentCard";
import SectionHeader from "@/components/sports/SectionHeader";
import EmptyState from "@/components/ui/empty-state";
import { MatchCardSkeleton, ContentCardSkeleton } from "@/components/ui/skeleton-loader";
import {
  mockUserProfile,
  mockTeams,
  mockLeagues,
  liveMatches,
  upcomingMatches,
  trendingContent,
} from "@/data/mockData";

const MySports = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const favoriteTeams = mockTeams.filter((t) =>
    mockUserProfile.preferences.favoriteTeams.includes(t.id)
  );
  const favoriteLeagues = mockLeagues.filter((l) =>
    mockUserProfile.preferences.favoriteLeagues.includes(l.id)
  );

  // Filter matches for favorite teams (mock - in real app would filter properly)
  const myLiveMatches = liveMatches.slice(0, 2);
  const myUpcomingMatches = upcomingMatches.slice(0, 3);
  const myContent = trendingContent.slice(0, 4);

  const hasFollowing = favoriteTeams.length > 0 || favoriteLeagues.length > 0;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <MatchCardSkeleton key={i} className="min-w-[280px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <ContentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!hasFollowing) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">My Sports</h1>
          <p className="text-muted-foreground">
            Your personalized sports feed
          </p>
        </div>
        <EmptyState
          type="no-favorites"
          title="Start following your favorites"
          description="Follow teams, leagues, and players to see personalized content here."
          actionLabel="Explore Teams"
          actionHref="/search?type=team"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8" data-usecases="UC_007,UC_009">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">My Sports</h1>
          <p className="text-muted-foreground">
            Your personalized sports feed
          </p>
        </div>
        <Button asChild variant="outline" data-usecases="UC_007,UC_008">
          <Link to="/preferences">
            <Settings className="mr-2 h-4 w-4" />
            Manage Preferences
          </Link>
        </Button>
      </div>

      {/* Following Summary */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Following:
            </span>
            {favoriteTeams.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {team.name}
                </Badge>
              </Link>
            ))}
            {favoriteLeagues.map((league) => (
              <Link key={league.id} to={`/league/${league.id}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  {league.name}
                </Badge>
              </Link>
            ))}
            <Link to="/preferences">
              <Badge variant="outline" className="cursor-pointer">
                + Add more
              </Badge>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Live Matches from Favorites */}
      <section aria-label="Live from your favorites" data-usecases="UC_046,UC_086">
        <SectionHeader
          title="Live Now"
          icon={<Activity className="h-5 w-5 text-live" />}
          seeAllHref="/live"
        />
        
        {myLiveMatches.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {myLiveMatches.map((match) => (
                <div key={match.id} className="min-w-[280px] md:min-w-[320px]">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState
                type="no-live"
                title="No live matches from your favorites"
                description="None of your followed teams are playing right now."
              />
            </CardContent>
          </Card>
        )}
      </section>

      {/* Upcoming Matches */}
      <section aria-label="Upcoming matches" data-usecases="UC_041">
        <SectionHeader
          title="Upcoming"
          icon={<Calendar className="h-5 w-5 text-primary" />}
          seeAllHref="/schedule"
        />
        
        {myUpcomingMatches.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {myUpcomingMatches.map((match) => (
                <div key={match.id} className="min-w-[280px] md:min-w-[320px]">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card>
            <CardContent className="py-8">
              <EmptyState type="no-matches" />
            </CardContent>
          </Card>
        )}
      </section>

      {/* Personalized Content */}
      <section aria-label="Content for you" data-usecases="UC_040">
        <SectionHeader
          title="For You"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          seeAllHref="/content"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myContent.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MySports;
