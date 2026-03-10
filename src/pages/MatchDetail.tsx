import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Bell,
  Share2,
  Target,
  Square,
  ArrowRightLeft,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockLiveMatches,
  mockMatchEvents,
  mockMatchStats,
} from "@/data/mockData";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const match = mockLiveMatches.find((m) => m.id === id) || mockLiveMatches[0];
  const isLive = match.status === "live";

  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <Target className="h-4 w-4 text-success" />;
      case "yellow_card":
        return <Square className="h-4 w-4 fill-warning text-warning" />;
      case "red_card":
        return <Square className="h-4 w-4 fill-destructive text-destructive" />;
      case "substitution":
        return <ArrowRightLeft className="h-4 w-4 text-info" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Match Header Card */}
        <Card className={cn(isLive && "border-l-4 border-l-live")}>
          <CardContent className="p-6">
            {/* League and Status */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-muted-foreground">
                {match.league}
              </span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={isLive ? "destructive" : "secondary"}
                  className={cn(
                    isLive && "animate-live-pulse bg-live text-live-foreground"
                  )}
                >
                  {isLive && (
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current inline-block" />
                  )}
                  {isLive && `${match.minute}'`}
                  {match.status === "halftime" && "HT"}
                  {match.status === "finished" && "FT"}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between gap-8">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {match.homeTeam.shortName.slice(0, 2)}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{match.homeTeam.name}</h2>
                <p className="text-sm text-muted-foreground">Home</p>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "text-5xl font-bold tabular-nums",
                      match.homeTeam.score > match.awayTeam.score && "text-success"
                    )}
                  >
                    {match.homeTeam.score}
                  </span>
                  <span className="text-3xl font-light text-muted-foreground">
                    -
                  </span>
                  <span
                    className={cn(
                      "text-5xl font-bold tabular-nums",
                      match.awayTeam.score > match.homeTeam.score && "text-success"
                    )}
                  >
                    {match.awayTeam.score}
                  </span>
                </div>
                {match.venue && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {match.venue}
                  </p>
                )}
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {match.awayTeam.shortName.slice(0, 2)}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{match.awayTeam.name}</h2>
                <p className="text-sm text-muted-foreground">Away</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Details Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Match Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatchEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0",
                        event.team === "away" && "flex-row-reverse text-right"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-muted-foreground w-8">
                          {event.minute}'
                        </span>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {event.type === "goal" && `⚽ Goal - ${event.player}`}
                          {event.type === "yellow_card" &&
                            `Yellow Card - ${event.player}`}
                          {event.type === "red_card" &&
                            `Red Card - ${event.player}`}
                          {event.type === "substitution" &&
                            `Substitution`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.type === "goal" && event.assist && (
                            <>Assist: {event.assist}</>
                          )}
                          {event.type === "substitution" && (
                            <>
                              {event.playerIn} ↔ {event.playerOut}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Match Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Possession */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {mockMatchStats.possession.home}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Possession
                    </span>
                    <span className="text-sm font-medium">
                      {mockMatchStats.possession.away}%
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-primary rounded-l"
                      style={{ width: `${mockMatchStats.possession.home}%` }}
                    />
                    <div
                      className="bg-muted-foreground/30 rounded-r"
                      style={{ width: `${mockMatchStats.possession.away}%` }}
                    />
                  </div>
                </div>

                {/* Shots */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {mockMatchStats.shots.home}
                    </span>
                    <span className="text-sm text-muted-foreground">Shots</span>
                    <span className="text-sm font-medium">
                      {mockMatchStats.shots.away}
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-primary rounded-l"
                      style={{
                        width: `${
                          (mockMatchStats.shots.home /
                            (mockMatchStats.shots.home +
                              mockMatchStats.shots.away)) *
                          100
                        }%`,
                      }}
                    />
                    <div
                      className="bg-muted-foreground/30 rounded-r"
                      style={{
                        width: `${
                          (mockMatchStats.shots.away /
                            (mockMatchStats.shots.home +
                              mockMatchStats.shots.away)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Shots on Target */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {mockMatchStats.shotsOnTarget.home}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Shots on Target
                    </span>
                    <span className="text-sm font-medium">
                      {mockMatchStats.shotsOnTarget.away}
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-success rounded-l"
                      style={{
                        width: `${
                          (mockMatchStats.shotsOnTarget.home /
                            (mockMatchStats.shotsOnTarget.home +
                              mockMatchStats.shotsOnTarget.away)) *
                          100
                        }%`,
                      }}
                    />
                    <div
                      className="bg-muted-foreground/30 rounded-r"
                      style={{
                        width: `${
                          (mockMatchStats.shotsOnTarget.away /
                            (mockMatchStats.shotsOnTarget.home +
                              mockMatchStats.shotsOnTarget.away)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Corners */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {mockMatchStats.corners.home}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Corners
                    </span>
                    <span className="text-sm font-medium">
                      {mockMatchStats.corners.away}
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-info rounded-l"
                      style={{
                        width: `${
                          (mockMatchStats.corners.home /
                            (mockMatchStats.corners.home +
                              mockMatchStats.corners.away)) *
                          100
                        }%`,
                      }}
                    />
                    <div
                      className="bg-muted-foreground/30 rounded-r"
                      style={{
                        width: `${
                          (mockMatchStats.corners.away /
                            (mockMatchStats.corners.home +
                              mockMatchStats.corners.away)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Fouls */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {mockMatchStats.fouls.home}
                    </span>
                    <span className="text-sm text-muted-foreground">Fouls</span>
                    <span className="text-sm font-medium">
                      {mockMatchStats.fouls.away}
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-warning rounded-l"
                      style={{
                        width: `${
                          (mockMatchStats.fouls.home /
                            (mockMatchStats.fouls.home +
                              mockMatchStats.fouls.away)) *
                          100
                        }%`,
                      }}
                    />
                    <div
                      className="bg-muted-foreground/30 rounded-r"
                      style={{
                        width: `${
                          (mockMatchStats.fouls.away /
                            (mockMatchStats.fouls.home +
                              mockMatchStats.fouls.away)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Cards */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">
                        {mockMatchStats.yellowCards.home}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4 fill-destructive text-destructive" />
                      <span className="text-sm font-medium">
                        {mockMatchStats.redCards.home}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Cards</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {mockMatchStats.yellowCards.away}
                      </span>
                      <Square className="h-4 w-4 fill-warning text-warning" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {mockMatchStats.redCards.away}
                      </span>
                      <Square className="h-4 w-4 fill-destructive text-destructive" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lineups Tab */}
          <TabsContent value="lineups" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team Lineups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Home Team */}
                  <div>
                    <h3 className="font-semibold mb-4">{match.homeTeam.name}</h3>
                    <div className="space-y-2">
                      {[
                        "1. André Onana (GK)",
                        "2. Victor Lindelöf",
                        "5. Harry Maguire",
                        "6. Lisandro Martínez",
                        "23. Luke Shaw",
                        "8. Bruno Fernandes (C)",
                        "18. Casemiro",
                        "14. Christian Eriksen",
                        "10. Marcus Rashford",
                        "11. Alejandro Garnacho",
                        "9. Rasmus Højlund",
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm py-1 border-b border-border last:border-0"
                        >
                          <span>{player}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div>
                    <h3 className="font-semibold mb-4">{match.awayTeam.name}</h3>
                    <div className="space-y-2">
                      {[
                        "1. Alisson Becker (GK)",
                        "66. Trent Alexander-Arnold",
                        "4. Virgil van Dijk (C)",
                        "5. Ibrahima Konaté",
                        "26. Andy Robertson",
                        "3. Wataru Endo",
                        "38. Ryan Gravenberch",
                        "17. Curtis Jones",
                        "11. Mohamed Salah",
                        "18. Cody Gakpo",
                        "7. Luis Díaz",
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm py-1 border-b border-border last:border-0"
                        >
                          <span>{player}</span>
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
    </MainLayout>
  );
}
