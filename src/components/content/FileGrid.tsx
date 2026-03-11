import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { FileItem, FolderItem } from '@/types/fileManager';
import { Checkbox } from '@/components/ui/checkbox';
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
} from 'lucide-react';
import { formatFileSize, getFileIcon } from '@/data/mockData';

interface FileGridProps {
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

export const FileGrid: React.FC<FileGridProps> = ({ items }) => {
  const {
    selectedItems,
    toggleItemSelection,
    setSelectedItems,
    navigateToFolder,
    setDetailsPaneOpen,
  } = useFileManager();

  const handleItemClick = (item: FileItem | FolderItem, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      toggleItemSelection(item.id);
    } else if (e.shiftKey) {
      // Shift-click for range selection could be implemented here
      toggleItemSelection(item.id);
    } else {
      setSelectedItems([item.id]);
    }
  };

  const handleItemDoubleClick = (item: FileItem | FolderItem) => {
    if (item.type === 'folder') {
      navigateToFolder(item.id);
    } else {
      // Open file preview or details
      setSelectedItems([item.id]);
      setDetailsPaneOpen(true);
    }
  };

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      }}
      data-usecases="UC_057,UC_058"
    >
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        const IconComponent = getIconComponent(item);
        const isFolder = item.type === 'folder';
        const fileItem = item as FileItem;

        return (
          <ContextMenu key={item.id}>
            <ContextMenuTrigger>
              <div
                className={cn(
                  'group relative flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-all duration-200',
                  'hover:border-primary/30 hover:bg-accent/50 hover:shadow-sm',
                  isSelected
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-transparent bg-card'
                )}
                onClick={(e) => handleItemClick(item, e)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                data-usecases="UC_059"
              >
                {/* Selection Checkbox */}
                <div
                  className={cn(
                    'absolute left-2 top-2 transition-opacity',
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItemSelection(item.id);
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    className="h-5 w-5"
                  />
                </div>

                {/* Thumbnail or Icon */}
                <div className="mb-3 flex h-20 w-20 items-center justify-center">
                  {fileItem.thumbnail ? (
                    <img
                      src={fileItem.thumbnail}
                      alt={item.name}
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <IconComponent
                      className={cn(
                        'h-16 w-16',
                        isFolder ? 'text-amber-400' : 'text-muted-foreground'
                      )}
                    />
                  )}
                </div>

                {/* Name */}
                <p
                  className="w-full truncate text-center text-sm font-medium"
                  title={item.name}
                >
                  {item.name}
                </p>

                {/* Metadata */}
                <p className="mt-1 text-xs text-muted-foreground">
                  {isFolder
                    ? `${(item as FolderItem).childCount || 0} items`
                    : formatFileSize(fileItem.size || 0)}
                </p>
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
  );
};
