import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/appStore";

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { actions } = useAppStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]" data-usecases="UC_134">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Theme and display preferences.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">Dark mode</div>
              <div className="text-xs text-muted-foreground">Toggle between light and dark.</div>
            </div>
            <Button variant="outline" onClick={actions.toggleDarkMode} data-usecases="UC_134">
              Toggle
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
