import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  User,
  Settings,
  Bell,
  Heart,
  Shield,
  LogOut,
  Edit,
  Camera,
  Check,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

interface UserProfile {
  name: string;
  email: string;
  username: string;
  bio: string;
  location: string;
  joinDate: string;
}

interface Preference {
  id: string;
  name: string;
  type: "sport" | "team" | "league" | "player";
}

// Mock user data
const mockUser: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  bio: "Sports enthusiast. Football and basketball fan.",
  location: "New York, USA",
  joinDate: "January 2024",
};

const mockPreferences: Preference[] = [
  { id: "1", name: "Football", type: "sport" },
  { id: "2", name: "Basketball", type: "sport" },
  { id: "3", name: "Manchester United", type: "team" },
  { id: "4", name: "LA Lakers", type: "team" },
  { id: "5", name: "Real Madrid", type: "team" },
  { id: "6", name: "Premier League", type: "league" },
  { id: "7", name: "NBA", type: "league" },
  { id: "8", name: "Cristiano Ronaldo", type: "player" },
  { id: "9", name: "LeBron James", type: "player" },
];

export default function Profile() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUser);
  const [editedProfile, setEditedProfile] = useState(mockUser);
  const [preferences, setPreferences] = useState(mockPreferences);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const removePreference = (id: string) => {
    setPreferences((prev) => prev.filter((p) => p.id !== id));
  };

  const getPreferencesByType = (type: Preference["type"]) => {
    return preferences.filter((p) => p.type === type);
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="container mx-auto max-w-reading px-4 md:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold">
              {profile.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">@{profile.username}</p>
            <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{profile.location}</span>
              <span>Joined {profile.joinDate}</span>
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Heart className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={profile.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input value={profile.username} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={profile.location} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input value={profile.bio} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-6 space-y-6">
            {/* Sports */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Favorite Sports</CardTitle>
                    <CardDescription>Sports you follow</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Sport
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getPreferencesByType("sport").map((pref) => (
                    <Badge
                      key={pref.id}
                      variant="secondary"
                      className="gap-2 py-1.5 px-3"
                    >
                      {pref.name}
                      <button
                        onClick={() => removePreference(pref.id)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teams */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Favorite Teams</CardTitle>
                    <CardDescription>Teams you follow</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Team
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getPreferencesByType("team").map((pref) => (
                    <Badge
                      key={pref.id}
                      variant="secondary"
                      className="gap-2 py-1.5 px-3"
                    >
                      {pref.name}
                      <button
                        onClick={() => removePreference(pref.id)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leagues */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Favorite Leagues</CardTitle>
                    <CardDescription>Leagues you follow</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add League
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getPreferencesByType("league").map((pref) => (
                    <Badge
                      key={pref.id}
                      variant="secondary"
                      className="gap-2 py-1.5 px-3"
                    >
                      {pref.name}
                      <button
                        onClick={() => removePreference(pref.id)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Players */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Favorite Players</CardTitle>
                    <CardDescription>Players you follow</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Player
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getPreferencesByType("player").map((pref) => (
                    <Badge
                      key={pref.id}
                      variant="secondary"
                      className="gap-2 py-1.5 px-3"
                    >
                      {pref.name}
                      <button
                        onClick={() => removePreference(pref.id)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    id: "match-start",
                    title: "Match Start Alerts",
                    description: "Get notified when matches you follow are about to start",
                    enabled: true,
                  },
                  {
                    id: "score-updates",
                    title: "Score Updates",
                    description: "Receive real-time score updates during live matches",
                    enabled: true,
                  },
                  {
                    id: "news",
                    title: "News & Articles",
                    description: "Get notified about news related to your favorite teams",
                    enabled: false,
                  },
                  {
                    id: "transfer",
                    title: "Transfer News",
                    description: "Receive updates about player transfers and rumors",
                    enabled: true,
                  },
                  {
                    id: "weekly-digest",
                    title: "Weekly Digest",
                    description: "Receive a weekly summary of sports highlights",
                    enabled: false,
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label>{notification.title}</Label>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Not Enabled</Badge>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sign out of all devices</p>
                    <p className="text-sm text-muted-foreground">
                      This will sign you out from all devices
                    </p>
                  </div>
                  <Button variant="outline">Sign Out All</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editedProfile.username}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedProfile.location}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
