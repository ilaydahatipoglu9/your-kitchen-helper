import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Play,
  FolderPlus,
  FileText,
  Star,
  StarOff,
  Tag,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Prompt {
  id: string;
  name: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  promptIds: string[];
}

const mockPrompts: Prompt[] = [
  {
    id: "1",
    name: "Code Explanation",
    content: "Explain the following code in detail, including its purpose, how it works, and any potential improvements:\n\n{{code}}",
    category: "Development",
    tags: ["code", "explanation", "technical"],
    isFavorite: true,
    usageCount: 45,
    lastUsed: "2 hours ago",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Creative Story",
    content: "Write a short story about {{topic}} in the style of {{author}}. The story should be approximately {{length}} words.",
    category: "Creative",
    tags: ["creative", "writing", "story"],
    isFavorite: false,
    usageCount: 23,
    lastUsed: "1 day ago",
    createdAt: "2024-01-08",
  },
  {
    id: "3",
    name: "Technical Analysis",
    content: "Provide a comprehensive technical analysis of {{concept}}. Include:\n1. Definition and core principles\n2. Real-world applications\n3. Advantages and limitations\n4. Future trends",
    category: "Technical",
    tags: ["analysis", "technical", "research"],
    isFavorite: true,
    usageCount: 67,
    lastUsed: "5 hours ago",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "API Documentation",
    content: "Generate comprehensive API documentation for the following endpoint:\n\nEndpoint: {{endpoint}}\nMethod: {{method}}\nDescription: {{description}}\n\nInclude request/response examples, error codes, and usage notes.",
    category: "Development",
    tags: ["api", "documentation", "technical"],
    isFavorite: false,
    usageCount: 12,
    lastUsed: "3 days ago",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Comparison Analysis",
    content: "Compare and contrast {{item1}} and {{item2}}. Consider the following aspects:\n- Features and capabilities\n- Use cases\n- Pros and cons\n- Recommendations for different scenarios",
    category: "Analysis",
    tags: ["comparison", "analysis"],
    isFavorite: false,
    usageCount: 34,
    lastUsed: "1 week ago",
    createdAt: "2024-01-03",
  },
];

const mockTestSuites: TestSuite[] = [
  {
    id: "1",
    name: "Code Quality Suite",
    description: "Prompts for evaluating code-related responses",
    promptIds: ["1", "4"],
  },
  {
    id: "2",
    name: "Creative Writing Suite",
    description: "Prompts for testing creative capabilities",
    promptIds: ["2"],
  },
];

const categories = ["All", "Development", "Creative", "Technical", "Analysis", "General"];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [testSuites] = useState<TestSuite[]>(mockTestSuites);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddToSuiteDialogOpen, setIsAddToSuiteDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [activeTab, setActiveTab] = useState<"prompts" | "suites">("prompts");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    category: "",
    tags: "",
  });

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || prompt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddPrompt = () => {
    setFormData({
      name: "",
      content: "",
      category: "",
      tags: "",
    });
    setIsAddDrawerOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setFormData({
      name: prompt.name,
      content: prompt.content,
      category: prompt.category,
      tags: prompt.tags.join(", "),
    });
    setIsEditDrawerOpen(true);
  };

  const handleDeletePrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsDeleteDialogOpen(true);
  };

  const handleSavePrompt = () => {
    if (isAddDrawerOpen) {
      const newPrompt: Prompt = {
        id: Date.now().toString(),
        name: formData.name,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        isFavorite: false,
        usageCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPrompts([...prompts, newPrompt]);
      setIsAddDrawerOpen(false);
    } else if (isEditDrawerOpen && selectedPrompt) {
      setPrompts(
        prompts.map((p) =>
          p.id === selectedPrompt.id
            ? {
                ...p,
                name: formData.name,
                content: formData.content,
                category: formData.category,
                tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
              }
            : p
        )
      );
      setIsEditDrawerOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPrompt) {
      setPrompts(prompts.filter((p) => p.id !== selectedPrompt.id));
      setIsDeleteDialogOpen(false);
      setSelectedPrompt(null);
    }
  };

  const handleToggleFavorite = (prompt: Prompt) => {
    setPrompts(
      prompts.map((p) =>
        p.id === prompt.id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const handleCopyPrompt = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.content);
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Prompt Library</h1>
            <p className="text-muted-foreground">
              Manage your prompt templates and test suites
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("suites")} data-usecases="UC_117">
              <FolderPlus className="h-4 w-4 mr-2" />
              Test Suites
            </Button>
            <Button onClick={handleAddPrompt} data-usecases="UC_113">
              <Plus className="h-4 w-4 mr-2" />
              Create Prompt
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            className={cn(
              "pb-2 px-1 text-sm font-medium border-b-2 transition-colors",
              activeTab === "prompts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("prompts")}
          >
            Prompts ({prompts.length})
          </button>
          <button
            className={cn(
              "pb-2 px-1 text-sm font-medium border-b-2 transition-colors",
              activeTab === "suites"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("suites")}
          >
            Test Suites ({testSuites.length})
          </button>
        </div>

        {activeTab === "prompts" && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-usecases="UC_114"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prompts Grid */}
            {filteredPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No prompts found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Create your first prompt template to get started"}
                </p>
                {!searchQuery && (
                  <Button onClick={handleAddPrompt} data-usecases="UC_113">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Prompt
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrompts.map((prompt) => (
                  <Card key={prompt.id} className="maritime-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            {prompt.name}
                            {prompt.isFavorite && (
                              <Star className="h-4 w-4 fill-[hsl(var(--chart-4))] text-[hsl(var(--chart-4))]" />
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            <Badge variant="outline" className="text-xs">
                              {prompt.category}
                            </Badge>
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditPrompt(prompt)}
                              data-usecases="UC_113"
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleCopyPrompt(prompt)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleFavorite(prompt)}
                            >
                              {prompt.isFavorite ? (
                                <>
                                  <StarOff className="h-4 w-4 mr-2" />
                                  Remove Favorite
                                </>
                              ) : (
                                <>
                                  <Star className="h-4 w-4 mr-2" />
                                  Add to Favorites
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPrompt(prompt);
                                setIsAddToSuiteDialogOpen(true);
                              }}
                              data-usecases="UC_117"
                            >
                              <FolderPlus className="h-4 w-4 mr-2" />
                              Add to Test Suite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeletePrompt(prompt)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {prompt.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {prompt.lastUsed || "Never used"}
                        </span>
                        <span>{prompt.usageCount} uses</span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <Link to="/">
                          <Button size="sm" className="w-full" data-usecases="UC_035">
                            <Play className="h-4 w-4 mr-2" />
                            Use in Evaluation
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "suites" && (
          <div className="space-y-4">
            {testSuites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No test suites yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a test suite to group related prompts together
                </p>
                <Button data-usecases="UC_117">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test Suite
                </Button>
              </div>
            ) : (
              testSuites.map((suite) => (
                <Card key={suite.id} className="maritime-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{suite.name}</CardTitle>
                        <CardDescription>{suite.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {suite.promptIds.length} prompts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {suite.promptIds.map((promptId) => {
                        const prompt = prompts.find((p) => p.id === promptId);
                        return prompt ? (
                          <Badge key={promptId} variant="outline">
                            {prompt.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Suite
                      </Button>
                      <Link to="/">
                        <Button size="sm" data-usecases="UC_035">
                          <Play className="h-4 w-4 mr-2" />
                          Run Suite
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Add/Edit Prompt Drawer */}
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
                {isAddDrawerOpen ? "Create Prompt" : "Edit Prompt"}
              </SheetTitle>
              <SheetDescription>
                {isAddDrawerOpen
                  ? "Create a new prompt template"
                  : "Update the prompt template"}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Code Review Prompt"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c !== "All").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Prompt Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your prompt template. Use {{variable}} for dynamic values."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {"{{variable}}"} syntax for template variables
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., code, review, technical (comma-separated)"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDrawerOpen(false);
                  setIsEditDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePrompt}>
                {isAddDrawerOpen ? "Create Prompt" : "Save Changes"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Prompt</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedPrompt?.name}"? This
                action cannot be undone.
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
                Delete Prompt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add to Test Suite Dialog */}
        <Dialog
          open={isAddToSuiteDialogOpen}
          onOpenChange={setIsAddToSuiteDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Test Suite</DialogTitle>
              <DialogDescription>
                Select a test suite to add "{selectedPrompt?.name}" to.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              {testSuites.map((suite) => (
                <button
                  key={suite.id}
                  className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors"
                  onClick={() => {
                    // Add to suite logic would go here
                    setIsAddToSuiteDialogOpen(false);
                  }}
                >
                  <p className="font-medium">{suite.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {suite.promptIds.length} prompts
                  </p>
                </button>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddToSuiteDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
