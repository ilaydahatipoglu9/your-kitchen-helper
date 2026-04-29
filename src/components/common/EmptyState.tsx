import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Search, 
  Bell, 
  Users, 
  Calendar,
  AlertCircle,
  RefreshCw
} from "lucide-react";

type EmptyStateType = 
  | "no-matches" 
  | "no-results" 
  | "no-notifications" 
  | "no-teams" 
  | "no-upcoming"
  | "error"
  | "custom";

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    useCases?: string;
  };
  className?: string;
}

const defaultContent: Record<EmptyStateType, { title: string; description: string; icon: React.ReactNode }> = {
  "no-matches": {
    title: "No live matches right now",
    description: "Check upcoming games below or explore other sports.",
    icon: <Trophy className="h-12 w-12 text-muted-foreground" />,
  },
  "no-results": {
    title: "No results found",
    description: "Try different keywords or browse by sport.",
    icon: <Search className="h-12 w-12 text-muted-foreground" />,
  },
  "no-notifications": {
    title: "No notifications yet",
    description: "Follow teams and players to receive updates about matches and scores.",
    icon: <Bell className="h-12 w-12 text-muted-foreground" />,
  },
  "no-teams": {
    title: "Start following your favorite teams",
    description: "Follow teams to see personalized content and receive updates.",
    icon: <Users className="h-12 w-12 text-muted-foreground" />,
  },
  "no-upcoming": {
    title: "No upcoming matches",
    description: "There are no scheduled matches for your followed teams right now.",
    icon: <Calendar className="h-12 w-12 text-muted-foreground" />,
  },
  "error": {
    title: "Unable to load content",
    description: "Check your connection and try again.",
    icon: <AlertCircle className="h-12 w-12 text-destructive" />,
  },
  "custom": {
    title: "",
    description: "",
    icon: null,
  },
};

export function EmptyState({ 
  type = "custom", 
  title, 
  description, 
  icon, 
  action,
  className 
}: EmptyStateProps) {
  const content = defaultContent[type];
  const displayTitle = title || content.title;
  const displayDescription = description || content.description;
  const displayIcon = icon || content.icon;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      {displayIcon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          {displayIcon}
        </div>
      )}
      
      {displayTitle && (
        <h3 className="text-lg font-semibold mb-2">{displayTitle}</h3>
      )}
      
      {displayDescription && (
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          {displayDescription}
        </p>
      )}
      
      {action && (
        <Button 
          onClick={action.onClick}
          data-usecases={action.useCases}
        >
          {type === "error" && <RefreshCw className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}
