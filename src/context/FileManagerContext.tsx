import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FileItem, FolderItem, ViewMode, SortConfig, SortField, SortOrder } from '@/types/fileManager';
import { 
  mockFolders, 
  mockFiles, 
  getItemsByParentId, 
  getBreadcrumbPath,
  getChildFolders,
  getItemById 
} from '@/data/mockData';

interface FileManagerContextType {
  // State
  currentFolderId: string;
  selectedItems: string[];
  viewMode: ViewMode;
  sortConfig: SortConfig;
  searchQuery: string;
  isDetailsPaneOpen: boolean;
  isSidebarCollapsed: boolean;
  folders: FolderItem[];
  files: FileItem[];
  expandedFolders: Set<string>;
  
  // Computed
  currentItems: (FileItem | FolderItem)[];
  breadcrumbPath: { id: string; name: string }[];
  selectedItem: FileItem | FolderItem | null;
  
  // Actions
  setCurrentFolderId: (id: string) => void;
  setSelectedItems: (ids: string[]) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: () => void;
  clearSelection: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSortConfig: (config: SortConfig) => void;
  setSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
  setSearchQuery: (query: string) => void;
  toggleDetailsPane: () => void;
  setDetailsPaneOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleFolderExpanded: (folderId: string) => void;
  navigateToFolder: (folderId: string) => void;
  
  // File operations
  createFolder: (name: string) => void;
  deleteItems: (ids: string[]) => void;
  renameItem: (id: string, newName: string) => void;
}

const FileManagerContext = createContext<FileManagerContextType | undefined>(undefined);

export const FileManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Core state
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDetailsPaneOpen, setDetailsPaneOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  
  // Data state (in real app, this would come from API)
  const [folders, setFolders] = useState<FolderItem[]>(mockFolders);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);

  // Computed values
  const currentItems = React.useMemo(() => {
    let items = getItemsByParentId(currentFolderId);
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(query));
    }
    
    // Apply sorting
    items.sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = ((a as FileItem).size || 0) - ((b as FileItem).size || 0);
          break;
        case 'modifiedAt':
          comparison = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
    
    // Sort folders first
    items.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return 0;
    });
    
    return items;
  }, [currentFolderId, searchQuery, sortConfig]);

  const breadcrumbPath = React.useMemo(() => {
    return getBreadcrumbPath(currentFolderId);
  }, [currentFolderId]);

  const selectedItem = React.useMemo(() => {
    if (selectedItems.length === 1) {
      return getItemById(selectedItems[0]) || null;
    }
    return null;
  }, [selectedItems]);

  // Actions
  const toggleItemSelection = useCallback((id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const selectAllItems = useCallback(() => {
    setSelectedItems(currentItems.map(item => item.id));
  }, [currentItems]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const setSortField = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortConfig(prev => ({
      ...prev,
      order: prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const toggleDetailsPane = useCallback(() => {
    setDetailsPaneOpen(prev => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const toggleFolderExpanded = useCallback((folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  }, []);

  const navigateToFolder = useCallback((folderId: string) => {
    setCurrentFolderId(folderId);
    setSelectedItems([]);
    
    // Expand all parent folders
    const path = getBreadcrumbPath(folderId);
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      path.forEach(item => newSet.add(item.id));
      return newSet;
    });
  }, []);

  // File operations
  const createFolder = useCallback((name: string) => {
    const newFolder: FolderItem = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      createdAt: new Date(),
      modifiedAt: new Date(),
      parentId: currentFolderId,
      ownerId: 'user-1',
      childCount: 0,
      isExpanded: false,
    };
    setFolders(prev => [...prev, newFolder]);
  }, [currentFolderId]);

  const deleteItems = useCallback((ids: string[]) => {
    setFolders(prev => prev.filter(folder => !ids.includes(folder.id)));
    setFiles(prev => prev.filter(file => !ids.includes(file.id)));
    setSelectedItems([]);
  }, []);

  const renameItem = useCallback((id: string, newName: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === id ? { ...folder, name: newName, modifiedAt: new Date() } : folder
    ));
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, name: newName, modifiedAt: new Date() } : file
    ));
  }, []);

  const value: FileManagerContextType = {
    // State
    currentFolderId,
    selectedItems,
    viewMode,
    sortConfig,
    searchQuery,
    isDetailsPaneOpen,
    isSidebarCollapsed,
    folders,
    files,
    expandedFolders,
    
    // Computed
    currentItems,
    breadcrumbPath,
    selectedItem,
    
    // Actions
    setCurrentFolderId,
    setSelectedItems,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    setViewMode,
    setSortConfig,
    setSortField,
    toggleSortOrder,
    setSearchQuery,
    toggleDetailsPane,
    setDetailsPaneOpen,
    toggleSidebar,
    toggleFolderExpanded,
    navigateToFolder,
    
    // File operations
    createFolder,
    deleteItems,
    renameItem,
  };

  return (
    <FileManagerContext.Provider value={value}>
      {children}
    </FileManagerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFileManager = (): FileManagerContextType => {
  const context = useContext(FileManagerContext);
  if (context === undefined) {
    throw new Error('useFileManager must be used within a FileManagerProvider');
  }
  return context;
};

export default FileManagerProvider;
