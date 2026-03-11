import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { FileItem, FolderItem } from '@/types/fileManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  X,
  Download,
  Share2,
  Edit3,
  Trash2,
  Clock,
  HardDrive,
  User,
  Calendar,
  History,
} from 'lucide-react';
import { formatFileSize, getFileIcon, getItemById } from '@/data/mockData';
import { format } from 'date-fns';

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

export const DetailsPane: React.FC = () => {
  const { selectedItems, setDetailsPaneOpen } = useFileManager();

  // Get selected item details
  const selectedItem = selectedItems.length === 1 
    ? getItemById(selectedItems[0]) 
    : null;

  if (!selectedItem) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDetailsPaneOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-center text-muted-foreground">
          <p>
            {selectedItems.length === 0
              ? 'Select a file or folder to view details'
              : `${selectedItems.length} items selected`}
          </p>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(selectedItem);
  const isFolder = selectedItem.type === 'folder';
  const fileItem = selectedItem as FileItem;
  const folderItem = selectedItem as FolderItem;

  return (
    <div className="flex h-full flex-col" data-usecases="UC_067,UC_068">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDetailsPaneOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Preview / Icon */}
          <div className="mb-4 flex flex-col items-center">
            {fileItem.thumbnail ? (
              <img
                src={fileItem.thumbnail}
                alt={selectedItem.name}
                className="mb-3 h-32 w-32 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-lg bg-muted">
                <IconComponent
                  className={cn(
                    'h-12 w-12',
                    isFolder ? 'text-amber-400' : 'text-muted-foreground'
                  )}
                />
              </div>
            )}
            <h3 className="text-center font-medium" title={selectedItem.name}>
              {selectedItem.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isFolder ? 'Folder' : fileItem.mimeType || 'File'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-4 flex justify-center gap-2" data-usecases="UC_069">
            {!isFolder && (
              <Button variant="outline" size="sm" className="gap-1" data-usecases="UC_032">
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1" data-usecases="UC_069">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Metadata */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Information</h4>
            
            <div className="space-y-3">
              {/* Size */}
              <div className="flex items-start gap-3">
                <HardDrive className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Size</p>
                  <p className="text-sm text-muted-foreground">
                    {isFolder
                      ? `${folderItem.childCount || 0} items`
                      : formatFileSize(fileItem.size || 0)}
                  </p>
                </div>
              </div>

              {/* Created */}
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedItem.createdAt), 'PPP')}
                  </p>
                </div>
              </div>

              {/* Modified */}
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Modified</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedItem.modifiedAt), 'PPP p')}
                  </p>
                </div>
              </div>

              {/* Owner */}
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <p className="text-sm text-muted-foreground">You</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Version History (for files) */}
          {!isFolder && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Version History</h4>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" data-usecases="UC_100">
                  View all
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-md bg-muted/50 p-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Current version</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(selectedItem.modifiedAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator className="my-4" />

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2" data-usecases="UC_027">
              <Edit3 className="h-4 w-4" />
              Rename
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              data-usecases="UC_026"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
