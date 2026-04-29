import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Bell,
  Share2,
  Clock,
  MapPin,
  Trophy,
  Users,
  Activity,
} from "lucide-react";
import { mockLiveMatches, mockUpcomingMatches, mockMatchEvents } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function MatchDetailPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  // Find match from mock data
  const liveMatch = mockLiveMatches.find((m) => m.id === matchId);
  const upcomingMatch = mockUpcomingMatches.find((m) => m.id === matchId);
  const match = liveMatch || upcomingMatch;
  const isLive = !!liveMatch;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Match not found</h2>
        <p className="text-muted-foreground mb-4">
          The match you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const homeTeam = liveMatch?.homeTeam || upcomingMatch?.homeTeam;
  const awayTeam = liveMatch?.awayTeam || upcomingMatch?.awayTeam;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-heading font-bold">Match Details</h1>
            <p className="text-sm text-muted-foreground">{match.league}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant={subscribed ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSubscribed(!subscribed)}
            className={cn(subscribed && "bg-success/10 text-success hover:bg-success/20")}
            data-usecases="UC_088"
          >
            <Bell className={cn("h-4 w-4 mr-2", subscribed && "fill-current")} />
            {subscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>

      {/* Score Card */}
      <Card className={cn(isLive && "border-l-4 border-l-live")}>
        <CardContent className="p-6">
          {/* Live indicator */}
          {isLive && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
              </span>
              <span className="text-sm font-semibold text-live">
                LIVE - {liveMatch?.matchClock} ({liveMatch?.period})
              </span>
            </div>
          )}

          {/* Teams and Score */}
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                <span className="text-2xl font-bold text-muted-foreground">
                  {homeTeam?.shortName?.slice(0, 2)}
                </span>
              </div>
              <p className="font-semibold text-center">{homeTeam?.name}</p>
              <p className="text-xs text-muted-foreground">Home</p>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center px-6">
              {isLive ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold font-heading tabular-nums">
                    {liveMatch?.homeTeam.score}
                  </span>
                  <span className="text-2xl text-muted-foreground">-</span>
                  <span className="text-4xl font-bold font-heading tabular-nums">
                    {liveMatch?.awayTeam.score}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold">VS</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(upcomingMatch!.startTime, "MMM d, h:mm a")}
                  </p>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                <span className="text-2xl font-bold text-muted-foreground">
                  {awayTeam?.shortName?.slice(0, 2)}
                </span>
              </div>
              <p className="font-semibold text-center">{awayTeam?.name}</p>
              <p className="text-xs text-muted-foreground">Away</p>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4" />
              <span>{match.league}</span>
            </div>
            {(liveMatch?.venue || upcomingMatch?.venue) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{liveMatch?.venue || upcomingMatch?.venue}</span>
              </div>
            )}
            {!isLive && upcomingMatch && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{format(upcomingMatch.startTime, "EEEE, MMMM d, yyyy")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Auto-refresh toggle for live matches */}
      {isLive && (
        <div className="flex items-center justify-center gap-2">
          <Switch id="auto-refresh" defaultChecked data-usecases="UC_088" />
          <Label htmlFor="auto-refresh" className="text-sm">
            Auto-refresh scores
          </Label>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue={isLive ? "events" : "info"}>
        <TabsList className="w-full justify-start">
          {isLive && (
            <TabsTrigger value="events" className="gap-2">
              <Activity className="h-4 w-4" />
              Events
            </TabsTrigger>
          )}
          <TabsTrigger value="info" className="gap-2">
            <Trophy className="h-4 w-4" />
            Info
          </TabsTrigger>
          <TabsTrigger value="lineups" className="gap-2">
            <Users className="h-4 w-4" />
            Lineups
          </TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        {isLive && (
          <TabsContent value="events" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatchEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "flex items-start gap-4 p-3 rounded-lg",
                        event.team === "home" ? "bg-primary/5" : "bg-secondary/50"
                      )}
                      data-usecases="UC_086,UC_088"
                    >
                      <div className="text-sm font-medium text-muted-foreground w-16">
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.description}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {event.type} - {event.team === "home" ? homeTeam?.name : awayTeam?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Info Tab */}
        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Competition</p>
                  <p className="font-medium">{match.league}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sport</p>
                  <p className="font-medium">{match.sport}</p>
                </div>
                {(liveMatch?.venue || upcomingMatch?.venue) && (
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{liveMatch?.venue || upcomingMatch?.venue}</p>
                  </div>
                )}
                {!isLive && upcomingMatch && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {format(upcomingMatch.startTime, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lineups Tab */}
        <TabsContent value="lineups" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  {homeTeam?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lineup information will be available closer to game time.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  {awayTeam?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lineup information will be available closer to game time.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
