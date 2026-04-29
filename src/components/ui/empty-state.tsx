import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  Bell,
  Radio,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface EmptyStateProps {
  variant:
    | "no-teams"
    | "no-live"
    | "no-results"
    | "no-notifications"
    | "no-schedule"
    | "error"
    | "all-caught-up";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const variants = {
  "no-teams": {
    icon: Heart,
    defaultTitle: "Discover Your Sports",
    defaultDescription:
      "Follow your favorite teams, players, and leagues to get personalized updates and scores.",
    defaultActionLabel: "Browse Teams",
  },
  "no-live": {
    icon: Radio,
    defaultTitle: "No Live Games Right Now",
    defaultDescription:
      "Check back later for live scores, or browse the schedule to see upcoming matches.",
    defaultActionLabel: "View Schedule",
  },
  "no-results": {
    icon: Search,
    defaultTitle: "No Results Found",
    defaultDescription:
      "Try different keywords or browse popular teams and players.",
    defaultActionLabel: "Clear Search",
  },
  "no-notifications": {
    icon: Bell,
    defaultTitle: "No Notifications Yet",
    defaultDescription:
      "Follow teams and enable notifications to receive score alerts and game reminders.",
    defaultActionLabel: "Manage Preferences",
  },
  "no-schedule": {
    icon: Calendar,
    defaultTitle: "No Upcoming Matches",
    defaultDescription:
      "There are no scheduled matches for your followed teams at this time.",
    defaultActionLabel: "Discover Teams",
  },
  error: {
    icon: AlertCircle,
    defaultTitle: "Something Went Wrong",
    defaultDescription:
      "We couldn't load the content. Please try again later.",
    defaultActionLabel: "Retry",
  },
  "all-caught-up": {
    icon: CheckCircle2,
    defaultTitle: "You're All Caught Up!",
    defaultDescription:
      "You've seen all your notifications. Check back later for new updates.",
    defaultActionLabel: undefined,
  },
};

export function EmptyState({
  variant,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full mb-4",
          variant === "error"
            ? "bg-destructive/10 text-destructive"
            : variant === "all-caught-up"
            ? "bg-success/10 text-success"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description || config.defaultDescription}
      </p>
      {(actionLabel || config.defaultActionLabel) && onAction && (
        <Button onClick={onAction} variant={variant === "error" ? "destructive" : "default"}>
          {actionLabel || config.defaultActionLabel}
        </Button>
      )}
    </div>
  );
}
