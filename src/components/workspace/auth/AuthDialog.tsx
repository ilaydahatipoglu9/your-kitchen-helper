import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthDialog({
  mode,
  open,
  onOpenChange,
  onAuthed,
}: {
  mode: null | "signin" | "signup";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthed: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) {
      setPassword("");
    }
  }, [open]);

  const title = useMemo(() => (mode === "signup" ? "Sign up" : "Sign in"), [mode]);
  const description = useMemo(
    () =>
      mode === "signup"
        ? "Create a workspace session. (Demo UI only)"
        : "Start a workspace session. (Demo UI only)",
    [mode]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div data-usecases="UC_157" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="authEmail">Email</Label>
            <Input
              id="authEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authPassword">Password</Label>
            <Input
              id="authPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            data-usecases="UC_157"
            onClick={() => {
              // UI-only: emulate auth
              if (!email.trim() || !password.trim()) return;
              onAuthed();
            }}
            disabled={!email.trim() || !password.trim()}
          >
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
