import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Star,
  Bell,
  Users,
  Trophy,
  UserCircle,
  Activity,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  mockUserProfile,
  mockTeams,
  mockLeagues,
  mockPlayers,
} from "@/data/mockData";

const Preferences = () => {
  const location = useLocation();
  const { toast } = useToast();
  const defaultTab = location.hash === "#notifications" ? "notifications" : "favorites";

  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(
    mockUserProfile.preferences.favoriteTeams
  );
  const [favoriteLeagues, setFavoriteLeagues] = useState<string[]>(
    mockUserProfile.preferences.favoriteLeagues
  );
  const [favoritePlayers, setFavoritePlayers] = useState<string[]>(
    mockUserProfile.preferences.favoritePlayers
  );
  const [notificationSettings, setNotificationSettings] = useState(
    mockUserProfile.notificationSettings
  );

  const toggleFavoriteTeam = (teamId: string) => {
    setFavoriteTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const toggleFavoriteLeague = (leagueId: string) => {
    setFavoriteLeagues((prev) =>
      prev.includes(leagueId)
        ? prev.filter((id) => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const toggleFavoritePlayer = (playerId: string) => {
    setFavoritePlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Preferences</h1>
          <p className="text-muted-foreground">
            Customize your sports experience
          </p>
        </div>
        <Button onClick={handleSave} data-usecases="UC_008">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="mt-6 space-y-6">
          {/* Favorite Teams */}
          <Card data-usecases="UC_007,UC_008">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Favorite Teams
              </CardTitle>
              <CardDescription>
                Select the teams you want to follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mockTeams.map((team) => {
                  const isSelected = favoriteTeams.includes(team.id);
                  return (
                    <button
                      key={team.id}
                      onClick={() => toggleFavoriteTeam(team.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-usecases="UC_007,UC_008"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-bold text-primary">
                          {team.shortName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{team.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {team.league}
                        </p>
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

          {/* Favorite Leagues */}
          <Card data-usecases="UC_007,UC_008">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Favorite Leagues
              </CardTitle>
              <CardDescription>
                Select the leagues you want to follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mockLeagues.map((league) => {
                  const isSelected = favoriteLeagues.includes(league.id);
                  return (
                    <button
                      key={league.id}
                      onClick={() => toggleFavoriteLeague(league.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-usecases="UC_007,UC_008"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                        <Trophy className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{league.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {league.country} - {league.sport}
                        </p>
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

          {/* Favorite Players */}
          <Card data-usecases="UC_007,UC_008">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-secondary" />
                Favorite Players
              </CardTitle>
              <CardDescription>
                Select the players you want to follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mockPlayers.map((player) => {
                  const isSelected = favoritePlayers.includes(player.id);
                  return (
                    <button
                      key={player.id}
                      onClick={() => toggleFavoritePlayer(player.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-usecases="UC_007,UC_008"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                        <span className="font-bold text-secondary-foreground">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {player.team} - {player.position}
                        </p>
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
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6" data-usecases="UC_020,UC_141">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Start */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="matchStart" className="text-base">
                    Match Start
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a match you're following starts
                  </p>
                </div>
                <Switch
                  id="matchStart"
                  checked={notificationSettings.matchStart}
                  onCheckedChange={() => toggleNotification("matchStart")}
                  data-usecases="UC_020"
                />
              </div>

              <Separator />

              {/* Goals */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="goals" className="text-base">
                    Goals
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a goal is scored in matches you're following
                  </p>
                </div>
                <Switch
                  id="goals"
                  checked={notificationSettings.goals}
                  onCheckedChange={() => toggleNotification("goals")}
                  data-usecases="UC_020"
                />
              </div>

              <Separator />

              {/* Final Score */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="finalScore" className="text-base">
                    Final Score
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a match ends with the final score
                  </p>
                </div>
                <Switch
                  id="finalScore"
                  checked={notificationSettings.finalScore}
                  onCheckedChange={() => toggleNotification("finalScore")}
                  data-usecases="UC_020"
                />
              </div>

              <Separator />

              {/* News */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="news" className="text-base">
                    News Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about news related to your favorite teams
                  </p>
                </div>
                <Switch
                  id="news"
                  checked={notificationSettings.news}
                  onCheckedChange={() => toggleNotification("news")}
                  data-usecases="UC_020"
                />
              </div>

              <Separator />

              {/* Transfers */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transfers" className="text-base">
                    Transfer News
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about transfer news and rumors
                  </p>
                </div>
                <Switch
                  id="transfers"
                  checked={notificationSettings.transfers}
                  onCheckedChange={() => toggleNotification("transfers")}
                  data-usecases="UC_020"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card data-usecases="UC_162">
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch defaultChecked data-usecases="UC_162" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch data-usecases="UC_162" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Preferences;
