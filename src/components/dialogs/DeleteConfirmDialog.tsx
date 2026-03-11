import React, { useState } from 'react';
import { useFileManager } from '@/context/FileManagerContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getItemById } from '@/data/mockData';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemIds: string[];
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onOpenChange,
  itemIds,
}) => {
  const { deleteItems } = useFileManager();
  const [isDeleting, setIsDeleting] = useState(false);

  const items = itemIds.map((id) => getItemById(id)).filter(Boolean);
  const itemCount = items.length;
  const folderCount = items.filter((item) => item?.type === 'folder').length;
  const fileCount = itemCount - folderCount;

  const getItemDescription = () => {
    if (itemCount === 1 && items[0]) {
      return `"${items[0].name}"`;
    }
    
    const parts = [];
    if (folderCount > 0) {
      parts.push(`${folderCount} folder${folderCount > 1 ? 's' : ''}`);
    }
    if (fileCount > 0) {
      parts.push(`${fileCount} file${fileCount > 1 ? 's' : ''}`);
    }
    return parts.join(' and ');
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    deleteItems(itemIds);
    toast.success(`Successfully deleted ${getItemDescription()}`);
    
    setIsDeleting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-usecases="UC_026,UC_065">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete {getItemDescription()}?
            {folderCount > 0 && (
              <span className="mt-2 block text-destructive">
                Warning: Deleting folders will also delete all contents inside them.
              </span>
            )}
            <span className="mt-2 block">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
