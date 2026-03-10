import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LiveMatch {
  id: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo?: string;
    score: number;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo?: string;
    score: number;
  };
  league: string;
  status: "live" | "halftime" | "finished";
  minute?: number;
  venue?: string;
}

interface LiveMatchCardProps {
  match: LiveMatch;
  className?: string;
}

export function LiveMatchCard({ match, className }: LiveMatchCardProps) {
  const isLive = match.status === "live";
  const isHalftime = match.status === "halftime";

  return (
    <Link to={`/match/${match.id}`}>
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
          isLive && "border-l-4 border-l-live",
          className
        )}
      >
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground">
              {match.league}
            </span>
            <Badge
              variant={isLive ? "destructive" : "secondary"}
              className={cn(
                "text-xs",
                isLive && "animate-live-pulse bg-live text-live-foreground"
              )}
            >
              {isLive && (
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current inline-block" />
              )}
              {isLive && `${match.minute}'`}
              {isHalftime && "HT"}
              {match.status === "finished" && "FT"}
            </Badge>
          </div>

          {/* Teams and Score */}
          <div className="space-y-3">
            {/* Home Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {match.homeTeam.logo ? (
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      className="h-6 w-6 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">
                      {match.homeTeam.shortName.slice(0, 2)}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm">{match.homeTeam.name}</span>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  match.homeTeam.score > match.awayTeam.score && "text-success"
                )}
              >
                {match.homeTeam.score}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {match.awayTeam.logo ? (
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      className="h-6 w-6 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">
                      {match.awayTeam.shortName.slice(0, 2)}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm">{match.awayTeam.name}</span>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  match.awayTeam.score > match.homeTeam.score && "text-success"
                )}
              >
                {match.awayTeam.score}
              </span>
            </div>
          </div>

          {/* Venue */}
          {match.venue && (
            <p className="mt-3 text-xs text-muted-foreground truncate">
              {match.venue}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
