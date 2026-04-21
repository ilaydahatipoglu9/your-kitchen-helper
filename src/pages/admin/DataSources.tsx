import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Database,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataSource {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  status: "active" | "inactive" | "error";
  lastSync: string;
  recordsCount: number;
}

const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "Football API",
    type: "REST API",
    endpoint: "https://api.football-data.org/v4",
    status: "active",
    lastSync: "2 minutes ago",
    recordsCount: 15420,
  },
  {
    id: "2",
    name: "NBA Stats",
    type: "REST API",
    endpoint: "https://stats.nba.com/stats",
    status: "active",
    lastSync: "5 minutes ago",
    recordsCount: 8932,
  },
  {
    id: "3",
    name: "Sports News Feed",
    type: "RSS Feed",
    endpoint: "https://feeds.sports.com/news",
    status: "error",
    lastSync: "1 hour ago",
    recordsCount: 2341,
  },
  {
    id: "4",
    name: "Live Scores WebSocket",
    type: "WebSocket",
    endpoint: "wss://live.scores.com/ws",
    status: "active",
    lastSync: "Real-time",
    recordsCount: 0,
  },
  {
    id: "5",
    name: "Player Stats DB",
    type: "Database",
    endpoint: "postgresql://stats.db.internal",
    status: "inactive",
    lastSync: "3 days ago",
    recordsCount: 45000,
  },
];

export default function DataSourcesPage() {
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSource | null>(null);
  const [newSource, setNewSource] = useState({
    name: "",
    type: "REST API",
    endpoint: "",
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const handleAddSource = () => {
    if (!newSource.name || !newSource.endpoint) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const source: DataSource = {
      id: Date.now().toString(),
      name: newSource.name,
      type: newSource.type,
      endpoint: newSource.endpoint,
      status: "inactive",
      lastSync: "Never",
      recordsCount: 0,
    };

    setDataSources((prev) => [...prev, source]);
    setNewSource({ name: "", type: "REST API", endpoint: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Data source added",
      description: `${source.name} has been added successfully.`,
    });
  };

  const handleEditSource = () => {
    if (!editingSource) return;

    setDataSources((prev) =>
      prev.map((s) => (s.id === editingSource.id ? editingSource : s))
    );
    setEditingSource(null);
    toast({
      title: "Data source updated",
      description: "The data source has been updated successfully.",
    });
  };

  const handleDeleteSource = (id: string) => {
    setDataSources((prev) => prev.filter((s) => s.id !== id));
    toast({
      title: "Data source removed",
      description: "The data source has been removed.",
    });
  };

  const handleSync = (id: string) => {
    setDataSources((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, lastSync: "Just now", status: "active" as const } : s
      )
    );
    toast({
      title: "Sync started",
      description: "Data synchronization has been initiated.",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto" data-usecases="UC_165,UC_166,UC_170">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Data Sources
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage external data provider connections
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button data-usecases="UC_165">
                <Plus className="h-4 w-4 mr-2" />
                Add Data Source
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Data Source</DialogTitle>
                <DialogDescription>
                  Configure a new external data provider connection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Football API"
                    value={newSource.name}
                    onChange={(e) =>
                      setNewSource((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newSource.type}
                    onValueChange={(value) =>
                      setNewSource((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="REST API">REST API</SelectItem>
                      <SelectItem value="WebSocket">WebSocket</SelectItem>
                      <SelectItem value="RSS Feed">RSS Feed</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input
                    id="endpoint"
                    placeholder="https://api.example.com/v1"
                    value={newSource.endpoint}
                    onChange={(e) =>
                      setNewSource((prev) => ({ ...prev, endpoint: e.target.value }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSource}>Add Source</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {dataSources.filter((s) => s.status === "active").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {dataSources.filter((s) => s.status === "inactive").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {dataSources.filter((s) => s.status === "error").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {dataSources.reduce((acc, s) => acc + s.recordsCount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Sources Table */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Sources</CardTitle>
            <CardDescription>
              All configured data provider connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(source.status)}
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {source.endpoint}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{source.type}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(source.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {source.lastSync}
                    </TableCell>
                    <TableCell>{source.recordsCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSync(source.id)}
                          title="Sync now"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingSource(source)}
                              data-usecases="UC_166"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Data Source</DialogTitle>
                              <DialogDescription>
                                Update the data source configuration
                              </DialogDescription>
                            </DialogHeader>
                            {editingSource && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Name</Label>
                                  <Input
                                    value={editingSource.name}
                                    onChange={(e) =>
                                      setEditingSource((prev) =>
                                        prev ? { ...prev, name: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Endpoint</Label>
                                  <Input
                                    value={editingSource.endpoint}
                                    onChange={(e) =>
                                      setEditingSource((prev) =>
                                        prev ? { ...prev, endpoint: e.target.value } : null
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingSource(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleEditSource}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Data Source</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{source.name}"? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDeleteSource(source.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
