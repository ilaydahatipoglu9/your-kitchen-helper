import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search as SearchIcon,
  X,
  Users,
  Trophy,
  User,
  Star,
  StarOff,
  TrendingUp,
  Clock,
} from "lucide-react";
import { mockSearchResults, mockTrendingItems } from "@/data/mockData";

interface SearchResult {
  id: string;
  name: string;
  type: "team" | "player" | "league";
  sport?: string;
  league?: string;
  team?: string;
  country?: string;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sportFilter, setSportFilter] = useState("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [followedIds, setFollowedIds] = useState<Set<string>>(new Set(["manu", "lakers", "p1"]));
  const [recentSearches] = useState(["Manchester United", "NBA", "LeBron James"]);

  // Combine all results
  const allResults: SearchResult[] = useMemo(() => [
    ...mockSearchResults.teams.map((t) => ({ ...t, type: "team" as const })),
    ...mockSearchResults.players.map((p) => ({ ...p, type: "player" as const })),
    ...mockSearchResults.leagues.map((l) => ({ ...l, type: "league" as const })),
  ], []);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = allResults.filter((item) => {
          const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
          const matchesSport = sportFilter === "all" || item.sport?.toLowerCase() === sportFilter.toLowerCase();
          const matchesTab = activeTab === "all" || item.type === activeTab;
          return matchesQuery && matchesSport && matchesTab;
        });
        setResults(filtered);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, activeTab, sportFilter, allResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const toggleFollow = (id: string) => {
    setFollowedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "team":
        return <Users className="h-5 w-5" />;
      case "player":
        return <User className="h-5 w-5" />;
      case "league":
        return <Trophy className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const ResultCard = ({ result }: { result: SearchResult }) => {
    const isFollowed = followedIds.has(result.id);
    
    return (
      <Card
        className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
        data-usecases="UC_114,UC_118"
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
            {getResultIcon(result.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{result.name}</h3>
              <Badge variant="secondary" className="text-xs capitalize">
                {result.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {result.type === "team" && `${result.league} - ${result.sport}`}
              {result.type === "player" && `${result.team} - ${result.sport}`}
              {result.type === "league" && `${result.country} - ${result.sport}`}
            </p>
          </div>
          <Button
            variant={isFollowed ? "secondary" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollow(result.id);
            }}
            data-usecases="UC_007,UC_008"
          >
            {isFollowed ? (
              <>
                <StarOff className="h-4 w-4 mr-1" />
                Unfollow
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-1" />
                Follow
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl mb-4">Search</h1>
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teams, players, leagues..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-lg"
              autoFocus
              data-usecases="UC_103,UC_123"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setQuery("");
                  setSearchParams({});
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </form>
        </div>

        {/* No Query State */}
        {!query && (
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Recent Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(search)}
                      className="rounded-full"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </section>
            )}

            {/* Trending */}
            <section data-usecases="UC_016,UC_017">
              <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Searches
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {mockTrendingItems.slice(0, 6).map((item, index) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setQuery(item.title)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground w-8">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.engagement.toLocaleString()} searches
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Browse by Category */}
            <section>
              <h2 className="font-heading font-semibold text-lg mb-4">Browse by Category</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <Card
                  className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                  onClick={() => setActiveTab("team")}
                >
                  <CardContent className="p-6 text-center">
                    <Users className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-medium">Teams</h3>
                    <p className="text-sm text-muted-foreground">Find your favorite teams</p>
                  </CardContent>
                </Card>
                <Card
                  className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                  onClick={() => setActiveTab("player")}
                >
                  <CardContent className="p-6 text-center">
                    <User className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-medium">Players</h3>
                    <p className="text-sm text-muted-foreground">Follow star players</p>
                  </CardContent>
                </Card>
                <Card
                  className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                  onClick={() => setActiveTab("league")}
                >
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-medium">Leagues</h3>
                    <p className="text-sm text-muted-foreground">Explore competitions</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList data-usecases="UC_119,UC_120">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="team">Teams</TabsTrigger>
                  <TabsTrigger value="player">Players</TabsTrigger>
                  <TabsTrigger value="league">Leagues</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={sportFilter} onValueChange={setSportFilter} data-usecases="UC_119,UC_120">
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

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Searching..." : `${results.length} results for "${query}"`}
              </p>
              {results.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setSearchParams({});
                    setSportFilter("all");
                    setActiveTab("all");
                  }}
                  data-usecases="UC_122"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Results List */}
            <div className="space-y-3" data-usecases="UC_114,UC_118">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))
              ) : results.length > 0 ? (
                results.map((result) => (
                  <ResultCard key={`${result.type}-${result.id}`} result={result} />
                ))
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-medium text-lg mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find anything matching "{query}"
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <p className="text-sm text-muted-foreground w-full mb-2">Try searching for:</p>
                    {["Manchester United", "NBA", "LeBron James"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(suggestion)}
                        className="rounded-full"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
