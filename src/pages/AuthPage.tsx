import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound, LogIn, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/state/auth";

function MaritimeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950"
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.25),transparent_55%)]" />
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const [tab, setTab] = React.useState<"signin" | "signup" | "reset">("signin");

  const [email, setEmail] = React.useState("demo@maritime.dev");
  const [password, setPassword] = React.useState("password");
  const [showPassword, setShowPassword] = React.useState(false);

  const from = (location.state as any)?.from ?? "/";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    signIn({ email, role });
    toast({ title: "Signed in", description: `Welcome back, ${email}.` });
    navigate(from, { replace: true });
  }

  function onReset(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Reset link sent", description: "If this were wired to a backend, you'd receive an email shortly." });
    setTab("signin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MaritimeBackdrop />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="hidden lg:flex flex-col justify-center">
            <div className="max-w-lg">
              <p className="text-sm font-medium text-sky-200/80">File Manager Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">A calm workspace for your files.</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200/80">
                Browse folders, search instantly, and manage files with confidence—built on a Maritime Serenity theme.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-200/80">
                  <p className="text-sm font-medium text-white">Keyboard-friendly</p>
                  <p className="mt-1 text-sm">Clear focus states and predictable navigation.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-200/80">
                  <p className="text-sm font-medium text-white">Contextual actions</p>
                  <p className="mt-1 text-sm">Only see actions that make sense for your selection.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <Card className="w-full max-w-md border-white/10 bg-background/80 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Sign in to access your workspace. Use “admin@…” for admin UI.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="signin" data-usecases="[UC_138]">
                      <LogIn className="mr-2" /> Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" data-usecases="[UC_138]">
                      <UserPlus className="mr-2" /> Create
                    </TabsTrigger>
                    <TabsTrigger value="reset" data-usecases="[UC_138]">
                      <KeyRound className="mr-2" /> Reset
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    <form onSubmit={onSubmit} className="mt-4 space-y-4" data-usecases="[UC_138]">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                            data-usecases="[UC_138]"
                            aria-pressed={showPassword}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            Show
                          </button>
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" data-usecases="[UC_138]">
                        Sign In
                      </Button>

                      <div className="text-center text-sm text-muted-foreground">
                        <button
                          type="button"
                          className="underline underline-offset-4 hover:text-foreground"
                          onClick={() => setTab("reset")}
                          data-usecases="[UC_138]"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={onSubmit} className="mt-4 space-y-4" data-usecases="[UC_138]">
                      <div className="space-y-2">
                        <Label htmlFor="email2">Email</Label>
                        <Input
                          id="email2"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password2">Password</Label>
                        <Input
                          id="password2"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" data-usecases="[UC_138]">
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="reset">
                    <form onSubmit={onReset} className="mt-4 space-y-4" data-usecases="[UC_138]">
                      <div className="space-y-2">
                        <Label htmlFor="email3">Email</Label>
                        <Input
                          id="email3"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" variant="secondary" data-usecases="[UC_138]">
                        Send reset link
                      </Button>
                      <Button type="button" variant="ghost" className="w-full" onClick={() => setTab("signin")}
                        data-usecases="[UC_138]"
                      >
                        Back to sign in
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
