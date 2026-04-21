import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  score?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: "live" | "upcoming" | "finished";
  startTime: string;
  venue?: string;
  league: string;
  sport: string;
  currentTime?: string;
}

interface MatchCardProps {
  match: Match;
  variant?: "default" | "compact" | "hero";
  onClick?: () => void;
}

export function MatchCard({ match, variant = "default", onClick }: MatchCardProps) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  if (variant === "hero") {
    return (
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
        onClick={onClick}
        data-usecases="UC_046,UC_048,UC_086"
      >
        <CardContent className="p-6 md:p-8">
          {/* League & Status */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {match.sport}
              </Badge>
              <span className="text-sm text-muted-foreground">{match.league}</span>
            </div>
            {isLive && (
              <Badge variant="destructive" className="animate-pulse-live">
                <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse" />
                LIVE {match.currentTime}
              </Badge>
            )}
            {isFinished && (
              <Badge variant="outline" className="text-muted-foreground">
                Final
              </Badge>
            )}
            {!isLive && !isFinished && (
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            )}
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {match.homeTeam.shortName.charAt(0)}
              </div>
              <h3 className="font-heading font-semibold text-lg md:text-xl truncate">
                {match.homeTeam.name}
              </h3>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 md:gap-6">
              <span className={cn(
                "font-heading text-4xl md:text-5xl font-bold",
                isLive && "text-primary"
              )}>
                {match.homeTeam.score ?? "-"}
              </span>
              <span className="text-2xl text-muted-foreground">:</span>
              <span className={cn(
                "font-heading text-4xl md:text-5xl font-bold",
                isLive && "text-primary"
              )}>
                {match.awayTeam.score ?? "-"}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {match.awayTeam.shortName.charAt(0)}
              </div>
              <h3 className="font-heading font-semibold text-lg md:text-xl truncate">
                {match.awayTeam.name}
              </h3>
            </div>
          </div>

          {/* Venue */}
          {match.venue && (
            <div className="flex items-center justify-center gap-1 mt-6 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {match.venue}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 min-w-[200px]"
        onClick={onClick}
        data-usecases="UC_046,UC_048,UC_086"
      >
        <CardContent className="p-3">
          {/* Status */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground truncate">{match.league}</span>
            {isLive && (
              <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                {match.currentTime}
              </span>
            )}
            {isFinished && (
              <span className="text-xs text-muted-foreground">FT</span>
            )}
            {!isLive && !isFinished && (
              <span className="text-xs text-muted-foreground">
                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* Teams */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium shrink-0">
                  {match.homeTeam.shortName.charAt(0)}
                </div>
                <span className="text-sm font-medium truncate">{match.homeTeam.shortName}</span>
              </div>
              <span className={cn(
                "text-sm font-bold tabular-nums",
                isLive && "text-primary"
              )}>
                {match.homeTeam.score ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium shrink-0">
                  {match.awayTeam.shortName.charAt(0)}
                </div>
                <span className="text-sm font-medium truncate">{match.awayTeam.shortName}</span>
              </div>
              <span className={cn(
                "text-sm font-bold tabular-nums",
                isLive && "text-primary"
              )}>
                {match.awayTeam.score ?? "-"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
      onClick={onClick}
      data-usecases="UC_046,UC_048,UC_086"
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {match.sport}
            </Badge>
            <span className="text-xs text-muted-foreground">{match.league}</span>
          </div>
          {isLive && (
            <Badge variant="destructive" className="text-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
              LIVE
            </Badge>
          )}
          {isFinished && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Final
            </Badge>
          )}
          {!isLive && !isFinished && (
            <span className="text-xs text-muted-foreground">
              {new Date(match.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })} - {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
              {match.homeTeam.shortName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{match.homeTeam.name}</p>
              <p className="text-xs text-muted-foreground">Home</p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn(
              "font-heading text-2xl font-bold",
              isLive && "text-primary"
            )}>
              {match.homeTeam.score ?? "-"}
            </span>
            <span className="text-muted-foreground">-</span>
            <span className={cn(
              "font-heading text-2xl font-bold",
              isLive && "text-primary"
            )}>
              {match.awayTeam.score ?? "-"}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <div className="min-w-0 text-right">
              <p className="font-medium truncate">{match.awayTeam.name}</p>
              <p className="text-xs text-muted-foreground">Away</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
              {match.awayTeam.shortName.charAt(0)}
            </div>
          </div>
        </div>

        {/* Live Time */}
        {isLive && match.currentTime && (
          <div className="mt-3 text-center">
            <span className="text-sm font-medium text-primary">{match.currentTime}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
