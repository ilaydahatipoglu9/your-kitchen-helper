import React from 'react';
import { FileManagerProvider } from '@/context/FileManagerContext';
import { FileManagerLayout } from '@/components/layout/FileManagerLayout';

const DashboardPage: React.FC = () => {
  return (
    <FileManagerProvider>
      <FileManagerLayout />
    </FileManagerProvider>
  );
};

export default DashboardPage;
