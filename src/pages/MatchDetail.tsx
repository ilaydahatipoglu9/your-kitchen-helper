import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Activity,
  Clock,
  ChevronLeft,
  Bell,
  Share2,
  Users,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { HeroSkeleton, TableRowSkeleton } from "@/components/ui/skeleton-loader";
import { useToast } from "@/hooks/use-toast";
import {
  liveMatches,
  upcomingMatches,
  finishedMatches,
  mockMatchEvents,
  mockMatchStats,
} from "@/data/mockData";
import type { MatchData } from "@/components/sports/MatchCard";

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [match, setMatch] = useState<MatchData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allMatches = [...liveMatches, ...upcomingMatches, ...finishedMatches];
      const foundMatch = allMatches.find((m) => m.id === id);
      setMatch(foundMatch || null);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleSetReminder = () => {
    toast({
      title: "Reminder set",
      description: "You'll be notified when this match starts.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied",
      description: "Match link has been copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <HeroSkeleton />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRowSkeleton key={i} columns={3} />
          ))}
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="font-heading text-xl font-bold">Match not found</h2>
        <p className="text-muted-foreground">
          The match you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  const isLive = match.status === "live" || match.status === "halftime";
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const events = mockMatchEvents.filter((e) => e.matchId === match.id);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return "Goal";
      case "yellow_card":
        return "Yellow Card";
      case "red_card":
        return "Red Card";
      case "substitution":
        return "Substitution";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6" data-usecases="UC_041,UC_046,UC_086">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Match Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 text-white">
          {/* League and Status */}
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {match.league.name}
            </Badge>
            {isLive ? (
              <Badge variant="destructive" className="flex items-center gap-1 bg-live animate-pulse-live">
                <Activity className="h-3 w-3" />
                LIVE {match.matchTime && `- ${match.matchTime}'`}
              </Badge>
            ) : match.status === "finished" ? (
              <Badge className="bg-success">Full Time</Badge>
            ) : (
              <Badge variant="outline" className="border-white/30 text-white">
                <Clock className="mr-1 h-3 w-3" />
                {match.startTime}
              </Badge>
            )}
          </div>

          {/* Teams and Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <Link
              to={`/team/${match.homeTeam.id}`}
              className="flex flex-1 flex-col items-center gap-3 text-center transition-transform hover:scale-105"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <span className="text-3xl font-bold">
                  {match.homeTeam.name.charAt(0)}
                </span>
              </div>
              <span className="font-semibold">{match.homeTeam.name}</span>
            </Link>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              {hasScore ? (
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold">{match.homeScore}</span>
                  <span className="text-2xl text-white/60">-</span>
                  <span className="text-5xl font-bold">{match.awayScore}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">VS</span>
              )}
            </div>

            {/* Away Team */}
            <Link
              to={`/team/${match.awayTeam.id}`}
              className="flex flex-1 flex-col items-center gap-3 text-center transition-transform hover:scale-105"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <span className="text-3xl font-bold">
                  {match.awayTeam.name.charAt(0)}
                </span>
              </div>
              <span className="font-semibold">{match.awayTeam.name}</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              onClick={handleSetReminder}
              data-usecases="UC_020,UC_141"
            >
              <Bell className="mr-2 h-4 w-4" />
              Set Reminder
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      {/* Match Details Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="lineups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lineups
          </TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-6" data-usecases="UC_046">
          <Card>
            <CardHeader>
              <CardTitle>Match Events</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {event.minute}'
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{getEventIcon(event.type)}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.player}
                          {event.assist && ` (Assist: ${event.assist})`}
                          {event.playerIn && ` In: ${event.playerIn}`}
                          {event.playerOut && ` Out: ${event.playerOut}`}
                        </p>
                      </div>
                      <Badge variant={event.team === "home" ? "default" : "secondary"}>
                        {event.team === "home" ? match.homeTeam.shortName : match.awayTeam.shortName}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No events recorded yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6" data-usecases="UC_086">
          <Card>
            <CardHeader>
              <CardTitle>Match Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Possession */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{mockMatchStats.possession.home}%</span>
                  <span className="font-medium">Possession</span>
                  <span>{mockMatchStats.possession.away}%</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary"
                    style={{ width: `${mockMatchStats.possession.home}%` }}
                  />
                  <div
                    className="bg-secondary"
                    style={{ width: `${mockMatchStats.possession.away}%` }}
                  />
                </div>
              </div>

              <Separator />

              {/* Shots */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{mockMatchStats.shots.home}</span>
                  <span className="font-medium">Shots</span>
                  <span>{mockMatchStats.shots.away}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-primary"
                    style={{
                      width: `${(mockMatchStats.shots.home / (mockMatchStats.shots.home + mockMatchStats.shots.away)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Shots on Target */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{mockMatchStats.shotsOnTarget.home}</span>
                  <span className="font-medium">Shots on Target</span>
                  <span>{mockMatchStats.shotsOnTarget.away}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-primary"
                    style={{
                      width: `${(mockMatchStats.shotsOnTarget.home / (mockMatchStats.shotsOnTarget.home + mockMatchStats.shotsOnTarget.away)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <Separator />

              {/* Corners */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{mockMatchStats.corners.home}</span>
                  <span className="font-medium">Corners</span>
                  <span>{mockMatchStats.corners.away}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-primary"
                    style={{
                      width: `${(mockMatchStats.corners.home / (mockMatchStats.corners.home + mockMatchStats.corners.away)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Fouls */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{mockMatchStats.fouls.home}</span>
                  <span className="font-medium">Fouls</span>
                  <span>{mockMatchStats.fouls.away}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-primary"
                    style={{
                      width: `${(mockMatchStats.fouls.home / (mockMatchStats.fouls.home + mockMatchStats.fouls.away)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <Separator />

              {/* Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold text-amber-500">
                    {mockMatchStats.yellowCards.home} - {mockMatchStats.yellowCards.away}
                  </p>
                  <p className="text-sm text-muted-foreground">Yellow Cards</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold text-live">
                    {mockMatchStats.redCards.home} - {mockMatchStats.redCards.away}
                  </p>
                  <p className="text-sm text-muted-foreground">Red Cards</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lineups Tab */}
        <TabsContent value="lineups" className="mt-6" data-usecases="UC_042">
          <Card>
            <CardHeader>
              <CardTitle>Team Lineups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Home Team */}
                <div>
                  <h3 className="mb-4 font-semibold">{match.homeTeam.name}</h3>
                  <div className="space-y-2">
                    {["Goalkeeper", "Defender", "Defender", "Defender", "Defender", "Midfielder", "Midfielder", "Midfielder", "Forward", "Forward", "Forward"].map((position, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border p-2"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium">Player {i + 1}</p>
                          <p className="text-xs text-muted-foreground">{position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Away Team */}
                <div>
                  <h3 className="mb-4 font-semibold">{match.awayTeam.name}</h3>
                  <div className="space-y-2">
                    {["Goalkeeper", "Defender", "Defender", "Defender", "Defender", "Midfielder", "Midfielder", "Midfielder", "Forward", "Forward", "Forward"].map((position, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border p-2"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium">Player {i + 1}</p>
                          <p className="text-xs text-muted-foreground">{position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchDetail;
