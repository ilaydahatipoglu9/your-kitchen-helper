import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  AlertTriangle,
  Edit,
  Trash2,
  Bell,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { mockAlertRules } from "@/data/mockData";

const AlertRules = () => {
  const { toast } = useToast();
  const [alertRules, setAlertRules] = useState(mockAlertRules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newRule, setNewRule] = useState({
    name: "",
    metric: "error_rate",
    threshold: "",
    unit: "%",
  });

  const handleAddRule = () => {
    const newId = `ar${alertRules.length + 1}`;
    setAlertRules([
      ...alertRules,
      {
        id: newId,
        name: newRule.name,
        metric: newRule.metric,
        threshold: Number(newRule.threshold),
        unit: newRule.unit,
        enabled: true,
      },
    ]);
    setIsAddDialogOpen(false);
    setNewRule({ name: "", metric: "error_rate", threshold: "", unit: "%" });
    toast({
      title: "Alert rule created",
      description: `${newRule.name} has been created successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    setAlertRules(alertRules.filter((ar) => ar.id !== id));
    setDeleteId(null);
    toast({
      title: "Alert rule deleted",
      description: "The alert rule has been removed.",
    });
  };

  const toggleEnabled = (id: string) => {
    setAlertRules(
      alertRules.map((ar) =>
        ar.id === id ? { ...ar, enabled: !ar.enabled } : ar
      )
    );
    const rule = alertRules.find((ar) => ar.id === id);
    toast({
      title: rule?.enabled ? "Alert disabled" : "Alert enabled",
      description: `${rule?.name} has been ${rule?.enabled ? "disabled" : "enabled"}.`,
    });
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "error_rate":
        return "Error Rate";
      case "response_time":
        return "Response Time";
      case "uptime":
        return "Uptime";
      case "cpu_usage":
        return "CPU Usage";
      case "memory_usage":
        return "Memory Usage";
      default:
        return metric;
    }
  };

  return (
    <div className="space-y-6" data-usecases="UC_264,UC_100">
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
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Alert Rules</h1>
          <p className="text-muted-foreground">
            Configure system health alert thresholds
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-usecases="UC_264">
              <Plus className="mr-2 h-4 w-4" />
              Create Alert Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Alert Rule</DialogTitle>
              <DialogDescription>
                Set up a new alert rule for system monitoring.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  placeholder="Enter rule name"
                  value={newRule.name}
                  onChange={(e) =>
                    setNewRule({ ...newRule, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metric">Metric</Label>
                <Select
                  value={newRule.metric}
                  onValueChange={(value) =>
                    setNewRule({ ...newRule, metric: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error_rate">Error Rate</SelectItem>
                    <SelectItem value="response_time">Response Time</SelectItem>
                    <SelectItem value="uptime">Uptime</SelectItem>
                    <SelectItem value="cpu_usage">CPU Usage</SelectItem>
                    <SelectItem value="memory_usage">Memory Usage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    placeholder="Value"
                    value={newRule.threshold}
                    onChange={(e) =>
                      setNewRule({ ...newRule, threshold: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={newRule.unit}
                    onValueChange={(value) =>
                      setNewRule({ ...newRule, unit: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="ms">ms</SelectItem>
                      <SelectItem value="s">s</SelectItem>
                      <SelectItem value="count">count</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddRule}
                disabled={!newRule.name || !newRule.threshold}
                data-usecases="UC_264"
              >
                Create Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alert Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert Rules
          </CardTitle>
          <CardDescription>
            {alertRules.filter((ar) => ar.enabled).length} of {alertRules.length}{" "}
            rules enabled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Metric</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getMetricLabel(rule.metric)}</Badge>
                  </TableCell>
                  <TableCell>
                    {rule.threshold}
                    {rule.unit}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleEnabled(rule.id)}
                      data-usecases="UC_264"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-usecases="UC_264">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="mr-2 h-4 w-4" />
                          Test Alert
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(rule.id)}
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
            <AlertDialogTitle>Delete Alert Rule?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the alert
              rule and stop all related notifications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-usecases="UC_264"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertRules;
