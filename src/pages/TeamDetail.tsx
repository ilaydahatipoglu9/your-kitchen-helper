import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Users,
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MatchCard from "@/components/sports/MatchCard";
import { ProfileCardSkeleton, MatchCardSkeleton } from "@/components/ui/skeleton-loader";
import EmptyState from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import {
  mockTeams,
  mockPlayers,
  liveMatches,
  upcomingMatches,
  finishedMatches,
} from "@/data/mockData";

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const team = mockTeams.find((t) => t.id === id);
  const teamPlayers = mockPlayers.filter((p) =>
    p.team.toLowerCase().includes(team?.name.toLowerCase().split(" ")[0] || "")
  );

  // Get matches for this team (mock - in real app would filter by team)
  const teamMatches = [...liveMatches, ...upcomingMatches, ...finishedMatches].slice(0, 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing
        ? `You are no longer following ${team?.name}`
        : `You are now following ${team?.name}`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileCardSkeleton />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <MatchCardSkeleton key={i} className="min-w-[280px]" />
          ))}
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="font-heading text-xl font-bold">Team not found</h2>
        <p className="text-muted-foreground">
          The team you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-usecases="UC_042">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Team Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Team Logo */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 md:h-32 md:w-32">
              <span className="text-4xl font-bold text-primary md:text-5xl">
                {team.shortName.charAt(0)}
              </span>
            </div>

            {/* Team Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-2xl font-bold md:text-3xl">
                {team.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Badge variant="secondary">
                  <Trophy className="mr-1 h-3 w-3" />
                  {team.league}
                </Badge>
                <Badge variant="outline">{team.sport}</Badge>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  England
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Founded 1878
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  25 Players
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <Button
              variant={isFollowing ? "secondary" : "default"}
              onClick={handleFollow}
              className="min-w-[120px]"
              data-usecases="UC_007,UC_008"
            >
              <Star className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Content Tabs */}
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="squad">Squad</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        {/* Matches Tab */}
        <TabsContent value="matches" className="mt-6" data-usecases="UC_041">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Recent & Upcoming</h3>
            {teamMatches.length > 0 ? (
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {teamMatches.map((match) => (
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
          </div>
        </TabsContent>

        {/* Squad Tab */}
        <TabsContent value="squad" className="mt-6" data-usecases="UC_042">
          <Card>
            <CardHeader>
              <CardTitle>Squad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teamPlayers.length > 0 ? (
                  teamPlayers.map((player) => (
                    <Link
                      key={player.id}
                      to={`/player/${player.id}`}
                      className="flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md hover:scale-[1.02]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-bold text-primary">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.position}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  // Show placeholder players
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">Player {i + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {["Goalkeeper", "Defender", "Midfielder", "Forward"][i % 4]}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary">15</p>
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
                <p className="text-3xl font-bold text-amber-500">3</p>
                <p className="text-sm text-muted-foreground">Draws</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-live">2</p>
                <p className="text-sm text-muted-foreground">Losses</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Season Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Goals Scored</span>
                  <span className="font-bold">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Goals Conceded</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Clean Sheets</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">League Position</span>
                  <span className="font-bold">3rd</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamDetail;
