import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Keyboard,
  Database,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Save,
  Loader2,
} from "lucide-react";

type SettingsSection = "profile" | "notifications" | "security" | "appearance" | "shortcuts" | "data";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "shortcuts" as const, label: "Keyboard Shortcuts", icon: Keyboard },
    { id: "data" as const, label: "Data & Privacy", icon: Database },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center gap-4 px-4 py-3 border-b border-border bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <nav className="w-64 border-r border-border bg-muted/30 p-4 hidden md:block">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Section Selector */}
          <div className="md:hidden p-4 border-b border-border">
            <Select
              value={activeSection}
              onValueChange={(value) => setActiveSection(value as SettingsSection)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      {section.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Settings Content */}
          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto p-6 space-y-6">
              {activeSection === "profile" && <ProfileSettings />}
              {activeSection === "notifications" && <NotificationSettings />}
              {activeSection === "security" && <SecuritySettings />}
              {activeSection === "appearance" && <AppearanceSettings />}
              {activeSection === "shortcuts" && <ShortcutSettings />}
              {activeSection === "data" && <DataSettings />}

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </AppLayout>
  );
}

function ProfileSettings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <Card data-usecases="UC_002">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications in browser
            </p>
          </div>
          <Switch
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label>Weekly Digest</Label>
            <p className="text-sm text-muted-foreground">
              Receive a weekly summary of your activity
            </p>
          </div>
          <Switch
            checked={weeklyDigest}
            onCheckedChange={setWeeklyDigest}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <Card data-usecases="UC_004">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      <Card data-usecases="UC_009">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app for additional security
              </p>
            </div>
            <Switch
              checked={mfaEnabled}
              onCheckedChange={setMfaEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card data-usecases="UC_015,UC_016">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-muted-foreground">
                Chrome on macOS • San Francisco, CA
              </p>
            </div>
            <span className="text-xs text-success">Active now</span>
          </div>
          <Button variant="outline" className="w-full">
            Sign out all other sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState("medium");

  return (
    <Card data-usecases="UC_134">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the app looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "light", icon: Sun, label: "Light" },
              { value: "dark", icon: Moon, label: "Dark" },
              { value: "system", icon: Monitor, label: "System" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors",
                  theme === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <option.icon className="h-5 w-5" />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

function ShortcutSettings() {
  const shortcuts = [
    { action: "New Conversation", keys: ["⌘", "N"] },
    { action: "Toggle Sidebar", keys: ["⌘", "B"] },
    { action: "Search Conversations", keys: ["⌘", "K"] },
    { action: "Send Message", keys: ["Enter"] },
    { action: "New Line", keys: ["Shift", "Enter"] },
    { action: "Close Modal", keys: ["Esc"] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyboard Shortcuts</CardTitle>
        <CardDescription>
          Quick actions to navigate the app faster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.action}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm">{shortcut.action}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, index) => (
                  <React.Fragment key={key}>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                      {key}
                    </kbd>
                    {index < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DataSettings() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>
            Download a copy of your conversations and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <Database className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50" data-usecases="UC_005">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
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
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => {
                    toast.success("Account deletion requested");
                    navigate("/login");
                  }}
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
