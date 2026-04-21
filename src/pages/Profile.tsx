import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Bell,
  Shield,
  Trash2,
  Edit,
  Save,
  X,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { mockUserPreferences } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "johndoe",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const [preferences, setPreferences] = useState(mockUserPreferences);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleNotificationToggle = (key: keyof typeof preferences.notificationSettings) => {
    setPreferences((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [key]: !prev.notificationSettings[key],
      },
    }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleRemoveFavorite = (type: "team" | "league" | "player", id: string) => {
    setPreferences((prev) => {
      if (type === "team") {
        return { ...prev, favoriteTeams: prev.favoriteTeams.filter((t) => t.id !== id) };
      } else if (type === "league") {
        return { ...prev, favoriteLeagues: prev.favoriteLeagues.filter((l) => l.id !== id) };
      } else {
        return { ...prev, favoritePlayers: prev.favoritePlayers.filter((p) => p.id !== id) };
      }
    });
    toast({
      title: "Removed from favorites",
      description: "The item has been removed from your favorites.",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-avatar.jpg" alt={profile.username} />
            <AvatarFallback className="text-2xl bg-primary/20 text-primary">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl mb-1">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-muted-foreground">@{profile.username}</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="secondary">
                <Star className="h-3 w-3 mr-1" />
                {preferences.favoriteTeams.length + preferences.favoritePlayers.length + preferences.favoriteLeagues.length} Following
              </Badge>
              <Badge variant="outline">
                {preferences.favoriteSports.join(", ")}
              </Badge>
            </div>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
            data-usecases="UC_003"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card data-usecases="UC_001,UC_002,UC_003">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Manage your personal details and account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editedProfile.firstName : profile.firstName}
                      onChange={(e) =>
                        setEditedProfile((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editedProfile.lastName : profile.lastName}
                      onChange={(e) =>
                        setEditedProfile((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={isEditing ? editedProfile.username : profile.username}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({ ...prev, username: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                {isEditing && (
                  <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50" data-usecases="UC_004">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6" data-usecases="UC_007,UC_008,UC_009">
            {/* Favorite Teams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Favorite Teams
                </CardTitle>
                <CardDescription>
                  Teams you follow for personalized content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {preferences.favoriteTeams.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No favorite teams yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {preferences.favoriteTeams.map((team) => (
                      <Badge
                        key={team.id}
                        variant="secondary"
                        className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                      >
                        {team.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 hover:bg-destructive/20"
                          onClick={() => handleRemoveFavorite("team", team.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Favorite Leagues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Favorite Leagues
                </CardTitle>
                <CardDescription>
                  Leagues and competitions you follow
                </CardDescription>
              </CardHeader>
              <CardContent>
                {preferences.favoriteLeagues.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No favorite leagues yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {preferences.favoriteLeagues.map((league) => (
                      <Badge
                        key={league.id}
                        variant="secondary"
                        className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                      >
                        {league.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 hover:bg-destructive/20"
                          onClick={() => handleRemoveFavorite("league", league.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Favorite Players */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Favorite Players
                </CardTitle>
                <CardDescription>
                  Players you follow for updates and news
                </CardDescription>
              </CardHeader>
              <CardContent>
                {preferences.favoritePlayers.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No favorite players yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {preferences.favoritePlayers.map((player) => (
                      <Badge
                        key={player.id}
                        variant="secondary"
                        className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                      >
                        {player.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 hover:bg-destructive/20"
                          onClick={() => handleRemoveFavorite("player", player.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6" data-usecases="UC_020,UC_141">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Match Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between" data-usecases="UC_020">
                      <div>
                        <Label htmlFor="matchStart" className="font-medium">Match Start</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when matches begin
                        </p>
                      </div>
                      <Switch
                        id="matchStart"
                        checked={preferences.notificationSettings.matchStart}
                        onCheckedChange={() => handleNotificationToggle("matchStart")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between" data-usecases="UC_020">
                      <div>
                        <Label htmlFor="goals" className="font-medium">Goals</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when goals are scored
                        </p>
                      </div>
                      <Switch
                        id="goals"
                        checked={preferences.notificationSettings.goals}
                        onCheckedChange={() => handleNotificationToggle("goals")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between" data-usecases="UC_020">
                      <div>
                        <Label htmlFor="matchEnd" className="font-medium">Match End</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when matches finish
                        </p>
                      </div>
                      <Switch
                        id="matchEnd"
                        checked={preferences.notificationSettings.matchEnd}
                        onCheckedChange={() => handleNotificationToggle("matchEnd")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Content Notifications
                  </h4>
                  <div className="flex items-center justify-between" data-usecases="UC_020">
                    <div>
                      <Label htmlFor="news" className="font-medium">News & Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about news and articles
                      </p>
                    </div>
                    <Switch
                      id="news"
                      checked={preferences.notificationSettings.news}
                      onCheckedChange={() => handleNotificationToggle("news")}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Delivery Channels
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between" data-usecases="UC_020">
                      <div>
                        <Label htmlFor="push" className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch
                        id="push"
                        checked={preferences.notificationSettings.push}
                        onCheckedChange={() => handleNotificationToggle("push")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between" data-usecases="UC_020">
                      <div>
                        <Label htmlFor="email" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email"
                        checked={preferences.notificationSettings.email}
                        onCheckedChange={() => handleNotificationToggle("email")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
