import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/ui/badge-status";
import { Match } from "./MatchCard";
import { cn } from "@/lib/utils";

interface FeaturedMatchProps {
  match: Match;
  onViewDetails?: (match: Match) => void;
}

export function FeaturedMatch({ match, onViewDetails }: FeaturedMatchProps) {
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
    <div
      className={cn(
        "relative overflow-hidden rounded-xl maritime-gradient text-white p-6 md:p-8",
        match.status === "live" && "ring-2 ring-maritime-live"
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span className="font-medium">{match.sport}</span>
            <span>-</span>
            <span>{match.league}</span>
          </div>
          <BadgeStatus status={match.status}>
            {statusLabels[match.status]}
            {match.status === "live" && match.matchTime && ` ${match.matchTime}`}
          </BadgeStatus>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/10 flex items-center justify-center text-xl md:text-2xl font-bold">
              {match.homeTeam.logo ? (
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="h-16 w-16 md:h-20 md:w-20 object-contain"
                />
              ) : (
                getTeamInitials(match.homeTeam.name)
              )}
            </div>
            <span className="font-semibold text-center text-sm md:text-base">
              {match.homeTeam.name}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 md:gap-6 px-4">
            <span
              className={cn(
                "text-5xl md:text-7xl font-bold tabular-nums",
                match.status === "live" && "animate-pulse"
              )}
            >
              {match.homeTeam.score ?? "-"}
            </span>
            <span className="text-3xl md:text-4xl opacity-60">:</span>
            <span
              className={cn(
                "text-5xl md:text-7xl font-bold tabular-nums",
                match.status === "live" && "animate-pulse"
              )}
            >
              {match.awayTeam.score ?? "-"}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/10 flex items-center justify-center text-xl md:text-2xl font-bold">
              {match.awayTeam.logo ? (
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="h-16 w-16 md:h-20 md:w-20 object-contain"
                />
              ) : (
                getTeamInitials(match.awayTeam.name)
              )}
            </div>
            <span className="font-semibold text-center text-sm md:text-base">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{match.startTime}</span>
            </div>
            {match.venue && (
              <div className="hidden sm:flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{match.venue}</span>
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails?.(match)}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
