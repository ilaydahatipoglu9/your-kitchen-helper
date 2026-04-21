import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Bell,
  Database,
  Shield,
  Clock,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enablePushNotifications: true,
    enableSmsNotifications: false,
    notificationBatchSize: "100",
    notificationRetryAttempts: "3",
  });

  // Data Retention Settings
  const [dataRetentionSettings, setDataRetentionSettings] = useState({
    matchDataRetention: "90",
    analyticsDataRetention: "365",
    notificationHistoryRetention: "30",
    searchHistoryRetention: "7",
  });

  // Alert Thresholds
  const [alertThresholds, setAlertThresholds] = useState({
    cpuThreshold: "80",
    memoryThreshold: "85",
    errorRateThreshold: "5",
    latencyThreshold: "500",
  });

  // Reporting Settings
  const [reportingSettings, setReportingSettings] = useState({
    enableDailyReports: true,
    enableWeeklyReports: true,
    enableMonthlyReports: false,
    reportRecipients: "admin@sportshub.com",
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration changes have been applied.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to defaults
    setNotificationSettings({
      enableEmailNotifications: true,
      enablePushNotifications: true,
      enableSmsNotifications: false,
      notificationBatchSize: "100",
      notificationRetryAttempts: "3",
    });
    setDataRetentionSettings({
      matchDataRetention: "90",
      analyticsDataRetention: "365",
      notificationHistoryRetention: "30",
      searchHistoryRetention: "7",
    });
    setAlertThresholds({
      cpuThreshold: "80",
      memoryThreshold: "85",
      errorRateThreshold: "5",
      latencyThreshold: "500",
    });
    setReportingSettings({
      enableDailyReports: true,
      enableWeeklyReports: true,
      enableMonthlyReports: false,
      reportRecipients: "admin@sportshub.com",
    });
    setHasChanges(false);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const updateSetting = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: string,
    value: any
  ) => {
    setter((prev: any) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto" data-usecases="UC_260,UC_261,UC_262,UC_264">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Admin Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure system-wide settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {hasChanges && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <p className="text-sm">You have unsaved changes. Don't forget to save before leaving.</p>
          </div>
        )}

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="retention">Data Retention</TabsTrigger>
            <TabsTrigger value="alerts">Alert Thresholds</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card data-usecases="UC_160,UC_162">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Configuration
                </CardTitle>
                <CardDescription>
                  Configure notification delivery channels and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Delivery Channels
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.enableEmailNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting(setNotificationSettings, "enableEmailNotifications", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send push notifications to devices
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.enablePushNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting(setNotificationSettings, "enablePushNotifications", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.enableSmsNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting(setNotificationSettings, "enableSmsNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Processing Settings
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Batch Size</Label>
                      <Select
                        value={notificationSettings.notificationBatchSize}
                        onValueChange={(value) =>
                          updateSetting(setNotificationSettings, "notificationBatchSize", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 notifications</SelectItem>
                          <SelectItem value="100">100 notifications</SelectItem>
                          <SelectItem value="200">200 notifications</SelectItem>
                          <SelectItem value="500">500 notifications</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Retry Attempts</Label>
                      <Select
                        value={notificationSettings.notificationRetryAttempts}
                        onValueChange={(value) =>
                          updateSetting(setNotificationSettings, "notificationRetryAttempts", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 attempt</SelectItem>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Retention Settings */}
          <TabsContent value="retention">
            <Card data-usecases="UC_261">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Retention Policies
                </CardTitle>
                <CardDescription>
                  Configure how long different types of data are retained
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Match Data Retention</Label>
                    <Select
                      value={dataRetentionSettings.matchDataRetention}
                      onValueChange={(value) =>
                        updateSetting(setDataRetentionSettings, "matchDataRetention", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Historical match data and scores
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Analytics Data Retention</Label>
                    <Select
                      value={dataRetentionSettings.analyticsDataRetention}
                      onValueChange={(value) =>
                        updateSetting(setDataRetentionSettings, "analyticsDataRetention", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      User analytics and engagement data
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Notification History</Label>
                    <Select
                      value={dataRetentionSettings.notificationHistoryRetention}
                      onValueChange={(value) =>
                        updateSetting(setDataRetentionSettings, "notificationHistoryRetention", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      User notification history
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Search History</Label>
                    <Select
                      value={dataRetentionSettings.searchHistoryRetention}
                      onValueChange={(value) =>
                        updateSetting(setDataRetentionSettings, "searchHistoryRetention", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      User search queries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert Thresholds */}
          <TabsContent value="alerts">
            <Card data-usecases="UC_264">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Alert Thresholds
                </CardTitle>
                <CardDescription>
                  Configure thresholds for system alerts and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>CPU Usage Threshold (%)</Label>
                    <Input
                      type="number"
                      min="50"
                      max="100"
                      value={alertThresholds.cpuThreshold}
                      onChange={(e) =>
                        updateSetting(setAlertThresholds, "cpuThreshold", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Alert when CPU usage exceeds this percentage
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Memory Usage Threshold (%)</Label>
                    <Input
                      type="number"
                      min="50"
                      max="100"
                      value={alertThresholds.memoryThreshold}
                      onChange={(e) =>
                        updateSetting(setAlertThresholds, "memoryThreshold", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Alert when memory usage exceeds this percentage
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Error Rate Threshold (%)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={alertThresholds.errorRateThreshold}
                      onChange={(e) =>
                        updateSetting(setAlertThresholds, "errorRateThreshold", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Alert when error rate exceeds this percentage
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Latency Threshold (ms)</Label>
                    <Input
                      type="number"
                      min="100"
                      max="5000"
                      value={alertThresholds.latencyThreshold}
                      onChange={(e) =>
                        updateSetting(setAlertThresholds, "latencyThreshold", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Alert when response latency exceeds this value
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reporting Settings */}
          <TabsContent value="reporting">
            <Card data-usecases="UC_262">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Reporting Schedule
                </CardTitle>
                <CardDescription>
                  Configure automated report generation and delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Report Frequency
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Daily Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate reports every day at midnight
                        </p>
                      </div>
                      <Switch
                        checked={reportingSettings.enableDailyReports}
                        onCheckedChange={(checked) =>
                          updateSetting(setReportingSettings, "enableDailyReports", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate reports every Monday
                        </p>
                      </div>
                      <Switch
                        checked={reportingSettings.enableWeeklyReports}
                        onCheckedChange={(checked) =>
                          updateSetting(setReportingSettings, "enableWeeklyReports", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Monthly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate reports on the 1st of each month
                        </p>
                      </div>
                      <Switch
                        checked={reportingSettings.enableMonthlyReports}
                        onCheckedChange={(checked) =>
                          updateSetting(setReportingSettings, "enableMonthlyReports", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Report Recipients</Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={reportingSettings.reportRecipients}
                    onChange={(e) =>
                      updateSetting(setReportingSettings, "reportRecipients", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Email addresses to receive automated reports (comma-separated)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
