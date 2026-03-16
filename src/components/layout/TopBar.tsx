import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AuthDialogs } from "@/components/auth/AuthDialogs";

export function TopBar({
  onOpenProfile,
}: {
  onOpenProfile: () => void;
}) {
  // local session placeholder (desktop only; mobile shows in-page card)
  const [signedIn, setSignedIn] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-[1200px] items-center gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-maritime shadow-sm" aria-hidden />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Sports App</div>
              <div className="text-xs text-muted-foreground">Central Hub</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {[
            ["Home", "/"],
            ["Admin", "/admin/entities"],
            ["Monitoring", "/monitoring"],
            ["Analytics", "/analytics"],
            ["API Docs", "/api-docs"],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "rounded-md px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <div className="relative hidden w-full max-w-md items-center md:flex">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              aria-label="Search sports, teams, leagues, players"
              placeholder="Search teams, leagues, players…"
              className="pl-9"
            />
          </div>

          <Button variant="outline" className="hidden md:inline-flex" onClick={onOpenProfile}>
            <span className="mr-2">Profile</span>
            <Avatar className="h-7 w-7">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>

          <div className="hidden md:block">
            <AuthDialogs signedIn={signedIn} onSignedInChange={setSignedIn} />
          </div>

          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
            aria-label="Open profile and preferences"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
