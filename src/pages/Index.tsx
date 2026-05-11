import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthDialogs } from "@/components/auth/AuthDialogs";
import { useSession } from "@/context/session";

export default function Index() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = React.useState(false);

  React.useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <a className="pmt-skip-link" href="#main">
        Skip to content
      </a>

      <header className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-primary/15 ring-1 ring-primary/25" aria-hidden="true" />
          <div>
            <div className="text-sm font-semibold">Property Management Tool</div>
            <div className="text-xs text-muted-foreground">Unified Portfolio Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setAuthOpen(true)} data-usecases="UC_128">
            Sign in
          </Button>
          <Button onClick={() => setAuthOpen(true)} data-usecases="UC_128">
            Create account
          </Button>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1200px] px-4 pb-10">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-xl border bg-card/60 p-6 backdrop-blur">
            <h1 className="text-3xl font-semibold tracking-tight">Run your rental portfolio from one place</h1>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              PMT consolidates properties, tenants, leases, maintenance, and financial health into a single actionable
              dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={() => setAuthOpen(true)} data-usecases="UC_128">
                Access dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}
                title="Preview without signing in"
              >
                Preview demo
              </Button>
            </div>
          </section>

          <section className="grid gap-4">
            <Card className="bg-card/60 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">What you can do</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Track occupancy and unit readiness across properties.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Prioritize maintenance with clear status and urgency.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Audit changes and communications for compliance.</span>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <AuthDialogs open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
