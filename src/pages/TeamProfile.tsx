import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, HeartOff, Users, Trophy, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchCard } from "@/components/sports/MatchCard";
import { PlayerCard } from "@/components/sports/PlayerCard";
import { SectionHeader, EmptyState } from "@/components/common";
import { cn } from "@/lib/utils";
import { mockTeams, mockPlayers, mockLiveMatches, mockUpcomingMatches, mockCompletedMatches } from "@/data/mockData";

export default function TeamProfile() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = mockTeams.find((t) => t.id === teamId);
  const [isFollowed, setIsFollowed] = useState(team?.isFollowed ?? false);

  if (!team) {
    return (
      <div className="space-y-6">
        <Link to="/teams">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </Link>
        <EmptyState
          type="custom"
          title="Team not found"
          description="The team you're looking for doesn't exist."
          action={{
            label: "Browse Teams",
            onClick: () => window.location.href = "/teams",
          }}
        />
      </div>
    );
  }

  // Get team's players
  const teamPlayers = mockPlayers.filter((p) => p.team?.id === team.id);

  // Get team's matches (mock - in real app would filter by team)
  const allMatches = [...mockLiveMatches, ...mockUpcomingMatches, ...mockCompletedMatches];
  const teamMatches = allMatches.filter(
    (m) => m.homeTeam.id === team.id || m.awayTeam.id === team.id
  );
  const upcomingMatches = teamMatches.filter((m) => m.status === "upcoming");
  const recentMatches = teamMatches.filter((m) => m.status === "completed");

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="space-y-6" data-usecases="UC_042">
      {/* Back Button */}
      <Link to="/teams">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>
      </Link>

      {/* Team Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Team Logo */}
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
              {team.shortName?.substring(0, 2) || team.name.substring(0, 2)}
            </div>

            {/* Team Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-2xl font-heading font-bold">{team.name}</h1>
                {team.shortName && (
                  <Badge variant="secondary">{team.shortName}</Badge>
                )}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {team.sport}
                </span>
                {team.league && (
                  <Link 
                    to={`/leagues/${team.league.id}`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    {team.league.name}
                  </Link>
                )}
                {team.country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {team.country}
                  </span>
                )}
              </div>

              {/* Follow Button */}
              <Button
                variant={isFollowed ? "default" : "outline"}
                onClick={handleFollowToggle}
                className={cn(isFollowed && "bg-primary hover:bg-primary/90")}
                data-usecases="UC_007,UC_008"
              >
                {isFollowed ? (
                  <>
                    <HeartOff className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Team
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Matches Played</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-success">10</p>
            <p className="text-sm text-muted-foreground">Wins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-warning">3</p>
            <p className="text-sm text-muted-foreground">Draws</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-destructive">2</p>
            <p className="text-sm text-muted-foreground">Losses</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="matches" data-usecases="UC_041">
            Matches
          </TabsTrigger>
          <TabsTrigger value="squad" data-usecases="UC_042">
            Squad
          </TabsTrigger>
          <TabsTrigger value="stats" data-usecases="UC_042">
            Statistics
          </TabsTrigger>
        </TabsList>

        {/* Matches Tab */}
        <TabsContent value="matches" className="space-y-8 mt-6">
          {/* Upcoming Matches */}
          <section>
            <SectionHeader
              title="Upcoming Matches"
              icon={<Calendar className="h-4 w-4" />}
            />
            {upcomingMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState
                type="no-upcoming"
                title="No upcoming matches"
                description="Check back later for scheduled matches."
              />
            )}
          </section>

          {/* Recent Results */}
          <section>
            <SectionHeader
              title="Recent Results"
              icon={<Trophy className="h-4 w-4" />}
            />
            {recentMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {recentMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState
                type="custom"
                title="No recent results"
                description="Match results will appear here."
              />
            )}
          </section>
        </TabsContent>

        {/* Squad Tab */}
        <TabsContent value="squad" className="mt-6">
          <SectionHeader
            title="Team Squad"
            subtitle={`${teamPlayers.length} players`}
          />
          {teamPlayers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teamPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} variant="compact" />
              ))}
            </div>
          ) : (
            <EmptyState
              type="custom"
              title="No players found"
              description="Squad information is not available for this team."
            />
          )}
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Season Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goals Scored</span>
                    <span className="font-bold">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goals Conceded</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clean Sheets</span>
                    <span className="font-bold">6</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Possession Avg</span>
                    <span className="font-bold">58%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pass Accuracy</span>
                    <span className="font-bold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shots per Game</span>
                    <span className="font-bold">14.2</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
