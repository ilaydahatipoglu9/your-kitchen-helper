import React, { useState, useEffect } from 'react';
import { useFileManager } from '@/context/FileManagerContext';
import { FileItem, FolderItem } from '@/types/fileManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit3 } from 'lucide-react';
import { toast } from 'sonner';

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: FileItem | FolderItem;
}

export const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  onOpenChange,
  item,
}) => {
  const { renameItem } = useFileManager();
  const [newName, setNewName] = useState(item.name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setNewName(item.name);
    }
  }, [open, item.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      toast.error('Please enter a name');
      return;
    }

    if (newName.trim() === item.name) {
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    renameItem(item.id, newName.trim());
    toast.success(`Renamed to "${newName.trim()}"`);
    
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-usecases="UC_027">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            Rename {item.type === 'folder' ? 'Folder' : 'File'}
          </DialogTitle>
          <DialogDescription>
            Enter a new name for "{item.name}".
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-name">New Name</Label>
              <Input
                id="new-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                disabled={isSubmitting}
                onFocus={(e) => {
                  // Select filename without extension for files
                  if (item.type === 'file') {
                    const lastDot = item.name.lastIndexOf('.');
                    if (lastDot > 0) {
                      e.target.setSelectionRange(0, lastDot);
                    } else {
                      e.target.select();
                    }
                  } else {
                    e.target.select();
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !newName.trim() || newName.trim() === item.name}
            >
              {isSubmitting ? 'Renaming...' : 'Rename'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
