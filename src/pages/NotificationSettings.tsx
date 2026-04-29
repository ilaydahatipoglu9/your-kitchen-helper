import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Smartphone, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationChannel {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { id: "push", label: "Push Notifications", icon: Smartphone, enabled: true },
    { id: "email", label: "Email Notifications", icon: Mail, enabled: false },
    { id: "sound", label: "Sound Alerts", icon: Volume2, enabled: true },
  ]);

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "match_start",
      label: "Match Start Alerts",
      description: "Get notified when a match you're following is about to start",
      enabled: true,
    },
    {
      id: "score_updates",
      label: "Live Score Updates",
      description: "Receive real-time score updates during matches",
      enabled: true,
    },
    {
      id: "goals",
      label: "Goal Notifications",
      description: "Get instant alerts when goals are scored",
      enabled: true,
    },
    {
      id: "final_scores",
      label: "Final Score Alerts",
      description: "Receive notifications when matches end",
      enabled: true,
    },
    {
      id: "reminders",
      label: "Match Reminders",
      description: "Get reminded before matches start (15 min, 1 hour)",
      enabled: false,
    },
    {
      id: "news",
      label: "News & Updates",
      description: "Receive news about your followed teams and players",
      enabled: false,
    },
    {
      id: "transfers",
      label: "Transfer News",
      description: "Get notified about transfer rumors and confirmed deals",
      enabled: false,
    },
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === channelId ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const toggleSetting = (settingId: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === settingId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const enableAll = () => {
    setSettings((prev) => prev.map((s) => ({ ...s, enabled: true })));
  };

  const disableAll = () => {
    setSettings((prev) => prev.map((s) => ({ ...s, enabled: false })));
  };

  return (
    <div className="space-y-6" data-usecases="UC_020,UC_141">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link to="/notifications">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notification Settings
          </h1>
          <p className="text-muted-foreground">
            Configure how and when you receive notifications
          </p>
        </div>
      </div>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <channel.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Label htmlFor={channel.id} className="font-medium cursor-pointer">
                  {channel.label}
                </Label>
              </div>
              <Switch
                id={channel.id}
                checked={channel.enabled}
                onCheckedChange={() => toggleChannel(channel.id)}
                data-usecases="UC_020"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>
                Select which notifications you want to receive
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={enableAll} data-usecases="UC_020">
                Enable All
              </Button>
              <Button variant="outline" size="sm" onClick={disableAll} data-usecases="UC_020">
                Disable All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {settings.map((setting, index) => (
            <div key={setting.id}>
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                    {setting.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                  data-usecases="UC_020"
                />
              </div>
              {index < settings.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Link to="/notifications">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button data-usecases="UC_020,UC_008">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
