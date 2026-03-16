import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Download,
  Filter,
  Folder,
  FolderPlus,
  Grid2X2,
  List,
  LogOut,
  MoveRight,
  Search,
  Settings,
  Trash2,
  Upload,
  Copy,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/state/auth";

type FolderNode = {
  id: string;
  name: string;
  meta?: { updatedAt: string; sizeLabel: string };
  children?: FolderNode[];
};

type Item = {
  id: string;
  type: "folder" | "file";
  name: string;
  sizeLabel?: string;
  updatedAt: string;
  fileType?: string;
};

const demoTree: FolderNode[] = [
  {
    id: "root",
    name: "My Drive",
    meta: { updatedAt: "Today", sizeLabel: "—" },
    children: [
      {
        id: "projects",
        name: "Projects",
        meta: { updatedAt: "2 days ago", sizeLabel: "1.3 GB" },
        children: [
          { id: "maritime", name: "Maritime Serenity", meta: { updatedAt: "Yesterday", sizeLabel: "420 MB" } },
          { id: "design", name: "Design", meta: { updatedAt: "1 week ago", sizeLabel: "210 MB" } },
        ],
      },
      { id: "docs", name: "Documents", meta: { updatedAt: "3 days ago", sizeLabel: "98 MB" } },
      { id: "photos", name: "Photos", meta: { updatedAt: "1 month ago", sizeLabel: "6.8 GB" } },
    ],
  },
];

function buildDemoContents(folderId: string): Item[] {
  const base: Item[] = [
    { id: "i1", type: "folder", name: "Invoices", updatedAt: "2026-02-12" },
    { id: "i2", type: "folder", name: "Specs", updatedAt: "2026-02-03" },
    { id: "i3", type: "file", name: "Quarterly-Report.pdf", sizeLabel: "2.4 MB", updatedAt: "2026-02-14", fileType: "PDF" },
    { id: "i4", type: "file", name: "Logo.png", sizeLabel: "640 KB", updatedAt: "2026-01-28", fileType: "PNG" },
    { id: "i5", type: "file", name: "Notes.txt", sizeLabel: "3 KB", updatedAt: "2026-02-11", fileType: "Text" },
  ];

  if (folderId === "photos") {
    return [
      { id: "p1", type: "file", name: "Harbor-Sunrise.jpg", sizeLabel: "4.1 MB", updatedAt: "2026-02-01", fileType: "JPG" },
      { id: "p2", type: "file", name: "Waves.mov", sizeLabel: "128 MB", updatedAt: "2026-01-10", fileType: "MOV" },
    ];
  }

  if (folderId === "docs") {
    return [
      { id: "d1", type: "file", name: "Resume.docx", sizeLabel: "58 KB", updatedAt: "2026-02-08", fileType: "DOCX" },
      { id: "d2", type: "file", name: "Travel-Itinerary.pdf", sizeLabel: "1.1 MB", updatedAt: "2026-01-30", fileType: "PDF" },
      { id: "d3", type: "folder", name: "Receipts", updatedAt: "2026-01-12" },
    ];
  }

  if (folderId === "maritime") {
    return [];
  }

  return base;
}

function Breadcrumbs({ path }: { path: string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
      {path.map((p, idx) => (
        <React.Fragment key={p}>
          <span className={idx === path.length - 1 ? "text-foreground font-medium" : ""}>{p}</span>
          {idx !== path.length - 1 && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
        </React.Fragment>
      ))}
    </nav>
  );
}

function FolderTreeNode({
  node,
  level,
  expanded,
  selectedId,
  onToggle,
  onSelect,
}: {
  node: FolderNode;
  level: number;
  expanded: Set<string>;
  selectedId: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div>
      <button
        type="button"
        className={
          "group flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
          (isSelected ? "bg-sky-500/10 text-foreground" : "hover:bg-muted")
        }
        style={{ paddingLeft: 8 + level * 12 }}
        onClick={() => onSelect(node.id)}
        data-usecases="[UC_051],[UC_052]"
      >
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground group-hover:text-foreground">
          <Folder className="h-4 w-4" />
        </span>
        <span className="flex-1">
          <span className="block truncate">{node.name}</span>
          {node.meta && <span className="mt-0.5 block text-xs text-muted-foreground">{node.meta.updatedAt} • {node.meta.sizeLabel}</span>}
        </span>
        {node.children?.length ? (
          <span
            className={
              "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground" +
              (isExpanded ? " rotate-90" : "")
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle(node.id);
            }}
            aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
            data-usecases="[UC_052]"
          >
            <ChevronRight className="h-4 w-4" />
          </span>
        ) : null}
      </button>

      {node.children?.length && isExpanded ? (
        <div className="mt-1">
          {node.children.map((c) => (
            <FolderTreeNode
              key={c.id}
              node={c}
              level={level + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function WorkspacePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sidebarWidth, setSidebarWidth] = React.useState(300);
  const [isResizing, setIsResizing] = React.useState(false);

  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set(["root", "projects"]));
  const [selectedFolderId, setSelectedFolderId] = React.useState("root");

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [multiSelect, setMultiSelect] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<"name" | "updatedAt">("name");

  const [selectedItemIds, setSelectedItemIds] = React.useState<Set<string>>(() => new Set());
  const [detailsOpen, setDetailsOpen] = React.useState(true);

  const [newFolderOpen, setNewFolderOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [moveOpen, setMoveOpen] = React.useState(false);
  const [copyOpen, setCopyOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const [density, setDensity] = React.useState<"compact" | "comfortable" | "spacious">("comfortable");
  const [themeDark, setThemeDark] = React.useState(false);
  const [notifPref, setNotifPref] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", themeDark);
  }, [themeDark]);

  const items = React.useMemo(() => {
    const all = buildDemoContents(selectedFolderId);
    const filtered = query.trim()
      ? all.filter((i) => i.name.toLowerCase().includes(query.trim().toLowerCase()))
      : all;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      return b.updatedAt.localeCompare(a.updatedAt);
    });

    return sorted;
  }, [selectedFolderId, query, sortKey]);

  const selectedItems = React.useMemo(() => {
    const set = selectedItemIds;
    return items.filter((i) => set.has(i.id));
  }, [items, selectedItemIds]);

  const canRowActions = selectedItems.length === 1;
  const canToolbarActions = selectedItems.length > 0;

  const rowPad = density === "compact" ? "py-2" : density === "spacious" ? "py-4" : "py-3";

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectFolder(id: string) {
    setSelectedFolderId(id);
    setSelectedItemIds(new Set());
  }

  function onMouseDownResizer() {
    setIsResizing(true);
  }

  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isResizing) return;
      const next = Math.min(420, Math.max(220, e.clientX));
      setSidebarWidth(next);
    }
    function onUp() {
      setIsResizing(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isResizing]);

  function toggleItem(id: string) {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (!multiSelect) {
        if (next.has(id) && next.size === 1) return new Set();
        return new Set([id]);
      }
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function signOutNow() {
    signOut();
    toast({ title: "Signed out" });
    navigate("/auth", { replace: true });
  }

  const breadcrumb = React.useMemo(() => {
    const map: Record<string, string[]> = {
      root: ["My Drive"],
      projects: ["My Drive", "Projects"],
      maritime: ["My Drive", "Projects", "Maritime Serenity"],
      design: ["My Drive", "Projects", "Design"],
      docs: ["My Drive", "Documents"],
      photos: ["My Drive", "Photos"],
    };
    return map[selectedFolderId] ?? ["My Drive"];
  }, [selectedFolderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        {/* Sidebar */}
        <aside
          role="navigation"
          aria-label="Folders"
          className="relative hidden shrink-0 border-r bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 md:block"
          style={{ width: sidebarWidth }}
        >
          <div className="flex h-14 items-center justify-between px-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Folders</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
              data-usecases="[UC_082]"
            >
              <Settings />
            </Button>
          </div>

          <div className="px-2 pb-2">
            {demoTree.map((n) => (
              <FolderTreeNode
                key={n.id}
                node={n}
                level={0}
                expanded={expanded}
                selectedId={selectedFolderId}
                onToggle={toggleExpanded}
                onSelect={selectFolder}
              />
            ))}

            <div className="mt-4 rounded-md border border-dashed p-3 text-xs text-muted-foreground" data-usecases="[UC_054]">
              Drag-and-drop is shown as an affordance in this demo.
            </div>
          </div>

          {/* Resizer */}
          <div
            role="separator"
            aria-orientation="vertical"
            tabIndex={0}
            onMouseDown={onMouseDownResizer}
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-sky-500/20 focus:bg-sky-500/20"
            data-usecases="[UC_055]"
          />
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Toolbar */}
          <header
            role="toolbar"
            aria-label="File actions"
            className="sticky top-0 z-10 border-b bg-background/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/50"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-col gap-1">
                <Breadcrumbs path={breadcrumb} />
                <p className="truncate text-lg font-semibold">{breadcrumb[breadcrumb.length - 1]}</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <div className="relative w-full sm:w-72" data-usecases="[UC_071]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                    placeholder="Search files and folders"
                    aria-label="Search"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={() => setNewFolderOpen(true)} data-usecases="[UC_064]">
                    <FolderPlus /> New Folder
                  </Button>
                  <Button variant="secondary" onClick={() => setUploadOpen(true)} data-usecases="[UC_064]">
                    <Upload /> Upload
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode((m) => (m === "grid" ? "list" : "grid"))}
                    aria-label="Toggle view"
                    data-usecases="[UC_058],[UC_077]"
                  >
                    {viewMode === "grid" ? <List /> : <Grid2X2 />}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setFiltersOpen(true)}
                    aria-label="Sort and filter"
                    data-usecases="[UC_060],[UC_075]"
                  >
                    <Filter />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDetailsOpen((o) => !o)}
                    aria-label="Toggle details pane"
                    data-usecases="[UC_070]"
                  >
                    <Info />
                  </Button>

                  <div className="hidden items-center gap-2 pl-2 sm:flex" data-usecases="[UC_059]">
                    <Switch checked={multiSelect} onCheckedChange={(v) => setMultiSelect(!!v)} id="multiselect" />
                    <Label htmlFor="multiselect" className="text-xs text-muted-foreground">Multi</Label>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => setDeleteOpen(true)}
                    disabled={!canToolbarActions}
                    data-usecases="[UC_065]"
                  >
                    <Trash2 /> Delete
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({ title: "Download", description: "Download started (demo)." });
                    }}
                    disabled={!canToolbarActions}
                    data-usecases="[UC_064]"
                  >
                    <Download /> Download
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={signOutNow}
                    aria-label="Sign out"
                    data-usecases="[UC_138]"
                  >
                    <LogOut />
                  </Button>

                  {user?.role === "admin" ? (
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/admin/configurations")}
                      className="hidden lg:inline-flex"
                    >
                      Admin
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div>
                {selectedItems.length ? (
                  <span data-usecases="[UC_062]">{selectedItems.length} selected</span>
                ) : (
                  <span>Nothing selected</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Density:</span>
                <Button variant={density === "compact" ? "secondary" : "ghost"} size="sm" onClick={() => setDensity("compact")}
                  data-usecases="[UC_079]"
                >
                  Compact
                </Button>
                <Button
                  variant={density === "comfortable" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setDensity("comfortable")}
                  data-usecases="[UC_079]"
                >
                  Comfortable
                </Button>
                <Button variant={density === "spacious" ? "secondary" : "ghost"} size="sm" onClick={() => setDensity("spacious")}
                  data-usecases="[UC_079]"
                >
                  Spacious
                </Button>
              </div>
            </div>
          </header>

          {/* Content + details */}
          <div className="flex min-h-0 flex-1">
            <main role="main" className="min-w-0 flex-1 p-4">
              {/* Loading placeholder */}
              <div className="sr-only" aria-live="polite" />

              {items.length === 0 ? (
                <Card className="border-dashed p-8">
                  <div className="mx-auto max-w-md text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-200">
                      <Folder className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold">No files here yet</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Upload files or create a new folder to get started.</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Button onClick={() => setUploadOpen(true)} data-usecases="[UC_064]">
                        <Upload /> Upload
                      </Button>
                      <Button variant="secondary" onClick={() => setNewFolderOpen(true)} data-usecases="[UC_064]">
                        <FolderPlus /> New Folder
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : viewMode === "list" ? (
                <div className="rounded-lg border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                  <Table data-usecases="[UC_058]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Size</TableHead>
                        <TableHead>Modified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => {
                        const selected = selectedItemIds.has(item.id);
                        return (
                          <TableRow key={item.id} data-state={selected ? "selected" : undefined}>
                            <TableCell className={"font-medium " + rowPad}>
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onClick={() => toggleItem(item.id)}
                                data-usecases="[UC_059]"
                              >
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-sky-500/10 text-sky-800 dark:text-sky-200">
                                  {item.type === "folder" ? <Folder className="h-4 w-4" /> : <span className="text-xs">{item.fileType ?? "FILE"}</span>}
                                </span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            </TableCell>
                            <TableCell className={"hidden sm:table-cell " + rowPad}>{item.type}</TableCell>
                            <TableCell className={"hidden md:table-cell " + rowPad}>{item.sizeLabel ?? "—"}</TableCell>
                            <TableCell className={rowPad}>{item.updatedAt}</TableCell>
                            <TableCell className={"text-right " + rowPad}>
                              <div className="inline-flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (item.type === "folder") selectFolder(item.id);
                                    else toast({ title: "Open", description: `Opened ${item.name} (demo).` });
                                  }}
                                  data-usecases="[UC_059]"
                                >
                                  Open
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={!canRowActions || !selected}
                                  onClick={() => toast({ title: "Rename", description: "Inline rename is a demo placeholder." })}
                                  data-usecases="[UC_059]"
                                >
                                  Rename
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-usecases="[UC_058]">
                  {items.map((item) => {
                    const selected = selectedItemIds.has(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={
                          "group rounded-lg border bg-background/70 p-4 text-left backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                          (selected ? "border-sky-500/40 bg-sky-500/10" : "hover:bg-muted")
                        }
                        data-usecases="[UC_059]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-sky-500/10 text-sky-800 dark:text-sky-200">
                            {item.type === "folder" ? <Folder className="h-5 w-5" /> : <span className="text-xs">{item.fileType ?? "FILE"}</span>}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.updatedAt}</span>
                        </div>
                        <div className="mt-3">
                          <p className="truncate font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.type === "file" ? item.sizeLabel : "Folder"}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Pagination placeholder */}
              <div className="mt-6 flex items-center justify-center text-xs text-muted-foreground" data-usecases="[UC_061]">
                Showing {items.length} items • Infinite scroll/pagination would load more.
              </div>
            </main>

            {/* Details pane */}
            {detailsOpen ? (
              <aside
                className="hidden w-[360px] shrink-0 border-l bg-background/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 lg:block"
                role="complementary"
                aria-label="Details"
                data-usecases="[UC_067],[UC_068],[UC_070]"
              >
                {selectedItems.length ? (
                  <div>
                    <p className="text-sm font-semibold">Details</p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{selectedItems[0].name}</p>

                    <div className="mt-4 grid gap-3">
                      <div className="rounded-md border p-3">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm font-medium">{selectedItems[0].type}</p>
                      </div>
                      <div className="rounded-md border p-3">
                        <p className="text-xs text-muted-foreground">Modified</p>
                        <p className="text-sm font-medium">{selectedItems[0].updatedAt}</p>
                      </div>
                      <div className="rounded-md border p-3">
                        <p className="text-xs text-muted-foreground">Size</p>
                        <p className="text-sm font-medium">{selectedItems[0].sizeLabel ?? "—"}</p>
                      </div>

                      <div className="rounded-md border border-dashed p-3">
                        <p className="text-xs text-muted-foreground">Preview</p>
                        <p className="mt-1 text-sm text-muted-foreground">Preview appears here for supported types (demo).</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2" data-usecases="[UC_069]">
                      <Button
                        variant="secondary"
                        onClick={() => toast({ title: "Preview", description: "Preview opened (demo)." })}
                        data-usecases="[UC_069]"
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast({ title: "Share", description: "Permissions drawer would open (demo)." })}
                        data-usecases="[UC_069]"
                      >
                        Share
                      </Button>
                      <Button variant="outline" onClick={() => setMoveOpen(true)} data-usecases="[UC_064]">
                        <MoveRight /> Move
                      </Button>
                      <Button variant="outline" onClick={() => setCopyOpen(true)} data-usecases="[UC_064]">
                        <Copy /> Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-sm font-semibold">Details pane</p>
                    <p className="mt-1 text-sm text-muted-foreground">Select an item to view metadata and preview.</p>
                  </div>
                )}
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {/* Dialogs/Drawers */}
      <Dialog open={newFolderOpen} onOpenChange={setNewFolderOpen}>
        <DialogContent data-usecases="[UC_064]">
          <DialogHeader>
            <DialogTitle>New folder</DialogTitle>
            <DialogDescription>Create a folder in the current directory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="nf">Folder name</Label>
            <Input id="nf" placeholder="Untitled folder" />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setNewFolderOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast({ title: "Folder created", description: "Created folder (demo)." });
                setNewFolderOpen(false);
              }}
              data-usecases="[UC_064]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent data-usecases="[UC_066]">
          <DialogHeader>
            <DialogTitle>Upload files</DialogTitle>
            <DialogDescription>Select files to upload.</DialogDescription>
          </DialogHeader>
          <Input type="file" multiple />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast({ title: "Upload started", description: "Progress shown in notifications (demo)." });
                setUploadOpen(false);
              }}
              data-usecases="[UC_066]"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent data-usecases="[UC_065]">
          <DialogHeader>
            <DialogTitle>Delete items?</DialogTitle>
            <DialogDescription>This action can’t be undone. {selectedItems.length} item(s) will be removed.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast({ title: "Deleted", description: "Items deleted (demo)." });
                setSelectedItemIds(new Set());
                setDeleteOpen(false);
              }}
              data-usecases="[UC_065]"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer open={moveOpen} onOpenChange={setMoveOpen}>
        <DrawerContent data-usecases="[UC_064]">
          <DrawerHeader>
            <DrawerTitle>Move</DrawerTitle>
            <DrawerDescription>Choose a destination folder (demo).</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Input placeholder="Destination path" />
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setMoveOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast({ title: "Moved", description: "Items moved (demo)." });
                setMoveOpen(false);
              }}
              data-usecases="[UC_064]"
            >
              Move items
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={copyOpen} onOpenChange={setCopyOpen}>
        <DrawerContent data-usecases="[UC_064]">
          <DrawerHeader>
            <DrawerTitle>Copy</DrawerTitle>
            <DrawerDescription>Choose a destination folder (demo).</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Input placeholder="Destination path" />
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setCopyOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast({ title: "Copied", description: "Items copied (demo)." });
                setCopyOpen(false);
              }}
              data-usecases="[UC_064]"
            >
              Copy items
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DrawerContent data-usecases="[UC_072],[UC_075]">
          <DrawerHeader>
            <DrawerTitle>Sort & Filters</DrawerTitle>
            <DrawerDescription>Refine what you see in this folder.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 px-4 pb-2">
            <div className="grid gap-2">
              <Label>Sort by</Label>
              <div className="flex gap-2">
                <Button variant={sortKey === "name" ? "secondary" : "outline"} onClick={() => setSortKey("name")} data-usecases="[UC_060]">
                  Name
                </Button>
                <Button variant={sortKey === "updatedAt" ? "secondary" : "outline"} onClick={() => setSortKey("updatedAt")} data-usecases="[UC_060]">
                  Modified
                </Button>
              </div>
            </div>
            <div className="rounded-md border p-3 text-sm text-muted-foreground" data-usecases="[UC_075]">
              Advanced filters (type/date/size) would be configured here.
            </div>
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setFiltersOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DrawerContent data-usecases="[UC_076],[UC_080],[UC_081]">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Personalize your workspace.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 px-4 pb-2">
            <div className="flex items-center justify-between rounded-md border p-3" data-usecases="[UC_080]">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">Toggle light/dark</p>
              </div>
              <Switch checked={themeDark} onCheckedChange={(v) => setThemeDark(!!v)} />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3" data-usecases="[UC_081]">
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Enable toasts and progress</p>
              </div>
              <Switch checked={notifPref} onCheckedChange={(v) => setNotifPref(!!v)} />
            </div>
            <div className="rounded-md border p-3 text-sm text-muted-foreground" data-usecases="[UC_076]">
              Default view mode and sort order are managed via toolbar controls in this demo.
            </div>
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setSettingsOpen(false)}>Close</Button>
            <Button onClick={signOutNow} variant="outline" data-usecases="[UC_138]">
              Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Notifications quick-view placeholder */}
      {notifPref ? (
        <div className="pointer-events-none fixed bottom-4 right-4 hidden lg:block" data-usecases="[UC_084]">
          <div className="pointer-events-auto w-72 rounded-lg border bg-background/80 p-3 text-xs text-muted-foreground shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between">
              <p className="font-medium text-foreground">Notifications</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast({ title: "Notifications", description: "Toasts appear here via the system." })}
                data-usecases="[UC_083]"
              >
                View
              </Button>
            </div>
            <p className="mt-1">Uploads/downloads show progress here (demo).</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
