import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import {
  Search as SearchIcon,
  Filter,
  Users,
  Trophy,
  User,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "team" | "player" | "league";
  name: string;
  subtitle: string;
  imageUrl?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    type: "team",
    name: "Manchester United",
    subtitle: "Premier League • England",
  },
  {
    id: "2",
    type: "team",
    name: "Manchester City",
    subtitle: "Premier League • England",
  },
  {
    id: "3",
    type: "player",
    name: "Marcus Rashford",
    subtitle: "Manchester United • Forward",
  },
  {
    id: "4",
    type: "player",
    name: "Erling Haaland",
    subtitle: "Manchester City • Forward",
  },
  {
    id: "5",
    type: "league",
    name: "Premier League",
    subtitle: "England • 20 Teams",
  },
  {
    id: "6",
    type: "team",
    name: "Real Madrid",
    subtitle: "La Liga • Spain",
  },
  {
    id: "7",
    type: "player",
    name: "Jude Bellingham",
    subtitle: "Real Madrid • Midfielder",
  },
  {
    id: "8",
    type: "league",
    name: "La Liga",
    subtitle: "Spain • 20 Teams",
  },
];

const filters = ["All", "Teams", "Players", "Leagues"];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(
          (result) =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const filteredResults =
    selectedFilter === "All"
      ? results
      : results.filter(
          (result) =>
            result.type === selectedFilter.toLowerCase().slice(0, -1)
        );

  const getTypeIcon = (type: string) => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SearchIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Search</h1>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams, players, leagues..."
            className="pl-12 h-12 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </form>

        {/* Filters */}
        {query.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="shrink-0"
              >
                {filter}
              </Button>
            ))}
          </div>
        )}

        {/* Results */}
        {query.length === 0 ? (
          <div className="py-12">
            <div className="text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Search for anything
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Find your favorite teams, players, and leagues. Start typing to
                see results.
              </p>
            </div>

            {/* Popular Searches */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Premier League",
                  "Real Madrid",
                  "Erling Haaland",
                  "Champions League",
                  "Barcelona",
                  "Kylian Mbappé",
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} variant="compact" />
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-3">
            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      result.type === "team" && "bg-info/10 text-info",
                      result.type === "player" && "bg-success/10 text-success",
                      result.type === "league" && "bg-warning/10 text-warning"
                    )}
                  >
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {result.subtitle}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      result.type === "team" && "border-info text-info",
                      result.type === "player" && "border-success text-success",
                      result.type === "league" && "border-warning text-warning"
                    )}
                  >
                    {result.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            type="no-search-results"
            customMessage={`No results found for "${query}". Try different keywords.`}
            onAction={() => setQuery("")}
            actionLabel="Clear Search"
          />
        )}
      </div>
    </MainLayout>
  );
}
