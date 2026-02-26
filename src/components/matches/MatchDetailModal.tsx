import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/ui/badge-status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MapPin, Bell, Share2, Star } from "lucide-react";
import { Match } from "./MatchCard";
import { cn } from "@/lib/utils";

interface MatchEvent {
  id: string;
  time: string;
  type: "goal" | "card" | "substitution" | "other";
  team: "home" | "away";
  player: string;
  description: string;
}

interface MatchDetailModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock events data
const mockEvents: MatchEvent[] = [
  { id: "1", time: "12'", type: "goal", team: "home", player: "J. Smith", description: "Goal! Header from corner" },
  { id: "2", time: "28'", type: "card", team: "away", player: "M. Johnson", description: "Yellow card for foul" },
  { id: "3", time: "35'", type: "goal", team: "away", player: "R. Williams", description: "Goal! Long range shot" },
  { id: "4", time: "45'", type: "substitution", team: "home", player: "A. Brown", description: "Substitution" },
];

// Mock statistics
const mockStats = [
  { label: "Possession", home: 58, away: 42 },
  { label: "Shots", home: 12, away: 8 },
  { label: "Shots on Target", home: 5, away: 3 },
  { label: "Corners", home: 6, away: 4 },
  { label: "Fouls", home: 10, away: 14 },
];

export function MatchDetailModal({ match, open, onOpenChange }: MatchDetailModalProps) {
  if (!match) return null;

  const statusLabels = {
    live: "LIVE",
    upcoming: "Upcoming",
    finished: "Final",
  };

  const getTeamInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-primary text-primary-foreground p-6">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm opacity-80">
                <span>{match.sport}</span>
                <span>-</span>
                <span>{match.league}</span>
              </div>
              <BadgeStatus status={match.status}>
                {statusLabels[match.status]}
                {match.status === "live" && match.matchTime && ` ${match.matchTime}`}
              </BadgeStatus>
            </div>

            <DialogTitle className="sr-only">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </DialogTitle>

            {/* Score Display */}
            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                  {match.homeTeam.logo ? (
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    getTeamInitials(match.homeTeam.name)
                  )}
                </div>
                <span className="font-semibold text-center">{match.homeTeam.name}</span>
              </div>

              {/* Score */}
              <div className="flex items-center gap-4 px-6">
                <span className="text-5xl font-bold tabular-nums">
                  {match.homeTeam.score ?? "-"}
                </span>
                <span className="text-2xl opacity-60">:</span>
                <span className="text-5xl font-bold tabular-nums">
                  {match.awayTeam.score ?? "-"}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                  {match.awayTeam.logo ? (
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    getTeamInitials(match.awayTeam.name)
                  )}
                </div>
                <span className="font-semibold text-center">{match.awayTeam.name}</span>
              </div>
            </div>

            {/* Match Info */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{match.startTime}</span>
              </div>
              {match.venue && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{match.venue}</span>
                </div>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="lineups">Lineups</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[300px]">
              <TabsContent value="events" className="mt-0">
                <div className="space-y-3">
                  {mockEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg bg-muted/50",
                        event.team === "away" && "flex-row-reverse text-right"
                      )}
                    >
                      <div className="flex-shrink-0 w-12 text-sm font-medium text-muted-foreground">
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.player}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.description}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs",
                          event.type === "goal" && "bg-maritime-success text-white",
                          event.type === "card" && "bg-maritime-warning text-white",
                          event.type === "substitution" && "bg-accent text-accent-foreground",
                          event.type === "other" && "bg-muted"
                        )}
                      >
                        {event.type === "goal" && "G"}
                        {event.type === "card" && "C"}
                        {event.type === "substitution" && "S"}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <div className="space-y-4">
                  {mockStats.map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{stat.home}</span>
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.away}</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                        <div
                          className="bg-accent transition-all"
                          style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                        />
                        <div
                          className="bg-secondary transition-all"
                          style={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="lineups" className="mt-0">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Lineup information will be available closer to match time.</p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <DialogDescription className="sr-only">
          Match details for {match.homeTeam.name} vs {match.awayTeam.name}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
