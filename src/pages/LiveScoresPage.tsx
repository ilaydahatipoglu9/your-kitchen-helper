import { useState, useEffect } from "react";
import { MatchCard } from "@/components/sports";
import { EmptyState } from "@/components/ui/empty-state";
import { LiveMatchCardSkeleton } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Radio } from "lucide-react";
import { mockLiveMatches } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const sportFilters = [
  { id: "all", label: "All Sports" },
  { id: "basketball", label: "Basketball" },
  { id: "football", label: "Football" },
  { id: "soccer", label: "Soccer" },
  { id: "hockey", label: "Hockey" },
  { id: "baseball", label: "Baseball" },
];

export default function LiveScoresPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredMatches =
    selectedSport === "all"
      ? mockLiveMatches
      : mockLiveMatches.filter(
          (match) => match.sport.toLowerCase() === selectedSport
        );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-live/10">
            <Radio className="h-5 w-5 text-live" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Live Scores</h1>
            <p className="text-sm text-muted-foreground">
              Real-time updates from ongoing games
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              data-usecases="UC_088"
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh
            </Label>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/profile/notifications")}
            data-usecases="UC_020,UC_141"
          >
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Sport Filters */}
      <Tabs value={selectedSport} onValueChange={setSelectedSport}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {sportFilters.map((sport) => (
            <TabsTrigger
              key={sport.id}
              value={sport.id}
              className="min-w-fit"
              data-usecases="UC_119,UC_120"
            >
              {sport.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedSport} className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <LiveMatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-live"
              onAction={() => navigate("/schedules")}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Live indicator */}
      {!isLoading && filteredMatches.length > 0 && autoRefresh && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span>Scores update automatically</span>
        </div>
      )}
    </div>
  );
}
