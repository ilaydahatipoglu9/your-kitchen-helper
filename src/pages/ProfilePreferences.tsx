import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Trophy, Users, User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockSports, mockTeams, mockPlayers, mockLeagues } from "@/data/mockData";

export default function ProfilePreferences() {
  const [selectedSports, setSelectedSports] = useState<string[]>(["football", "basketball"]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(
    mockTeams.filter((t) => t.isFollowed).map((t) => t.id)
  );
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(
    mockPlayers.filter((p) => p.isFollowed).map((p) => p.id)
  );
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>(["league-epl", "league-nba"]);

  const toggleSport = (sportId: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((s) => s !== sportId)
        : [...prev, sportId]
    );
  };

  const toggleTeam = (teamId: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((t) => t !== teamId)
        : [...prev, teamId]
    );
  };

  const togglePlayer = (playerId: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((p) => p !== playerId)
        : [...prev, playerId]
    );
  };

  const toggleLeague = (leagueId: string) => {
    setSelectedLeagues((prev) =>
      prev.includes(leagueId)
        ? prev.filter((l) => l !== leagueId)
        : [...prev, leagueId]
    );
  };

  return (
    <div className="space-y-6" data-usecases="UC_007,UC_008,UC_009">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Content Preferences
          </h1>
          <p className="text-muted-foreground">
            Customize your personalized sports content
          </p>
        </div>
      </div>

      {/* Sports Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Favorite Sports
          </CardTitle>
          <CardDescription>
            Select the sports you want to follow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockSports.map((sport) => (
              <div
                key={sport.id}
                className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleSport(sport.id)}
              >
                <Checkbox
                  id={`sport-${sport.id}`}
                  checked={selectedSports.includes(sport.id)}
                  onCheckedChange={() => toggleSport(sport.id)}
                  data-usecases="UC_007,UC_008"
                />
                <Label
                  htmlFor={`sport-${sport.id}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {sport.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* League Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Favorite Leagues
          </CardTitle>
          <CardDescription>
            Select the leagues you want to follow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockLeagues.map((league) => (
              <div
                key={league.id}
                className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleLeague(league.id)}
              >
                <Checkbox
                  id={`league-${league.id}`}
                  checked={selectedLeagues.includes(league.id)}
                  onCheckedChange={() => toggleLeague(league.id)}
                  data-usecases="UC_007,UC_008"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`league-${league.id}`}
                    className="cursor-pointer font-medium"
                  >
                    {league.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{league.sport}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Favorite Teams
            <Badge variant="secondary">{selectedTeams.length} selected</Badge>
          </CardTitle>
          <CardDescription>
            Select the teams you want to follow for personalized content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTeams.map((team) => (
              <div
                key={team.id}
                className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleTeam(team.id)}
              >
                <Checkbox
                  id={`team-${team.id}`}
                  checked={selectedTeams.includes(team.id)}
                  onCheckedChange={() => toggleTeam(team.id)}
                  data-usecases="UC_007,UC_008"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`team-${team.id}`}
                    className="cursor-pointer font-medium"
                  >
                    {team.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {team.league?.name || team.sport}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Player Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Favorite Players
            <Badge variant="secondary">{selectedPlayers.length} selected</Badge>
          </CardTitle>
          <CardDescription>
            Select the players you want to follow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => togglePlayer(player.id)}
              >
                <Checkbox
                  id={`player-${player.id}`}
                  checked={selectedPlayers.includes(player.id)}
                  onCheckedChange={() => togglePlayer(player.id)}
                  data-usecases="UC_007,UC_008"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`player-${player.id}`}
                    className="cursor-pointer font-medium"
                  >
                    {player.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {player.team?.name || player.sport}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link to="/profile">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button data-usecases="UC_008">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
