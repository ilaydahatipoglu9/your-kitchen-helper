import { useMemo, useState } from "react";
import { Download, Filter, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type ReportRow = {
  id: string;
  name: string;
  updatedAt: string;
  owner: string;
};

export default function Analytics() {
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reports = useMemo<ReportRow[]>(
    () => [
      { id: "r1", name: "Daily Active Fans", updatedAt: "2026-03-15", owner: "Analyst" },
      { id: "r2", name: "Top Leagues by Engagement", updatedAt: "2026-03-10", owner: "Analyst" },
      { id: "r3", name: "Notification Opt-in Rates", updatedAt: "2026-03-02", owner: "Ops" },
    ],
    [],
  );

  const filtered = reports.filter((r) => (r.name + r.owner).toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-maritime-soft pb-20">
      <div className="container max-w-[1200px] px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">Explore KPIs, build ad-hoc reports, and export insights.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => setNewOpen(true)} data-usecases="UC_250,UC_251">
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              New ad-hoc report
            </Button>
            <Button variant="outline" onClick={() => setFilterOpen(true)} data-usecases="UC_250,UC_251">
              <Filter className="mr-2 h-4 w-4" aria-hidden />
              Filter
            </Button>
            <Button variant="outline" data-usecases="UC_252">
              <Download className="mr-2 h-4 w-4" aria-hidden />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saved reports</CardTitle>
            <CardDescription>Search and manage your saved dashboards and reports.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                placeholder="Search saved reports…"
                aria-label="Search saved reports"
                data-usecases="UC_250,UC_251"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.owner}</TableCell>
                    <TableCell>{r.updatedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button variant="outline" size="sm" data-usecases="UC_250,UC_251">
                          Open
                        </Button>
                        <Button variant="outline" size="sm" data-usecases="UC_250,UC_251">
                          Save changes
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setDeleteId(r.id)} data-usecases="UC_250,UC_251">
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

      {/* New report drawer (sheet) */}
      <Sheet open={newOpen} onOpenChange={setNewOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>New ad-hoc report</SheetTitle>
            <SheetDescription>Define a query and visualization details (placeholder).</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-2 text-sm font-medium">Report name</div>
              <Input placeholder="e.g., Weekly Engagement" data-usecases="UC_251" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Dataset filter</div>
              <Input placeholder="time:last_7_days" data-usecases="UC_250,UC_251" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Query / Notes</div>
              <Textarea placeholder="Describe the metrics, dimensions, and aggregation…" data-usecases="UC_251" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewOpen(false)} data-usecases="UC_251">
                Create
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter dataset</DialogTitle>
            <DialogDescription>Time, entity, and segment filters (placeholder).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Time range</div>
              <Input placeholder="last_30_days" data-usecases="UC_250,UC_251" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">Entity</div>
              <Input placeholder="team:Seabrook FC" data-usecases="UC_250,UC_251" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setFilterOpen(false)} data-usecases="UC_250,UC_251">
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete saved report</DialogTitle>
            <DialogDescription>This will remove the report from your saved list (placeholder).</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteId(null)} data-usecases="UC_250,UC_251">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
