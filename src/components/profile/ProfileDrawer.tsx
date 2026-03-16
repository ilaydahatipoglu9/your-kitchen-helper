import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/appStore";

export function ProfileDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { state, actions } = useAppStore();

  const user = state.auth.status === "signed-in" ? state.auth.user : null;
  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");

  React.useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user?.name, user?.email, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md" data-usecases="UC_002">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>Manage your account details.</SheetDescription>
        </SheetHeader>

        {user ? (
          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="profile-name" className="text-sm font-medium">
                Name
              </label>
              <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="profile-email" className="text-sm font-medium">
                Email
              </label>
              <Input id="profile-email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  actions.updateProfile({ name, email });
                  onOpenChange(false);
                }}
                className="flex-1"
                data-usecases="UC_002"
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              This is mock profile state stored in memory.
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">Sign in to edit profile.</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
