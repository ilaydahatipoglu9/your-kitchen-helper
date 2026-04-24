import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  AlertTriangle,
  Users,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Data Sources", path: "/admin/data-sources", icon: Database },
  { label: "Alert Rules", path: "/admin/alerts", icon: AlertTriangle },
  { label: "User Management", path: "/admin/users", icon: Users },
];

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-heading text-lg font-bold text-primary-foreground">SH</span>
              </div>
              <span className="hidden font-heading text-xl font-bold text-foreground md:block">
                Sports Hub
              </span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Admin</span>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to App
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <nav className="p-4 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
