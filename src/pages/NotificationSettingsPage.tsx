import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Bell, Save } from "lucide-react";

export default function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Score alerts
    scoreAlerts: true,
    goalNotifications: true,
    finalScoreNotifications: true,
    
    // Game reminders
    gameReminders: true,
    reminderTime: "30",
    
    // News and updates
    newsUpdates: false,
    injuryUpdates: true,
    tradeNews: false,
    
    // Channels
    pushNotifications: true,
    emailNotifications: true,
    emailDigest: "daily",
  });

  const handleChange = (field: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold">Notification Settings</h1>
              <p className="text-sm text-muted-foreground">
                Customize how you receive updates
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving} data-usecases="UC_020,UC_141">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Score Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Score Alerts</CardTitle>
          <CardDescription>
            Get notified about scoring events in your followed games
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Score Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Master toggle for all score notifications
              </p>
            </div>
            <Switch
              checked={settings.scoreAlerts}
              onCheckedChange={(checked) => handleChange("scoreAlerts", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal/Score Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Notify when your teams score
              </p>
            </div>
            <Switch
              checked={settings.goalNotifications}
              onCheckedChange={(checked) => handleChange("goalNotifications", checked)}
              disabled={!settings.scoreAlerts}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Final Score Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Notify when games end
              </p>
            </div>
            <Switch
              checked={settings.finalScoreNotifications}
              onCheckedChange={(checked) => handleChange("finalScoreNotifications", checked)}
              disabled={!settings.scoreAlerts}
              data-usecases="UC_020,UC_141"
            />
          </div>
        </CardContent>
      </Card>

      {/* Game Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Game Reminders</CardTitle>
          <CardDescription>
            Get reminded before your followed teams play
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Game Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders before games start
              </p>
            </div>
            <Switch
              checked={settings.gameReminders}
              onCheckedChange={(checked) => handleChange("gameReminders", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reminder Time</Label>
              <p className="text-sm text-muted-foreground">
                How early to send the reminder
              </p>
            </div>
            <Select
              value={settings.reminderTime}
              onValueChange={(value) => handleChange("reminderTime", value)}
              disabled={!settings.gameReminders}
            >
              <SelectTrigger className="w-[140px]" data-usecases="UC_020,UC_141">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News & Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">News & Updates</CardTitle>
          <CardDescription>
            Stay informed about your teams and players
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>News Updates</Label>
              <p className="text-sm text-muted-foreground">
                General news about your followed teams
              </p>
            </div>
            <Switch
              checked={settings.newsUpdates}
              onCheckedChange={(checked) => handleChange("newsUpdates", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Injury Updates</Label>
              <p className="text-sm text-muted-foreground">
                Player injury and status updates
              </p>
            </div>
            <Switch
              checked={settings.injuryUpdates}
              onCheckedChange={(checked) => handleChange("injuryUpdates", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Trade News</Label>
              <p className="text-sm text-muted-foreground">
                Trade and transfer news
              </p>
            </div>
            <Switch
              checked={settings.tradeNews}
              onCheckedChange={(checked) => handleChange("tradeNews", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleChange("pushNotifications", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
              data-usecases="UC_020,UC_141"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Digest</Label>
              <p className="text-sm text-muted-foreground">
                How often to receive email summaries
              </p>
            </div>
            <Select
              value={settings.emailDigest}
              onValueChange={(value) => handleChange("emailDigest", value)}
              disabled={!settings.emailNotifications}
            >
              <SelectTrigger className="w-[140px]" data-usecases="UC_020,UC_141">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
