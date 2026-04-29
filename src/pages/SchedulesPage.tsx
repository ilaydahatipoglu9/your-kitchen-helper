import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MatchCard } from "@/components/sports";
import { EmptyState } from "@/components/ui/empty-state";
import {
  UpcomingMatchCardSkeleton,
  RecentResultCardSkeleton,
} from "@/components/ui/skeleton-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockUpcomingMatches, mockRecentResults } from "@/data/mockData";

const sportOptions = [
  { value: "all", label: "All Sports" },
  { value: "basketball", label: "Basketball" },
  { value: "football", label: "Football" },
  { value: "soccer", label: "Soccer" },
  { value: "hockey", label: "Hockey" },
  { value: "baseball", label: "Baseball" },
];

const leagueOptions = [
  { value: "all", label: "All Leagues" },
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "mlb", label: "MLB" },
  { value: "nhl", label: "NHL" },
  { value: "premier-league", label: "Premier League" },
  { value: "la-liga", label: "La Liga" },
];

export default function SchedulesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");

  const activeTab = searchParams.get("tab") || "upcoming";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const filteredUpcoming = mockUpcomingMatches.filter((match) => {
    if (selectedSport !== "all" && match.sport.toLowerCase() !== selectedSport) {
      return false;
    }
    if (
      selectedLeague !== "all" &&
      match.league.toLowerCase().replace(" ", "-") !== selectedLeague
    ) {
      return false;
    }
    return true;
  });

  const filteredResults = mockRecentResults.filter((match) => {
    if (selectedSport !== "all" && match.sport.toLowerCase() !== selectedSport) {
      return false;
    }
    if (
      selectedLeague !== "all" &&
      match.league.toLowerCase().replace(" ", "-") !== selectedLeague
    ) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSelectedSport("all");
    setSelectedLeague("all");
  };

  const hasFilters = selectedSport !== "all" || selectedLeague !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold">Schedules</h1>
          <p className="text-sm text-muted-foreground">
            Upcoming matches and recent results
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select
          value={selectedSport}
          onValueChange={setSelectedSport}
        >
          <SelectTrigger className="w-[150px]" data-usecases="UC_119,UC_120">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            {sportOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedLeague}
          onValueChange={setSelectedLeague}
        >
          <SelectTrigger className="w-[160px]" data-usecases="UC_119,UC_120">
            <SelectValue placeholder="League" />
          </SelectTrigger>
          <SelectContent>
            {leagueOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            data-usecases="UC_119,UC_120"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <UpcomingMatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredUpcoming.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-schedule"
              title={hasFilters ? "No matches found" : undefined}
              description={
                hasFilters
                  ? "Try adjusting your filters to see more matches."
                  : undefined
              }
              onAction={hasFilters ? clearFilters : undefined}
              actionLabel={hasFilters ? "Clear Filters" : undefined}
            />
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <RecentResultCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-schedule"
              title="No results found"
              description={
                hasFilters
                  ? "Try adjusting your filters to see more results."
                  : "No recent results available."
              }
              onAction={hasFilters ? clearFilters : undefined}
              actionLabel={hasFilters ? "Clear Filters" : undefined}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
