import React from 'react';
import { cn } from '@/lib/utils';
import { useFileManager } from '@/context/FileManagerContext';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { ContentArea } from '@/components/content/ContentArea';
import { DetailsPane } from '@/components/details/DetailsPane';

export const FileManagerLayout: React.FC = () => {
  const { isSidebarCollapsed, isDetailsPaneOpen } = useFileManager();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex-shrink-0 transition-all duration-300 ease-in-out',
          isSidebarCollapsed ? 'w-0 md:w-16' : 'w-64 md:w-72'
        )}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <Toolbar />

        {/* Content + Details Pane */}
        <div className="flex flex-1 overflow-hidden">
          {/* File/Folder Content */}
          <div className="flex-1 overflow-hidden">
            <ContentArea />
          </div>

          {/* Details Pane */}
          <aside
            className={cn(
              'flex-shrink-0 border-l border-border bg-card transition-all duration-300 ease-in-out',
              isDetailsPaneOpen ? 'w-80' : 'w-0'
            )}
          >
            {isDetailsPaneOpen && <DetailsPane />}
          </aside>
        </div>
      </main>
    </div>
  );
};
