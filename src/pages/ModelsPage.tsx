import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Cpu,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Key,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LLMModel {
  id: string;
  name: string;
  provider: string;
  baseUrl: string;
  apiKeyConfigured: boolean;
  isActive: boolean;
  status: "online" | "offline" | "error";
  version?: string;
  lastUsed?: string;
}

const mockModels: LLMModel[] = [
  {
    id: "1",
    name: "GPT-4",
    provider: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    apiKeyConfigured: true,
    isActive: true,
    status: "online",
    version: "gpt-4-turbo-preview",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    apiKeyConfigured: true,
    isActive: true,
    status: "online",
    version: "gpt-3.5-turbo",
    lastUsed: "1 day ago",
  },
  {
    id: "3",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    apiKeyConfigured: true,
    isActive: true,
    status: "online",
    version: "claude-3-opus-20240229",
    lastUsed: "3 hours ago",
  },
  {
    id: "4",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    apiKeyConfigured: true,
    isActive: true,
    status: "online",
    version: "claude-3-sonnet-20240229",
    lastUsed: "5 hours ago",
  },
  {
    id: "5",
    name: "Gemini Pro",
    provider: "Google",
    baseUrl: "https://generativelanguage.googleapis.com/v1",
    apiKeyConfigured: true,
    isActive: true,
    status: "online",
    version: "gemini-pro",
    lastUsed: "1 week ago",
  },
  {
    id: "6",
    name: "Llama 3 70B",
    provider: "Meta (via Together)",
    baseUrl: "https://api.together.xyz/v1",
    apiKeyConfigured: false,
    isActive: false,
    status: "offline",
    version: "meta-llama/Llama-3-70b-chat-hf",
  },
];

const providers = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "Custom"];

export default function ModelsPage() {
  const [models, setModels] = useState<LLMModel[]>(mockModels);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    baseUrl: "",
    apiKey: "",
    version: "",
    isActive: true,
  });

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && model.isActive) ||
      (statusFilter === "inactive" && !model.isActive);
    return matchesSearch && matchesStatus;
  });

  const handleAddModel = () => {
    setFormData({
      name: "",
      provider: "",
      baseUrl: "",
      apiKey: "",
      version: "",
      isActive: true,
    });
    setIsAddDrawerOpen(true);
  };

  const handleEditModel = (model: LLMModel) => {
    setSelectedModel(model);
    setFormData({
      name: model.name,
      provider: model.provider,
      baseUrl: model.baseUrl,
      apiKey: "",
      version: model.version || "",
      isActive: model.isActive,
    });
    setIsEditDrawerOpen(true);
  };

  const handleDeleteModel = (model: LLMModel) => {
    setSelectedModel(model);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveModel = () => {
    // In a real app, this would call an API
    if (isAddDrawerOpen) {
      const newModel: LLMModel = {
        id: Date.now().toString(),
        name: formData.name,
        provider: formData.provider,
        baseUrl: formData.baseUrl,
        apiKeyConfigured: !!formData.apiKey,
        isActive: formData.isActive,
        status: "online",
        version: formData.version,
      };
      setModels([...models, newModel]);
      setIsAddDrawerOpen(false);
    } else if (isEditDrawerOpen && selectedModel) {
      setModels(
        models.map((m) =>
          m.id === selectedModel.id
            ? {
                ...m,
                name: formData.name,
                provider: formData.provider,
                baseUrl: formData.baseUrl,
                apiKeyConfigured: formData.apiKey ? true : m.apiKeyConfigured,
                isActive: formData.isActive,
                version: formData.version,
              }
            : m
        )
      );
      setIsEditDrawerOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedModel) {
      setModels(models.filter((m) => m.id !== selectedModel.id));
      setIsDeleteDialogOpen(false);
      setSelectedModel(null);
    }
  };

  const handleToggleActive = (model: LLMModel) => {
    setModels(
      models.map((m) =>
        m.id === model.id ? { ...m, isActive: !m.isActive } : m
      )
    );
  };

  const getStatusIcon = (status: LLMModel["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-[hsl(var(--status-complete))]" />;
      case "offline":
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-[hsl(var(--status-error))]" />;
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">LLM Models</h1>
            <p className="text-muted-foreground">
              Manage your LLM model configurations and API connections
            </p>
          </div>
          <Button onClick={handleAddModel} data-usecases="UC_001">
            <Plus className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-usecases="UC_015"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]" data-usecases="UC_015">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Models Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <Cpu className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No models found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery
                          ? "Try adjusting your search query"
                          : "Add your first LLM model to get started"}
                      </p>
                      {!searchQuery && (
                        <Button onClick={handleAddModel} data-usecases="UC_001">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Model
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Cpu className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{model.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {model.version}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{model.provider}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(model.status)}
                        <span
                          className={cn(
                            "text-sm",
                            model.isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {model.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {model.apiKeyConfigured ? (
                        <Badge
                          variant="secondary"
                          className="bg-[hsl(var(--status-complete))]/10 text-[hsl(var(--status-complete))]"
                        >
                          <Key className="h-3 w-3 mr-1" />
                          Configured
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Not Set
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {model.lastUsed || "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditModel(model)}
                            data-usecases="UC_003"
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem data-usecases="UC_016">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleActive(model)}
                            data-usecases="UC_021"
                          >
                            {model.isActive ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem data-usecases="UC_010">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Test Connection
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteModel(model)}
                            data-usecases="UC_004"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add/Edit Model Drawer */}
        <Sheet
          open={isAddDrawerOpen || isEditDrawerOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddDrawerOpen(false);
              setIsEditDrawerOpen(false);
            }
          }}
        >
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>
                {isAddDrawerOpen ? "Add LLM Model" : "Edit LLM Model"}
              </SheetTitle>
              <SheetDescription>
                {isAddDrawerOpen
                  ? "Configure a new LLM model for evaluation"
                  : "Update the model configuration"}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., GPT-4 Turbo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) =>
                    setFormData({ ...formData, provider: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseUrl">Base URL</Label>
                <Input
                  id="baseUrl"
                  placeholder="https://api.openai.com/v1"
                  value={formData.baseUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, baseUrl: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Model Version / ID</Label>
                <Input
                  id="version"
                  placeholder="e.g., gpt-4-turbo-preview"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    placeholder={
                      isEditDrawerOpen
                        ? "Leave blank to keep existing key"
                        : "Enter API key"
                    }
                    value={formData.apiKey}
                    onChange={(e) =>
                      setFormData({ ...formData, apiKey: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  API keys are encrypted and stored securely
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable this model for evaluations
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>
            </div>

            <SheetFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDrawerOpen(false);
                  setIsEditDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveModel}>
                {isAddDrawerOpen ? "Add Model" : "Save Changes"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Model</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedModel?.name}"? This
                action cannot be undone and will remove all associated
                configuration.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete Model
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
