import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/appStore";

type AuthView = "signin" | "signup" | "reset" | "mfa";

export function AuthDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const {
    state: { auth },
    actions,
  } = useAppStore();

  const [view, setView] = React.useState<AuthView>("signin");
  const [email, setEmail] = React.useState("marina@example.com");
  const [password, setPassword] = React.useState("password");
  const [mfaCode, setMfaCode] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setView("signin");
      setMfaCode("");
    }
  }, [open]);

  React.useEffect(() => {
    if (auth.status === "mfa-required") setView("mfa");
    if (auth.status === "signed-in") onOpenChange(false);
  }, [auth.status, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]" data-usecases="UC_233">
        <DialogHeader>
          <DialogTitle>
            {view === "signin" && "Sign in"}
            {view === "signup" && "Create your account"}
            {view === "reset" && "Reset password"}
            {view === "mfa" && "Multi‑factor authentication"}
          </DialogTitle>
          <DialogDescription>
            {view === "signin" && "Access your chats and settings."}
            {view === "signup" && "Start a new workspace in seconds."}
            {view === "reset" && "We’ll email you a verification code."}
            {view === "mfa" && "Enter the 6‑digit code from your authenticator."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          {(view === "signin" || view === "signup" || view === "reset") && (
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="auth-email">
                Email
              </label>
              <Input id="auth-email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
          )}

          {(view === "signin" || view === "signup") && (
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="auth-password">
                Password
              </label>
              <Input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={view === "signin" ? "current-password" : "new-password"}
              />
            </div>
          )}

          {view === "mfa" && (
            <div className="grid gap-2" data-usecases="UC_009">
              <label className="text-sm font-medium" htmlFor="auth-mfa">
                MFA code
              </label>
              <Input
                id="auth-mfa"
                inputMode="numeric"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="123456"
              />
            </div>
          )}

          <div className="grid gap-2 pt-2">
            {view === "signin" && (
              <Button
                onClick={() => actions.signIn(email, password)}
                className="w-full"
                data-usecases="UC_007"
              >
                Sign in
              </Button>
            )}
            {view === "signup" && (
              <Button
                onClick={() => actions.signIn(email, password)}
                className="w-full"
                data-usecases="UC_001"
              >
                Sign up
              </Button>
            )}
            {view === "reset" && (
              <Button
                onClick={() => {
                  // mock reset: just go back to sign in
                  actions.signIn(email, "");
                }}
                className="w-full"
                data-usecases="UC_004"
              >
                Send reset email
              </Button>
            )}
            {view === "mfa" && (
              <Button onClick={() => actions.submitMfa(mfaCode)} className="w-full" data-usecases="UC_009">
                Verify
              </Button>
            )}

            {(view === "signin" || view === "signup") && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => actions.signInWithProvider("google")}
                  data-usecases="UC_008"
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => actions.signInWithProvider("facebook")}
                  data-usecases="UC_008"
                >
                  Continue with Facebook
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-sm">
            {view === "signin" && (
              <>
                <button className="text-primary hover:underline" onClick={() => setView("signup")}>
                  Create account
                </button>
                <button className="text-muted-foreground hover:underline" onClick={() => setView("reset")}>
                  Forgot password?
                </button>
              </>
            )}
            {view === "signup" && (
              <button className="text-muted-foreground hover:underline" onClick={() => setView("signin")}>
                Already have an account?
              </button>
            )}
            {view === "reset" && (
              <button className="text-muted-foreground hover:underline" onClick={() => setView("signin")}>
                Back to sign in
              </button>
            )}
            {view === "mfa" && (
              <button className="text-muted-foreground hover:underline" onClick={() => onOpenChange(false)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
