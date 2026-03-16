import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthDialogs({
  signedIn,
  onSignedInChange,
}: {
  signedIn: boolean;
  onSignedInChange: (next: boolean) => void;
}) {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {!signedIn ? (
        <>
          <Button onClick={() => setSignInOpen(true)} data-usecases="UC_269">
            Sign in
          </Button>
          <Button variant="outline" onClick={() => setSignUpOpen(true)} data-usecases="UC_269">
            Sign up
          </Button>
        </>
      ) : (
        <Button variant="outline" onClick={() => onSignedInChange(false)} data-usecases="UC_269">
          Sign out
        </Button>
      )}

      {/* Sign in */}
      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>Access your personalized dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Email</div>
              <Input placeholder="you@example.com" type="email" data-usecases="UC_269" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Password</div>
              <Input placeholder="••••••••" type="password" data-usecases="UC_269" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignInOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSignedInChange(true);
                setSignInOpen(false);
              }}
              data-usecases="UC_269"
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign up */}
      <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create account</DialogTitle>
            <DialogDescription>Start tracking favorites and updates.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Name</div>
              <Input placeholder="Jane Doe" data-usecases="UC_269" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Email</div>
              <Input placeholder="you@example.com" type="email" data-usecases="UC_269" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Password</div>
              <Input placeholder="Create a password" type="password" data-usecases="UC_269" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignUpOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSignedInChange(true);
                setSignUpOpen(false);
              }}
              data-usecases="UC_269"
            >
              Sign up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
