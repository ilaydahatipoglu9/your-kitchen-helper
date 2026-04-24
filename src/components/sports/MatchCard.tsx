import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Activity, Clock, Calendar } from "lucide-react";

export interface MatchData {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logo?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logo?: string;
  };
  homeScore?: number;
  awayScore?: number;
  status: "live" | "upcoming" | "finished" | "halftime";
  matchTime?: string;
  startTime?: string;
  league: {
    id: string;
    name: string;
  };
  sport: string;
}

interface MatchCardProps {
  match: MatchData;
  variant?: "default" | "compact";
  className?: string;
}

const getStatusBadge = (status: MatchData["status"]) => {
  switch (status) {
    case "live":
      return (
        <Badge variant="destructive" className="flex items-center gap-1 bg-live text-white">
          <Activity className="h-3 w-3 animate-pulse-live" />
          LIVE
        </Badge>
      );
    case "halftime":
      return (
        <Badge variant="secondary" className="bg-amber-500 text-white">
          HT
        </Badge>
      );
    case "finished":
      return (
        <Badge variant="secondary" className="bg-success text-white">
          FT
        </Badge>
      );
    case "upcoming":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          Upcoming
        </Badge>
      );
    default:
      return null;
  }
};

const TeamLogo = ({ name, logo }: { name: string; logo?: string }) => {
  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }
  
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <span className="text-lg font-bold">{name.charAt(0)}</span>
    </div>
  );
};

const MatchCard = ({ match, variant = "default", className }: MatchCardProps) => {
  const isLive = match.status === "live" || match.status === "halftime";
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <Link to={`/match/${match.id}`} data-usecases="UC_041,UC_046,UC_086">
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-150 hover:shadow-md hover:scale-[1.02]",
          isLive && "ring-2 ring-live/20",
          className
        )}
      >
        <CardContent className={cn("p-4", variant === "compact" && "p-3")}>
          {/* Header - League and Status */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {match.league.name}
            </span>
            {getStatusBadge(match.status)}
          </div>

          {/* Teams and Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <TeamLogo name={match.homeTeam.name} logo={match.homeTeam.logo} />
              <span className={cn(
                "text-sm font-medium line-clamp-1",
                variant === "compact" && "text-xs"
              )}>
                {variant === "compact" ? match.homeTeam.shortName : match.homeTeam.name}
              </span>
            </div>

            {/* Score or Time */}
            <div className="flex flex-col items-center gap-1">
              {hasScore ? (
                <div className={cn(
                  "flex items-center gap-2 font-bold",
                  variant === "compact" ? "text-xl" : "text-2xl",
                  isLive && "text-live"
                )}>
                  <span className={cn(
                    match.homeScore! > match.awayScore! && "text-foreground",
                    match.homeScore! < match.awayScore! && "text-muted-foreground"
                  )}>
                    {match.homeScore}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className={cn(
                    match.awayScore! > match.homeScore! && "text-foreground",
                    match.awayScore! < match.homeScore! && "text-muted-foreground"
                  )}>
                    {match.awayScore}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {match.startTime}
                  </span>
                </div>
              )}
              {match.matchTime && isLive && (
                <span className="text-xs font-medium text-live">
                  {match.matchTime}'
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <TeamLogo name={match.awayTeam.name} logo={match.awayTeam.logo} />
              <span className={cn(
                "text-sm font-medium line-clamp-1",
                variant === "compact" && "text-xs"
              )}>
                {variant === "compact" ? match.awayTeam.shortName : match.awayTeam.name}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MatchCard;
