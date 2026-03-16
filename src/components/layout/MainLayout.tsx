import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Cpu,
  History,
  Settings,
  Menu,
  X,
  ChevronRight,
  Beaker,
  BarChart3,
  FileText,
  Shield,
  Activity,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebarContent?: ReactNode;
}

const navItems = [
  { path: "/", label: "Workspace", icon: Home },
  { path: "/models", label: "Models", icon: Cpu },
  { path: "/prompts", label: "Prompts", icon: FileText },
  { path: "/benchmarks", label: "Benchmarks", icon: BarChart3 },
  { path: "/history", label: "History", icon: History },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function MainLayout({ children, showSidebar = false, sidebarContent }: MainLayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Beaker className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-semibold text-lg text-foreground md:inline-block">
              LLM Bench
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* System Status Indicator */}
            <Link
              to="/status"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--status-complete))]/10 text-[hsl(var(--status-complete))] text-sm"
              data-usecases="UC_127,UC_131"
            >
              <Activity className="h-3.5 w-3.5" />
              <span>All Systems Operational</span>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9"
              data-usecases="UC_157"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">AI Engineer</p>
                  <p className="text-xs text-muted-foreground">engineer@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings/security" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  data-usecases="UC_157"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-card p-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex">
        {/* Contextual Sidebar */}
        {showSidebar && (
          <aside
            className={cn(
              "hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300",
              sidebarOpen ? "w-64" : "w-0 overflow-hidden"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-medium text-sm">Session Controls</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    sidebarOpen && "rotate-180"
                  )}
                />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {sidebarContent}
            </div>
          </aside>
        )}

        {/* Page Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
