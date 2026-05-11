import * as React from "react";
import { FileDown, Search, SlidersHorizontal } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AuditEvent = {
  id: string;
  ts: string;
  actor: string;
  action: string;
  resource: string;
  severity: "Info" | "Warning" | "Critical";
};

export default function AuditPage() {
  const [q, setQ] = React.useState("");
  const [sev, setSev] = React.useState<"all" | AuditEvent["severity"]>("all");
  const [reportOpen, setReportOpen] = React.useState(false);

  const events: AuditEvent[] = [
    { id: "e1", ts: "2026-05-10 09:12", actor: "Manager", action: "Updated lease", resource: "Lease L-1022", severity: "Info" },
    { id: "e2", ts: "2026-05-09 15:44", actor: "System", action: "Failed login", resource: "User owner@demo.com", severity: "Warning" },
    { id: "e3", ts: "2026-05-08 08:01", actor: "Admin", action: "Adjusted transaction", resource: "Txn T-8831", severity: "Critical" },
  ];

  const visible = events.filter((e) => {
    const matchesQ = !q.trim() || `${e.actor} ${e.action} ${e.resource}`.toLowerCase().includes(q.trim().toLowerCase());
    const matchesS = sev === "all" ? true : e.severity === sev;
    return matchesQ && matchesS;
  });

  return (
    <AppShell title="Audit">
      <div className="grid gap-4">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-base">Audit log</CardTitle>
              <Button onClick={() => setReportOpen(true)} data-usecases="UC_018">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Generate report
              </Button>
            </div>
            <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search audits"
                  className="pl-9"
                  data-usecases="UC_071,UC_118"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setSev((s) => (s === "all" ? "Info" : s === "Info" ? "Warning" : s === "Warning" ? "Critical" : "all"))}
                data-usecases="UC_071,UC_118"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters: {sev}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {visible.length === 0 ? (
              <div className="rounded-md border bg-background/50 p-6 text-sm">
                <div className="font-medium">No audit events</div>
                <div className="mt-1 text-xs text-muted-foreground">Adjust your query or filters.</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="hidden md:table-cell">Resource</TableHead>
                    <TableHead className="w-28" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{e.ts}</TableCell>
                      <TableCell>{e.actor}</TableCell>
                      <TableCell className="font-medium">{e.action}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{e.resource}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => alert(`View event ${e.id}`)} data-usecases="UC_018">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent aria-label="Generate audit report">
            <DialogHeader>
              <DialogTitle>Generate report</DialogTitle>
              <DialogDescription>Export a filtered view for compliance review.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="rep-name">
                  Report name
                </label>
                <Input id="rep-name" placeholder="Example: Q2 audit export" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="rep-range">
                  Date range
                </label>
                <Input id="rep-range" placeholder="Example: 2026-01-01 to 2026-03-31" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReportOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setReportOpen(false)} data-usecases="UC_018">
                Generate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
