import { Folder, FolderOpen, Home, Settings, ShieldAlert, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onOpenSettings: () => void;
  onOpenAuditLogs: () => void;
}

const MOCK_FOLDERS = [
  { id: "1", name: "Documents", children: [{ id: "1-1", name: "Work" }, { id: "1-2", name: "Personal" }] },
  { id: "2", name: "Images", children: [{ id: "2-1", name: "Vacation" }] },
  { id: "3", name: "Projects", children: [] },
];

export default function Sidebar({ onOpenSettings, onOpenAuditLogs }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "1": true });

  const toggleFolder = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col h-full text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
        <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center">
          <Home className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <span className="font-bold text-lg">OceanDrive</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
          My Files
        </div>
        <nav className="space-y-1" data-usecases="UC_051">
          {MOCK_FOLDERS.map(folder => (
            <div key={folder.id}>
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                data-usecases="UC_051"
                aria-expanded={expanded[folder.id]}
              >
                {folder.children.length > 0 ? (
                  expanded[folder.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4" />
                )}
                {expanded[folder.id] ? <FolderOpen className="w-4 h-4 text-sidebar-primary" /> : <Folder className="w-4 h-4 text-sidebar-primary" />}
                {folder.name}
              </button>
              
              {expanded[folder.id] && folder.children.length > 0 && (
                <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-2">
                  {folder.children.map(child => (
                    <button
                      key={child.id}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      data-usecases="UC_051"
                    >
                      <Folder className="w-4 h-4 text-sidebar-primary" />
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button 
          onClick={onOpenAuditLogs}
          className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          data-usecases="UC_021,UC_122"
        >
          <ShieldAlert className="w-4 h-4" />
          Audit Logs
        </button>
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          data-usecases="UC_076,UC_082"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
