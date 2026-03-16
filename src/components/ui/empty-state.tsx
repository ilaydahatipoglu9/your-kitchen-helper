import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Cpu, Plus, History, Play, FileText, Search } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">{description}</p>
      
      {children}
      
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {action && (
            <Button onClick={action.onClick}>
              {action.icon && <action.icon className="h-4 w-4 mr-2" />}
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states for common scenarios
export function NoModelsEmptyState({ onAddModel }: { onAddModel: () => void }) {
  return (
    <EmptyState
      icon={Cpu}
      title="No Models Configured"
      description="Add your first LLM model to start running evaluations. You can configure models from OpenAI, Anthropic, Google, and more."
      action={{
        label: "Add Model",
        onClick: onAddModel,
        icon: Plus,
      }}
    />
  );
}

export function NoHistoryEmptyState({ onRunEvaluation }: { onRunEvaluation: () => void }) {
  return (
    <EmptyState
      icon={History}
      title="No Evaluation History"
      description="Run your first evaluation to see results here. Your evaluation history will be saved automatically."
      action={{
        label: "Run Evaluation",
        onClick: onRunEvaluation,
        icon: Play,
      }}
    />
  );
}

export function NoPromptsEmptyState({ onCreatePrompt }: { onCreatePrompt: () => void }) {
  return (
    <EmptyState
      icon={FileText}
      title="No Prompts Yet"
      description="Create your first prompt template to streamline your evaluation workflow. Templates support variables for dynamic content."
      action={{
        label: "Create Prompt",
        onClick: onCreatePrompt,
        icon: Plus,
      }}
    />
  );
}

export function NoResultsEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No Results Found"
      description="We couldn't find anything matching your search. Try adjusting your filters or search terms."
      action={{
        label: "Clear Filters",
        onClick: onClearFilters,
      }}
    />
  );
}
