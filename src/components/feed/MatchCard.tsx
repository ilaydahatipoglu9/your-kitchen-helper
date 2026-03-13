import { cn } from "@/lib/utils";
import { Bell, Star } from "lucide-react";

interface MatchCardProps {
  match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    status: string;
    time: string;
    league: string;
    isFollowed?: boolean;
  };
  onClick: () => void;
}

export const MatchCard = ({ match, onClick }: MatchCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
      )}
      data-usecases="UC_041,UC_086"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {match.league}
        </span>
        <div className="flex gap-2">
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Follow Team"
            data-usecases="UC_008"
            onClick={(e) => {
              e.stopPropagation();
              // Follow logic
            }}
          >
            <Star size={16} className={match.isFollowed ? "fill-primary text-primary" : ""} />
          </button>
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Enable Score Alerts"
            data-usecases="UC_020"
            onClick={(e) => {
              e.stopPropagation();
              // Alert logic
            }}
          >
            <Bell size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
              {match.homeTeam.substring(0, 3)}
            </div>
            <span className="font-medium text-foreground">{match.homeTeam}</span>
          </div>
          <span className="text-2xl font-bold text-foreground">{match.homeScore}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
              {match.awayTeam.substring(0, 3)}
            </div>
            <span className="font-medium text-foreground">{match.awayTeam}</span>
          </div>
          <span className="text-2xl font-bold text-foreground">{match.awayScore}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-sm">
        <span className={cn("font-medium", match.status === "LIVE" ? "text-red-500 animate-pulse" : "text-muted-foreground")}>
          {match.status === "LIVE" ? "LIVE" : match.status}
        </span>
        <span className="text-muted-foreground">{match.time}</span>
      </div>
    </div>
  );
};
