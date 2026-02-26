import { useState } from "react";
import { RefreshCw, Filter, ChevronDown } from "lucide-react";
import { MainLayout } from "@/components/layout";
import { MatchCard, MatchDetailModal, FeaturedMatch, Match } from "@/components/matches";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Radio, Calendar, Trophy } from "lucide-react";

// Mock data for matches
const mockMatches: Match[] = [
  {
    id: "1",
    sport: "Football",
    league: "Premier League",
    status: "live",
    homeTeam: { name: "Manchester United", score: 2 },
    awayTeam: { name: "Liverpool", score: 1 },
    startTime: "Today, 15:00",
    venue: "Old Trafford",
    matchTime: "67'",
  },
  {
    id: "2",
    sport: "Basketball",
    league: "NBA",
    status: "live",
    homeTeam: { name: "LA Lakers", score: 98 },
    awayTeam: { name: "Boston Celtics", score: 102 },
    startTime: "Today, 19:30",
    venue: "Staples Center",
    matchTime: "Q4 5:23",
  },
  {
    id: "3",
    sport: "Football",
    league: "La Liga",
    status: "upcoming",
    homeTeam: { name: "Real Madrid" },
    awayTeam: { name: "Barcelona" },
    startTime: "Tomorrow, 21:00",
    venue: "Santiago Bernabeu",
  },
  {
    id: "4",
    sport: "Tennis",
    league: "ATP Tour",
    status: "live",
    homeTeam: { name: "N. Djokovic", score: 2 },
    awayTeam: { name: "R. Nadal", score: 1 },
    startTime: "Today, 14:00",
    venue: "Wimbledon",
    matchTime: "Set 4",
  },
  {
    id: "5",
    sport: "Football",
    league: "Serie A",
    status: "finished",
    homeTeam: { name: "AC Milan", score: 3 },
    awayTeam: { name: "Inter Milan", score: 2 },
    startTime: "Yesterday, 20:45",
    venue: "San Siro",
  },
  {
    id: "6",
    sport: "Basketball",
    league: "EuroLeague",
    status: "upcoming",
    homeTeam: { name: "Real Madrid" },
    awayTeam: { name: "Barcelona" },
    startTime: "Tomorrow, 20:00",
    venue: "WiZink Center",
  },
  {
    id: "7",
    sport: "Football",
    league: "Bundesliga",
    status: "upcoming",
    homeTeam: { name: "Bayern Munich" },
    awayTeam: { name: "Borussia Dortmund" },
    startTime: "Saturday, 18:30",
    venue: "Allianz Arena",
  },
  {
    id: "8",
    sport: "Cricket",
    league: "IPL",
    status: "live",
    homeTeam: { name: "Mumbai Indians", score: 156 },
    awayTeam: { name: "Chennai Super Kings", score: 142 },
    startTime: "Today, 16:00",
    venue: "Wankhede Stadium",
    matchTime: "18.2 overs",
  },
];

const sportFilters = ["All Sports", "Football", "Basketball", "Tennis", "Cricket", "Baseball"];

export default function LiveMatches() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [activeTab, setActiveTab] = useState("all");

  const handleViewDetails = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Filter matches based on selected sport and tab
  const filteredMatches = mockMatches.filter((match) => {
    const sportMatch = selectedSport === "All Sports" || match.sport === selectedSport;
    const tabMatch =
      activeTab === "all" ||
      (activeTab === "live" && match.status === "live") ||
      (activeTab === "upcoming" && match.status === "upcoming") ||
      (activeTab === "finished" && match.status === "finished");
    return sportMatch && tabMatch;
  });

  const liveMatches = mockMatches.filter((m) => m.status === "live");
  const featuredMatch = liveMatches[0];

  return (
    <MainLayout>
      <div className="container mx-auto max-w-content px-4 md:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Live Matches</h1>
            <p className="text-muted-foreground mt-1">
              Track live scores and upcoming matches across all sports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedSport}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sportFilters.map((sport) => (
                  <DropdownMenuItem
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={selectedSport === sport ? "bg-accent" : ""}
                  >
                    {sport}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Featured Match */}
        {featuredMatch && !isLoading && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Radio className="h-5 w-5 text-maritime-live" />
              Featured Match
            </h2>
            <FeaturedMatch match={featuredMatch} onViewDetails={handleViewDetails} />
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Trophy className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Radio className="h-4 w-4" />
              Live ({liveMatches.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredMatches.length === 0 ? (
              <EmptyState
                icon={Radio}
                title="No matches found"
                description={
                  activeTab === "live"
                    ? "There are no live matches at the moment. Check back later or browse upcoming matches."
                    : "No matches match your current filters. Try adjusting your selection."
                }
                actionLabel="View All Matches"
                onAction={() => {
                  setActiveTab("all");
                  setSelectedSport("All Sports");
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-3xl font-bold text-accent">{liveMatches.length}</div>
            <div className="text-sm text-muted-foreground">Live Now</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">
              {mockMatches.filter((m) => m.status === "upcoming").length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">
              {new Set(mockMatches.map((m) => m.sport)).size}
            </div>
            <div className="text-sm text-muted-foreground">Sports</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">
              {new Set(mockMatches.map((m) => m.league)).size}
            </div>
            <div className="text-sm text-muted-foreground">Leagues</div>
          </div>
        </div>
      </div>

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </MainLayout>
  );
}
