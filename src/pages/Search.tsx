import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Filter, X, Users, Trophy, UserCircle, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/components/ui/empty-state";
import { TableRowSkeleton } from "@/components/ui/skeleton-loader";
import { mockTeams, mockPlayers, mockLeagues } from "@/data/mockData";
import { cn } from "@/lib/utils";

type EntityType = "all" | "team" | "player" | "league";

interface SearchResult {
  id: string;
  name: string;
  type: EntityType;
  subtitle?: string;
  meta?: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeType, setActiveType] = useState<EntityType>(
    (searchParams.get("type") as EntityType) || "all"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Combine all entities into searchable results
  const allResults: SearchResult[] = useMemo(() => {
    const teams = mockTeams.map((t) => ({
      id: t.id,
      name: t.name,
      type: "team" as EntityType,
      subtitle: t.league,
      meta: t.sport,
    }));
    
    const players = mockPlayers.map((p) => ({
      id: p.id,
      name: p.name,
      type: "player" as EntityType,
      subtitle: p.team,
      meta: p.position,
    }));
    
    const leagues = mockLeagues.map((l) => ({
      id: l.id,
      name: l.name,
      type: "league" as EntityType,
      subtitle: l.country,
      meta: l.sport,
    }));

    return [...teams, ...players, ...leagues];
  }, []);

  // Filter results based on query and type
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    let results = allResults.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (activeType !== "all") {
      results = results.filter((item) => item.type === activeType);
    }

    return results;
  }, [query, activeType, allResults]);

  // Generate suggestions
  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allResults
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, allResults]);

  // Simulate search loading
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query, activeType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setSearchParams({ q: query, type: activeType });
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    setSearchParams({ q: suggestion.name, type: activeType });
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setSearchParams({});
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case "team":
        return Users;
      case "player":
        return UserCircle;
      case "league":
        return Trophy;
      default:
        return Activity;
    }
  };

  const getEntityPath = (result: SearchResult) => {
    switch (result.type) {
      case "team":
        return `/team/${result.id}`;
      case "player":
        return `/player/${result.id}`;
      case "league":
        return `/league/${result.id}`;
      default:
        return "/";
    }
  };

  const resultCounts = useMemo(() => ({
    all: filteredResults.length,
    team: filteredResults.filter((r) => r.type === "team").length,
    player: filteredResults.filter((r) => r.type === "player").length,
    league: filteredResults.filter((r) => r.type === "league").length,
  }), [filteredResults]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Search</h1>
        <p className="text-muted-foreground">
          Find teams, players, leagues, and more
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative" data-usecases="UC_103,UC_114">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for teams, players, leagues..."
            className="h-12 pl-10 pr-10 text-base"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            data-usecases="UC_103,UC_123"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute z-50 mt-2 w-full" data-usecases="UC_123,UC_124,UC_126">
            <CardContent className="p-2">
              {suggestions.map((suggestion) => {
                const Icon = getEntityIcon(suggestion.type);
                return (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                    data-usecases="UC_126"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{suggestion.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.subtitle}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {suggestion.type}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        )}
      </form>

      {/* Filter Tabs */}
      <Tabs
        value={activeType}
        onValueChange={(v) => setActiveType(v as EntityType)}
        className="w-full"
        data-usecases="UC_119,UC_120,UC_121"
      >
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
          <TabsTrigger value="all">
            All
            {query && <Badge variant="secondary" className="ml-1">{resultCounts.all}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="team">
            Teams
            {query && <Badge variant="secondary" className="ml-1">{resultCounts.team}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="player">
            Players
            {query && <Badge variant="secondary" className="ml-1">{resultCounts.player}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="league">
            Leagues
            {query && <Badge variant="secondary" className="ml-1">{resultCounts.league}</Badge>}
          </TabsTrigger>
        </TabsList>

        {/* Results */}
        <TabsContent value={activeType} className="mt-6">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} columns={3} />
              ))}
            </div>
          ) : !query ? (
            <div className="py-12 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-heading text-lg font-semibold">
                Start searching
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter a search term to find teams, players, and leagues
              </p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-2" data-usecases="UC_118">
              {filteredResults.map((result) => {
                const Icon = getEntityIcon(result.type);
                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={getEntityPath(result)}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:scale-[1.01]"
                    data-usecases="UC_118"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.subtitle} {result.meta && `- ${result.meta}`}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {result.type}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState type="no-results" onAction={clearSearch} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
