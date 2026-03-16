import { useMemo, useState } from "react";
import { BookOpen, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Endpoint = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  tag: string;
  summary: string;
};

export default function ApiDocs() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const endpoints = useMemo<Endpoint[]>(
    () => [
      { id: "e1", method: "GET", path: "/api/v1/teams", tag: "Teams", summary: "List teams" },
      { id: "e2", method: "GET", path: "/api/v1/matches/live", tag: "Matches", summary: "Live matches" },
      { id: "e3", method: "POST", path: "/api/v1/auth/signin", tag: "Auth", summary: "Sign in" },
      { id: "e4", method: "GET", path: "/api/v1/news", tag: "News", summary: "Personalized news feed" },
    ],
    [],
  );

  const tags = Array.from(new Set(endpoints.map((e) => e.tag)));

  const filtered = endpoints.filter((e) => {
    const q = query.toLowerCase();
    const matchesQ = (e.path + e.summary + e.tag + e.method).toLowerCase().includes(q);
    const matchesTag = tag ? e.tag === tag : true;
    return matchesQ && matchesTag;
  });

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-maritime-soft pb-20">
      <div className="container max-w-[1200px] px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden />
              <h1 className="text-2xl font-semibold">API Documentation</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Browse endpoints and search schemas (placeholder).</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>Search and filter by tag/service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  placeholder="Search documentation…"
                  aria-label="Search documentation"
                  data-usecases="UC_045"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Tag className="h-4 w-4" aria-hidden />
                  <span>Tags</span>
                </div>
                <Button variant={tag === null ? "default" : "outline"} size="sm" onClick={() => setTag(null)} data-usecases="UC_045">
                  All
                </Button>
                {tags.map((t) => (
                  <Button
                    key={t}
                    variant={tag === t ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTag(t)}
                    data-usecases="UC_045"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            <div className="divide-y rounded-md border bg-background">
              {filtered.map((e) => (
                <div key={e.id} className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={e.method === "GET" ? "secondary" : e.method === "POST" ? "default" : "outline"}>
                        {e.method}
                      </Badge>
                      <code className="rounded bg-muted px-2 py-0.5 text-sm">{e.path}</code>
                      <Badge variant="outline">{e.tag}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{e.summary}</div>
                  </div>
                  <Button variant="outline" size="sm" data-usecases="UC_045">
                    Open
                  </Button>
                </div>
              ))}
              {filtered.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">No endpoints match your search/filter.</div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
