import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Filter,
  Settings,
  Trash2,
  Radio,
  Trophy,
  Newspaper,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "match" | "score" | "news" | "alert";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "match",
    title: "Match Starting Soon",
    description: "Manchester United vs Liverpool kicks off in 15 minutes",
    timestamp: "15 minutes ago",
    isRead: false,
    link: "/",
  },
  {
    id: "2",
    type: "score",
    title: "Goal! Manchester United 1-0 Liverpool",
    description: "J. Smith scores in the 12th minute",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    type: "score",
    title: "Goal! Manchester United 2-1 Liverpool",
    description: "R. Williams equalizes for Liverpool in the 35th minute",
    timestamp: "1 hour ago",
    isRead: true,
  },
  {
    id: "4",
    type: "news",
    title: "Transfer News: Real Madrid",
    description: "Real Madrid reportedly interested in signing young talent",
    timestamp: "3 hours ago",
    isRead: true,
    link: "/feed",
  },
  {
    id: "5",
    type: "match",
    title: "Match Reminder",
    description: "LA Lakers vs Boston Celtics starts tomorrow at 7:30 PM",
    timestamp: "5 hours ago",
    isRead: true,
  },
  {
    id: "6",
    type: "alert",
    title: "Injury Update",
    description: "Key player ruled out for upcoming match",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "7",
    type: "news",
    title: "Weekly Digest",
    description: "Your personalized sports summary for this week",
    timestamp: "2 days ago",
    isRead: true,
    link: "/feed",
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.isRead;
    return n.type === activeTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "match":
        return Radio;
      case "score":
        return Trophy;
      case "news":
        return Newspaper;
      case "alert":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "match":
        return "text-accent";
      case "score":
        return "text-maritime-live";
      case "news":
        return "text-blue-500";
      case "alert":
        return "text-maritime-warning";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="container mx-auto max-w-reading px-4 md:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with your sports alerts and news
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </Button>
            <Link to="/profile?tab=notifications">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="match">Matches</TabsTrigger>
            <TabsTrigger value="score">Scores</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={activeTab === "unread" ? "All caught up!" : "No notifications"}
            description={
              activeTab === "unread"
                ? "You have no unread notifications. Check back later for updates."
                : "You don't have any notifications yet. Follow teams and players to receive updates."
            }
            actionLabel={activeTab === "unread" ? "View All" : "Discover Content"}
            onAction={() => {
              if (activeTab === "unread") {
                setActiveTab("all");
              } else {
                window.location.href = "/discover";
              }
            }}
          />
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = getTypeIcon(notification.type);
              const iconColor = getTypeColor(notification.type);

              return (
                <Card
                  key={notification.id}
                  className={cn(
                    "transition-colors",
                    !notification.isRead && "bg-accent/5 border-accent/20"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                          !notification.isRead ? "bg-accent/10" : "bg-muted"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3
                              className={cn(
                                "font-medium",
                                !notification.isRead && "font-semibold"
                              )}
                            >
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">Actions</span>
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                  />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              {notification.link && (
                                <DropdownMenuItem asChild>
                                  <Link to={notification.link}>View details</Link>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Clear All Button */}
            {notifications.length > 0 && (
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-muted-foreground"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Notifications
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Notification Settings Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Notification Settings</CardTitle>
            <CardDescription>
              Customize what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link to="/profile?tab=notifications">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Preferences
                </Button>
              </Link>
              <Link to="/profile?tab=preferences">
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Update Followed Teams
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
