import React from 'react';
import { useFileManager } from '@/context/FileManagerContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileGrid } from './FileGrid';
import { FileList } from './FileList';
import { EmptyState } from './EmptyState';

export const ContentArea: React.FC = () => {
  const { currentItems, viewMode, searchQuery } = useFileManager();

  const isEmpty = currentItems.length === 0;

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-4">
        {isEmpty ? (
          <EmptyState isSearchResult={!!searchQuery} />
        ) : viewMode === 'grid' ? (
          <FileGrid items={currentItems} />
        ) : (
          <FileList items={currentItems} />
        )}
      </div>
    </ScrollArea>
  );
};
