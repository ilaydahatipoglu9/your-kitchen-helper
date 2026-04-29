import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  useCases?: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    useCases: "UC_041,UC_086",
  },
  {
    title: "Discover",
    href: "/discover",
    icon: Compass,
    useCases: "UC_103,UC_114",
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    useCases: "UC_157",
    badge: 3,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    useCases: "UC_002",
  },
];

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card lg:hidden"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
              data-usecases={item.useCases}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                {item.badge && item.badge > 0 && (
                  <Badge 
                    className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-live text-live-foreground"
                    aria-label={`${item.badge} notifications`}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className={cn(
                "text-xs",
                isActive ? "font-medium" : "font-normal"
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
