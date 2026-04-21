import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { MatchCard, MatchDetailModal, Match } from "@/components/sports";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Calendar, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { mockMatches } from "@/data/mockData";

export default function MySportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [filter, setFilter] = useState(initialFilter);
  const [sportFilter, setSportFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value !== "all") {
      setSearchParams({ filter: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredMatches = mockMatches.filter((match) => {
    const matchesStatus = filter === "all" || match.status === filter;
    const matchesSport = sportFilter === "all" || match.sport.toLowerCase() === sportFilter.toLowerCase();
    return matchesStatus && matchesSport;
  });

  const liveCount = mockMatches.filter((m) => m.status === "live").length;
  const upcomingCount = mockMatches.filter((m) => m.status === "upcoming").length;
  const finishedCount = mockMatches.filter((m) => m.status === "finished").length;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              My Sports
            </h1>
            <p className="text-muted-foreground mt-1">
              Matches from your followed teams and leagues
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Tabs value={filter} onValueChange={handleFilterChange} className="w-full sm:w-auto">
            <TabsList data-usecases="UC_041">
              <TabsTrigger value="all" className="gap-2">
                All
                <Badge variant="secondary" className="h-5 px-1.5">
                  {mockMatches.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                Live
                <Badge variant="secondary" className="h-5 px-1.5">
                  {liveCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                <Clock className="h-3 w-3" />
                Upcoming
                <Badge variant="secondary" className="h-5 px-1.5">
                  {upcomingCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="finished" className="gap-2">
                <CheckCircle className="h-3 w-3" />
                Finished
                <Badge variant="secondary" className="h-5 px-1.5">
                  {finishedCount}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Matches Grid */}
        <div className="space-y-4" data-usecases="UC_041,UC_046,UC_048">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))
          ) : filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === "live"
                  ? "No live matches at the moment. Check back soon!"
                  : filter === "upcoming"
                  ? "No upcoming matches scheduled."
                  : filter === "finished"
                  ? "No finished matches to show."
                  : "No matches match your current filters."}
              </p>
              {filter !== "all" && (
                <Button variant="outline" onClick={() => handleFilterChange("all")}>
                  View all matches
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Live Matches Section */}
              {filter === "all" && liveCount > 0 && (
                <div className="mb-8">
                  <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    Live Now
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredMatches
                      .filter((m) => m.status === "live")
                      .map((match) => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          onClick={() => setSelectedMatch(match)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Upcoming Matches Section */}
              {filter === "all" && upcomingCount > 0 && (
                <div className="mb-8">
                  <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Upcoming
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredMatches
                      .filter((m) => m.status === "upcoming")
                      .map((match) => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          onClick={() => setSelectedMatch(match)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Finished Matches Section */}
              {filter === "all" && finishedCount > 0 && (
                <div className="mb-8">
                  <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Recent Results
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredMatches
                      .filter((m) => m.status === "finished")
                      .map((match) => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          onClick={() => setSelectedMatch(match)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Filtered View */}
              {filter !== "all" && (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        open={!!selectedMatch}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      />
    </MainLayout>
  );
}
