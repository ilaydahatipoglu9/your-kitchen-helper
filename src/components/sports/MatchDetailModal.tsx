import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Match } from "./MatchCard";
import {
  Clock,
  MapPin,
  Bell,
  BellOff,
  Share2,
  Target,
  AlertCircle,
  Square,
  ArrowRightLeft,
} from "lucide-react";
import { useState } from "react";

interface MatchEvent {
  id: string;
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "var" | "penalty";
  minute: string;
  team: "home" | "away";
  player: string;
  description?: string;
}

interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
}

interface MatchDetailModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for events
const mockEvents: MatchEvent[] = [
  { id: "1", type: "goal", minute: "23'", team: "home", player: "M. Rashford", description: "Right foot shot from the center of the box" },
  { id: "2", type: "yellow_card", minute: "35'", team: "away", player: "B. Silva" },
  { id: "3", type: "goal", minute: "45+2'", team: "away", player: "E. Haaland", description: "Header from a corner" },
  { id: "4", type: "substitution", minute: "60'", team: "home", player: "A. Martial", description: "Replaced by M. Greenwood" },
  { id: "5", type: "goal", minute: "78'", team: "home", player: "B. Fernandes", description: "Penalty kick" },
  { id: "6", type: "red_card", minute: "85'", team: "away", player: "K. Walker" },
];

// Mock stats
const mockStats: MatchStats = {
  possession: { home: 45, away: 55 },
  shots: { home: 12, away: 15 },
  shotsOnTarget: { home: 5, away: 6 },
  corners: { home: 4, away: 7 },
  fouls: { home: 11, away: 9 },
};

// Mock lineups
const mockLineups = {
  home: {
    formation: "4-2-3-1",
    players: [
      { number: 1, name: "De Gea", position: "GK" },
      { number: 2, name: "Dalot", position: "RB" },
      { number: 5, name: "Maguire", position: "CB" },
      { number: 6, name: "Martinez", position: "CB" },
      { number: 23, name: "Shaw", position: "LB" },
      { number: 18, name: "Casemiro", position: "CDM" },
      { number: 39, name: "McTominay", position: "CDM" },
      { number: 10, name: "Rashford", position: "LW" },
      { number: 8, name: "Fernandes", position: "CAM" },
      { number: 25, name: "Sancho", position: "RW" },
      { number: 9, name: "Martial", position: "ST" },
    ],
  },
  away: {
    formation: "4-3-3",
    players: [
      { number: 31, name: "Ederson", position: "GK" },
      { number: 2, name: "Walker", position: "RB" },
      { number: 3, name: "Dias", position: "CB" },
      { number: 14, name: "Laporte", position: "CB" },
      { number: 25, name: "Ake", position: "LB" },
      { number: 16, name: "Rodri", position: "CDM" },
      { number: 17, name: "De Bruyne", position: "CM" },
      { number: 20, name: "B. Silva", position: "CM" },
      { number: 47, name: "Foden", position: "RW" },
      { number: 9, name: "Haaland", position: "ST" },
      { number: 10, name: "Grealish", position: "LW" },
    ],
  },
};

export function MatchDetailModal({ match, open, onOpenChange }: MatchDetailModalProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!match) return null;

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  const getEventIcon = (type: MatchEvent["type"]) => {
    switch (type) {
      case "goal":
        return <Target className="h-4 w-4 text-green-500" />;
      case "yellow_card":
        return <Square className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
      case "red_card":
        return <Square className="h-4 w-4 fill-red-500 text-red-500" />;
      case "substitution":
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
      case "var":
        return <AlertCircle className="h-4 w-4 text-purple-500" />;
      case "penalty":
        return <Target className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const StatBar = ({ label, home, away }: { label: string; home: number; away: number }) => {
    const total = home + away;
    const homePercent = total > 0 ? (home / total) * 100 : 50;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{home}</span>
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{away}</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-muted">
          <div
            className="bg-primary transition-all duration-300"
            style={{ width: `${homePercent}%` }}
          />
          <div
            className="bg-secondary transition-all duration-300"
            style={{ width: `${100 - homePercent}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden" data-usecases="UC_046,UC_048,UC_086">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{match.sport}</Badge>
              <span className="text-sm text-muted-foreground">{match.league}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsFollowing(!isFollowing)}
                data-usecases="UC_007,UC_008"
              >
                {isFollowing ? (
                  <BellOff className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Score Section */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                {match.homeTeam.shortName.charAt(0)}
              </div>
              <DialogTitle className="font-heading font-semibold text-base">
                {match.homeTeam.name}
              </DialogTitle>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "font-heading text-4xl font-bold",
                  isLive && "text-primary"
                )}>
                  {match.homeTeam.score ?? "-"}
                </span>
                <span className="text-xl text-muted-foreground">:</span>
                <span className={cn(
                  "font-heading text-4xl font-bold",
                  isLive && "text-primary"
                )}>
                  {match.awayTeam.score ?? "-"}
                </span>
              </div>
              {isLive && (
                <Badge variant="destructive" className="mt-2 animate-pulse-live">
                  <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse" />
                  LIVE {match.currentTime}
                </Badge>
              )}
              {isFinished && (
                <Badge variant="outline" className="mt-2">Full Time</Badge>
              )}
              {!isLive && !isFinished && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {new Date(match.startTime).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                {match.awayTeam.shortName.charAt(0)}
              </div>
              <DialogTitle className="font-heading font-semibold text-base">
                {match.awayTeam.name}
              </DialogTitle>
            </div>
          </div>

          {match.venue && (
            <div className="flex items-center justify-center gap-1 mt-4 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {match.venue}
            </div>
          )}
        </DialogHeader>

        <Tabs defaultValue="events" className="flex-1">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6">
            <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Events
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Stats
            </TabsTrigger>
            <TabsTrigger value="lineups" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Lineups
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[300px]">
            <TabsContent value="events" className="p-6 pt-4 m-0">
              {mockEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No events yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg bg-muted/50",
                        event.team === "away" && "flex-row-reverse text-right"
                      )}
                    >
                      <div className="shrink-0">{getEventIcon(event.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.player}</span>
                          <span className="text-xs text-muted-foreground">{event.minute}</span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="p-6 pt-4 m-0">
              <div className="space-y-4">
                <StatBar
                  label="Possession %"
                  home={mockStats.possession.home}
                  away={mockStats.possession.away}
                />
                <StatBar
                  label="Shots"
                  home={mockStats.shots.home}
                  away={mockStats.shots.away}
                />
                <StatBar
                  label="Shots on Target"
                  home={mockStats.shotsOnTarget.home}
                  away={mockStats.shotsOnTarget.away}
                />
                <StatBar
                  label="Corners"
                  home={mockStats.corners.home}
                  away={mockStats.corners.away}
                />
                <StatBar
                  label="Fouls"
                  home={mockStats.fouls.home}
                  away={mockStats.fouls.away}
                />
              </div>
            </TabsContent>

            <TabsContent value="lineups" className="p-6 pt-4 m-0">
              <div className="grid grid-cols-2 gap-6">
                {/* Home Team */}
                <div>
                  <div className="text-center mb-3">
                    <p className="font-medium">{match.homeTeam.shortName}</p>
                    <p className="text-xs text-muted-foreground">{mockLineups.home.formation}</p>
                  </div>
                  <div className="space-y-1">
                    {mockLineups.home.players.map((player) => (
                      <div key={player.number} className="flex items-center gap-2 text-sm">
                        <span className="w-6 text-muted-foreground">{player.number}</span>
                        <span className="flex-1">{player.name}</span>
                        <span className="text-xs text-muted-foreground">{player.position}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator orientation="vertical" className="hidden" />

                {/* Away Team */}
                <div>
                  <div className="text-center mb-3">
                    <p className="font-medium">{match.awayTeam.shortName}</p>
                    <p className="text-xs text-muted-foreground">{mockLineups.away.formation}</p>
                  </div>
                  <div className="space-y-1">
                    {mockLineups.away.players.map((player) => (
                      <div key={player.number} className="flex items-center gap-2 text-sm">
                        <span className="w-6 text-muted-foreground">{player.number}</span>
                        <span className="flex-1">{player.name}</span>
                        <span className="text-xs text-muted-foreground">{player.position}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
