import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
  sport: string;
  league?: {
    id: string;
    name: string;
  };
  country?: string;
  isFollowed?: boolean;
}

interface TeamCardProps {
  team: Team;
  variant?: "default" | "compact";
  onFollowToggle?: (teamId: string, isFollowed: boolean) => void;
  className?: string;
}

function TeamLogo({ name, logo, size = "default" }: { name: string; logo?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-16 w-16" : "h-10 w-10";
  
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
      size === "large" ? "text-xl" : "text-sm"
    )}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}

export function TeamCard({ team, variant = "default", onFollowToggle, className }: TeamCardProps) {
  const [isFollowed, setIsFollowed] = useState(team.isFollowed ?? false);
  const isCompact = variant === "compact";

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFollowState = !isFollowed;
    setIsFollowed(newFollowState);
    onFollowToggle?.(team.id, newFollowState);
  };

  return (
    <Link to={`/teams/${team.id}`} data-usecases="UC_042">
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
            <TeamLogo 
              name={team.name} 
              logo={team.logo} 
              size={isCompact ? "default" : "large"} 
            />
            
            <div className={cn("flex-1", !isCompact && "w-full")}>
              <h3 className={cn(
                "font-semibold truncate",
                isCompact ? "text-sm" : "text-base"
              )}>
                {team.name}
              </h3>
              {team.league && (
                <p className="text-xs text-muted-foreground truncate">
                  {team.league.name}
                </p>
              )}
              {team.country && !team.league && (
                <p className="text-xs text-muted-foreground truncate">
                  {team.country}
                </p>
              )}
            </div>

            <Button
              variant={isFollowed ? "default" : "outline"}
              size="sm"
              onClick={handleFollowClick}
              className={cn(
                "shrink-0",
                isFollowed && "bg-primary hover:bg-primary/90"
              )}
              aria-label={isFollowed ? `Unfollow ${team.name}` : `Follow ${team.name}`}
              data-usecases="UC_007,UC_008"
            >
              {isFollowed ? (
                <>
                  <HeartOff className="h-4 w-4" />
                  <span className="hidden sm:inline">Following</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Follow</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
