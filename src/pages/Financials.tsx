import * as React from "react";
import { FileText, Search, SlidersHorizontal } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Doc = { id: string; name: string; period: string; type: "Statement" | "Tax"; updated: string };

export default function FinancialsPage() {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "Statement" | "Tax">("all");

  const docs: Doc[] = [
    { id: "d1", name: "Monthly Statement", period: "2026-04", type: "Statement", updated: "2026-05-03" },
    { id: "d2", name: "Form 1099", period: "2025", type: "Tax", updated: "2026-01-31" },
    { id: "d3", name: "Monthly Statement", period: "2026-03", type: "Statement", updated: "2026-04-03" },
  ];

  const visible = docs.filter((d) => {
    const matchesQ = !q.trim() || `${d.name} ${d.period}`.toLowerCase().includes(q.trim().toLowerCase());
    const matchesFilter = filter === "all" ? true : d.type === filter;
    return matchesQ && matchesFilter;
  });

  return (
    <AppShell title="Financials">
      <div className="grid gap-4">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Owner documents</CardTitle>
            <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search documents"
                  className="pl-9"
                  data-usecases="UC_096"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setFilter((f) => (f === "all" ? "Statement" : f === "Statement" ? "Tax" : "all"))}
                data-usecases="UC_096"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filter: {filter}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {visible.length === 0 ? (
              <div className="rounded-md border bg-background/50 p-6 text-sm">
                <div className="font-medium">No documents found</div>
                <div className="mt-1 text-xs text-muted-foreground">Try a different search or filter.</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="hidden md:table-cell">Updated</TableHead>
                    <TableHead className="w-28" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.period}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{d.updated}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Open document ${d.id}`)}
                          data-usecases="UC_096"
                        >
                          <FileText className="h-4 w-4" aria-hidden="true" />
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
