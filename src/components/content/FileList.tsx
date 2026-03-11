import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { FileItem, FolderItem } from '@/types/fileManager';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Folder,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  Presentation,
  Download,
  Edit3,
  Trash2,
  Copy,
  Move,
  Share2,
  Info,
  MoreHorizontal,
} from 'lucide-react';
import { formatFileSize, getFileIcon } from '@/data/mockData';
import { format } from 'date-fns';

interface FileListProps {
  items: (FileItem | FolderItem)[];
}

const getIconComponent = (item: FileItem | FolderItem) => {
  if (item.type === 'folder') {
    return Folder;
  }

  const iconType = getFileIcon((item as FileItem).mimeType);
  
  switch (iconType) {
    case 'image':
      return FileImage;
    case 'video':
      return FileVideo;
    case 'audio':
      return FileAudio;
    case 'archive':
      return FileArchive;
    case 'table':
      return FileSpreadsheet;
    case 'presentation':
      return Presentation;
    case 'file-text':
      return FileText;
    default:
      return File;
  }
};

export const FileList: React.FC<FileListProps> = ({ items }) => {
  const {
    selectedItems,
    toggleItemSelection,
    setSelectedItems,
    selectAllItems,
    navigateToFolder,
    setDetailsPaneOpen,
    sortConfig,
    setSortField,
  } = useFileManager();

  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < items.length;

  const handleItemClick = (item: FileItem | FolderItem, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      toggleItemSelection(item.id);
    } else if (e.shiftKey) {
      toggleItemSelection(item.id);
    } else {
      setSelectedItems([item.id]);
    }
  };

  const handleItemDoubleClick = (item: FileItem | FolderItem) => {
    if (item.type === 'folder') {
      navigateToFolder(item.id);
    } else {
      setSelectedItems([item.id]);
      setDetailsPaneOpen(true);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      selectAllItems();
    }
  };

  return (
    <div className="rounded-lg border bg-card" data-usecases="UC_057,UC_058">
      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground">
        <div className="w-8">
          <Checkbox
            checked={allSelected}
            ref={(el) => {
              if (el) {
                (el as HTMLButtonElement).dataset.state = someSelected ? 'indeterminate' : allSelected ? 'checked' : 'unchecked';
              }
            }}
            onCheckedChange={handleSelectAll}
          />
        </div>
        <button
          className={cn(
            'flex flex-1 items-center gap-1 text-left hover:text-foreground',
            sortConfig.field === 'name' && 'text-foreground'
          )}
          onClick={() => setSortField('name')}
        >
          Name
          {sortConfig.field === 'name' && (
            <span className="text-xs">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
        <button
          className={cn(
            'hidden w-32 items-center gap-1 text-left hover:text-foreground sm:flex',
            sortConfig.field === 'modifiedAt' && 'text-foreground'
          )}
          onClick={() => setSortField('modifiedAt')}
        >
          Modified
          {sortConfig.field === 'modifiedAt' && (
            <span className="text-xs">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
        <button
          className={cn(
            'hidden w-24 items-center gap-1 text-right hover:text-foreground md:flex',
            sortConfig.field === 'size' && 'text-foreground'
          )}
          onClick={() => setSortField('size')}
        >
          Size
          {sortConfig.field === 'size' && (
            <span className="text-xs">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
        <div className="w-10" />
      </div>

      {/* Items */}
      <div className="divide-y">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const IconComponent = getIconComponent(item);
          const isFolder = item.type === 'folder';
          const fileItem = item as FileItem;

          return (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <div
                  className={cn(
                    'group flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors',
                    'hover:bg-accent/50',
                    isSelected && 'bg-primary/10'
                  )}
                  onClick={(e) => handleItemClick(item, e)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  data-usecases="UC_059"
                >
                  {/* Checkbox */}
                  <div
                    className="w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItemSelection(item.id);
                    }}
                  >
                    <Checkbox checked={isSelected} />
                  </div>

                  {/* Icon & Name */}
                  <div className="flex flex-1 items-center gap-3 overflow-hidden">
                    {fileItem.thumbnail ? (
                      <img
                        src={fileItem.thumbnail}
                        alt={item.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                    ) : (
                      <IconComponent
                        className={cn(
                          'h-6 w-6 flex-shrink-0',
                          isFolder ? 'text-amber-400' : 'text-muted-foreground'
                        )}
                      />
                    )}
                    <span className="truncate font-medium" title={item.name}>
                      {item.name}
                    </span>
                    {item.isShared && (
                      <Share2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    )}
                  </div>

                  {/* Modified Date */}
                  <div className="hidden w-32 text-sm text-muted-foreground sm:block">
                    {format(new Date(item.modifiedAt), 'MMM d, yyyy')}
                  </div>

                  {/* Size */}
                  <div className="hidden w-24 text-right text-sm text-muted-foreground md:block">
                    {isFolder
                      ? `${(item as FolderItem).childCount || 0} items`
                      : formatFileSize(fileItem.size || 0)}
                  </div>

                  {/* Actions */}
                  <div className="w-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-48">
                {isFolder ? (
                  <ContextMenuItem
                    onClick={() => navigateToFolder(item.id)}
                    data-usecases="UC_024"
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    Open
                  </ContextMenuItem>
                ) : (
                  <ContextMenuItem data-usecases="UC_032">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </ContextMenuItem>
                )}
                <ContextMenuSeparator />
                <ContextMenuItem data-usecases="UC_027">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem data-usecases="UC_029">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </ContextMenuItem>
                <ContextMenuItem data-usecases="UC_028">
                  <Move className="mr-2 h-4 w-4" />
                  Move
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem data-usecases="UC_069">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    setSelectedItems([item.id]);
                    setDetailsPaneOpen(true);
                  }}
                  data-usecases="UC_067"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Details
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  className="text-destructive focus:text-destructive"
                  data-usecases="UC_026"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </div>
  );
};
