import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Settings,
  Bell,
  Heart,
  Edit,
  Plus,
  X,
  Trophy,
  Users,
  Star,
} from "lucide-react";
import { mockUserPreferences } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Profile() {
  const [preferences, setPreferences] = useState(mockUserPreferences);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
  });

  const handleRemoveTeam = (team: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteTeams: prev.favoriteTeams.filter((t) => t !== team),
    }));
  };

  const handleRemovePlayer = (player: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoritePlayers: prev.favoritePlayers.filter((p) => p !== player),
    }));
  };

  const handleRemoveLeague = (league: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteLeagues: prev.favoriteLeagues.filter((l) => l !== league),
    }));
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsEditingProfile(false)}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-muted-foreground">@{profileData.username}</p>
                <p className="text-sm text-muted-foreground">
                  {profileData.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Teams */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-info" />
              <CardTitle className="text-lg">Favorite Teams</CardTitle>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search?type=teams">
                <Plus className="h-4 w-4 mr-2" />
                Add Team
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {preferences.favoriteTeams.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {preferences.favoriteTeams.map((team) => (
                  <Badge
                    key={team}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {team}
                    <button
                      onClick={() => handleRemoveTeam(team)}
                      className="hover:text-destructive transition-colors"
                      aria-label={`Remove ${team}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No favorite teams yet. Add some to personalize your feed.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Favorite Players */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              <CardTitle className="text-lg">Favorite Players</CardTitle>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search?type=players">
                <Plus className="h-4 w-4 mr-2" />
                Add Player
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {preferences.favoritePlayers.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {preferences.favoritePlayers.map((player) => (
                  <Badge
                    key={player}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {player}
                    <button
                      onClick={() => handleRemovePlayer(player)}
                      className="hover:text-destructive transition-colors"
                      aria-label={`Remove ${player}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No favorite players yet. Add some to get updates about them.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Favorite Leagues */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-success" />
              <CardTitle className="text-lg">Favorite Leagues</CardTitle>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/leagues">
                <Plus className="h-4 w-4 mr-2" />
                Add League
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {preferences.favoriteLeagues.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {preferences.favoriteLeagues.map((league) => (
                  <Badge
                    key={league}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    {league}
                    <button
                      onClick={() => handleRemoveLeague(league)}
                      className="hover:text-destructive transition-colors"
                      aria-label={`Remove ${league}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No favorite leagues yet. Add some to see their matches.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="cursor-pointer hover:shadow-card-hover transition-all">
            <CardContent className="p-4">
              <Link
                to="/settings/notifications"
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h3 className="font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your alerts and notifications
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-card-hover transition-all">
            <CardContent className="p-4">
              <Link to="/settings" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Account Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Privacy, security, and more
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
