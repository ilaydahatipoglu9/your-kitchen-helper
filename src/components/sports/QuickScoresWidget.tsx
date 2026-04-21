import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, RefreshCw } from "lucide-react";
import { Match } from "./MatchCard";

interface QuickScoresWidgetProps {
  matches: Match[];
  title?: string;
  onMatchClick?: (match: Match) => void;
  onViewAll?: () => void;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function QuickScoresWidget({
  matches,
  title = "Live Scores",
  onMatchClick,
  onViewAll,
  isLoading = false,
  onRefresh,
}: QuickScoresWidgetProps) {
  const liveMatches = matches.filter((m) => m.status === "live");
  const otherMatches = matches.filter((m) => m.status !== "live");
  const sortedMatches = [...liveMatches, ...otherMatches];

  return (
    <Card className="h-full" data-usecases="UC_046,UC_048">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading">{title}</CardTitle>
          <div className="flex items-center gap-1">
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
            )}
            {onViewAll && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={onViewAll}
              >
                View All
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-8" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedMatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <RefreshCw className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No live matches</p>
              <p className="text-xs text-muted-foreground mt-1">Check back soon for updates</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedMatches.map((match) => (
                <div
                  key={match.id}
                  className="cursor-pointer hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors"
                  onClick={() => onMatchClick?.(match)}
                >
                  {/* League & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground truncate">
                      {match.league}
                    </span>
                    {match.status === "live" && (
                      <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
                        {match.currentTime}
                      </Badge>
                    )}
                    {match.status === "finished" && (
                      <span className="text-[10px] text-muted-foreground font-medium">FT</span>
                    )}
                    {match.status === "upcoming" && (
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(match.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium shrink-0">
                          {match.homeTeam.shortName.charAt(0)}
                        </div>
                        <span className="text-sm truncate">{match.homeTeam.shortName}</span>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-bold tabular-nums",
                          match.status === "live" && "text-primary"
                        )}
                      >
                        {match.homeTeam.score ?? "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium shrink-0">
                          {match.awayTeam.shortName.charAt(0)}
                        </div>
                        <span className="text-sm truncate">{match.awayTeam.shortName}</span>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-bold tabular-nums",
                          match.status === "live" && "text-primary"
                        )}
                      >
                        {match.awayTeam.score ?? "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
