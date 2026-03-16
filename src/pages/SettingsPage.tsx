import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Key,
  Shield,
  Bell,
  Palette,
  Settings2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIKey {
  id: string;
  name: string;
  provider: string;
  lastUsed?: string;
  createdAt: string;
  status: "active" | "expired" | "revoked";
}

interface JudgeCriteria {
  id: string;
  name: string;
  weight: number;
  description: string;
}

const mockAPIKeys: APIKey[] = [
  {
    id: "1",
    name: "OpenAI Production",
    provider: "OpenAI",
    lastUsed: "2 hours ago",
    createdAt: "2024-01-01",
    status: "active",
  },
  {
    id: "2",
    name: "Anthropic Main",
    provider: "Anthropic",
    lastUsed: "1 day ago",
    createdAt: "2024-01-05",
    status: "active",
  },
  {
    id: "3",
    name: "Google AI",
    provider: "Google",
    lastUsed: "1 week ago",
    createdAt: "2024-01-10",
    status: "active",
  },
];

const mockJudgeCriteria: JudgeCriteria[] = [
  {
    id: "1",
    name: "Accuracy",
    weight: 30,
    description: "Factual correctness and precision of the response",
  },
  {
    id: "2",
    name: "Relevance",
    weight: 25,
    description: "How well the response addresses the prompt",
  },
  {
    id: "3",
    name: "Clarity",
    weight: 20,
    description: "Clear and understandable communication",
  },
  {
    id: "4",
    name: "Completeness",
    weight: 15,
    description: "Thoroughness of the response",
  },
  {
    id: "5",
    name: "Creativity",
    weight: 10,
    description: "Original and innovative thinking",
  },
];

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [judgeCriteria, setJudgeCriteria] = useState<JudgeCriteria[]>(mockJudgeCriteria);
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [isDeleteKeyDialogOpen, setIsDeleteKeyDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);

  // Form state
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    provider: "",
    apiKey: "",
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    streamingEnabled: true,
    defaultMaxTokens: "2048",
    defaultTemperature: "0.7",
  });

  const handleAddKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyForm.name,
      provider: newKeyForm.provider,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setApiKeys([...apiKeys, newKey]);
    setIsAddKeyDialogOpen(false);
    setNewKeyForm({ name: "", provider: "", apiKey: "" });
  };

  const handleDeleteKey = () => {
    if (selectedKey) {
      setApiKeys(apiKeys.filter((k) => k.id !== selectedKey.id));
      setIsDeleteKeyDialogOpen(false);
      setSelectedKey(null);
    }
  };

  const handleRotateKey = (key: APIKey) => {
    // In a real app, this would call an API to rotate the key
    console.log("Rotating key:", key.id);
  };

  const handleUpdateCriteriaWeight = (id: string, weight: number) => {
    setJudgeCriteria(
      judgeCriteria.map((c) => (c.id === id ? { ...c, weight } : c))
    );
  };

  const getStatusBadge = (status: APIKey["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="status-badge-complete">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "expired":
        return (
          <Badge className="status-badge-warning">
            <Clock className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case "revoked":
        return (
          <Badge className="status-badge-error">
            <AlertCircle className="h-3 w-3 mr-1" />
            Revoked
          </Badge>
        );
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, API keys, and preferences
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="judge" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span className="hidden sm:inline">Judge Config</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for LLM providers
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsAddKeyDialogOpen(true)} data-usecases="UC_007">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{key.provider}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(key.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {key.lastUsed || "Never"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRotateKey(key)}
                              data-usecases="UC_007"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedKey(key);
                                setIsDeleteKeyDialogOpen(true);
                              }}
                              data-usecases="UC_007"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Judge Configuration Tab */}
          <TabsContent value="judge">
            <Card data-usecases="UC_081,UC_084">
              <CardHeader>
                <CardTitle>Judge Model Configuration</CardTitle>
                <CardDescription>
                  Configure evaluation criteria and weights for the AI judge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Judge Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3 Opus</SelectItem>
                      <SelectItem value="gemini">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    The model used to evaluate and rate LLM outputs
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Evaluation Criteria</Label>
                  <div className="space-y-4">
                    {judgeCriteria.map((criteria) => (
                      <div
                        key={criteria.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{criteria.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {criteria.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={criteria.weight}
                            onChange={(e) =>
                              handleUpdateCriteriaWeight(
                                criteria.id,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total weight:{" "}
                    {judgeCriteria.reduce((acc, c) => acc + c.weight, 0)}%
                    {judgeCriteria.reduce((acc, c) => acc + c.weight, 0) !== 100 && (
                      <span className="text-[hsl(var(--status-warning))] ml-2">
                        (Should equal 100%)
                      </span>
                    )}
                  </p>
                </div>

                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme for the interface
                      </p>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, darkMode: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Defaults</CardTitle>
                  <CardDescription>
                    Default settings for new evaluations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Max Tokens</Label>
                      <Input
                        type="number"
                        value={preferences.defaultMaxTokens}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            defaultMaxTokens: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Default Temperature</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="2"
                        value={preferences.defaultTemperature}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            defaultTemperature: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Streaming Responses</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable real-time streaming of model outputs
                      </p>
                    </div>
                    <Switch
                      checked={preferences.streamingEnabled}
                      onCheckedChange={(checked) =>
                        setPreferences({
                          ...preferences,
                          streamingEnabled: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save Evaluations</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save evaluation results to history
                      </p>
                    </div>
                    <Switch
                      checked={preferences.autoSave}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, autoSave: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for completed evaluations
                      </p>
                    </div>
                    <Switch
                      checked={preferences.notifications}
                      onCheckedChange={(checked) =>
                        setPreferences({
                          ...preferences,
                          notifications: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card data-usecases="UC_102,UC_105">
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                  <CardDescription>
                    Configure security settings for LLM execution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sandbox Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Execute LLM outputs in a sandboxed environment
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Code Execution Prevention</Label>
                      <p className="text-sm text-muted-foreground">
                        Block execution of code in LLM responses
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Content Filtering</Label>
                      <p className="text-sm text-muted-foreground">
                        Filter potentially harmful content from outputs
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Change Password</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add API Key Dialog */}
        <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add API Key</DialogTitle>
              <DialogDescription>
                Add a new API key for an LLM provider
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="e.g., OpenAI Production"
                  value={newKeyForm.name}
                  onChange={(e) =>
                    setNewKeyForm({ ...newKeyForm, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select
                  value={newKeyForm.provider}
                  onValueChange={(value) =>
                    setNewKeyForm({ ...newKeyForm, provider: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OpenAI">OpenAI</SelectItem>
                    <SelectItem value="Anthropic">Anthropic</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Mistral">Mistral</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="relative">
                  <Input
                    type={showNewKey ? "text" : "password"}
                    placeholder="sk-..."
                    value={newKeyForm.apiKey}
                    onChange={(e) =>
                      setNewKeyForm({ ...newKeyForm, apiKey: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowNewKey(!showNewKey)}
                  >
                    {showNewKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddKeyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddKey}>Add Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Key Confirmation Dialog */}
        <Dialog
          open={isDeleteKeyDialogOpen}
          onOpenChange={setIsDeleteKeyDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revoke API Key</DialogTitle>
              <DialogDescription>
                Are you sure you want to revoke "{selectedKey?.name}"? This
                action cannot be undone and will immediately disable the key.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteKeyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteKey}>
                Revoke Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
