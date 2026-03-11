import { FileItem, FolderItem, User, StorageInfo, Notification } from '@/types/fileManager';

// Mock current user
export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  role: 'user',
};

// Mock storage info
export const storageInfo: StorageInfo = {
  used: 3.2 * 1024 * 1024 * 1024, // 3.2 GB
  total: 10 * 1024 * 1024 * 1024, // 10 GB
};

// Mock folder structure
export const mockFolders: FolderItem[] = [
  {
    id: 'root',
    name: 'My Files',
    type: 'folder',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-12-01'),
    parentId: null,
    ownerId: 'user-1',
    childCount: 5,
    isExpanded: true,
  },
  {
    id: 'folder-1',
    name: 'Documents',
    type: 'folder',
    createdAt: new Date('2024-01-15'),
    modifiedAt: new Date('2024-11-20'),
    parentId: 'root',
    ownerId: 'user-1',
    childCount: 12,
    isExpanded: false,
  },
  {
    id: 'folder-2',
    name: 'Images',
    type: 'folder',
    createdAt: new Date('2024-02-01'),
    modifiedAt: new Date('2024-11-25'),
    parentId: 'root',
    ownerId: 'user-1',
    childCount: 45,
    isExpanded: false,
  },
  {
    id: 'folder-3',
    name: 'Projects',
    type: 'folder',
    createdAt: new Date('2024-03-10'),
    modifiedAt: new Date('2024-12-01'),
    parentId: 'root',
    ownerId: 'user-1',
    childCount: 8,
    isExpanded: true,
  },
  {
    id: 'folder-4',
    name: 'Downloads',
    type: 'folder',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-11-30'),
    parentId: 'root',
    ownerId: 'user-1',
    childCount: 23,
    isExpanded: false,
  },
  {
    id: 'folder-5',
    name: 'Shared with me',
    type: 'folder',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-11-28'),
    parentId: 'root',
    ownerId: 'user-1',
    childCount: 7,
    isShared: true,
    isExpanded: false,
  },
  // Nested folders
  {
    id: 'folder-1-1',
    name: 'Work',
    type: 'folder',
    createdAt: new Date('2024-02-15'),
    modifiedAt: new Date('2024-11-15'),
    parentId: 'folder-1',
    ownerId: 'user-1',
    childCount: 5,
    isExpanded: false,
  },
  {
    id: 'folder-1-2',
    name: 'Personal',
    type: 'folder',
    createdAt: new Date('2024-02-20'),
    modifiedAt: new Date('2024-10-30'),
    parentId: 'folder-1',
    ownerId: 'user-1',
    childCount: 3,
    isExpanded: false,
  },
  {
    id: 'folder-3-1',
    name: 'Website Redesign',
    type: 'folder',
    createdAt: new Date('2024-06-01'),
    modifiedAt: new Date('2024-12-01'),
    parentId: 'folder-3',
    ownerId: 'user-1',
    childCount: 15,
    isExpanded: false,
  },
  {
    id: 'folder-3-2',
    name: 'Mobile App',
    type: 'folder',
    createdAt: new Date('2024-07-15'),
    modifiedAt: new Date('2024-11-28'),
    parentId: 'folder-3',
    ownerId: 'user-1',
    childCount: 22,
    isExpanded: false,
  },
];

// Mock files
export const mockFiles: FileItem[] = [
  // Root level files
  {
    id: 'file-1',
    name: 'README.md',
    type: 'file',
    size: 2048,
    mimeType: 'text/markdown',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-11-15'),
    parentId: 'root',
    ownerId: 'user-1',
  },
  {
    id: 'file-2',
    name: 'notes.txt',
    type: 'file',
    size: 1024,
    mimeType: 'text/plain',
    createdAt: new Date('2024-03-20'),
    modifiedAt: new Date('2024-11-20'),
    parentId: 'root',
    ownerId: 'user-1',
  },
  // Documents folder files
  {
    id: 'file-3',
    name: 'Annual Report 2024.pdf',
    type: 'file',
    size: 5242880,
    mimeType: 'application/pdf',
    createdAt: new Date('2024-06-15'),
    modifiedAt: new Date('2024-11-10'),
    parentId: 'folder-1',
    ownerId: 'user-1',
  },
  {
    id: 'file-4',
    name: 'Budget Spreadsheet.xlsx',
    type: 'file',
    size: 1048576,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    createdAt: new Date('2024-04-01'),
    modifiedAt: new Date('2024-11-25'),
    parentId: 'folder-1',
    ownerId: 'user-1',
  },
  {
    id: 'file-5',
    name: 'Meeting Notes.docx',
    type: 'file',
    size: 524288,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    createdAt: new Date('2024-09-10'),
    modifiedAt: new Date('2024-11-30'),
    parentId: 'folder-1',
    ownerId: 'user-1',
  },
  // Images folder files
  {
    id: 'file-6',
    name: 'vacation-photo.jpg',
    type: 'file',
    size: 3145728,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-07-20'),
    modifiedAt: new Date('2024-07-20'),
    parentId: 'folder-2',
    ownerId: 'user-1',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop',
  },
  {
    id: 'file-7',
    name: 'profile-picture.png',
    type: 'file',
    size: 1572864,
    mimeType: 'image/png',
    createdAt: new Date('2024-05-15'),
    modifiedAt: new Date('2024-08-10'),
    parentId: 'folder-2',
    ownerId: 'user-1',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  },
  {
    id: 'file-8',
    name: 'landscape.jpg',
    type: 'file',
    size: 4194304,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-08-05'),
    modifiedAt: new Date('2024-08-05'),
    parentId: 'folder-2',
    ownerId: 'user-1',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
  },
  // Projects folder files
  {
    id: 'file-9',
    name: 'project-plan.pdf',
    type: 'file',
    size: 2097152,
    mimeType: 'application/pdf',
    createdAt: new Date('2024-06-01'),
    modifiedAt: new Date('2024-11-28'),
    parentId: 'folder-3',
    ownerId: 'user-1',
  },
  {
    id: 'file-10',
    name: 'design-mockup.fig',
    type: 'file',
    size: 8388608,
    mimeType: 'application/octet-stream',
    createdAt: new Date('2024-07-10'),
    modifiedAt: new Date('2024-12-01'),
    parentId: 'folder-3-1',
    ownerId: 'user-1',
  },
  // Downloads folder files
  {
    id: 'file-11',
    name: 'software-installer.exe',
    type: 'file',
    size: 52428800,
    mimeType: 'application/x-msdownload',
    createdAt: new Date('2024-10-15'),
    modifiedAt: new Date('2024-10-15'),
    parentId: 'folder-4',
    ownerId: 'user-1',
  },
  {
    id: 'file-12',
    name: 'archive.zip',
    type: 'file',
    size: 15728640,
    mimeType: 'application/zip',
    createdAt: new Date('2024-11-01'),
    modifiedAt: new Date('2024-11-01'),
    parentId: 'folder-4',
    ownerId: 'user-1',
  },
  // Shared folder files
  {
    id: 'file-13',
    name: 'Team Presentation.pptx',
    type: 'file',
    size: 10485760,
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    createdAt: new Date('2024-09-20'),
    modifiedAt: new Date('2024-11-25'),
    parentId: 'folder-5',
    ownerId: 'user-2',
    isShared: true,
  },
];

// Combine folders and files for easy access
export const getAllItems = (): (FileItem | FolderItem)[] => {
  return [...mockFolders, ...mockFiles];
};

// Get items by parent ID
export const getItemsByParentId = (parentId: string | null): (FileItem | FolderItem)[] => {
  const allItems = getAllItems();
  return allItems.filter(item => item.parentId === parentId);
};

// Get folder by ID
export const getFolderById = (id: string): FolderItem | undefined => {
  return mockFolders.find(folder => folder.id === id);
};

// Get file by ID
export const getFileById = (id: string): FileItem | undefined => {
  return mockFiles.find(file => file.id === id);
};

// Get item by ID (file or folder)
export const getItemById = (id: string): FileItem | FolderItem | undefined => {
  return getAllItems().find(item => item.id === id);
};

// Get breadcrumb path for a folder
export const getBreadcrumbPath = (folderId: string | null): { id: string; name: string }[] => {
  const path: { id: string; name: string }[] = [];
  let currentId = folderId;
  
  while (currentId) {
    const folder = getFolderById(currentId);
    if (folder) {
      path.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parentId;
    } else {
      break;
    }
  }
  
  return path;
};

// Get child folders for tree navigation
export const getChildFolders = (parentId: string | null): FolderItem[] => {
  return mockFolders.filter(folder => folder.parentId === parentId);
};

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Upload Complete',
    message: '3 files have been uploaded successfully.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'File Shared',
    message: 'Team Presentation.pptx has been shared with you.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: 'notif-3',
    type: 'warning',
    title: 'Storage Warning',
    message: 'You are using 32% of your storage quota.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
];

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get file icon based on mime type
export const getFileIcon = (mimeType?: string): string => {
  if (!mimeType) return 'file';
  
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf')) return 'file-text';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'file-text';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'table';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'presentation';
  if (mimeType.includes('zip') || mimeType.includes('archive') || mimeType.includes('compressed')) return 'archive';
  if (mimeType.includes('text')) return 'file-text';
  
  return 'file';
};
