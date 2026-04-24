import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TopNavBarProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

const TopNavBar = ({ onMenuToggle, isSidebarOpen }: TopNavBarProps) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Live Scores", path: "/live" },
    { label: "My Sports", path: "/my-sports" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left section - Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-lg font-bold text-primary-foreground">SH</span>
            </div>
            <span className="hidden font-heading text-xl font-bold text-foreground md:block">
              Sports Hub
            </span>
          </Link>
        </div>

        {/* Center section - Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right section - Search, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Desktop */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sports, teams, players..."
                className="w-64 pl-9 lg:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-usecases="UC_103,UC_123"
              />
            </div>
          </div>

          {/* Search - Mobile */}
          <Link to="/search" className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Search" data-usecases="UC_103">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* Notifications */}
          <Link to="/notifications">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative" data-usecases="UC_156,UC_157">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-live" />
            </Button>
          </Link>

          {/* Profile */}
          <Link to="/profile">
            <Button variant="ghost" size="icon" aria-label="Profile" data-usecases="UC_002">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
