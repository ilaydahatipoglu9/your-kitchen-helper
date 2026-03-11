import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Breadcrumbs } from './Breadcrumbs';
import { CreateFolderDialog } from '@/components/dialogs/CreateFolderDialog';
import { UploadDialog } from '@/components/dialogs/UploadDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import { RenameDialog } from '@/components/dialogs/RenameDialog';
import {
  FolderPlus,
  Upload,
  Download,
  Trash2,
  Edit3,
  Grid3X3,
  List,
  Search,
  SortAsc,
  SortDesc,
  Info,
  MoreHorizontal,
  Copy,
  Move,
  Share2,
  Bell,
  Settings,
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const {
    selectedItems,
    viewMode,
    setViewMode,
    sortConfig,
    setSortField,
    searchQuery,
    setSearchQuery,
    isDetailsPaneOpen,
    toggleDetailsPane,
    selectedItem,
  } = useFileManager();

  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const hasSelection = selectedItems.length > 0;
  const hasSingleSelection = selectedItems.length === 1;

  return (
    <div className="flex flex-col border-b border-border bg-card">
      {/* Breadcrumbs Row */}
      <div className="flex items-center gap-4 px-4 py-2">
        <Breadcrumbs />
        
        {/* Search */}
        <div className="relative ml-auto w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-usecases="UC_071"
          />
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Primary Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateFolderOpen(true)}
                className="gap-2"
                data-usecases="UC_023"
              >
                <FolderPlus className="h-4 w-4" />
                <span className="hidden sm:inline">New Folder</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Create new folder</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsUploadOpen(true)}
                className="gap-2"
                data-usecases="UC_031"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload files</TooltipContent>
          </Tooltip>
        </div>

        {/* Separator */}
        <div className="mx-2 h-6 w-px bg-border" />

        {/* Selection-dependent Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasSelection}
                className="gap-2"
                data-usecases="UC_032"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download selected</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasSingleSelection}
                onClick={() => setIsRenameOpen(true)}
                data-usecases="UC_027"
              >
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline">Rename</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rename</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasSelection}
                onClick={() => setIsDeleteOpen(true)}
                className="text-destructive hover:text-destructive"
                data-usecases="UC_026"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete selected</TooltipContent>
          </Tooltip>

          {/* More Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={!hasSelection}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem disabled={!hasSelection} data-usecases="UC_029">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem disabled={!hasSelection} data-usecases="UC_028">
                <Move className="mr-2 h-4 w-4" />
                Move
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={!hasSingleSelection} data-usecases="UC_069">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Controls */}
        <div className="flex items-center gap-1">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2" data-usecases="UC_060">
                {sortConfig.order === 'asc' ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortField('name')}>
                Name {sortConfig.field === 'name' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField('modifiedAt')}>
                Date Modified {sortConfig.field === 'modifiedAt' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField('size')}>
                Size {sortConfig.field === 'size' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField('type')}>
                Type {sortConfig.field === 'type' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-md border border-input">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                  data-usecases="UC_058"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Grid view</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                  data-usecases="UC_058"
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>List view</TooltipContent>
            </Tooltip>
          </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative" data-usecases="UC_084">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-semibold">Notifications</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                Mark all as read
              </Button>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3" data-usecases="UC_084">
              <span className="font-medium">Upload Complete</span>
              <span className="text-xs text-muted-foreground">3 files have been uploaded successfully.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3" data-usecases="UC_084">
              <span className="font-medium">File Shared</span>
              <span className="text-xs text-muted-foreground">Team Presentation.pptx has been shared with you.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

          {/* Details Pane Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isDetailsPaneOpen ? 'secondary' : 'ghost'}
                size="sm"
                onClick={toggleDetailsPane}
                data-usecases="UC_067"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle details pane</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Dialogs */}
      <CreateFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
      />
      <UploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
      />
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        itemIds={selectedItems}
      />
      {selectedItem && (
        <RenameDialog
          open={isRenameOpen}
          onOpenChange={setIsRenameOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
};
