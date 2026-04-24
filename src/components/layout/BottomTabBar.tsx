import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Star, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    { label: "Home", path: "/", icon: Home },
    { label: "Live", path: "/live", icon: Activity },
    { label: "My Sports", path: "/my-sports", icon: Star },
    { label: "Search", path: "/search", icon: Search },
    { label: "Profile", path: "/profile", icon: User },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", active && "text-primary")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
