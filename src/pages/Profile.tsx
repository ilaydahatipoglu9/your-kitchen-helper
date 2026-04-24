import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Settings,
  Bell,
  Star,
  LogOut,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUserProfile, mockTeams, mockLeagues } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: mockUserProfile.displayName,
    email: mockUserProfile.email,
    username: mockUserProfile.username,
  });

  const favoriteTeams = mockTeams.filter((t) =>
    mockUserProfile.preferences.favoriteTeams.includes(t.id)
  );
  const favoriteLeagues = mockLeagues.filter((l) =>
    mockUserProfile.preferences.favoriteLeagues.includes(l.id)
  );

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditDialogOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deleted",
      description: "Your account has been deleted.",
      variant: "destructive",
    });
    navigate("/signin");
  };

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate("/signin");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1" data-usecases="UC_002">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockUserProfile.avatar || undefined} />
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {mockUserProfile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="mt-4 font-heading text-xl font-bold">
                {mockUserProfile.displayName}
              </h2>
              <p className="text-sm text-muted-foreground">
                @{mockUserProfile.username}
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {mockUserProfile.createdAt}</span>
              </div>

              <Separator className="my-4" />

              {/* Quick Stats */}
              <div className="grid w-full grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {favoriteTeams.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Teams</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {favoriteLeagues.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Leagues</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {mockUserProfile.preferences.favoriteSports.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Sports</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Actions */}
              <div className="flex w-full flex-col gap-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" data-usecases="UC_003">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile information.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            value={editForm.displayName}
                            onChange={(e) =>
                              setEditForm({ ...editForm, displayName: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={editForm.username}
                            onChange={(e) =>
                              setEditForm({ ...editForm, username: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" data-usecases="UC_003">
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                  data-usecases="UC_269"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Cards */}
        <div className="space-y-6 md:col-span-2">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {mockUserProfile.email}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">
                      @{mockUserProfile.username}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/preferences"
                className="flex items-center justify-between rounded-lg p-3 hover:bg-accent"
                data-usecases="UC_007,UC_009"
              >
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Preferences</p>
                    <p className="text-sm text-muted-foreground">
                      Manage your favorite teams and sports
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              
              <Link
                to="/preferences#notifications"
                className="flex items-center justify-between rounded-lg p-3 hover:bg-accent"
                data-usecases="UC_020,UC_141"
              >
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Configure your notification preferences
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>

          {/* Favorite Teams */}
          <Card data-usecases="UC_007,UC_008">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Favorite Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {favoriteTeams.map((team) => (
                  <Badge key={team.id} variant="secondary" className="px-3 py-1">
                    {team.name}
                  </Badge>
                ))}
                <Link to="/preferences">
                  <Badge variant="outline" className="cursor-pointer px-3 py-1">
                    + Add more
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" data-usecases="UC_004">
                    <Trash2 className="mr-2 h-4 w-4" />
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
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      data-usecases="UC_004"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
