import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, Search, Star, ChevronRight, MapPin } from "lucide-react";
import { mockLeagues, mockUserPreferences } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Leagues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(mockUserPreferences.favoriteLeagues);

  const filteredLeagues = mockLeagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (leagueName: string) => {
    setFavorites((prev) =>
      prev.includes(leagueName)
        ? prev.filter((l) => l !== leagueName)
        : [...prev, leagueName]
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-warning" />
            <h1 className="text-2xl font-bold">Leagues</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leagues..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Favorite Leagues */}
        {favorites.length > 0 && searchQuery === "" && (
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-warning fill-warning" />
              Your Leagues
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockLeagues
                .filter((league) => favorites.includes(league.name))
                .map((league) => (
                  <LeagueCard
                    key={league.id}
                    league={league}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(league.name)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Leagues */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {searchQuery ? "Search Results" : "All Leagues"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLeagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                isFavorite={favorites.includes(league.name)}
                onToggleFavorite={() => toggleFavorite(league.name)}
              />
            ))}
          </div>
          {filteredLeagues.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No leagues found</h3>
              <p className="text-muted-foreground">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

interface LeagueCardProps {
  league: {
    id: string;
    name: string;
    country: string;
    teams: number;
    currentMatchday: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function LeagueCard({ league, isFavorite, onToggleFavorite }: LeagueCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-warning" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
          >
            <Star
              className={cn(
                "h-4 w-4",
                isFavorite
                  ? "fill-warning text-warning"
                  : "text-muted-foreground"
              )}
            />
          </Button>
        </div>
        <Link to={`/league/${league.id}`}>
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
            {league.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            {league.country}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{league.teams} Teams</span>
            <span>Matchday {league.currentMatchday}</span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
