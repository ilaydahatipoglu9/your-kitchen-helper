import * as React from "react";
import { Plus, Send, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

type ModalKey = "add" | "maintenance" | "notify" | null;

export function QuickActions() {
  const [open, setOpen] = React.useState<ModalKey>(null);
  const [busy, setBusy] = React.useState(false);


  return (
    <Card className="bg-card/60 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button
          variant="default"
          className="justify-start"
          onClick={() => setOpen("add")}
          data-usecases="UC_127"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add property or unit
        </Button>
        <Button
          variant="secondary"
          className="justify-start"
          onClick={() => setOpen("maintenance")}
          data-usecases="UC_127"
        >
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Log maintenance
        </Button>
        <Button
          variant="outline"
          className="justify-start"
          onClick={() => setOpen("notify")}
          data-usecases="UC_112"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send notification
        </Button>

        <Dialog open={open === "add"} onOpenChange={(v) => setOpen(v ? "add" : null)}>
          <DialogContent aria-label="Add property or unit">
            <DialogHeader>
              <DialogTitle>Add property or unit</DialogTitle>
              <DialogDescription>Capture the minimum details now. You can refine later.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-property-name">
                  Property name
                </label>
                <Input id="qa-property-name" placeholder="Example: Harbor View Apartments" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-address">
                  Address
                </label>
                <Input id="qa-address" placeholder="Street, City, State" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(null)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={() => {
                setBusy(true);
                window.setTimeout(() => {
                  setBusy(false);
                  setOpen(null);
                  toast("Saved draft property");
                }, 700);
              }}
                disabled={busy}
                data-usecases="UC_127"
              >
                {busy ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={open === "maintenance"} onOpenChange={(v) => setOpen(v ? "maintenance" : null)}>
          <DialogContent aria-label="Log maintenance">
            <DialogHeader>
              <DialogTitle>Log maintenance</DialogTitle>
              <DialogDescription>Create a work item for follow-up and tracking.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-unit">
                  Unit
                </label>
                <Input id="qa-unit" placeholder="Example: 12B" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-issue">
                  Issue summary
                </label>
                <Input id="qa-issue" placeholder="Example: Water heater leak" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-notes">
                  Notes
                </label>
                <Textarea id="qa-notes" placeholder="Add access instructions, photos, or contractor notes" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(null)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={() => {
                setBusy(true);
                window.setTimeout(() => {
                  setBusy(false);
                  setOpen(null);
                  toast("Maintenance request created");
                }, 700);
              }}
                disabled={busy}
                data-usecases="UC_127"
              >
                {busy ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={open === "notify"} onOpenChange={(v) => setOpen(v ? "notify" : null)}>
          <DialogContent aria-label="Send notification">
            <DialogHeader>
              <DialogTitle>Send notification</DialogTitle>
              <DialogDescription>Send a message to a tenant, owner, or internal teammate.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-to">
                  To
                </label>
                <Input id="qa-to" placeholder="Recipient email or name" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="qa-message">
                  Message
                </label>
                <Textarea id="qa-message" placeholder="Write your message" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(null)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={() => {
                setBusy(true);
                window.setTimeout(() => {
                  setBusy(false);
                  setOpen(null);
                  toast("Notification queued");
                }, 700);
              }}
                disabled={busy}
                data-usecases="UC_113"
              >
                {busy ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
