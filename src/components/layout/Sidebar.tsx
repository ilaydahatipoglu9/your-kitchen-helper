import React, { useState } from "react";
import { MessageSquare, Plus, Search, Settings, Archive, Tag } from "lucide-react";
import { SettingsModal } from "../SettingsModal";

export const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-sidebar-primary-foreground">Oceanic Chat</h1>
        <button className="md:hidden text-sidebar-foreground hover:text-sidebar-primary-foreground" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="px-4 pb-4">
        <button 
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-transform active:scale-95"
          data-usecases="UC_027"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative" data-usecases="UC_034">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/50" size={16} />
          <input 
            type="text" 
            placeholder="Search Conversations..." 
            className="w-full bg-sidebar-accent text-sidebar-accent-foreground rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1" data-usecases="UC_126,UC_033">
        {/* Example Conversation Items */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors border-l-2 border-transparent hover:border-sidebar-ring">
            <div className="flex items-center gap-3 overflow-hidden">
              <MessageSquare size={16} className="shrink-0" />
              <span className="truncate text-sm">Conversation {i}</span>
            </div>
            <div className="hidden group-hover:flex items-center gap-1 shrink-0">
              <button className="p-1 hover:text-sidebar-ring" data-usecases="UC_038" title="Tag">
                <Tag size={14} />
              </button>
              <button className="p-1 hover:text-destructive" data-usecases="UC_030" title="Archive">
                <Archive size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm"
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
