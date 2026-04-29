import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, Check, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState, SectionHeader } from "@/components/common";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { mockNotifications } from "@/data/mockData";

type NotificationType = "all" | "score_update" | "match_start" | "match_reminder" | "final_score";

interface Notification {
  id: string;
  type: "score_update" | "match_start" | "match_reminder" | "final_score";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  matchId?: string;
}

const notificationTypeLabels: Record<string, string> = {
  score_update: "Score Update",
  match_start: "Match Started",
  match_reminder: "Reminder",
  final_score: "Final Score",
};

const notificationTypeColors: Record<string, string> = {
  score_update: "bg-live/10 text-live border-live/20",
  match_start: "bg-success/10 text-success border-success/20",
  match_reminder: "bg-warning/10 text-warning border-warning/20",
  final_score: "bg-primary/10 text-primary border-primary/20",
};

function NotificationCard({ 
  notification, 
  onMarkRead, 
  onDelete 
}: { 
  notification: Notification; 
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });

  return (
    <Card 
      className={cn(
        "transition-all hover:shadow-md",
        !notification.read && "border-l-4 border-l-primary bg-primary/5"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant="outline" 
                className={cn("text-xs", notificationTypeColors[notification.type])}
              >
                {notificationTypeLabels[notification.type]}
              </Badge>
              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />
              )}
            </div>
            <h3 className={cn(
              "font-medium mb-1",
              !notification.read && "font-semibold"
            )}>
              {notification.title}
            </h3>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <div className="flex items-center gap-4 mt-2">
              <time className="text-xs text-muted-foreground">{timeAgo}</time>
              {notification.matchId && (
                <Link 
                  to={`/matches/${notification.matchId}`}
                  className="text-xs text-primary hover:underline"
                  data-usecases="UC_041"
                >
                  View Match
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMarkRead(notification.id)}
                aria-label="Mark as read"
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(notification.id)}
              aria-label="Delete notification"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications as Notification[]
  );
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6" data-usecases="UC_157">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-live text-live-foreground">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Stay updated with scores, match alerts, and reminders
          </p>
        </div>
        <Link to="/notifications/settings">
          <Button variant="outline" data-usecases="UC_020,UC_141">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearAll}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as NotificationType)}>
        <TabsList>
          <TabsTrigger value="all" data-usecases="UC_157">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="score_update" data-usecases="UC_157">
            Scores
          </TabsTrigger>
          <TabsTrigger value="match_start" data-usecases="UC_157">
            Match Start
          </TabsTrigger>
          <TabsTrigger value="match_reminder" data-usecases="UC_157">
            Reminders
          </TabsTrigger>
          <TabsTrigger value="final_score" data-usecases="UC_157">
            Final Scores
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              type="no-notifications"
              action={{
                label: "Configure Notifications",
                onClick: () => window.location.href = "/notifications/settings",
                useCases: "UC_020",
              }}
            />
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
