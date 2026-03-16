import React, { useState } from "react";
import { Menu, User, ChevronDown } from "lucide-react";
import { SettingsModal } from "../SettingsModal";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2" data-usecases="UC_204">
          <span className="text-sm font-medium text-muted-foreground">Model:</span>
          <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors">
            GPT-4 Oceanic <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors" 
          data-usecases="UC_002"
        >
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
            <User size={16} />
          </div>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
};
