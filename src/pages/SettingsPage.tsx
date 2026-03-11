import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  User,
  Bell,
  Palette,
  Grid3X3,
  Shield,
  HardDrive,
  Save,
  Camera,
} from 'lucide-react';
import { toast } from 'sonner';
import { currentUser, storageInfo, formatFileSize } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const SettingsPage: React.FC = () => {
  // Profile settings
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // Appearance settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [defaultView, setDefaultView] = useState<'grid' | 'list'>('grid');
  const [displayDensity, setDisplayDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [uploadNotifications, setUploadNotifications] = useState(true);
  const [shareNotifications, setShareNotifications] = useState(true);
  const [deleteNotifications, setDeleteNotifications] = useState(false);

  const storagePercentage = (storageInfo.used / storageInfo.total) * 100;

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleSaveAppearance = () => {
    toast.success('Appearance settings saved');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-4xl space-y-6 p-4 pb-16">
          {/* Profile Section */}
          <Card data-usecases="UC_076">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>
                Manage your personal information and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} alt={name} />
                    <AvatarFallback className="text-lg">
                      {name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>

              <Separator />

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card data-usecases="UC_076,UC_077,UC_079,UC_080">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how the file manager looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred color theme
                  </p>
                </div>
                <Select value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
                  <SelectTrigger className="w-40" data-usecases="UC_080">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Default View */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default View</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose how files are displayed by default
                  </p>
                </div>
                <Select value={defaultView} onValueChange={(v) => setDefaultView(v as typeof defaultView)}>
                  <SelectTrigger className="w-40" data-usecases="UC_077">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Display Density */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Display Density</Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust spacing between items
                  </p>
                </div>
                <Select value={displayDensity} onValueChange={(v) => setDisplayDensity(v as typeof displayDensity)}>
                  <SelectTrigger className="w-40" data-usecases="UC_079">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveAppearance} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card data-usecases="UC_076,UC_081">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  data-usecases="UC_081"
                />
              </div>

              <Separator />

              {/* Upload Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Upload Complete</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when file uploads finish
                  </p>
                </div>
                <Switch
                  checked={uploadNotifications}
                  onCheckedChange={setUploadNotifications}
                  data-usecases="UC_081"
                />
              </div>

              <Separator />

              {/* Share Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Shared with Me</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when someone shares files with you
                  </p>
                </div>
                <Switch
                  checked={shareNotifications}
                  onCheckedChange={setShareNotifications}
                  data-usecases="UC_081"
                />
              </div>

              <Separator />

              {/* Delete Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deletion Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Show confirmation before deleting files
                  </p>
                </div>
                <Switch
                  checked={deleteNotifications}
                  onCheckedChange={setDeleteNotifications}
                  data-usecases="UC_081"
                />
              </div>

              <Button onClick={handleSaveNotifications} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Storage Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <CardTitle>Storage</CardTitle>
              </div>
              <CardDescription>
                View your storage usage and manage your plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Storage Used</span>
                  <span className="font-medium">
                    {formatFileSize(storageInfo.used)} of {formatFileSize(storageInfo.total)}
                  </span>
                </div>
                <Progress value={storagePercentage} className="h-3" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {storagePercentage.toFixed(1)}% of your storage is used
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Free Plan - 10 GB</p>
                </div>
                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" data-usecases="UC_004">Change Password</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SettingsPage;
