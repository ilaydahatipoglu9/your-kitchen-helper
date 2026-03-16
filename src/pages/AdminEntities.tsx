import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type EntityRow = {
  id: string;
  name: string;
  status: "active" | "archived";
  updatedAt: string;
};

export default function AdminEntities() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const rows = useMemo<EntityRow[]>(
    () => [
      { id: "1", name: "Teams", status: "active", updatedAt: "2026-03-14" },
      { id: "2", name: "Leagues", status: "active", updatedAt: "2026-03-12" },
      { id: "3", name: "Players", status: "archived", updatedAt: "2026-02-28" },
    ],
    [],
  );

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-maritime-soft pb-20">
      <div className="container max-w-[1200px] px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Entity Management</CardTitle>
            <CardDescription>Manage application entities using a generic CRUD interface.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search entities…"
                    aria-label="Search entities"
                    className="pl-9"
                    data-usecases="UC_268"
                  />
                </div>
                <Button variant="outline" onClick={() => setFilterOpen(true)} data-usecases="UC_268">
                  <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden />
                  Filter
                </Button>
              </div>

              <Button onClick={() => setCreateOpen(true)} data-usecases="UC_268">
                <Plus className="mr-2 h-4 w-4" aria-hidden />
                New record
              </Button>
            </div>

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
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="capitalize">{r.status}</TableCell>
                    <TableCell>{r.updatedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button variant="outline" size="sm" data-usecases="UC_268">
                          <Pencil className="mr-2 h-4 w-4" aria-hidden />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(r.id)}
                          data-usecases="UC_268"
                        >
                          <Trash2 className="mr-2 h-4 w-4" aria-hidden />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create record</DialogTitle>
            <DialogDescription>Create a new entity record (placeholder form).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Name</div>
              <Input placeholder="e.g., Teams" data-usecases="UC_268" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Status</div>
              <Input placeholder="active" data-usecases="UC_268" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCreateOpen(false)} data-usecases="UC_268">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter modal */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription>Filter entity list (placeholder).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Status</div>
              <Input placeholder="active | archived" data-usecases="UC_268" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setFilterOpen(false)} data-usecases="UC_268">
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete modal */}
      <Dialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete record</DialogTitle>
            <DialogDescription>This action is irreversible (placeholder).</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteId(null)} data-usecases="UC_268">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
