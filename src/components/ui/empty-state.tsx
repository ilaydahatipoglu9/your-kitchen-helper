import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Bell, 
  Star, 
  Calendar, 
  AlertCircle,
  Users,
  Trophy,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

type EmptyStateType = 
  | "no-results" 
  | "no-notifications" 
  | "no-favorites" 
  | "no-matches" 
  | "error"
  | "no-teams"
  | "no-leagues"
  | "no-live";

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig: Record<EmptyStateType, {
  icon: React.ElementType;
  defaultTitle: string;
  defaultDescription: string;
  defaultActionLabel?: string;
  defaultActionHref?: string;
}> = {
  "no-results": {
    icon: Search,
    defaultTitle: "No results found",
    defaultDescription: "Try adjusting your search or filters to find what you're looking for.",
    defaultActionLabel: "Clear filters",
  },
  "no-notifications": {
    icon: Bell,
    defaultTitle: "You're all caught up",
    defaultDescription: "No new notifications at the moment. We'll let you know when something happens.",
  },
  "no-favorites": {
    icon: Star,
    defaultTitle: "Start following your favorites",
    defaultDescription: "Follow teams, leagues, and players to get personalized updates and content.",
    defaultActionLabel: "Explore Teams",
    defaultActionHref: "/search?type=team",
  },
  "no-matches": {
    icon: Calendar,
    defaultTitle: "No matches scheduled",
    defaultDescription: "There are no upcoming matches at the moment. Check back later for updates.",
  },
  "no-live": {
    icon: Activity,
    defaultTitle: "No live matches right now",
    defaultDescription: "There are no live matches at the moment. Check the schedule for upcoming games.",
    defaultActionLabel: "View Schedule",
    defaultActionHref: "/",
  },
  "no-teams": {
    icon: Users,
    defaultTitle: "No teams found",
    defaultDescription: "We couldn't find any teams matching your criteria.",
    defaultActionLabel: "Browse All Teams",
    defaultActionHref: "/search?type=team",
  },
  "no-leagues": {
    icon: Trophy,
    defaultTitle: "No leagues found",
    defaultDescription: "We couldn't find any leagues matching your criteria.",
    defaultActionLabel: "Browse All Leagues",
    defaultActionHref: "/search?type=league",
  },
  "error": {
    icon: AlertCircle,
    defaultTitle: "Something went wrong",
    defaultDescription: "We encountered an error while loading this content. Please try again.",
    defaultActionLabel: "Try Again",
  },
};

const EmptyState = ({
  type,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  const displayTitle = title || config.defaultTitle;
  const displayDescription = description || config.defaultDescription;
  const displayActionLabel = actionLabel || config.defaultActionLabel;
  const displayActionHref = actionHref || config.defaultActionHref;

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
      
      <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
        {displayTitle}
      </h3>
      
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {displayDescription}
      </p>

      {(displayActionLabel && (displayActionHref || onAction)) && (
        displayActionHref ? (
          <Button asChild>
            <Link to={displayActionHref}>{displayActionLabel}</Link>
          </Button>
        ) : (
          <Button onClick={onAction}>{displayActionLabel}</Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
