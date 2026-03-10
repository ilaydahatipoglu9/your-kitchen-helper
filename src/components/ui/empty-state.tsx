import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Radio,
  Calendar,
  Search,
  Bell,
  Trophy,
  Newspaper,
  Heart,
} from "lucide-react";

type EmptyStateType =
  | "no-live-matches"
  | "no-upcoming-matches"
  | "no-content"
  | "no-search-results"
  | "no-notifications"
  | "no-favorites"
  | "welcome";

interface EmptyStateProps {
  type: EmptyStateType;
  className?: string;
  onAction?: () => void;
  actionLabel?: string;
  customTitle?: string;
  customMessage?: string;
}

const emptyStateConfig: Record<
  EmptyStateType,
  {
    icon: React.ElementType;
    title: string;
    message: string;
    defaultAction?: string;
  }
> = {
  "no-live-matches": {
    icon: Radio,
    title: "No Live Matches",
    message: "There are no live matches at the moment. Check back later or view upcoming matches.",
    defaultAction: "View Schedule",
  },
  "no-upcoming-matches": {
    icon: Calendar,
    title: "No Upcoming Matches",
    message: "No matches scheduled for your followed teams. Explore other leagues and teams.",
    defaultAction: "Explore Leagues",
  },
  "no-content": {
    icon: Newspaper,
    title: "No Content Available",
    message: "We couldn't find any content matching your preferences. Try following more teams or players.",
    defaultAction: "Manage Preferences",
  },
  "no-search-results": {
    icon: Search,
    title: "No Results Found",
    message: "We couldn't find anything matching your search. Try different keywords or browse popular content.",
    defaultAction: "Browse Popular",
  },
  "no-notifications": {
    icon: Bell,
    title: "No Notifications",
    message: "You're all caught up! Notifications about your followed teams and matches will appear here.",
    defaultAction: "Notification Settings",
  },
  "no-favorites": {
    icon: Heart,
    title: "No Favorites Yet",
    message: "Start following teams, players, and leagues to personalize your experience.",
    defaultAction: "Explore Teams",
  },
  welcome: {
    icon: Trophy,
    title: "Welcome to Sports Hub!",
    message: "Get started by selecting your favorite sports, teams, and players to personalize your feed.",
    defaultAction: "Get Started",
  },
};

export function EmptyState({
  type,
  className,
  onAction,
  actionLabel,
  customTitle,
  customMessage,
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">
        {customTitle || config.title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {customMessage || config.message}
      </p>
      {(onAction || config.defaultAction) && (
        <Button onClick={onAction} variant="default">
          {actionLabel || config.defaultAction}
        </Button>
      )}
    </div>
  );
}
