import React from "react";
import { Plus, Search, Trash2 } from "lucide-react";

import { AdminLayout } from "@/pages/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

type EntityRow = {
  id: string;
  name: string;
  status: "active" | "archived";
  updatedAt: string;
};

const seed: EntityRow[] = [
  { id: "e1", name: "Example record", status: "active", updatedAt: "2026-02-12" },
  { id: "e2", name: "Old record", status: "archived", updatedAt: "2026-01-30" },
];

export default function AdminEntitiesPage() {
  const { toast } = useToast();

  const [rows, setRows] = React.useState<EntityRow[]>(seed);
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"all" | EntityRow["status"]>("all");

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<EntityRow | null>(null);
  const [editTargetId, setEditTargetId] = React.useState<string | null>(null);

  const [draft, setDraft] = React.useState<{ name: string; status: EntityRow["status"] }>({ name: "", status: "active" });

  const visible = React.useMemo(() => {
    return rows.filter((r) => {
      const qok = q.trim() ? r.name.toLowerCase().includes(q.trim().toLowerCase()) : true;
      const sok = status === "all" ? true : r.status === status;
      return qok && sok;
    });
  }, [rows, q, status]);

  return (
    <AdminLayout title="Entities">
      <div className="rounded-lg border bg-background/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold" data-usecases="[UC_137]">Table CRUD</h2>
            <p className="text-sm text-muted-foreground">Generic admin scaffolding: browse, create, edit, delete (demo).</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72" data-usecases="[UC_137]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search records" className="pl-9" />
            </div>

            <div className="flex items-center gap-2" data-usecases="[UC_137]">
              <Label className="text-xs text-muted-foreground">Status</Label>
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                aria-label="Filter records"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Button
              onClick={() => {
                setDraft({ name: "", status: "active" });
                setCreateOpen(true);
              }}
              data-usecases="[UC_137]"
            >
              <Plus /> Create
            </Button>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>
                    <span className={r.status === "active" ? "text-emerald-600" : "text-muted-foreground"}>{r.status}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDraft({ name: r.name, status: r.status });
                          setEditTargetId(r.id);
                          setEditOpen(true);
                        }}
                        data-usecases="[UC_137]"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteTarget(r)}
                        data-usecases="[UC_137]"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent data-usecases="[UC_137]">
          <DialogHeader>
            <DialogTitle>Create record</DialogTitle>
            <DialogDescription>Add a new entity (demo).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} placeholder="Record name" />
            <Label>Status</Label>
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={draft.status}
              onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as any }))}
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                const next: EntityRow = {
                  id: `e${Math.random().toString(16).slice(2)}`,
                  name: draft.name || "Untitled",
                  status: draft.status,
                  updatedAt: "Just now",
                };
                setRows((prev) => [next, ...prev]);
                toast({ title: "Created", description: "Record created (demo)." });
                setCreateOpen(false);
              }}
              data-usecases="[UC_137]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Drawer open={editOpen} onOpenChange={setEditOpen}>
        <DrawerContent data-usecases="[UC_137]">
          <DrawerHeader>
            <DrawerTitle>Edit record</DrawerTitle>
            <DrawerDescription>Update entity fields (demo).</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 px-4">
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
            <Label>Status</Label>
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={draft.status}
              onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as any }))}
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setRows((prev) =>
                  prev.map((r) =>
                    r.id === editTargetId
                      ? { ...r, name: draft.name || r.name, status: draft.status, updatedAt: "Just now" }
                      : r,
                  ),
                );
                toast({ title: "Saved", description: "Record updated (demo)." });
                setEditOpen(false);
                setEditTargetId(null);
              }}
              data-usecases="[UC_137]"
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Delete */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent data-usecases="[UC_137]">
          <DialogHeader>
            <DialogTitle>Delete record?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!deleteTarget) return;
                setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
                toast({ title: "Deleted", description: "Record deleted (demo)." });
                setDeleteTarget(null);
              }}
              data-usecases="[UC_137]"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
