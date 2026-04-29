import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Player {
  id: string;
  name: string;
  photo?: string;
  position?: string;
  nationality?: string;
  team?: {
    id: string;
    name: string;
    logo?: string;
  };
  sport: string;
  jerseyNumber?: number;
  isFollowed?: boolean;
}

interface PlayerCardProps {
  player: Player;
  variant?: "default" | "compact";
  onFollowToggle?: (playerId: string, isFollowed: boolean) => void;
  className?: string;
}

function PlayerPhoto({ name, photo, size = "default" }: { name: string; photo?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-20 w-20" : "h-12 w-12";
  
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={cn(sizeClasses, "rounded-full object-cover")}
      />
    );
  }

  return (
    <div className={cn(
      sizeClasses,
      "rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground font-bold",
      size === "large" ? "text-2xl" : "text-base"
    )}>
      {name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
    </div>
  );
}

export function PlayerCard({ player, variant = "default", onFollowToggle, className }: PlayerCardProps) {
  const [isFollowed, setIsFollowed] = useState(player.isFollowed ?? false);
  const isCompact = variant === "compact";

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFollowState = !isFollowed;
    setIsFollowed(newFollowState);
    onFollowToggle?.(player.id, newFollowState);
  };

  return (
    <Link to={`/players/${player.id}`} data-usecases="UC_042">
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
            <div className="relative">
              <PlayerPhoto 
                name={player.name} 
                photo={player.photo} 
                size={isCompact ? "default" : "large"} 
              />
              {player.jerseyNumber && (
                <Badge 
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {player.jerseyNumber}
                </Badge>
              )}
            </div>
            
            <div className={cn("flex-1 min-w-0", !isCompact && "w-full")}>
              <h3 className={cn(
                "font-semibold truncate",
                isCompact ? "text-sm" : "text-base"
              )}>
                {player.name}
              </h3>
              {player.position && (
                <Badge variant="outline" className="mt-1 text-xs">
                  {player.position}
                </Badge>
              )}
              {player.team && (
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {player.team.name}
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
              aria-label={isFollowed ? `Unfollow ${player.name}` : `Follow ${player.name}`}
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
