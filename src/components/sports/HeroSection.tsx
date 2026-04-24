import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Play, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MatchData } from "./MatchCard";

interface HeroSectionProps {
  match?: MatchData;
  className?: string;
}

const HeroSection = ({ match, className }: HeroSectionProps) => {
  if (!match) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80", className)}>
        <div className="aspect-video md:aspect-[21/9] flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-2">
              Welcome to Sports Hub
            </h2>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Your central hub for live sports, scores, and updates
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isLive = match.status === "live" || match.status === "halftime";
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary/90 to-secondary",
        className
      )}
      data-usecases="UC_046,UC_086"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="relative aspect-video md:aspect-[21/9] flex flex-col justify-between p-4 md:p-8">
        {/* Top - League and Status */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {match.league.name}
          </Badge>
          
          {isLive && (
            <Badge variant="destructive" className="flex items-center gap-1 bg-live text-white animate-pulse-live">
              <Activity className="h-3 w-3" />
              LIVE {match.matchTime && `- ${match.matchTime}'`}
            </Badge>
          )}
        </div>

        {/* Center - Teams and Score */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/20 text-white">
              <span className="text-2xl md:text-4xl font-bold">
                {match.homeTeam.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm md:text-lg font-semibold text-white">
              {match.homeTeam.name}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-2">
            {hasScore ? (
              <div className="flex items-center gap-3 md:gap-6">
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  {match.homeScore}
                </span>
                <span className="text-2xl md:text-4xl text-white/60">-</span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-2xl md:text-4xl font-bold text-white">
                  {match.startTime}
                </span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/20 text-white">
              <span className="text-2xl md:text-4xl font-bold">
                {match.awayTeam.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm md:text-lg font-semibold text-white">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Bottom - Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button
            asChild
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to={`/match/${match.id}`}>
              <Play className="mr-2 h-4 w-4" />
              Watch Details
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            data-usecases="UC_020,UC_141"
          >
            <Bell className="mr-2 h-4 w-4" />
            Set Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
