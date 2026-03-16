import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MainContent from "@/components/layout/MainContent";
import DetailsPane from "@/components/layout/DetailsPane";
import SettingsModal from "@/components/modals/SettingsModal";
import AuditLogsModal from "@/components/modals/AuditLogsModal";

export default function Dashboard() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuditLogsOpen, setIsAuditLogsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Left Sidebar */}
      <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} onOpenAuditLogs={() => setIsAuditLogsOpen(true)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 flex overflow-hidden relative">
          {/* Center Content */}
          <MainContent 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            selectedFile={selectedFile}
            setSelectedFile={(file) => {
              setSelectedFile(file);
              if (file) setIsDetailsOpen(true);
            }}
          />

          {/* Right Details Pane */}
          {isDetailsOpen && (
            <DetailsPane 
              file={selectedFile} 
              onClose={() => setIsDetailsOpen(false)} 
            />
          )}
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AuditLogsModal isOpen={isAuditLogsOpen} onClose={() => setIsAuditLogsOpen(false)} />
    </div>
  );
}
