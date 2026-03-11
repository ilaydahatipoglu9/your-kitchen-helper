import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbPath, navigateToFolder } = useFileManager();

  // Show max 4 items, collapse middle items if more
  const maxVisible = 4;
  const shouldCollapse = breadcrumbPath.length > maxVisible;

  const visibleItems = shouldCollapse
    ? [
        breadcrumbPath[0],
        ...breadcrumbPath.slice(-2),
      ]
    : breadcrumbPath;

  const collapsedItems = shouldCollapse
    ? breadcrumbPath.slice(1, -2)
    : [];

  return (
    <nav
      className="flex items-center gap-1 text-sm"
      aria-label="Breadcrumb navigation"
    >
      {/* Home/Root */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigateToFolder('root')}
        className="h-8 gap-1 px-2 text-muted-foreground hover:text-foreground"
        data-usecases="UC_052"
      >
        <Home className="h-4 w-4" />
      </Button>

      {breadcrumbPath.map((item, index) => {
        const isLast = index === breadcrumbPath.length - 1;
        const isFirst = index === 0;
        const isCollapsedSection = shouldCollapse && index === 1;

        // Skip first item as we show Home icon
        if (isFirst && item.id === 'root') {
          return null;
        }

        // Show collapsed dropdown
        if (isCollapsedSection && collapsedItems.length > 0) {
          return (
            <React.Fragment key="collapsed">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {collapsedItems.map((collapsedItem) => (
                    <DropdownMenuItem
                      key={collapsedItem.id}
                      onClick={() => navigateToFolder(collapsedItem.id)}
                      data-usecases="UC_052"
                    >
                      {collapsedItem.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </React.Fragment>
          );
        }

        // Skip items that are in the collapsed section
        if (shouldCollapse && index > 0 && index < breadcrumbPath.length - 2) {
          return null;
        }

        return (
          <React.Fragment key={item.id}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => !isLast && navigateToFolder(item.id)}
              disabled={isLast}
              className={cn(
                'h-8 px-2',
                isLast
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-usecases="UC_052"
            >
              {item.name}
            </Button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
