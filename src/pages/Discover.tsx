import { useState } from "react";
import { Search, Filter, X, Star, Users, Trophy, Flag, ChevronRight } from "lucide-react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonList } from "@/components/ui/skeleton-card";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "team" | "player" | "league" | "sport";
  name: string;
  subtitle: string;
  followers?: number;
  isFollowing?: boolean;
}

// Mock search results
const mockResults: SearchResult[] = [
  { id: "1", type: "team", name: "Manchester United", subtitle: "Premier League - England", followers: 125000, isFollowing: true },
  { id: "2", type: "team", name: "Real Madrid", subtitle: "La Liga - Spain", followers: 180000, isFollowing: false },
  { id: "3", type: "player", name: "Cristiano Ronaldo", subtitle: "Al Nassr - Forward", followers: 250000, isFollowing: true },
  { id: "4", type: "player", name: "Lionel Messi", subtitle: "Inter Miami - Forward", followers: 280000, isFollowing: false },
  { id: "5", type: "league", name: "Premier League", subtitle: "England - Football", followers: 500000, isFollowing: true },
  { id: "6", type: "league", name: "NBA", subtitle: "USA - Basketball", followers: 450000, isFollowing: false },
  { id: "7", type: "sport", name: "Football", subtitle: "Most popular sport worldwide", followers: 1000000, isFollowing: true },
  { id: "8", type: "sport", name: "Basketball", subtitle: "Fast-paced court action", followers: 800000, isFollowing: false },
  { id: "9", type: "team", name: "LA Lakers", subtitle: "NBA - USA", followers: 200000, isFollowing: false },
  { id: "10", type: "player", name: "LeBron James", subtitle: "LA Lakers - Forward", followers: 220000, isFollowing: true },
];

const popularCategories = [
  { id: "football", name: "Football", icon: Trophy, count: 245 },
  { id: "basketball", name: "Basketball", icon: Trophy, count: 128 },
  { id: "tennis", name: "Tennis", icon: Trophy, count: 86 },
  { id: "cricket", name: "Cricket", icon: Trophy, count: 64 },
  { id: "baseball", name: "Baseball", icon: Trophy, count: 52 },
  { id: "hockey", name: "Hockey", icon: Trophy, count: 48 },
];

const trendingSearches = [
  "Champions League",
  "NBA Finals",
  "World Cup",
  "Wimbledon",
  "Super Bowl",
  "Premier League",
];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        const filtered = mockResults.filter(
          (r) =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setResults([]);
    }
  };

  const toggleFollow = (id: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isFollowing = (result: SearchResult) => {
    return followingState[result.id] ?? result.isFollowing;
  };

  const filteredResults = results.filter((r) => {
    if (activeTab === "all") return true;
    return r.type === activeTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "team":
        return Users;
      case "player":
        return Star;
      case "league":
        return Flag;
      case "sport":
        return Trophy;
      default:
        return Trophy;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-content px-4 md:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground mt-1">
            Search and explore sports, teams, leagues, and players
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams, players, leagues, sports..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg rounded-xl"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                setSearchQuery("");
                setResults([]);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery ? (
          <div>
            {/* Filter Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="team">Teams</TabsTrigger>
                <TabsTrigger value="player">Players</TabsTrigger>
                <TabsTrigger value="league">Leagues</TabsTrigger>
                <TabsTrigger value="sport">Sports</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Results */}
            {isSearching ? (
              <SkeletonList count={5} />
            ) : filteredResults.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No results found"
                description={`We couldn't find anything matching "${searchQuery}". Try a different search term.`}
                actionLabel="Clear Search"
                onAction={() => {
                  setSearchQuery("");
                  setResults([]);
                }}
              />
            ) : (
              <div className="space-y-3">
                {filteredResults.map((result) => {
                  const Icon = getTypeIcon(result.type);
                  const following = isFollowing(result);

                  return (
                    <Card
                      key={result.id}
                      className="card-hover cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Icon className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold truncate">{result.name}</h3>
                              <Badge variant="secondary" className="text-xs capitalize">
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {result.subtitle}
                            </p>
                            {result.followers && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {result.followers.toLocaleString()} followers
                              </p>
                            )}
                          </div>
                          <Button
                            variant={following ? "secondary" : "default"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFollow(result.id);
                            }}
                          >
                            {following ? "Following" : "Follow"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Browse Content */
          <div className="space-y-8">
            {/* Trending Searches */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Trending Searches</h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(term)}
                    className="rounded-full"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </section>

            {/* Popular Categories */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Browse by Sport</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="card-hover cursor-pointer"
                    onClick={() => handleSearch(category.name)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                        <category.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.count} teams
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Featured Leagues */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Featured Leagues</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Premier League", sport: "Football", teams: 20, country: "England" },
                  { name: "NBA", sport: "Basketball", teams: 30, country: "USA" },
                  { name: "La Liga", sport: "Football", teams: 20, country: "Spain" },
                  { name: "Serie A", sport: "Football", teams: 20, country: "Italy" },
                  { name: "Bundesliga", sport: "Football", teams: 18, country: "Germany" },
                  { name: "ATP Tour", sport: "Tennis", teams: 500, country: "International" },
                ].map((league) => (
                  <Card key={league.name} className="card-hover cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <Flag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{league.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {league.sport} - {league.country}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {league.teams} teams
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Popular Teams */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Popular Teams</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  "Manchester United",
                  "Real Madrid",
                  "Barcelona",
                  "LA Lakers",
                  "Bayern Munich",
                  "PSG",
                ].map((team) => (
                  <Card key={team} className="card-hover cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-sm truncate">{team}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
