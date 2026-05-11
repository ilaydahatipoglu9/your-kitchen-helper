import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession, type UserRole } from "@/context/session";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  role: z.enum(["manager", "owner", "admin"]).optional(),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  role: z.enum(["manager", "owner", "admin"]).optional(),
});

function RolePills({ value, onChange, disabled }: { value: UserRole; onChange: (v: UserRole) => void; disabled?: boolean }) {
  const roles: UserRole[] = ["manager", "owner", "admin"];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select role">
      {roles.map((r) => (
        <Button
          key={r}
          type="button"
          variant={value === r ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(r)}
          disabled={disabled}
        >
          {r === "manager" ? "Manager" : r === "owner" ? "Owner" : "Admin"}
        </Button>
      ))}
    </div>
  );
}

export function AuthDialogs({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { signIn, signUp } = useSession();
  const [tab, setTab] = React.useState<"signin" | "signup">("signin");
  const [signInRole, setSignInRole] = React.useState<UserRole>("manager");
  const [signUpRole, setSignUpRole] = React.useState<UserRole>("manager");

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "" },
  });

  React.useEffect(() => {
    if (!open) {
      signInForm.reset();
      signUpForm.reset();
      setTab("signin");
    }
  }, [open, signInForm, signUpForm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Authentication" className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Access PMT</DialogTitle>
          <DialogDescription>Sign in to view your portfolio dashboard, or create an account.</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" data-usecases="UC_128">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="signup" data-usecases="UC_128">
              Create account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-4">
            <form
              className="grid gap-4"
              onSubmit={signInForm.handleSubmit((values) => {
                signIn({ email: values.email, role: signInRole });
                onOpenChange(false);
              })}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="signin-email">
                  Email
                </label>
                <Input id="signin-email" placeholder="name@company.com" autoComplete="email" {...signInForm.register("email")} />
                {signInForm.formState.errors.email ? (
                  <p className="text-xs text-destructive" role="alert">
                    {signInForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-medium">Role</div>
                <RolePills value={signInRole} onChange={setSignInRole} />
                <p className="text-xs text-muted-foreground">This demo uses role selection to preview role-gated views.</p>
              </div>

              <DialogFooter>
                <Button type="submit" data-usecases="UC_128" disabled={signInForm.formState.isSubmitting}>
                  Sign in
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <form
              className="grid gap-4"
              onSubmit={signUpForm.handleSubmit((values) => {
                signUp({ name: values.name, email: values.email, role: signUpRole });
                onOpenChange(false);
              })}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="signup-name">
                  Name
                </label>
                <Input id="signup-name" placeholder="Your name" autoComplete="name" {...signUpForm.register("name")} />
                {signUpForm.formState.errors.name ? (
                  <p className="text-xs text-destructive" role="alert">
                    {signUpForm.formState.errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="signup-email">
                  Email
                </label>
                <Input id="signup-email" placeholder="name@company.com" autoComplete="email" {...signUpForm.register("email")} />
                {signUpForm.formState.errors.email ? (
                  <p className="text-xs text-destructive" role="alert">
                    {signUpForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-medium">Role</div>
                <RolePills value={signUpRole} onChange={setSignUpRole} />
              </div>

              <DialogFooter>
                <Button type="submit" data-usecases="UC_128" disabled={signUpForm.formState.isSubmitting}>
                  Create account
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
