import { Link, useLocation } from "react-router-dom";
import { Compass, Radio, Rss, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Live", href: "/", icon: Radio },
  { label: "Feed", href: "/feed", icon: Rss },
  { label: "Profile", href: "/profile", icon: User },
];

export function MobileTabBar() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t safe-area-inset-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {tabItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-accent")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
