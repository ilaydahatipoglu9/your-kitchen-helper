import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Trophy,
  Users,
  Flag,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Shield,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  useCases?: string;
  children?: NavItem[];
}

const mainNavItems: NavItem[] = [
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
];

const sportsNavItems: NavItem[] = [
  {
    title: "Sports",
    href: "/sports",
    icon: Trophy,
    useCases: "UC_042",
    children: [
      { title: "Football", href: "/sports/football", icon: Trophy },
      { title: "Basketball", href: "/sports/basketball", icon: Trophy },
      { title: "Tennis", href: "/sports/tennis", icon: Trophy },
      { title: "Cricket", href: "/sports/cricket", icon: Trophy },
    ],
  },
  {
    title: "Teams",
    href: "/teams",
    icon: Users,
    useCases: "UC_042",
  },
  {
    title: "Leagues",
    href: "/leagues",
    icon: Flag,
    useCases: "UC_042",
  },
  {
    title: "Players",
    href: "/players",
    icon: User,
    useCases: "UC_042",
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    useCases: "UC_249,UC_250",
  },
  {
    title: "System Health",
    href: "/admin/health",
    icon: Activity,
    useCases: "UC_254,UC_258",
  },
  {
    title: "Configuration",
    href: "/admin/config",
    icon: Settings,
    useCases: "UC_260,UC_261,UC_262,UC_264",
  },
  {
    title: "User Access",
    href: "/admin/users",
    icon: Shield,
    useCases: "UC_263",
  },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
        isActive
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
      data-usecases={item.useCases}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  );
}

function CollapsibleNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => pathname.startsWith(child.href)) || false
  );
  const isActive = pathname === item.href || item.children?.some((child) => pathname.startsWith(child.href));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between px-3 py-2 text-sm font-medium",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          data-usecases={item.useCases}
        >
          <span className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            {item.title}
          </span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pt-1">
        {item.children?.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              pathname === child.href
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {child.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <ScrollArea className="h-full py-4">
          <div className="space-y-6 px-3">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* Sports Navigation */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Browse
              </h3>
              {sportsNavItems.map((item) =>
                item.children ? (
                  <CollapsibleNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                ) : (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  />
                )
              )}
            </div>

            {/* Admin Navigation */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Administration
              </h3>
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
