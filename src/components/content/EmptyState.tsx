import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen, Search, Upload, FolderPlus } from 'lucide-react';

interface EmptyStateProps {
  isSearchResult?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearchResult = false }) => {
  if (isSearchResult) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No results found</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          We couldn't find any files or folders matching your search. Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <FolderOpen className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">This folder is empty</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        Get started by uploading files or creating a new folder to organize your content.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2" data-usecases="UC_023">
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
        <Button className="gap-2" data-usecases="UC_031">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>
    </div>
  );
};
