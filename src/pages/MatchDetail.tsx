import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Calendar, Users, BarChart3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/common";
import { cn } from "@/lib/utils";
import {
  mockLiveMatches,
  mockUpcomingMatches,
  mockCompletedMatches,
  mockMatchEvents,
  mockMatchStats,
  mockLineup,
} from "@/data/mockData";

type EventType = "goal" | "yellow_card" | "red_card" | "substitution";

const eventIcons: Record<EventType, string> = {
  goal: "G",
  yellow_card: "Y",
  red_card: "R",
  substitution: "S",
};

const eventColors: Record<EventType, string> = {
  goal: "bg-success text-success-foreground",
  yellow_card: "bg-warning text-warning-foreground",
  red_card: "bg-destructive text-destructive-foreground",
  substitution: "bg-secondary text-secondary-foreground",
};

export default function MatchDetail() {
  const { matchId } = useParams<{ matchId: string }>();
  const [activeTab, setActiveTab] = useState("events");

  // Find the match from all match lists
  const allMatches = [...mockLiveMatches, ...mockUpcomingMatches, ...mockCompletedMatches];
  const match = allMatches.find((m) => m.id === matchId);

  if (!match) {
    return (
      <div className="space-y-6">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <EmptyState
          type="custom"
          title="Match not found"
          description="The match you're looking for doesn't exist or has been removed."
          action={{
            label: "Go to Home",
            onClick: () => window.location.href = "/",
          }}
        />
      </div>
    );
  }

  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const isCompleted = match.status === "completed";

  const matchDate = new Date(match.startTime);
  const formattedDate = matchDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = matchDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6" data-usecases="UC_041,UC_086">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      {/* Match Header */}
      <Card className={cn(isLive && "border-live/50")}>
        <CardContent className="pt-6">
          {/* League and Status */}
          <div className="flex items-center justify-between mb-6">
            <Link to={`/leagues/${match.league.id}`} className="text-sm text-muted-foreground hover:underline">
              {match.league.name}
            </Link>
            {isLive && (
              <Badge className="bg-live text-live-foreground animate-pulse-live">
                LIVE {match.minute ? `${match.minute}'` : ""}
              </Badge>
            )}
            {isCompleted && (
              <Badge variant="secondary" className="bg-success/10 text-success">
                Full Time
              </Badge>
            )}
            {isUpcoming && (
              <Badge variant="outline">Upcoming</Badge>
            )}
          </div>

          {/* Teams and Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <Link 
              to={`/teams/${match.homeTeam.id}`}
              className="flex flex-col items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {match.homeTeam.shortName?.substring(0, 2) || match.homeTeam.name.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-center">
                {match.homeTeam.name}
              </span>
            </Link>

            {/* Score / Time */}
            <div className="flex flex-col items-center">
              {isUpcoming ? (
                <div className="text-center">
                  <p className="text-2xl font-bold">{formattedTime}</p>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-4xl font-bold",
                    isLive && "animate-score-update"
                  )}>
                    {match.homeScore ?? 0}
                  </span>
                  <span className="text-2xl text-muted-foreground">-</span>
                  <span className={cn(
                    "text-4xl font-bold",
                    isLive && "animate-score-update"
                  )}>
                    {match.awayScore ?? 0}
                  </span>
                </div>
              )}
            </div>

            {/* Away Team */}
            <Link 
              to={`/teams/${match.awayTeam.id}`}
              className="flex flex-col items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
            >
              <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground font-bold text-xl">
                {match.awayTeam.shortName?.substring(0, 2) || match.awayTeam.name.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-center">
                {match.awayTeam.name}
              </span>
            </Link>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formattedTime}
            </span>
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {match.venue}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Match Details Tabs */}
      {!isUpcoming && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <List className="h-4 w-4" />
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
          <TabsContent value="events" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Events</CardTitle>
              </CardHeader>
              <CardContent>
                {mockMatchEvents.length > 0 ? (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {mockMatchEvents.map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-lg",
                            event.team === "home" ? "bg-primary/5" : "bg-secondary/10"
                          )}
                        >
                          <Badge className={cn("h-8 w-8 rounded-full p-0 flex items-center justify-center", eventColors[event.type as EventType])}>
                            {eventIcons[event.type as EventType]}
                          </Badge>
                          <div className="flex-1">
                            <p className="font-medium">{event.player}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <span className="text-sm font-medium">{event.minute}'</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <EmptyState
                    type="custom"
                    title="No events yet"
                    description="Match events will appear here as they happen."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(mockMatchStats).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{value.home}</span>
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-medium">{value.away}</span>
                    </div>
                    <div className="flex gap-1">
                      <Progress
                        value={(value.home / (value.home + value.away)) * 100}
                        className="h-2 flex-1 [&>div]:bg-primary"
                      />
                      <Progress
                        value={(value.away / (value.home + value.away)) * 100}
                        className="h-2 flex-1 rotate-180 [&>div]:bg-secondary"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lineups Tab */}
          <TabsContent value="lineups" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Home Team Lineup */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{match.homeTeam.name}</span>
                    <Badge variant="outline">{mockLineup.home.formation}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockLineup.home.players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          {player.number}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Away Team Lineup */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{match.awayTeam.name}</span>
                    <Badge variant="outline">{mockLineup.away.formation}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockLineup.away.players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <span className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-bold">
                          {player.number}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Upcoming Match Info */}
      {isUpcoming && (
        <Card>
          <CardHeader>
            <CardTitle>Match Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This match hasn't started yet. Check back when the match begins for live updates, 
              statistics, and lineups.
            </p>
            <Button className="mt-4" data-usecases="UC_020">
              Set Reminder
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
