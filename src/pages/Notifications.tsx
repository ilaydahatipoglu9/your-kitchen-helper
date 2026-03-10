import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Bell,
  Settings,
  Check,
  Trash2,
  Target,
  Clock,
  Trophy,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "goal" | "match_start" | "match_end" | "transfer" | "lineup";
  title: string;
  message: string;
  time: string;
  read: boolean;
  matchId?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "goal",
    title: "Goal! Manchester United",
    message: "Marcus Rashford scores in the 67th minute. Manchester United 2-1 Liverpool",
    time: "2 minutes ago",
    read: false,
    matchId: "1",
  },
  {
    id: "2",
    type: "match_start",
    title: "Match Starting",
    message: "Real Madrid vs Barcelona is about to kick off",
    time: "15 minutes ago",
    read: false,
    matchId: "2",
  },
  {
    id: "3",
    type: "goal",
    title: "Goal! Bayern Munich",
    message: "Harry Kane scores from the penalty spot. Bayern Munich 3-2 Borussia Dortmund",
    time: "30 minutes ago",
    read: false,
    matchId: "3",
  },
  {
    id: "4",
    type: "match_end",
    title: "Full Time",
    message: "Chelsea 2-0 Tottenham. Chelsea wins the London derby!",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "5",
    type: "transfer",
    title: "Transfer News",
    message: "Manchester United interested in signing Jadon Sancho permanently",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "lineup",
    title: "Lineup Announced",
    message: "Arsenal lineup for the match against Newcastle has been announced",
    time: "3 hours ago",
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <Target className="h-5 w-5 text-success" />;
      case "match_start":
        return <Radio className="h-5 w-5 text-live" />;
      case "match_end":
        return <Trophy className="h-5 w-5 text-warning" />;
      case "transfer":
        return <Clock className="h-5 w-5 text-info" />;
      case "lineup":
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} new</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "transition-all duration-200 hover:shadow-card-hover",
                  !notification.read && "border-l-4 border-l-info bg-info/5"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                        notification.type === "goal" && "bg-success/10",
                        notification.type === "match_start" && "bg-live/10",
                        notification.type === "match_end" && "bg-warning/10",
                        notification.type === "transfer" && "bg-info/10",
                        notification.type === "lineup" && "bg-primary/10"
                      )}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {notification.matchId && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 mt-2"
                          asChild
                        >
                          <Link to={`/match/${notification.matchId}`}>
                            View Match →
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            type="no-notifications"
            onAction={() => {}}
            actionLabel="Notification Settings"
          />
        )}
      </div>
    </MainLayout>
  );
}
