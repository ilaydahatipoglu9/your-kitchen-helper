import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Compass,
  Users,
  User,
  Trophy,
  Plus,
  Check,
  X,
} from "lucide-react";
import { mockTeams, mockPlayers } from "@/data/mockData";
import { cn } from "@/lib/utils";

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

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [teams, setTeams] = useState(mockTeams);
  const [activeTab, setActiveTab] = useState("teams");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  const handleFollow = (teamId: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, followed: !team.followed } : team
      )
    );
  };

  const filteredTeams = teams.filter((team) => {
    if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSport !== "all" && team.sport.toLowerCase() !== selectedSport) {
      return false;
    }
    if (
      selectedLeague !== "all" &&
      team.league.toLowerCase().replace(" ", "-") !== selectedLeague
    ) {
      return false;
    }
    return true;
  });

  const filteredPlayers = mockPlayers.filter((player) => {
    if (searchQuery && !player.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSport !== "all" && player.sport.toLowerCase() !== selectedSport) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSelectedSport("all");
    setSelectedLeague("all");
    setSearchQuery("");
    setSearchParams({});
  };

  const hasFilters = selectedSport !== "all" || selectedLeague !== "all" || searchQuery;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Compass className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold">Discover</h1>
          <p className="text-sm text-muted-foreground">
            Find and follow teams, players, and leagues
          </p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search teams, players, leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
          data-usecases="UC_103,UC_114"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={selectedSport} onValueChange={setSelectedSport}>
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
        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
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
            Clear all
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="teams" className="gap-2">
            <Users className="h-4 w-4" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="players" className="gap-2">
            <User className="h-4 w-4" />
            Players
          </TabsTrigger>
          <TabsTrigger value="leagues" className="gap-2">
            <Trophy className="h-4 w-4" />
            Leagues
          </TabsTrigger>
        </TabsList>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : filteredTeams.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <span className="text-lg font-bold text-muted-foreground">
                            {team.shortName.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {team.league}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={team.followed ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFollow(team.id)}
                        className={cn(
                          team.followed && "bg-success/10 text-success hover:bg-success/20"
                        )}
                        data-usecases="UC_007,UC_008"
                      >
                        {team.followed ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Following
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-results"
              title={`No teams found${searchQuery ? ` for "${searchQuery}"` : ""}`}
              onAction={clearFilters}
            />
          )}
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players" className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlayers.map((player) => (
                <Card key={player.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {player.team}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        data-usecases="UC_007,UC_008"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Follow
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {player.position}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {player.sport}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-results"
              title={`No players found${searchQuery ? ` for "${searchQuery}"` : ""}`}
              onAction={clearFilters}
            />
          )}
        </TabsContent>

        {/* Leagues Tab */}
        <TabsContent value="leagues" className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leagueOptions
                .filter((l) => l.value !== "all")
                .map((league) => (
                  <Card key={league.value} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                            <Trophy className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">{league.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {teams.filter(
                                (t) =>
                                  t.league.toLowerCase().replace(" ", "-") ===
                                  league.value
                              ).length}{" "}
                              teams
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          data-usecases="UC_007,UC_008"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
