import React from "react";
import { Search } from "lucide-react";

import { AdminLayout } from "@/pages/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AuditRow = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  at: string;
  details: string;
};

const seed: AuditRow[] = [
  { id: "a1", actor: "admin@maritime.dev", action: "CONFIG_UPDATE", entity: "Security.enableSharing", at: "2026-02-10 14:22", details: "enableSharing: true → false" },
  { id: "a2", actor: "demo@maritime.dev", action: "FILE_UPLOAD", entity: "Projects/Logo.png", at: "2026-02-12 09:10", details: "Uploaded 1 file" },
  { id: "a3", actor: "demo@maritime.dev", action: "FOLDER_CREATE", entity: "Documents/Receipts", at: "2026-02-13 18:03", details: "Created folder" },
];

export default function AdminAuditLogsPage() {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "security" | "files">("all");
  const [open, setOpen] = React.useState<AuditRow | null>(null);

  const rows = React.useMemo(() => {
    return seed.filter((r) => {
      const qok = q.trim() ? (r.actor + r.action + r.entity + r.details).toLowerCase().includes(q.trim().toLowerCase()) : true;
      const fok =
        filter === "all"
          ? true
          : filter === "security"
            ? r.action.includes("CONFIG")
            : r.action.includes("FILE") || r.action.includes("FOLDER");
      return qok && fok;
    });
  }, [q, filter]);

  return (
    <AdminLayout title="Audit logs">
      <div className="rounded-lg border bg-background/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold" data-usecases="[UC_021],[UC_115]">Search and review audit events</h2>
            <p className="text-sm text-muted-foreground">Filter by category and open entries for details.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72" data-usecases="[UC_115]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search logs" className="pl-9" />
            </div>

            <div className="flex items-center gap-2" data-usecases="[UC_115]">
              <Label className="text-xs text-muted-foreground">Filter</Label>
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                aria-label="Filter logs"
              >
                <option value="all">All</option>
                <option value="security">Security</option>
                <option value="files">Files</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.actor}</TableCell>
                  <TableCell>{r.action}</TableCell>
                  <TableCell className="truncate max-w-[420px]">{r.entity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.at}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setOpen(r)} data-usecases="[UC_021]">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent data-usecases="[UC_021]">
          <DialogHeader>
            <DialogTitle>Audit entry</DialogTitle>
            <DialogDescription>Full details for the selected event.</DialogDescription>
          </DialogHeader>
          {open ? (
            <div className="grid gap-2 text-sm">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Actor</p>
                <p className="font-medium">{open.actor}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Action</p>
                <p className="font-medium">{open.action}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Entity</p>
                <p className="font-medium">{open.entity}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Details</p>
                <p className="font-medium">{open.details}</p>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
