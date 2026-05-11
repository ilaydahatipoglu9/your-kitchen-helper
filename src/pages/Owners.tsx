import * as React from "react";
import { Eye, GripVertical, Plus, Trash2 } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

type Widget = { id: string; name: string; visible: boolean };

export default function OwnersPage() {
  const [widgets, setWidgets] = React.useState<Widget[]>([
    { id: "w1", name: "Net operating income", visible: true },
    { id: "w2", name: "Market comparison", visible: true },
    { id: "w3", name: "Maintenance summary", visible: false },
  ]);

  const [addOpen, setAddOpen] = React.useState(false);
  const [remove, setRemove] = React.useState<Widget | null>(null);

  return (
    <AppShell title="Owners">
      <div className="grid gap-4">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Owner dashboard configuration</CardTitle>
            <Button onClick={() => setAddOpen(true)} data-usecases="UC_094">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add widget
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            {widgets.map((w, idx) => (
              <div key={w.id} className="flex items-center justify-between rounded-md border bg-background/50 p-3">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-xs text-muted-foreground">Widget ID: {w.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden text-xs text-muted-foreground md:block">Order</div>
                  <Badge variant="outline">{idx + 1}</Badge>

                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Switch
                      checked={w.visible}
                      onCheckedChange={(v) => setWidgets((p) => p.map((x) => (x.id === w.id ? { ...x, visible: v } : x)))}
                      data-usecases="UC_094"
                      aria-label={`Toggle ${w.name}`}
                    />
                  </div>

                  <Button variant="outline" size="sm" onClick={() => setWidgets((p) => {
                    if (idx === 0) return p;
                    const next = [...p];
                    const tmp = next[idx - 1];
                    next[idx - 1] = next[idx];
                    next[idx] = tmp;
                    return next;
                  })} data-usecases="UC_094">
                    Move up
                  </Button>

                  <Button variant="ghost" size="icon" onClick={() => setRemove(w)} aria-label="Remove widget" data-usecases="UC_094">
                    <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent aria-label="Add widget">
            <DialogHeader>
              <DialogTitle>Add widget</DialogTitle>
              <DialogDescription>Select a widget to add to the owner dashboard.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 text-sm">
              <div className="rounded-md border bg-background/50 p-3">Cash flow trend</div>
              <div className="rounded-md border bg-background/50 p-3">Delinquency rate</div>
              <div className="rounded-md border bg-background/50 p-3">Vacancy timeline</div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setWidgets((p) => [{ id: `w${p.length + 1}`, name: "Cash flow trend", visible: true }, ...p]);
                  setAddOpen(false);
                }}
                data-usecases="UC_094"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!remove} onOpenChange={(v) => setRemove(v ? remove : null)}>
          <DialogContent aria-label="Remove widget">
            <DialogHeader>
              <DialogTitle>Remove widget</DialogTitle>
              <DialogDescription>
                Remove <span className="font-medium">{remove?.name}</span> from the owner dashboard.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemove(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setWidgets((p) => p.filter((x) => x.id !== remove?.id));
                  setRemove(null);
                }}
                data-usecases="UC_094"
              >
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
