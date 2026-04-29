import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface League {
  id: string;
  name: string;
  logo?: string;
  sport: string;
  country?: string;
  season?: string;
  teamsCount?: number;
}

interface LeagueCardProps {
  league: League;
  variant?: "default" | "compact";
  className?: string;
}

function LeagueLogo({ name, logo, size = "default" }: { name: string; logo?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-14 w-14" : "h-10 w-10";
  
  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        className={cn(sizeClasses, "rounded-lg object-contain")}
      />
    );
  }

  return (
    <div className={cn(
      sizeClasses,
      "rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold",
      size === "large" ? "text-lg" : "text-sm"
    )}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}

export function LeagueCard({ league, variant = "default", className }: LeagueCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link to={`/leagues/${league.id}`} data-usecases="UC_042">
      <Card
        className={cn(
          "transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
          className
        )}
      >
        <CardContent className={cn("p-4", isCompact && "p-3")}>
          <div className={cn(
            "flex items-center gap-4",
            !isCompact && "flex-col text-center"
          )}>
            <LeagueLogo 
              name={league.name} 
              logo={league.logo} 
              size={isCompact ? "default" : "large"} 
            />
            
            <div className={cn("flex-1 min-w-0", !isCompact && "w-full")}>
              <h3 className={cn(
                "font-semibold truncate",
                isCompact ? "text-sm" : "text-base"
              )}>
                {league.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
                <Badge variant="outline" className="text-xs">
                  {league.sport}
                </Badge>
                {league.country && (
                  <span className="text-xs text-muted-foreground">
                    {league.country}
                  </span>
                )}
              </div>
              {league.teamsCount && (
                <p className="text-xs text-muted-foreground mt-1">
                  {league.teamsCount} teams
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
