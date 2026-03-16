import React from "react";
import { History, Search } from "lucide-react";

import { AdminLayout } from "@/pages/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type ConfigRow = {
  id: string;
  group: string;
  key: string;
  type: "string" | "number" | "boolean";
  value: string | number | boolean;
  updatedAt: string;
};

const seed: ConfigRow[] = [
  { id: "c1", group: "Storage", key: "maxUploadMb", type: "number", value: 250, updatedAt: "2026-02-12" },
  { id: "c2", group: "Security", key: "enableSharing", type: "boolean", value: true, updatedAt: "2026-02-10" },
  { id: "c3", group: "UI", key: "defaultView", type: "string", value: "list", updatedAt: "2026-02-01" },
];

export default function AdminConfigurationsPage() {
  const { toast } = useToast();

  const [q, setQ] = React.useState("");
  const [group, setGroup] = React.useState<string | "all">("all");

  const [rows, setRows] = React.useState<ConfigRow[]>(seed);
  const [editing, setEditing] = React.useState<ConfigRow | null>(null);
  const [revertOpen, setRevertOpen] = React.useState(false);

  const visible = React.useMemo(() => {
    return rows.filter((r) => {
      const qok = q.trim() ? (r.key + String(r.value) + r.group).toLowerCase().includes(q.trim().toLowerCase()) : true;
      const gok = group === "all" ? true : r.group === group;
      return qok && gok;
    });
  }, [rows, q, group]);

  const groups = React.useMemo(() => Array.from(new Set(rows.map((r) => r.group))), [rows]);

  return (
    <AdminLayout title="Configurations">
      <div className="rounded-lg border bg-background/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold" data-usecases="[UC_122]">Browse configurations</h2>
            <p className="text-sm text-muted-foreground">Search, filter, and edit values. Changes are demo-only.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72" data-usecases="[UC_125]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search settings" className="pl-9" />
            </div>

            <div className="flex items-center gap-2" data-usecases="[UC_126]">
              <Label className="text-xs text-muted-foreground">Group</Label>
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={group}
                onChange={(e) => setGroup(e.target.value as any)}
                aria-label="Filter by group"
              >
                <option value="all">All</option>
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.group}</TableCell>
                  <TableCell className="font-medium">{r.key}</TableCell>
                  <TableCell>
                    {r.type === "boolean" ? (
                      <div className="flex items-center gap-2" data-usecases="[UC_123]">
                        <Switch
                          checked={Boolean(r.value)}
                          onCheckedChange={(v) =>
                            setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, value: !!v, updatedAt: "Just now" } : x)))
                          }
                          data-usecases="[UC_123]"
                        />
                        <span className="text-sm text-muted-foreground">{String(r.value)}</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="rounded-sm px-2 py-1 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => setEditing(r)}
                        data-usecases="[UC_123]"
                      >
                        {String(r.value)}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({ title: "History", description: "History drawer would open (demo)." });
                        }}
                        data-usecases="[UC_130]"
                      >
                        <History className="mr-2 h-4 w-4" /> History
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setRevertOpen(true);
                        }}
                        data-usecases="[UC_129]"
                      >
                        Revert
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Inline edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent data-usecases="[UC_123]">
          <DialogHeader>
            <DialogTitle>Edit value</DialogTitle>
            <DialogDescription>Update configuration value with validation (demo).</DialogDescription>
          </DialogHeader>
          {editing ? (
            <div className="grid gap-2">
              <Label>Key</Label>
              <Input value={editing.key} readOnly />
              <Label>Value</Label>
              <Input
                value={String(editing.value)}
                onChange={(e) => setEditing({ ...editing, value: editing.type === "number" ? Number(e.target.value) : e.target.value })}
              />
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!editing) return;
                setRows((prev) => prev.map((x) => (x.id === editing.id ? { ...editing, updatedAt: "Just now" } : x)));
                toast({ title: "Saved", description: "Configuration updated (demo)." });
                setEditing(null);
              }}
              data-usecases="[UC_123]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revert dialog */}
      <Dialog open={revertOpen} onOpenChange={setRevertOpen}>
        <DialogContent data-usecases="[UC_129]">
          <DialogHeader>
            <DialogTitle>Revert to previous version?</DialogTitle>
            <DialogDescription>Restores a previous value from audit history (demo).</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setRevertOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Reverted", description: "Configuration reverted (demo)." });
                setRevertOpen(false);
              }}
              data-usecases="[UC_129]"
            >
              Revert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
