import * as React from "react";
import { CheckCircle2, Clock, Wrench } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type WorkOrder = { id: string; unit: string; summary: string; status: "Open" | "Scheduled" | "Complete" };

export default function MaintenancePage() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [items, setItems] = React.useState<WorkOrder[]>([
    { id: "w1", unit: "3A", summary: "Kitchen sink slow drain", status: "Scheduled" },
    { id: "w2", unit: "10A", summary: "Heater not turning on", status: "Open" },
  ]);

  return (
    <AppShell title="Maintenance">
      <div className="grid gap-4">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Work orders</CardTitle>
            <Button onClick={() => setCreateOpen(true)} data-usecases="UC_127">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              New work order
            </Button>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="rounded-md border bg-background/50 p-6 text-sm">
                <div className="font-medium">No open maintenance requests</div>
                <div className="mt-1 text-xs text-muted-foreground">Log the first request to start tracking status.</div>
              </div>
            ) : (
              <ul className="grid gap-3" aria-label="Maintenance list">
                {items.map((w) => (
                  <li key={w.id} className="rounded-md border bg-background/50 p-3 transition-shadow hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium">
                          Unit {w.unit} • {w.summary}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">ID: {w.id}</div>
                      </div>
                      <Badge variant={w.status === "Open" ? "destructive" : w.status === "Scheduled" ? "default" : "secondary"}>
                        {w.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setItems((prev) => prev.map((x) => (x.id === w.id ? { ...x, status: "Scheduled" } : x)))
                        }
                        data-usecases="UC_127"
                      >
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        Schedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setItems((prev) => prev.map((x) => (x.id === w.id ? { ...x, status: "Complete" } : x)))
                        }
                        data-usecases="UC_127"
                      >
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Mark complete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setItems((prev) => prev.filter((x) => x.id !== w.id))}
                        data-usecases="UC_127"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent aria-label="Create maintenance work order">
            <DialogHeader>
              <DialogTitle>New work order</DialogTitle>
              <DialogDescription>Capture the issue and assign it a unit.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="wo-unit">
                  Unit
                </label>
                <Input id="wo-unit" placeholder="Example: 12B" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="wo-summary">
                  Summary
                </label>
                <Input id="wo-summary" placeholder="Example: Dishwasher not draining" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="wo-notes">
                  Notes
                </label>
                <Textarea id="wo-notes" placeholder="Optional details" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setItems((p) => [{ id: `w${p.length + 3}`, unit: "TBD", summary: "New request", status: "Open" }, ...p]);
                  setCreateOpen(false);
                }}
                data-usecases="UC_127"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
