import * as React from "react";
import { Bell, Plus, Trash2 } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type Pref = { id: string; channel: "Email" | "SMS"; target: string; enabled: boolean };

export default function SettingsPage() {
  const [prefs, setPrefs] = React.useState<Pref[]>([
    { id: "p1", channel: "Email", target: "manager@demo.com", enabled: true },
    { id: "p2", channel: "SMS", target: "+1 (555) 010-0200", enabled: false },
  ]);

  const [addOpen, setAddOpen] = React.useState(false);
  const [remove, setRemove] = React.useState<Pref | null>(null);

  return (
    <AppShell title="Settings">
      <div className="grid gap-4">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Communication preferences</CardTitle>
            <Button onClick={() => setAddOpen(true)} data-usecases="UC_120">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add channel/config
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            {prefs.length === 0 ? (
              <div className="rounded-md border bg-background/50 p-6 text-sm">
                <div className="font-medium">No channels configured</div>
                <div className="mt-1 text-xs text-muted-foreground">Add a channel to start receiving notifications.</div>
              </div>
            ) : (
              prefs.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-background/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/25">
                      <Bell className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{p.channel}</div>
                        <Badge variant="outline">{p.target}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Preference ID: {p.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">Enabled</div>
                      <Switch
                        checked={p.enabled}
                        onCheckedChange={(v) => setPrefs((prev) => prev.map((x) => (x.id === p.id ? { ...x, enabled: v } : x)))}
                        data-usecases="UC_120"
                        aria-label={`Enable or disable ${p.channel}`}
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => alert("Saved") } data-usecases="UC_120">
                      Save changes
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => setRemove(p)} data-usecases="UC_120">
                      <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent aria-label="Add channel">
            <DialogHeader>
              <DialogTitle>Add channel/config</DialogTitle>
              <DialogDescription>Define a channel and destination for notifications.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="pref-channel">
                  Channel
                </label>
                <Input id="pref-channel" placeholder="Email or SMS" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="pref-target">
                  Destination
                </label>
                <Input id="pref-target" placeholder="Address or phone number" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setPrefs((p) => [{ id: `p${p.length + 1}`, channel: "Email", target: "new@demo.com", enabled: true }, ...p]);
                  setAddOpen(false);
                }}
                data-usecases="UC_120"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!remove} onOpenChange={(v) => setRemove(v ? remove : null)}>
          <DialogContent aria-label="Remove preference">
            <DialogHeader>
              <DialogTitle>Remove preference</DialogTitle>
              <DialogDescription>
                Remove <span className="font-medium">{remove?.channel}</span> configuration.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemove(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setPrefs((p) => p.filter((x) => x.id !== remove?.id));
                  setRemove(null);
                }}
                data-usecases="UC_120"
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
