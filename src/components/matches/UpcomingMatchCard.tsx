import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface UpcomingMatch {
  id: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo?: string;
  };
  league: string;
  date: string;
  time: string;
  venue?: string;
  isNotificationSet?: boolean;
}

interface UpcomingMatchCardProps {
  match: UpcomingMatch;
  className?: string;
  onSetNotification?: (matchId: string) => void;
}

export function UpcomingMatchCard({
  match,
  className,
  onSetNotification,
}: UpcomingMatchCardProps) {
  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-xs">
            {match.league}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault();
              onSetNotification?.(match.id);
            }}
            aria-label={
              match.isNotificationSet
                ? "Remove notification"
                : "Set notification"
            }
          >
            <Bell
              className={cn(
                "h-4 w-4",
                match.isNotificationSet
                  ? "fill-warning text-warning"
                  : "text-muted-foreground"
              )}
            />
          </Button>
        </div>

        {/* Teams */}
        <Link to={`/match/${match.id}`} className="block">
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-2">
                {match.homeTeam.logo ? (
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">
                    {match.homeTeam.shortName.slice(0, 2)}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium truncate">{match.homeTeam.name}</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-muted-foreground">VS</span>
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-2">
                {match.awayTeam.logo ? (
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">
                    {match.awayTeam.shortName.slice(0, 2)}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium truncate">{match.awayTeam.name}</p>
            </div>
          </div>
        </Link>

        {/* Match Info */}
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{match.date}</span>
            <Clock className="h-3.5 w-3.5 ml-2" />
            <span>{match.time}</span>
          </div>
          {match.venue && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{match.venue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
