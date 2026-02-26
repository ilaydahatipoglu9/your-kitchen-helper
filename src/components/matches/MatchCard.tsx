import { useState } from "react";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/ui/badge-status";
import { cn } from "@/lib/utils";

export interface Match {
  id: string;
  sport: string;
  league: string;
  status: "live" | "upcoming" | "finished";
  homeTeam: {
    name: string;
    logo?: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo?: string;
    score?: number;
  };
  startTime: string;
  venue?: string;
  matchTime?: string; // e.g., "45'" for live matches
}

interface MatchCardProps {
  match: Match;
  onViewDetails?: (match: Match) => void;
  className?: string;
}

export function MatchCard({ match, onViewDetails, className }: MatchCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
    <Card
      className={cn(
        "card-hover cursor-pointer overflow-hidden",
        match.status === "live" && "border-maritime-live/30",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails?.(match)}
      role="article"
      aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{match.sport}</span>
            <span>-</span>
            <span>{match.league}</span>
          </div>
          <BadgeStatus status={match.status}>
            {statusLabels[match.status]}
            {match.status === "live" && match.matchTime && ` ${match.matchTime}`}
          </BadgeStatus>
        </div>

        {/* Teams */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                {match.homeTeam.logo ? (
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  getTeamInitials(match.homeTeam.name)
                )}
              </div>
              <span className="font-semibold text-base">{match.homeTeam.name}</span>
            </div>
            {match.homeTeam.score !== undefined && (
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  match.status === "live" && "text-maritime-live"
                )}
              >
                {match.homeTeam.score}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                {match.awayTeam.logo ? (
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  getTeamInitials(match.awayTeam.name)
                )}
              </div>
              <span className="font-semibold text-base">{match.awayTeam.name}</span>
            </div>
            {match.awayTeam.score !== undefined && (
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  match.status === "live" && "text-maritime-live"
                )}
              >
                {match.awayTeam.score}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{match.startTime}</span>
            </div>
            {match.venue && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate max-w-[120px]">{match.venue}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs transition-all",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(match);
            }}
          >
            Details
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
