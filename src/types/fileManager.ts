// File Manager Types

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number; // in bytes
  mimeType?: string;
  createdAt: Date;
  modifiedAt: Date;
  parentId: string | null;
  ownerId: string;
  permissions?: Permission[];
  isShared?: boolean;
  thumbnail?: string;
}

export interface FolderItem extends FileItem {
  type: 'folder';
  childCount?: number;
  isExpanded?: boolean;
}

export interface Permission {
  userId: string;
  access: 'read' | 'write' | 'admin';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface StorageInfo {
  used: number; // in bytes
  total: number; // in bytes
}

export interface BreadcrumbItem {
  id: string;
  name: string;
}

export type ViewMode = 'grid' | 'list';

export type SortField = 'name' | 'size' | 'modifiedAt' | 'type';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface FileManagerState {
  currentFolderId: string | null;
  selectedItems: string[];
  viewMode: ViewMode;
  sortConfig: SortConfig;
  searchQuery: string;
  isDetailsPaneOpen: boolean;
  isSidebarCollapsed: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}
