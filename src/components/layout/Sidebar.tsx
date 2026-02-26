import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Trophy,
  Users,
  Flag,
  Star,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: { id: string; label: string; count?: number }[];
}

const filterCategories: FilterCategory[] = [
  {
    id: "sports",
    label: "Sports",
    icon: Trophy,
    items: [
      { id: "football", label: "Football", count: 24 },
      { id: "basketball", label: "Basketball", count: 18 },
      { id: "tennis", label: "Tennis", count: 12 },
      { id: "cricket", label: "Cricket", count: 8 },
      { id: "baseball", label: "Baseball", count: 6 },
    ],
  },
  {
    id: "leagues",
    label: "Leagues",
    icon: Flag,
    items: [
      { id: "premier-league", label: "Premier League", count: 10 },
      { id: "la-liga", label: "La Liga", count: 10 },
      { id: "nba", label: "NBA", count: 15 },
      { id: "nfl", label: "NFL", count: 8 },
      { id: "atp", label: "ATP Tour", count: 6 },
    ],
  },
  {
    id: "teams",
    label: "My Teams",
    icon: Users,
    items: [
      { id: "team-1", label: "Manchester United" },
      { id: "team-2", label: "LA Lakers" },
      { id: "team-3", label: "Real Madrid" },
    ],
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: Star,
    items: [
      { id: "fav-1", label: "Champions League" },
      { id: "fav-2", label: "World Cup" },
    ],
  },
];

interface SidebarProps {
  className?: string;
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

export function Sidebar({ className, onFilterChange }: SidebarProps) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["sports", "leagues"]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleFilter = (categoryId: string, itemId: string) => {
    setSelectedFilters((prev) => {
      const categoryFilters = prev[categoryId] || [];
      const newFilters = categoryFilters.includes(itemId)
        ? categoryFilters.filter((id) => id !== itemId)
        : [...categoryFilters, itemId];
      
      const updated = { ...prev, [categoryId]: newFilters };
      onFilterChange?.(updated);
      return updated;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col w-[280px] border-r bg-card",
        className
      )}
      role="complementary"
      aria-label="Filters sidebar"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filterCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const Icon = category.icon;
            const selectedCount = selectedFilters[category.id]?.length || 0;

            return (
              <div key={category.id} className="space-y-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center justify-between w-full text-sm font-medium hover:text-accent transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.label}
                    {selectedCount > 0 && (
                      <span className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                        {selectedCount}
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="pl-6 space-y-2 animate-slide-up">
                    {category.items.map((item) => {
                      const isSelected = selectedFilters[category.id]?.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground text-muted-foreground"
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleFilter(category.id, item.id)}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.count !== undefined && (
                            <span className="text-xs text-muted-foreground">
                              ({item.count})
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Quick Links */}
      <div className="p-4 border-t">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Links
        </h3>
        <div className="space-y-1">
          <Link
            to="/discover"
            className={cn(
              "block px-3 py-2 text-sm rounded-md transition-colors",
              location.pathname === "/discover"
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            )}
          >
            Browse All Sports
          </Link>
          <Link
            to="/profile?tab=preferences"
            className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
          >
            Manage Preferences
          </Link>
        </div>
      </div>
    </aside>
  );
}
