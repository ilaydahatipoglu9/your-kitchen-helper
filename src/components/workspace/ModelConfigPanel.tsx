import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeyRound, Save, SlidersHorizontal } from "lucide-react";

export type ModelConfig = {
  id: string;
  name: string;
  provider: string;
  version: string;
  status: "online" | "degraded" | "offline";
};

export type ModelParams = {
  temperature: number;
  topP: number;
  maxTokens: number;
};

export type ModelProfile = {
  id: string;
  name: string;
  params: ModelParams;
};

export default function ModelConfigPanel({
  models,
  selectedModelIds,
  onToggleModel,
  params,
  onParamsChange,
  profiles,
  onSaveProfile,
  onLoadProfile,
}: {
  models: ModelConfig[];
  selectedModelIds: string[];
  onToggleModel: (id: string) => void;
  params: ModelParams;
  onParamsChange: (next: ModelParams) => void;
  profiles: ModelProfile[];
  onSaveProfile: (profile: ModelProfile) => void;
  onLoadProfile: (profileId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [profileName, setProfileName] = useState("");
  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const providers = useMemo(() => {
    const unique = Array.from(new Set(models.map((m) => m.provider)));
    return unique.sort();
  }, [models]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter((m) => {
      const matchesQ = !q || `${m.name} ${m.provider} ${m.version}`.toLowerCase().includes(q);
      const matchesProvider = providerFilter === "all" || m.provider === providerFilter;
      return matchesQ && matchesProvider;
    });
  }, [models, query, providerFilter]);

  return (
    <Card className="border-border/70 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Model & Configuration</CardTitle>
        <div className="text-xs text-muted-foreground">Select LLMs, tune parameters, and manage profiles.</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="model-search">
            Search models or profiles
          </Label>
          <div data-usecases="UC_108" className="space-y-2">
            <Input
              id="model-search"
              placeholder="Search LLMs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search LLMs"
            />
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger aria-label="Filter by provider">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All providers</SelectItem>
                {providers.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium">Select LLMs</div>
            <Badge variant="secondary" className="text-[11px]">
              {selectedModelIds.length} selected
            </Badge>
          </div>

          <div data-usecases="UC_108" className="max-h-[280px] space-y-2 overflow-auto rounded-md border p-2">
            {filtered.length === 0 ? (
              <div className="p-2 text-xs text-muted-foreground">No models match your search.</div>
            ) : (
              filtered.map((m) => {
                const checked = selectedModelIds.includes(m.id);
                return (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-2 hover:bg-muted/60"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggleModel(m.id)}
                      aria-label={`Select ${m.name}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-sm font-medium">{m.name}</div>
                        <Badge
                          variant={m.status === "online" ? "secondary" : m.status === "degraded" ? "outline" : "destructive"}
                          className="text-[10px]"
                        >
                          {m.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.provider} • {m.version}
                      </div>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                data-usecases="UC_109"
                variant="secondary"
                className="justify-start gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Adjust parameters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-[560px] px-4">
                <DrawerHeader>
                  <DrawerTitle>Parameters</DrawerTitle>
                  <DrawerDescription>
                    Tune evaluation parameters. Changes apply to the next run.
                  </DrawerDescription>
                </DrawerHeader>

                <div data-usecases="UC_109" className="space-y-5 pb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temperature">Temperature</Label>
                      <span className="text-xs text-muted-foreground">{params.temperature.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="temperature"
                      value={[params.temperature]}
                      onValueChange={(v) => onParamsChange({ ...params, temperature: v[0] })}
                      max={1}
                      step={0.05}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="topP">Top-p</Label>
                      <span className="text-xs text-muted-foreground">{params.topP.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="topP"
                      value={[params.topP]}
                      onValueChange={(v) => onParamsChange({ ...params, topP: v[0] })}
                      max={1}
                      step={0.05}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maxTokens">Max tokens</Label>
                      <span className="text-xs text-muted-foreground">{params.maxTokens}</span>
                    </div>
                    <Slider
                      id="maxTokens"
                      value={[params.maxTokens]}
                      onValueChange={(v) => onParamsChange({ ...params, maxTokens: Math.round(v[0]) })}
                      min={64}
                      max={2048}
                      step={64}
                    />
                  </div>
                </div>

                <DrawerFooter>
                  <Button variant="secondary">Done</Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <Dialog>
            <DialogTrigger asChild>
              <Button data-usecases="UC_110" variant="outline" className="justify-start gap-2">
                <Save className="h-4 w-4" aria-hidden="true" />
                Save as profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save configuration profile</DialogTitle>
                <DialogDescription>
                  Store the current parameters as a reusable profile.
                </DialogDescription>
              </DialogHeader>

              <div data-usecases="UC_110" className="space-y-2">
                <Label htmlFor="profileName">Profile name</Label>
                <Input
                  id="profileName"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="e.g., Balanced, Creative, Strict JSON"
                />
                <div className="text-xs text-muted-foreground">
                  Temperature {params.temperature.toFixed(2)} • Top-p {params.topP.toFixed(2)} • Max tokens {params.maxTokens}
                </div>
              </div>

              <DialogFooter>
                <Button
                  data-usecases="UC_110"
                  onClick={() => {
                    const name = profileName.trim() || `Profile ${profiles.length + 1}`;
                    onSaveProfile({
                      id: `profile_${Math.random().toString(16).slice(2)}`,
                      name,
                      params,
                    });
                    setProfileName("");
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium">Load profile</div>
          <Select onValueChange={onLoadProfile}>
            <SelectTrigger aria-label="Load configuration profile">
              <SelectValue placeholder="Choose a profile" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={apiKeyOpen} onOpenChange={setApiKeyOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 text-xs">
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              Manage API keys (masked)
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API key</DialogTitle>
              <DialogDescription>
                Keys are never displayed in plain text. This demo stores values only in memory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="apiKey">Enter key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="••••••••••••••••"
                aria-label="API key"
              />
              <div className="text-xs text-muted-foreground">
                Stored: {apiKey ? "••••••••••" : "(none)"}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setApiKeyOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
