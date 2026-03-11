import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FolderTree } from './FolderTree';
import { currentUser, storageInfo, formatFileSize } from '@/data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  User,
  HardDrive,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useFileManager();

  const storagePercentage = (storageInfo.used / storageInfo.total) * 100;

  return (
    <div
      className={cn(
        'flex h-full flex-col bg-sidebar text-sidebar-foreground',
        isSidebarCollapsed && 'items-center'
      )}
      data-usecases="UC_051,UC_053"
    >
      {/* User Profile Section */}
      <div className={cn(
        'flex items-center border-b border-sidebar-border p-4',
        isSidebarCollapsed ? 'justify-center' : 'gap-3'
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'h-auto p-0 hover:bg-sidebar-accent',
                !isSidebarCollapsed && 'flex-1 justify-start gap-3'
              )}
              data-usecases="UC_138"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {!isSidebarCollapsed && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-sidebar-foreground">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-sidebar-foreground/70">
                    {currentUser.email}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem data-usecases="UC_076">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <Link to="/settings">
              <DropdownMenuItem data-usecases="UC_076">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to="/login">
              <DropdownMenuItem className="text-destructive" data-usecases="UC_138">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 flex-shrink-0 text-sidebar-foreground hover:bg-sidebar-accent"
          data-usecases="UC_055"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Folder Tree Navigation */}
      <ScrollArea className="flex-1">
        <div className={cn('py-2', isSidebarCollapsed ? 'px-2' : 'px-3')}>
          {!isSidebarCollapsed && (
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              Folders
            </h2>
          )}
          <FolderTree />
        </div>
      </ScrollArea>

      {/* Storage Indicator */}
      {!isSidebarCollapsed && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2 text-sm text-sidebar-foreground/80">
            <HardDrive className="h-4 w-4" />
            <span>Storage</span>
          </div>
          <Progress
            value={storagePercentage}
            className="mt-2 h-2 bg-sidebar-accent"
          />
          <p className="mt-1 text-xs text-sidebar-foreground/60">
            {formatFileSize(storageInfo.used)} of {formatFileSize(storageInfo.total)} used
          </p>
        </div>
      )}

      {isSidebarCollapsed && (
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent"
            title={`${formatFileSize(storageInfo.used)} of ${formatFileSize(storageInfo.total)} used`}
          >
            <HardDrive className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
