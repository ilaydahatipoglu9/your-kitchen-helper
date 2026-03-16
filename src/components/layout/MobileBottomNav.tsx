import { NavLink } from "react-router-dom";
import { Home, Table2, Activity, BarChart3, BookOpen } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/admin/entities", label: "Admin", Icon: Table2 },
  { to: "/monitoring", label: "Monitor", Icon: Activity },
  { to: "/analytics", label: "Analytics", Icon: BarChart3 },
  { to: "/api-docs", label: "Docs", Icon: BookOpen },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      aria-label="Bottom"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-5 px-2 py-2">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "flex flex-col items-center justify-center gap-1 rounded-md px-2 py-1 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive ? "text-foreground" : "text-muted-foreground",
              ].join(" ")
            }
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
