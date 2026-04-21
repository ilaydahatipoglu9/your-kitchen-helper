import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileBottomNav } from "./MobileBottomNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Home,
  Search,
  Bell,
  User,
  Trophy,
  ChevronDown,
  Star,
  Settings,
  BarChart3,
  Database,
  Shield,
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
  rightSidebarContent?: React.ReactNode;
}

export function MainLayout({
  children,
  showRightSidebar = false,
  rightSidebarContent,
}: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <MobileSidebar onClose={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="lg:pl-60">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
            {children}
          </main>

          {/* Right Sidebar (Desktop Only) */}
          {showRightSidebar && (
            <aside className="hidden xl:block w-80 border-l border-border bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-auto">
              {rightSidebarContent}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}

// Mobile Sidebar Content
function MobileSidebar({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const mainNavItems = [
    { label: "Home", icon: <Home className="h-5 w-5" />, href: "/" },
    { label: "My Sports", icon: <Trophy className="h-5 w-5" />, href: "/my-sports" },
    { label: "Search", icon: <Search className="h-5 w-5" />, href: "/search" },
    { label: "Notifications", icon: <Bell className="h-5 w-5" />, href: "/notifications", badge: 3 },
    { label: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
  ];

  const adminNavItems = [
    { label: "Analytics", icon: <BarChart3 className="h-5 w-5" />, href: "/admin/analytics" },
    { label: "Data Sources", icon: <Database className="h-5 w-5" />, href: "/admin/data-sources" },
    { label: "System Health", icon: <Shield className="h-5 w-5" />, href: "/admin/system-health" },
    { label: "Settings", icon: <Settings className="h-5 w-5" />, href: "/admin/settings" },
  ];

  const mockFollowedEntities = [
    { id: "1", name: "Manchester United", type: "team", unreadCount: 2 },
    { id: "2", name: "Premier League", type: "league" },
    { id: "3", name: "Los Angeles Lakers", type: "team", unreadCount: 1 },
    { id: "4", name: "NBA", type: "league" },
    { id: "5", name: "LeBron James", type: "player" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Sports Hub</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Favorites Section */}
        <Collapsible
          open={favoritesOpen}
          onOpenChange={setFavoritesOpen}
          className="mt-6"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-3 py-2 h-auto text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Favorites
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  favoritesOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {mockFollowedEntities.map((entity) => (
              <Link
                key={entity.id}
                to={`/${entity.type}s/${entity.id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {entity.name.charAt(0)}
                </div>
                <span className="truncate flex-1">{entity.name}</span>
                {entity.unreadCount && entity.unreadCount > 0 && (
                  <span className="bg-primary/20 text-primary text-xs font-semibold px-1.5 py-0.5 rounded">
                    {entity.unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Admin Section */}
        <Collapsible
          open={adminOpen}
          onOpenChange={setAdminOpen}
          className="mt-6"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-3 py-2 h-auto text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  adminOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </ScrollArea>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
