import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Settings, Table2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/state/auth";

export function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-10 border-b bg-background/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} aria-label="Back to workspace">
              <ArrowLeft />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm text-muted-foreground">Admin</p>
              <h1 className="truncate text-lg font-semibold">{title}</h1>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[260px_1fr]">
        <nav className="rounded-lg border bg-background/70 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/50" aria-label="Admin navigation">
          <Link
            to="/admin/configurations"
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              location.pathname.includes("/admin/configurations") && "bg-sky-500/10",
            )}
          >
            <Settings className="h-4 w-4" /> Configurations
          </Link>
          <Link
            to="/admin/audit-logs"
            className={cn(
              "mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              location.pathname.includes("/admin/audit-logs") && "bg-sky-500/10",
            )}
          >
            <FileText className="h-4 w-4" /> Audit logs
          </Link>
          <Link
            to="/admin/entities"
            className={cn(
              "mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              location.pathname.includes("/admin/entities") && "bg-sky-500/10",
            )}
          >
            <Table2 className="h-4 w-4" /> Entities
          </Link>

          <div className="mt-3 rounded-md border border-dashed p-3 text-xs text-muted-foreground">
            Admin routes are available when signed in as an “admin@…” user.
          </div>
        </nav>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
