import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Settings, 
  Heart, 
  Bell, 
  LogOut, 
  Edit, 
  Camera,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamCard } from "@/components/sports/TeamCard";
import { PlayerCard } from "@/components/sports/PlayerCard";
import { SectionHeader, EmptyState } from "@/components/common";
import { mockTeams, mockPlayers } from "@/data/mockData";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  location?: string;
  joinedDate: string;
  bio?: string;
}

const mockUserProfile: UserProfile = {
  id: "user-1",
  username: "johndoe",
  email: "john@example.com",
  fullName: "John Doe",
  location: "New York, USA",
  joinedDate: "2023-06-15",
  bio: "Sports enthusiast. Football and basketball fan.",
};

export default function Profile() {
  const [profile] = useState<UserProfile>(mockUserProfile);
  const followedTeams = mockTeams.filter((t) => t.isFollowed);
  const followedPlayers = mockPlayers.filter((p) => p.isFollowed);

  const joinedDate = new Date(profile.joinedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6" data-usecases="UC_002">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={profile.avatar} alt={profile.fullName} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile.fullName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                aria-label="Change avatar"
                data-usecases="UC_003"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-2xl font-heading font-bold">{profile.fullName}</h1>
                <Badge variant="secondary">@{profile.username}</Badge>
              </div>
              
              {profile.bio && (
                <p className="text-muted-foreground mb-4">{profile.bio}</p>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </span>
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {joinedDate}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link to="/profile/edit">
                <Button variant="outline" data-usecases="UC_003">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{followedTeams.length}</p>
                <p className="text-sm text-muted-foreground">Teams Following</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                <User className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{followedPlayers.length}</p>
                <p className="text-sm text-muted-foreground">Players Following</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <Bell className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="following">
        <TabsList>
          <TabsTrigger value="following" data-usecases="UC_009">
            Following
          </TabsTrigger>
          <TabsTrigger value="preferences" data-usecases="UC_009">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="settings" data-usecases="UC_003">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Following Tab */}
        <TabsContent value="following" className="space-y-8 mt-6">
          {/* Followed Teams */}
          <section>
            <SectionHeader
              title="Teams You Follow"
              viewAllHref="/teams"
              useCases="UC_007"
            />
            {followedTeams.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {followedTeams.map((team) => (
                  <TeamCard key={team.id} team={team} variant="compact" />
                ))}
              </div>
            ) : (
              <EmptyState
                type="no-teams"
                action={{
                  label: "Discover Teams",
                  onClick: () => window.location.href = "/discover?tab=teams",
                  useCases: "UC_103",
                }}
              />
            )}
          </section>

          {/* Followed Players */}
          <section>
            <SectionHeader
              title="Players You Follow"
              viewAllHref="/players"
              useCases="UC_007"
            />
            {followedPlayers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {followedPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} variant="compact" />
                ))}
              </div>
            ) : (
              <EmptyState
                type="custom"
                title="No players followed yet"
                description="Follow your favorite players to see their updates here."
                action={{
                  label: "Discover Players",
                  onClick: () => window.location.href = "/discover?tab=players",
                  useCases: "UC_103",
                }}
              />
            )}
          </section>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Preferences</CardTitle>
              <CardDescription>
                Customize your sports content experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Link to="/profile/preferences">
                <Button className="w-full md:w-auto" data-usecases="UC_007,UC_008">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Preferences
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/profile/edit" className="block">
                <Button variant="outline" className="w-full justify-start" data-usecases="UC_003">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/notifications/settings" className="block">
                <Button variant="outline" className="w-full justify-start" data-usecases="UC_020">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
              </Link>
              <Link to="/auth/signin" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  data-usecases="UC_269"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" data-usecases="UC_004">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
