import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type MatchStatus = "live" | "upcoming" | "completed";

export interface Match {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    logo?: string;
    shortName?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    logo?: string;
    shortName?: string;
  };
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  minute?: number;
  startTime: string;
  league: {
    id: string;
    name: string;
  };
  sport: string;
  venue?: string;
}

interface MatchCardProps {
  match: Match;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

function TeamLogo({ name, logo, size = "default" }: { name: string; logo?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-12 w-12" : "h-8 w-8";
  
  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        className={cn(sizeClasses, "rounded-full object-cover")}
      />
    );
  }

  return (
    <div className={cn(
      sizeClasses,
      "rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold",
      size === "large" ? "text-lg" : "text-xs"
    )}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}

function StatusBadge({ status, minute }: { status: MatchStatus; minute?: number }) {
  if (status === "live") {
    return (
      <Badge className="bg-live text-live-foreground animate-pulse-live">
        LIVE {minute ? `${minute}'` : ""}
      </Badge>
    );
  }

  if (status === "completed") {
    return (
      <Badge variant="secondary" className="bg-success/10 text-success">
        FT
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-muted-foreground">
      Upcoming
    </Badge>
  );
}

export function MatchCard({ match, variant = "default", className }: MatchCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Link to={`/matches/${match.id}`} data-usecases="UC_041,UC_086">
      <Card
        className={cn(
          "transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
          isFeatured && match.status === "live" && "border-live/50 bg-live/5",
          className
        )}
      >
        <CardContent className={cn("p-4", isCompact && "p-3")}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground truncate max-w-[60%]">
              {match.league.name}
            </span>
            <StatusBadge status={match.status} minute={match.minute} />
          </div>

          {/* Teams and Score */}
          {isFeatured ? (
            <div className="flex items-center justify-between gap-4">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <TeamLogo name={match.homeTeam.name} logo={match.homeTeam.logo} size="large" />
                <span className="text-sm font-medium text-center line-clamp-2">
                  {match.homeTeam.shortName || match.homeTeam.name}
                </span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center">
                {match.status === "upcoming" ? (
                  <div className="text-center">
                    <p className="text-lg font-bold">{formatTime(match.startTime)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(match.startTime)}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-3xl font-bold",
                      match.status === "live" && "animate-score-update"
                    )}>
                      {match.homeScore ?? 0}
                    </span>
                    <span className="text-xl text-muted-foreground">-</span>
                    <span className={cn(
                      "text-3xl font-bold",
                      match.status === "live" && "animate-score-update"
                    )}>
                      {match.awayScore ?? 0}
                    </span>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <TeamLogo name={match.awayTeam.name} logo={match.awayTeam.logo} size="large" />
                <span className="text-sm font-medium text-center line-clamp-2">
                  {match.awayTeam.shortName || match.awayTeam.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Home Team Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TeamLogo name={match.homeTeam.name} logo={match.homeTeam.logo} />
                  <span className={cn(
                    "text-sm font-medium truncate max-w-[140px]",
                    match.status !== "upcoming" && match.homeScore !== undefined && 
                    match.awayScore !== undefined && match.homeScore > match.awayScore && "font-bold"
                  )}>
                    {match.homeTeam.name}
                  </span>
                </div>
                {match.status !== "upcoming" ? (
                  <span className={cn(
                    "text-lg font-bold",
                    match.status === "live" && "text-live"
                  )}>
                    {match.homeScore ?? 0}
                  </span>
                ) : null}
              </div>

              {/* Away Team Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TeamLogo name={match.awayTeam.name} logo={match.awayTeam.logo} />
                  <span className={cn(
                    "text-sm font-medium truncate max-w-[140px]",
                    match.status !== "upcoming" && match.homeScore !== undefined && 
                    match.awayScore !== undefined && match.awayScore > match.homeScore && "font-bold"
                  )}>
                    {match.awayTeam.name}
                  </span>
                </div>
                {match.status !== "upcoming" ? (
                  <span className={cn(
                    "text-lg font-bold",
                    match.status === "live" && "text-live"
                  )}>
                    {match.awayScore ?? 0}
                  </span>
                ) : null}
              </div>

              {/* Time for upcoming matches */}
              {match.status === "upcoming" && (
                <div className="pt-2 border-t text-center">
                  <p className="text-sm font-medium">{formatTime(match.startTime)}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(match.startTime)}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
