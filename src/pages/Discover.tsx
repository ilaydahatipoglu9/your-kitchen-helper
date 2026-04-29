import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TeamCard } from "@/components/sports/TeamCard";
import { PlayerCard } from "@/components/sports/PlayerCard";
import { LeagueCard } from "@/components/sports/LeagueCard";
import { MatchCard } from "@/components/sports/MatchCard";
import { EmptyState, SectionHeader } from "@/components/common";
import { TeamCardSkeleton, MatchCardSkeleton } from "@/components/common/LoadingState";
import {
  mockTeams,
  mockPlayers,
  mockLeagues,
  mockLiveMatches,
  mockUpcomingMatches,
  mockSports,
} from "@/data/mockData";

type SearchCategory = "all" | "teams" | "players" | "leagues" | "matches";

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [isLoading] = useState(false);

  // Filter results based on search query and sport filters
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    const filterBySport = <T extends { sport: string }>(items: T[]) => {
      if (selectedSports.length === 0) return items;
      return items.filter((item) => 
        selectedSports.includes(item.sport.toLowerCase())
      );
    };

    const filterByQuery = <T extends { name: string }>(items: T[]) => {
      if (!query) return items;
      return items.filter((item) => 
        item.name.toLowerCase().includes(query)
      );
    };

    const teams = filterByQuery(filterBySport(mockTeams));
    const players = filterByQuery(filterBySport(mockPlayers));
    const leagues = filterByQuery(filterBySport(mockLeagues));
    const matches = filterByQuery(
      filterBySport([...mockLiveMatches, ...mockUpcomingMatches]).map((m) => ({
        ...m,
        name: `${m.homeTeam.name} vs ${m.awayTeam.name}`,
      }))
    );

    return { teams, players, leagues, matches };
  }, [searchQuery, selectedSports]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const toggleSportFilter = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSearchQuery("");
    setSearchParams({});
  };

  const totalResults =
    filteredResults.teams.length +
    filteredResults.players.length +
    filteredResults.leagues.length +
    filteredResults.matches.length;

  const hasActiveFilters = selectedSports.length > 0 || searchQuery.trim().length > 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <TeamCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-usecases="UC_103,UC_114">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold mb-2">Discover</h1>
        <p className="text-muted-foreground">
          Search and explore sports, teams, leagues, and players
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams, players, leagues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search"
            data-usecases="UC_103,UC_114"
          />
        </div>
        <Button type="submit" data-usecases="UC_103">
          Search
        </Button>
      </form>

      {/* Sport Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-2">Filter by sport:</span>
        {mockSports.map((sport) => (
          <Button
            key={sport.id}
            variant={selectedSports.includes(sport.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSportFilter(sport.id)}
            className="rounded-full"
            data-usecases="UC_119,UC_120"
          >
            {sport.name}
          </Button>
        ))}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
            data-usecases="UC_120"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Found {totalResults} result{totalResults !== 1 ? "s" : ""}
          </span>
          {searchQuery && (
            <Badge variant="secondary">
              "{searchQuery}"
            </Badge>
          )}
          {selectedSports.map((sport) => (
            <Badge key={sport} variant="outline">
              {mockSports.find((s) => s.id === sport)?.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Results Tabs */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as SearchCategory)}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" data-usecases="UC_114">
            All ({totalResults})
          </TabsTrigger>
          <TabsTrigger value="teams" data-usecases="UC_042">
            Teams ({filteredResults.teams.length})
          </TabsTrigger>
          <TabsTrigger value="players" data-usecases="UC_042">
            Players ({filteredResults.players.length})
          </TabsTrigger>
          <TabsTrigger value="leagues" data-usecases="UC_042">
            Leagues ({filteredResults.leagues.length})
          </TabsTrigger>
          <TabsTrigger value="matches" data-usecases="UC_041">
            Matches ({filteredResults.matches.length})
          </TabsTrigger>
        </TabsList>

        {/* All Results */}
        <TabsContent value="all" className="space-y-8 mt-6">
          {totalResults === 0 ? (
            <EmptyState
              type="no-results"
              description={`No results found${searchQuery ? ` for "${searchQuery}"` : ""}. Try different keywords or browse by sport.`}
              action={{
                label: "Clear Filters",
                onClick: clearFilters,
                useCases: "UC_120",
              }}
            />
          ) : (
            <>
              {/* Teams Section */}
              {filteredResults.teams.length > 0 && (
                <section>
                  <SectionHeader
                    title="Teams"
                    viewAllHref="/teams"
                    viewAllLabel={`View all ${filteredResults.teams.length}`}
                    useCases="UC_042"
                  />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.teams.slice(0, 3).map((team) => (
                      <TeamCard key={team.id} team={team} variant="compact" />
                    ))}
                  </div>
                </section>
              )}

              {/* Players Section */}
              {filteredResults.players.length > 0 && (
                <section>
                  <SectionHeader
                    title="Players"
                    viewAllHref="/players"
                    viewAllLabel={`View all ${filteredResults.players.length}`}
                    useCases="UC_042"
                  />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.players.slice(0, 3).map((player) => (
                      <PlayerCard key={player.id} player={player} variant="compact" />
                    ))}
                  </div>
                </section>
              )}

              {/* Leagues Section */}
              {filteredResults.leagues.length > 0 && (
                <section>
                  <SectionHeader
                    title="Leagues"
                    viewAllHref="/leagues"
                    viewAllLabel={`View all ${filteredResults.leagues.length}`}
                    useCases="UC_042"
                  />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.leagues.slice(0, 3).map((league) => (
                      <LeagueCard key={league.id} league={league} variant="compact" />
                    ))}
                  </div>
                </section>
              )}

              {/* Matches Section */}
              {filteredResults.matches.length > 0 && (
                <section>
                  <SectionHeader
                    title="Matches"
                    viewAllHref="/matches"
                    viewAllLabel={`View all ${filteredResults.matches.length}`}
                    useCases="UC_041"
                  />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.matches.slice(0, 3).map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6">
          {filteredResults.teams.length === 0 ? (
            <EmptyState
              type="no-results"
              title="No teams found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players" className="mt-6">
          {filteredResults.players.length === 0 ? (
            <EmptyState
              type="no-results"
              title="No players found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Leagues Tab */}
        <TabsContent value="leagues" className="mt-6">
          {filteredResults.leagues.length === 0 ? (
            <EmptyState
              type="no-results"
              title="No leagues found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.leagues.map((league) => (
                <LeagueCard key={league.id} league={league} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="mt-6">
          {filteredResults.matches.length === 0 ? (
            <EmptyState
              type="no-results"
              title="No matches found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
