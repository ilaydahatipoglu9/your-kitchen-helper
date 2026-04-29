import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: string[];
  onFilterChange: (filterId: string) => void;
  onClearAll?: () => void;
  className?: string;
  useCases?: string;
}

export function FilterBar({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearAll,
  className,
  useCases
}: FilterBarProps) {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        
        return (
          <Button
            key={filter.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "rounded-full transition-all",
              isActive && "bg-primary text-primary-foreground"
            )}
            data-usecases={useCases}
          >
            {filter.label}
            {filter.count !== undefined && (
              <Badge 
                variant={isActive ? "secondary" : "outline"} 
                className="ml-2 h-5 px-1.5 text-xs"
              >
                {filter.count}
              </Badge>
            )}
          </Button>
        );
      })}
      
      {hasActiveFilters && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all
        </Button>
      )}
    </div>
  );
}

interface StatusFilterBarProps {
  activeStatus: "all" | "live" | "upcoming" | "completed";
  onStatusChange: (status: "all" | "live" | "upcoming" | "completed") => void;
  counts?: {
    all?: number;
    live?: number;
    upcoming?: number;
    completed?: number;
  };
  className?: string;
}

export function StatusFilterBar({ 
  activeStatus, 
  onStatusChange, 
  counts,
  className 
}: StatusFilterBarProps) {
  const statuses: { id: "all" | "live" | "upcoming" | "completed"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className={cn("flex items-center gap-1 p-1 bg-muted rounded-lg", className)}>
      {statuses.map((status) => {
        const isActive = activeStatus === status.id;
        const count = counts?.[status.id];
        
        return (
          <Button
            key={status.id}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onStatusChange(status.id)}
            className={cn(
              "rounded-md transition-all",
              isActive && "shadow-sm",
              status.id === "live" && isActive && "bg-live text-live-foreground hover:bg-live/90"
            )}
            data-usecases="UC_041,UC_086"
          >
            {status.id === "live" && (
              <span className={cn(
                "h-2 w-2 rounded-full mr-2",
                isActive ? "bg-live-foreground animate-pulse-live" : "bg-live"
              )} />
            )}
            {status.label}
            {count !== undefined && count > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({count})</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

interface SportFilterBarProps {
  sports: { id: string; name: string; icon?: React.ReactNode }[];
  activeSport: string | null;
  onSportChange: (sportId: string | null) => void;
  className?: string;
}

export function SportFilterBar({ 
  sports, 
  activeSport, 
  onSportChange,
  className 
}: SportFilterBarProps) {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-2", className)}>
      <Button
        variant={activeSport === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSportChange(null)}
        className="rounded-full shrink-0"
        data-usecases="UC_041"
      >
        All Sports
      </Button>
      {sports.map((sport) => (
        <Button
          key={sport.id}
          variant={activeSport === sport.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSportChange(sport.id)}
          className="rounded-full shrink-0"
          data-usecases="UC_041"
        >
          {sport.icon}
          {sport.name}
        </Button>
      ))}
    </div>
  );
}
