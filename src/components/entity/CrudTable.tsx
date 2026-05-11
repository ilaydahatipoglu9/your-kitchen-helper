import * as React from "react";
import { MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type CrudRow = {
  id: string;
  primary: string;
  secondary?: string;
  status?: string;
};

export function CrudTable({
  title,
  rows,
  createLabel,
}: {
  title: string;
  rows: CrudRow[];
  createLabel: string;
}) {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "active" | "inactive">("all");
  const [drawer, setDrawer] = React.useState<{ mode: "create" | "edit"; row?: CrudRow } | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<CrudRow | null>(null);

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQuery = !q || r.primary.toLowerCase().includes(q) || (r.secondary ?? "").toLowerCase().includes(q);
      const matchesFilter =
        filter === "all" ? true : filter === "active" ? r.status !== "Inactive" : r.status === "Inactive";
      return matchesQuery && matchesFilter;
    });
  }, [rows, query, filter]);

  return (
    <Card className="bg-card/60 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base">{title}</CardTitle>
          <Button onClick={() => setDrawer({ mode: "create" })} data-usecases="UC_127">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {createLabel}
          </Button>
        </div>

        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="pl-9"
              data-usecases="UC_127"
              aria-label="Search"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setFilter((f) => (f === "all" ? "active" : f === "active" ? "inactive" : "all"))}
            className="justify-start"
            data-usecases="UC_127"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filter: {filter}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {visible.length === 0 ? (
          <div className="rounded-md border bg-background/50 p-6 text-sm">
            <div className="font-medium">No results</div>
            <div className="mt-1 text-xs text-muted-foreground">Try adjusting your search or filters.</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.primary}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{r.secondary}</TableCell>
                  <TableCell className="hidden lg:table-cell">{r.status ?? ""}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Row actions">
                          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => alert(`Open ${r.primary}`)}
                          data-usecases="UC_127"
                        >
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setDrawer({ mode: "edit", row: r })}
                          data-usecases="UC_127"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => setConfirmDelete(r)}
                          data-usecases="UC_127"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Sheet open={!!drawer} onOpenChange={(v) => setDrawer(v ? drawer : null)}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{drawer?.mode === "create" ? createLabel : `Edit ${drawer?.row?.primary ?? ""}`}</SheetTitle>
              <SheetDescription>Form fields are representative for UI scaffolding.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="crud-name">
                  Name
                </label>
                <Input id="crud-name" defaultValue={drawer?.row?.primary ?? ""} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="crud-details">
                  Details
                </label>
                <Input id="crud-details" defaultValue={drawer?.row?.secondary ?? ""} />
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setDrawer(null)}>
                Cancel
              </Button>
              <Button onClick={() => setDrawer(null)} data-usecases="UC_127">
                Save
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Dialog open={!!confirmDelete} onOpenChange={(v) => setConfirmDelete(v ? confirmDelete : null)}>
          <DialogContent aria-label="Confirm delete">
            <DialogHeader>
              <DialogTitle>Delete record</DialogTitle>
              <DialogDescription>
                This will remove <span className="font-medium">{confirmDelete?.primary}</span> from the table.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setConfirmDelete(null)} data-usecases="UC_127">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
