import { Home, Star, Trophy, Settings, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

export const Sidebar = ({ onSearchClick, onProfileClick, onSettingsClick }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Star, label: "My Favorites", id: "favorites" },
    { icon: Trophy, label: "Leagues", id: "leagues" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <span className="font-bold text-lg text-sidebar-foreground">FanCentral</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-2 px-2">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          data-usecases="UC_103,UC_126"
        >
          <Search size={20} />
          {!isCollapsed && <span>Search</span>}
        </button>

        {navItems.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          data-usecases="UC_002"
        >
          <User size={20} />
          {!isCollapsed && <span>Profile</span>}
        </button>
        <button
          onClick={onSettingsClick}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          data-usecases="UC_008,UC_020"
        >
          <Settings size={20} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </div>
  );
};
