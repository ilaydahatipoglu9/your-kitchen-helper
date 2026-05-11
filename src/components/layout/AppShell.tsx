import * as React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Users,
  Wrench,
  Wallet,
  Crown,
  Settings,
  MessageSquare,
  ShieldCheck,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/context/session";

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" /> },
  { to: "/properties", label: "Properties", icon: <Building2 className="h-4 w-4" aria-hidden="true" /> },
  { to: "/tenants", label: "Tenants", icon: <Users className="h-4 w-4" aria-hidden="true" /> },
  { to: "/maintenance", label: "Maintenance", icon: <Wrench className="h-4 w-4" aria-hidden="true" /> },
  { to: "/financials", label: "Financials", icon: <Wallet className="h-4 w-4" aria-hidden="true" /> },
  { to: "/owners", label: "Owners", icon: <Crown className="h-4 w-4" aria-hidden="true" /> },
  { to: "/messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" aria-hidden="true" /> },
  { to: "/audit", label: "Audit", icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" /> },
  { to: "/settings", label: "Settings", icon: <Settings className="h-4 w-4" aria-hidden="true" /> },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-1 p-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )
          }
        >
          <span className="text-sidebar-foreground/70 group-[.active]:text-sidebar-accent-foreground">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell({ title, children }: { title?: string; children: React.ReactNode }) {
  const { user, signOut } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // On first visit after login, keep user oriented at dashboard
    if (user && location.pathname === "/") navigate("/dashboard", { replace: true });
  }, [user, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="pmt-skip-link" href="#main">
        Skip to content
      </a>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[240px_1fr]">
        <aside className="hidden h-[calc(100vh-2rem)] flex-col rounded-lg border bg-card/60 backdrop-blur md:sticky md:top-4 md:flex">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary/15 ring-1 ring-primary/25" aria-hidden="true" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">PMT</div>
                <div className="text-xs text-muted-foreground">Unified dashboard</div>
              </div>
            </div>
          </div>
          <Separator />
          <SidebarNav />
          <div className="mt-auto p-3">
            <div className="rounded-md border bg-background/60 p-3">
              <div className="text-xs text-muted-foreground">Signed in as</div>
              <div className="mt-1 truncate text-sm font-medium">{user?.name ?? "Guest"}</div>
              <div className="truncate text-xs text-muted-foreground">{user?.email ?? ""}</div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <header className="flex items-center justify-between rounded-lg border bg-card/60 px-3 py-2 backdrop-blur">
            <div className="flex min-w-0 items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
                    <Menu className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <div className="px-4 py-3">
                    <div className="text-sm font-semibold">Navigation</div>
                    <div className="text-xs text-muted-foreground">Switch modules</div>
                  </div>
                  <Separator />
                  <SidebarNav onNavigate={() => {}} />
                </SheetContent>
              </Sheet>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{title ?? "Property Management Tool"}</div>
                <div className="truncate text-xs text-muted-foreground">Real-time portfolio overview</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {(user?.name ?? "G")
                          .split(" ")
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm md:inline">{user ? user.name : "Guest"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <div className="text-sm font-medium">{user?.name ?? "Guest"}</div>
                    <div className="text-xs text-muted-foreground">{user?.email ?? ""}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="cursor-pointer"
                    aria-label="Open settings"
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut();
                      navigate("/", { replace: true });
                    }}
                    className="cursor-pointer text-destructive focus:text-destructive"
                    data-usecases="UC_128"
                    aria-label="Sign out"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main id="main" className="min-w-0" tabIndex={-1}>
            {children}
          </main>

          <footer className="pb-6 text-center text-xs text-muted-foreground">
            Property Management Tool (PMT)
          </footer>
        </div>
      </div>
    </div>
  );
}
