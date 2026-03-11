import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { FolderItem } from '@/types/fileManager';
import { getChildFolders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Users,
} from 'lucide-react';

interface FolderTreeItemProps {
  folder: FolderItem;
  level: number;
}

const FolderTreeItem: React.FC<FolderTreeItemProps> = ({ folder, level }) => {
  const {
    currentFolderId,
    expandedFolders,
    isSidebarCollapsed,
    toggleFolderExpanded,
    navigateToFolder,
  } = useFileManager();

  const childFolders = getChildFolders(folder.id);
  const hasChildren = childFolders.length > 0;
  const isExpanded = expandedFolders.has(folder.id);
  const isActive = currentFolderId === folder.id;

  const handleClick = () => {
    navigateToFolder(folder.id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFolderExpanded(folder.id);
  };

  const FolderIcon = isExpanded && hasChildren ? FolderOpen : Folder;

  if (isSidebarCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={cn(
              'h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent',
              isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
            )}
            data-usecases="UC_052"
          >
            <FolderIcon className="h-5 w-5 text-amber-400" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{folder.name}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={() => toggleFolderExpanded(folder.id)}>
      <div
        className={cn(
          'group flex items-center rounded-md transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
        )}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
      >
        {/* Expand/Collapse Toggle */}
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-6 w-6 p-0 hover:bg-transparent',
              !hasChildren && 'invisible'
            )}
            onClick={handleToggle}
            data-usecases="UC_051"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        {/* Folder Button */}
        <Button
          variant="ghost"
          className={cn(
            'h-8 flex-1 justify-start gap-2 px-1 hover:bg-transparent',
            isActive && 'font-medium'
          )}
          onClick={handleClick}
          data-usecases="UC_052"
        >
          <FolderIcon className="h-4 w-4 flex-shrink-0 text-amber-400" />
          <span className="truncate text-sm">{folder.name}</span>
          {folder.isShared && (
            <Users className="ml-auto h-3 w-3 flex-shrink-0 opacity-60" />
          )}
        </Button>
      </div>

      {/* Child Folders */}
      {hasChildren && (
        <CollapsibleContent>
          {childFolders.map((childFolder) => (
            <FolderTreeItem
              key={childFolder.id}
              folder={childFolder}
              level={level + 1}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export const FolderTree: React.FC = () => {
  const { isSidebarCollapsed } = useFileManager();
  const rootFolders = getChildFolders(null);

  return (
    <nav
      className={cn('space-y-1', isSidebarCollapsed && 'flex flex-col items-center')}
      aria-label="Folder navigation"
      data-usecases="UC_051"
    >
      {rootFolders.map((folder) => (
        <FolderTreeItem key={folder.id} folder={folder} level={0} />
      ))}
    </nav>
  );
};
