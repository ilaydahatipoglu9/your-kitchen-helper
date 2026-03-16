import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePreferencesDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [favoriteQuery, setFavoriteQuery] = useState("");

  const favorites = useMemo(
    () => [
      { id: "t1", label: "Seabrook FC", kind: "Team" },
      { id: "t2", label: "Bay City Sharks", kind: "Team" },
      { id: "l1", label: "Premier League", kind: "League" },
      { id: "p1", label: "Jordan D.", kind: "Player" },
    ],
    [],
  );

  const filtered = favorites.filter((f) => f.label.toLowerCase().includes(favoriteQuery.toLowerCase()));

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) {
          setLoading(true);
          window.setTimeout(() => setLoading(false), 450);
        }
      }}
    >
      <DialogContent className="max-w-2xl" aria-label="Profile and preferences">
        <DialogHeader>
          <DialogTitle>Profile & Preferences</DialogTitle>
          <DialogDescription>Manage favorites and notification settings for your dashboard.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="favorites">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="space-y-4" data-usecases="UC_269">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your favorites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <Input
                      value={favoriteQuery}
                      onChange={(e) => setFavoriteQuery(e.target.value)}
                      placeholder="Search favorites…"
                      aria-label="Search favorites"
                    />
                  </div>
                  <Button variant="outline" onClick={() => setFavoriteQuery("")}>Clear</Button>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 rounded-md border p-3">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                    No favorites match your search.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filtered.map((f) => (
                      <label key={f.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox defaultChecked aria-label={`Favorite ${f.label}`} />
                          <div>
                            <div className="text-sm font-medium">{f.label}</div>
                            <div className="text-xs text-muted-foreground">{f.kind}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Unfollow
                        </Button>
                      </label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4" data-usecases="UC_269">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Notification preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: "live", title: "Live score updates", desc: "Gentle score changes for your favorites.", defaultChecked: true },
                  { key: "start", title: "Match start reminders", desc: "Get notified shortly before kickoff/tip-off.", defaultChecked: true },
                  { key: "news", title: "Breaking news", desc: "Important headlines related to your favorites.", defaultChecked: false },
                ].map((p) => (
                  <div key={p.key} className="flex items-start justify-between gap-3 rounded-md border p-3">
                    <div>
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.desc}</div>
                    </div>
                    <Switch defaultChecked={p.defaultChecked} aria-label={`Toggle ${p.title}`} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => onOpenChange(false)}>Save</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
