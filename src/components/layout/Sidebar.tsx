import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquarePlus,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Archive,
  Trash2,
  LogOut,
  User,
  Moon,
  Sun,
  MessageSquare,
  Tag,
  Clock,
} from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  tags?: string[];
  isArchived?: boolean;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  isOpen: boolean;
}

// Mock conversations for demonstration
const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "React Performance Tips",
    preview: "How can I optimize my React app...",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    tags: ["development"],
  },
  {
    id: "2",
    title: "API Design Best Practices",
    preview: "What are the best practices for...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["backend"],
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    preview: "Can you explain neural networks...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["ai", "learning"],
  },
  {
    id: "4",
    title: "Database Optimization",
    preview: "How to improve query performance...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "5",
    title: "TypeScript Generics",
    preview: "I need help understanding generics...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["typescript"],
  },
];

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function Sidebar({ collapsed, onToggle, isMobile, isOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewConversation = () => {
    navigate("/chat");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">AI Chat</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* New Conversation Button */}
      <div className="p-3">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewConversation}
                className="w-full h-10 bg-primary hover:bg-primary/90"
                size="icon"
                data-usecases="UC_027"
              >
                <MessageSquarePlus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">New Conversation</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={handleNewConversation}
            className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
            data-usecases="UC_027"
          >
            <MessageSquarePlus className="h-5 w-5" />
            New Conversation
          </Button>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="relative" data-usecases="UC_034">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* Conversation List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2" role="list" aria-label="Conversations">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              collapsed={collapsed}
              isActive={location.pathname === `/chat/${conversation.id}`}
            />
          ))}
          {filteredConversations.length === 0 && !collapsed && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No conversations found
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* Theme Toggle */}
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                data-usecases="UC_134"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Theme</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
            data-usecases="UC_134"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        )}

        {/* Settings */}
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate("/settings")}
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        )}

        {/* User Profile */}
        <UserProfileButton collapsed={collapsed} />
      </div>
    </>
  );

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-[280px]",
        isMobile && !isOpen && "-translate-x-full",
        isMobile && isOpen && "translate-x-0"
      )}
      aria-label="Sidebar navigation"
    >
      {sidebarContent}
    </aside>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  collapsed: boolean;
  isActive: boolean;
}

function ConversationItem({ conversation, collapsed, isActive }: ConversationItemProps) {
  const navigate = useNavigate();

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/chat/${conversation.id}`)}
            className={cn(
              "w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent",
              isActive && "bg-sidebar-accent"
            )}
            data-usecases="UC_033,UC_126"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{conversation.title}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors",
        "hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent"
      )}
      onClick={() => navigate(`/chat/${conversation.id}`)}
      role="listitem"
      data-usecases="UC_033,UC_126"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-sidebar-foreground truncate">
            {conversation.title}
          </h3>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTimestamp(conversation.timestamp)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {conversation.preview}
        </p>
        {conversation.tags && conversation.tags.length > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {conversation.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions on hover */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem data-usecases="UC_030">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" data-usecases="UC_029">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function UserProfileButton({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();

  if (collapsed) {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">Profile</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" side="right">
          <DropdownMenuItem onClick={() => navigate("/profile")} data-usecases="UC_002">
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/login")} data-usecases="UC_007">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate("/profile")} data-usecases="UC_002">
          <User className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/login")} data-usecases="UC_007">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
