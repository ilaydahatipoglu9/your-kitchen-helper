import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Database, 
  History, 
  Library, 
  Gavel, 
  Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Workbench", path: "/", icon: LayoutDashboard },
  { name: "Model Registry", path: "/models", icon: Database },
  { name: "History", path: "/history", icon: History },
  { name: "Prompt Library", path: "/prompts", icon: Library },
  { name: "Judge Config", path: "/judge", icon: Gavel },
  { name: "System Status", path: "/status", icon: Activity },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">DS</span>
          </div>
          DeepStream
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
