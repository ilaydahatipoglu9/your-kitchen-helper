import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Activity, LogIn, LogOut, Settings } from "lucide-react";
import AuthDialog from "@/components/workspace/auth/AuthDialog";

export default function WorkspaceTopBar({
  systemStatus,
}: {
  systemStatus: "healthy" | "degraded" | "down";
}) {
  const [authOpen, setAuthOpen] = useState<null | "signin" | "signup">(null);
  const [signedIn, setSignedIn] = useState<boolean>(true);

  const status = useMemo(() => {
    if (systemStatus === "healthy") return { label: "Healthy", variant: "secondary" as const };
    if (systemStatus === "degraded") return { label: "Degraded", variant: "outline" as const };
    return { label: "Down", variant: "destructive" as const };
  }, [systemStatus]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/40 ring-1 ring-border">
            <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Parallel LLM Evaluation Workspace</div>
            <div className="text-xs text-muted-foreground">LLM Testing and Sandboxing Environment</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={status.variant} className="gap-1">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-xs">System: {status.label}</span>
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2" aria-label="User menu">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-[11px] font-medium text-primary">
                    AE
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!signedIn ? (
                <>
                  <DropdownMenuItem
                    data-usecases="UC_157"
                    onSelect={() => setAuthOpen("signin")}
                    className="gap-2"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign in
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    data-usecases="UC_157"
                    onSelect={() => setAuthOpen("signup")}
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    Sign up
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    Signed in (demo)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    data-usecases="UC_157"
                    onSelect={() => setSignedIn(false)}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Sign out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <AuthDialog
            mode={authOpen}
            open={authOpen !== null}
            onOpenChange={(open) => setAuthOpen(open ? authOpen : null)}
            onAuthed={() => {
              setSignedIn(true);
              setAuthOpen(null);
            }}
          />
        </div>
      </div>
    </header>
  );
}
