import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

// Mock search suggestions
const mockSuggestions = [
  { type: "team", name: "Manchester United", league: "Premier League" },
  { type: "team", name: "Real Madrid", league: "La Liga" },
  { type: "player", name: "Lionel Messi", team: "Inter Miami" },
  { type: "player", name: "Cristiano Ronaldo", team: "Al Nassr" },
  { type: "league", name: "Premier League", country: "England" },
  { type: "league", name: "La Liga", country: "Spain" },
];

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "Goal! Manchester United",
    message: "Rashford scores in the 45th minute",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Match Starting Soon",
    message: "Real Madrid vs Barcelona kicks off in 30 minutes",
    time: "28 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Final Score",
    message: "Liverpool 3 - 1 Arsenal",
    time: "1 hour ago",
    read: true,
  },
];

export function TopBar({ onMenuToggle, showMenuButton = false }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    mockNotifications.filter((n) => !n.read).length
  );
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = mockSuggestions.filter(
    (item) =>
      searchQuery.length > 0 &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Search */}
        <div ref={searchRef} className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams, players, leagues..."
            className="w-64 pl-9 md:w-80 lg:w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Search sports content"
          />

          {/* Search Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-border bg-popover shadow-lg">
              <ul className="py-2" role="listbox">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Link
                      to={`/search?q=${encodeURIComponent(suggestion.name)}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <span
                        className={cn(
                          "text-xs font-medium uppercase px-2 py-0.5 rounded",
                          suggestion.type === "team" && "bg-info/10 text-info",
                          suggestion.type === "player" && "bg-success/10 text-success",
                          suggestion.type === "league" && "bg-warning/10 text-warning"
                        )}
                      >
                        {suggestion.type}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{suggestion.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {"league" in suggestion && suggestion.league}
                          {"team" in suggestion && suggestion.team}
                          {"country" in suggestion && suggestion.country}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="sm:hidden" asChild>
          <Link to="/search">
            <Search className="h-5 w-5" />
          </Link>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-live text-[10px] font-bold text-live-foreground">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setUnreadCount(0)}
                >
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 cursor-pointer",
                  !notification.read && "bg-accent/50"
                )}
              >
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-info" />
                  )}
                  <span className="font-medium text-sm">{notification.title}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground pl-4">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/notifications"
                className="w-full text-center text-sm text-info hover:text-info"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile/preferences">Preferences</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
