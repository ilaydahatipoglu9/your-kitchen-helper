import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Trophy,
  Calendar,
  MapPin,
  Users,
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
  mockLeagues,
  mockTeams,
  liveMatches,
  upcomingMatches,
} from "@/data/mockData";

const LeagueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const league = mockLeagues.find((l) => l.id === id);
  const leagueTeams = mockTeams.filter((t) => t.league === league?.name);
  const leagueMatches = [...liveMatches, ...upcomingMatches].slice(0, 5);

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
        ? `You are no longer following ${league?.name}`
        : `You are now following ${league?.name}`,
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

  if (!league) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="font-heading text-xl font-bold">League not found</h2>
        <p className="text-muted-foreground">
          The league you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  // Mock standings data
  const standings = leagueTeams.length > 0 
    ? leagueTeams.map((team, index) => ({
        position: index + 1,
        team: team.name,
        played: 15,
        won: 15 - index * 2,
        drawn: index,
        lost: index,
        points: (15 - index * 2) * 3 + index,
      }))
    : Array.from({ length: 6 }).map((_, index) => ({
        position: index + 1,
        team: `Team ${index + 1}`,
        played: 15,
        won: 15 - index * 2,
        drawn: index,
        lost: index,
        points: (15 - index * 2) * 3 + index,
      }));

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

      {/* League Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* League Logo */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 md:h-32 md:w-32">
              <Trophy className="h-12 w-12 text-amber-500 md:h-16 md:w-16" />
            </div>

            {/* League Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-2xl font-bold md:text-3xl">
                {league.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Badge variant="secondary">
                  <MapPin className="mr-1 h-3 w-3" />
                  {league.country}
                </Badge>
                <Badge variant="outline">{league.sport}</Badge>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  20 Teams
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Season 2024/25
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

      {/* League Content Tabs */}
      <Tabs defaultValue="standings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        {/* Standings Tab */}
        <TabsContent value="standings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>League Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left font-medium">#</th>
                      <th className="py-3 text-left font-medium">Team</th>
                      <th className="py-3 text-center font-medium">P</th>
                      <th className="py-3 text-center font-medium">W</th>
                      <th className="py-3 text-center font-medium">D</th>
                      <th className="py-3 text-center font-medium">L</th>
                      <th className="py-3 text-center font-medium">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((row) => (
                      <tr key={row.position} className="border-b last:border-0">
                        <td className="py-3 font-medium">{row.position}</td>
                        <td className="py-3">{row.team}</td>
                        <td className="py-3 text-center text-muted-foreground">{row.played}</td>
                        <td className="py-3 text-center text-muted-foreground">{row.won}</td>
                        <td className="py-3 text-center text-muted-foreground">{row.drawn}</td>
                        <td className="py-3 text-center text-muted-foreground">{row.lost}</td>
                        <td className="py-3 text-center font-bold">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="mt-6" data-usecases="UC_041">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Fixtures</h3>
            {leagueMatches.length > 0 ? (
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {leagueMatches.map((match) => (
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

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6" data-usecases="UC_042">
          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(leagueTeams.length > 0 ? leagueTeams : mockTeams.slice(0, 6)).map((team) => (
                  <Link
                    key={team.id}
                    to={`/team/${team.id}`}
                    className="flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md hover:scale-[1.02]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">
                        {team.shortName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {team.sport}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeagueDetail;
