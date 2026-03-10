import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Heart,
  Search,
  Plus,
  X,
  Users,
  User,
  Trophy,
  Check,
} from "lucide-react";
import { mockUserPreferences, mockLeagues } from "@/data/mockData";
import { cn } from "@/lib/utils";

const availableTeams = [
  "Manchester United",
  "Manchester City",
  "Liverpool",
  "Chelsea",
  "Arsenal",
  "Tottenham",
  "Real Madrid",
  "Barcelona",
  "Bayern Munich",
  "PSG",
  "Juventus",
  "AC Milan",
  "Inter Milan",
  "Borussia Dortmund",
];

const availablePlayers = [
  "Erling Haaland",
  "Kylian Mbappé",
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Marcus Rashford",
  "Mohamed Salah",
  "Kevin De Bruyne",
  "Jude Bellingham",
  "Vinícius Jr",
  "Harry Kane",
];

export default function Preferences() {
  const [preferences, setPreferences] = useState(mockUserPreferences);
  const [teamSearch, setTeamSearch] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");

  const filteredTeams = availableTeams.filter(
    (team) =>
      team.toLowerCase().includes(teamSearch.toLowerCase()) &&
      !preferences.favoriteTeams.includes(team)
  );

  const filteredPlayers = availablePlayers.filter(
    (player) =>
      player.toLowerCase().includes(playerSearch.toLowerCase()) &&
      !preferences.favoritePlayers.includes(player)
  );

  const addTeam = (team: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteTeams: [...prev.favoriteTeams, team],
    }));
    setTeamSearch("");
  };

  const removeTeam = (team: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteTeams: prev.favoriteTeams.filter((t) => t !== team),
    }));
  };

  const addPlayer = (player: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoritePlayers: [...prev.favoritePlayers, player],
    }));
    setPlayerSearch("");
  };

  const removePlayer = (player: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoritePlayers: prev.favoritePlayers.filter((p) => p !== player),
    }));
  };

  const toggleLeague = (league: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteLeagues: prev.favoriteLeagues.includes(league)
        ? prev.favoriteLeagues.filter((l) => l !== league)
        : [...prev.favoriteLeagues, league],
    }));
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-live" />
            <h1 className="text-2xl font-bold">Manage Preferences</h1>
          </div>
        </div>

        {/* Favorite Teams */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-info" />
              <CardTitle className="text-lg">Favorite Teams</CardTitle>
            </div>
            <CardDescription>
              Follow teams to get updates about their matches and news
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Teams */}
            {preferences.favoriteTeams.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.favoriteTeams.map((team) => (
                  <Badge
                    key={team}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {team}
                    <button
                      onClick={() => removeTeam(team)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Search Teams */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams to add..."
                className="pl-10"
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
              />
            </div>

            {/* Team Suggestions */}
            {teamSearch && filteredTeams.length > 0 && (
              <div className="border rounded-lg divide-y">
                {filteredTeams.slice(0, 5).map((team) => (
                  <button
                    key={team}
                    onClick={() => addTeam(team)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors text-left"
                  >
                    <span>{team}</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorite Players */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-success" />
              <CardTitle className="text-lg">Favorite Players</CardTitle>
            </div>
            <CardDescription>
              Follow players to get updates about their performances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Players */}
            {preferences.favoritePlayers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.favoritePlayers.map((player) => (
                  <Badge
                    key={player}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {player}
                    <button
                      onClick={() => removePlayer(player)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Search Players */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search players to add..."
                className="pl-10"
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
              />
            </div>

            {/* Player Suggestions */}
            {playerSearch && filteredPlayers.length > 0 && (
              <div className="border rounded-lg divide-y">
                {filteredPlayers.slice(0, 5).map((player) => (
                  <button
                    key={player}
                    onClick={() => addPlayer(player)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors text-left"
                  >
                    <span>{player}</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorite Leagues */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              <CardTitle className="text-lg">Favorite Leagues</CardTitle>
            </div>
            <CardDescription>
              Select leagues to see their matches in your feed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {mockLeagues.map((league) => {
                const isSelected = preferences.favoriteLeagues.includes(
                  league.name
                );
                return (
                  <button
                    key={league.id}
                    onClick={() => toggleLeague(league.name)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-warning" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{league.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {league.country}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/profile">Cancel</Link>
          </Button>
          <Button>Save Preferences</Button>
        </div>
      </div>
    </MainLayout>
  );
}
