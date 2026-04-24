import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  Database,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockDataSources } from "@/data/mockData";

const DataSources = () => {
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newSource, setNewSource] = useState({
    name: "",
    type: "REST API",
  });

  const handleAddSource = () => {
    const newId = `ds${dataSources.length + 1}`;
    setDataSources([
      ...dataSources,
      {
        id: newId,
        name: newSource.name,
        type: newSource.type,
        status: "active",
        lastSync: "Just now",
      },
    ]);
    setIsAddDialogOpen(false);
    setNewSource({ name: "", type: "REST API" });
    toast({
      title: "Data source added",
      description: `${newSource.name} has been added successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    setDataSources(dataSources.filter((ds) => ds.id !== id));
    setDeleteId(null);
    toast({
      title: "Data source removed",
      description: "The data source has been removed.",
    });
  };

  const handleSync = (id: string) => {
    setDataSources(
      dataSources.map((ds) =>
        ds.id === id ? { ...ds, lastSync: "Just now" } : ds
      )
    );
    toast({
      title: "Sync initiated",
      description: "Data source sync has been started.",
    });
  };

  const toggleStatus = (id: string) => {
    setDataSources(
      dataSources.map((ds) =>
        ds.id === id
          ? { ...ds, status: ds.status === "active" ? "inactive" : "active" }
          : ds
      )
    );
  };

  return (
    <div className="space-y-6" data-usecases="UC_050,UC_165,UC_166">
      {/* Back Button */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Admin Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage external data source connections
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-usecases="UC_165">
              <Plus className="mr-2 h-4 w-4" />
              Add Data Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Data Source</DialogTitle>
              <DialogDescription>
                Configure a new external data source connection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter data source name"
                  value={newSource.name}
                  onChange={(e) =>
                    setNewSource({ ...newSource, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newSource.type}
                  onValueChange={(value) =>
                    setNewSource({ ...newSource, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REST API">REST API</SelectItem>
                    <SelectItem value="WebSocket">WebSocket</SelectItem>
                    <SelectItem value="GraphQL">GraphQL</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSource} disabled={!newSource.name} data-usecases="UC_165">
                Add Source
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Connected Sources
          </CardTitle>
          <CardDescription>
            {dataSources.filter((ds) => ds.status === "active").length} of{" "}
            {dataSources.length} sources active
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{source.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={source.status === "active" ? "default" : "secondary"}
                      className={
                        source.status === "active"
                          ? "bg-success text-white"
                          : ""
                      }
                    >
                      {source.status === "active" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {source.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {source.lastSync}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSync(source.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(source.id)} data-usecases="UC_166">
                          {source.status === "active" ? (
                            <>
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem data-usecases="UC_166">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(source.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Data Source?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the data
              source and stop all data synchronization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-usecases="UC_165"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataSources;
