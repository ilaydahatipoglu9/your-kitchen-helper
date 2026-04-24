import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Activity,
  Trophy,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyState from "@/components/ui/empty-state";
import { TableRowSkeleton } from "@/components/ui/skeleton-loader";
import { useToast } from "@/hooks/use-toast";
import { mockNotifications } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  matchId?: string;
}

const Notifications = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: "Notification deleted",
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <Activity className="h-5 w-5 text-success" />;
      case "match_start":
        return <Activity className="h-5 w-5 text-live" />;
      case "final_score":
        return <Trophy className="h-5 w-5 text-primary" />;
      case "news":
        return <Newspaper className="h-5 w-5 text-secondary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6" data-usecases="UC_156,UC_157">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated with your sports alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="secondary">
              {unreadCount} unread
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4" data-usecases="UC_157">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notifications</SelectItem>
            <SelectItem value="unread">Unread Only</SelectItem>
            <SelectItem value="goal">Goals</SelectItem>
            <SelectItem value="match_start">Match Start</SelectItem>
            <SelectItem value="final_score">Final Scores</SelectItem>
            <SelectItem value="news">News</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} columns={3} />
              ))}
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 transition-colors hover:bg-accent/50",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn(
                          "font-medium",
                          !notification.read && "text-foreground"
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {notification.matchId && (
                        <Link
                          to={`/match/${notification.matchId}`}
                          className="text-xs text-primary hover:underline"
                        >
                          View Match
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8">
              <EmptyState type="no-notifications" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings Link */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium">Notification Settings</p>
            <p className="text-sm text-muted-foreground">
              Customize which notifications you receive
            </p>
          </div>
          <Button asChild variant="outline" data-usecases="UC_020,UC_141">
            <Link to="/preferences#notifications">
              Configure
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
