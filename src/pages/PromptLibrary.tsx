import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, PlusSquare, Edit, Search, FileText, Tag } from "lucide-react";

const MOCK_PROMPTS = [
  { id: "pt-001", title: "System Prompt: Code Reviewer", category: "Development", tags: ["code", "review", "strict"], lastModified: "2024-05-10" },
  { id: "pt-002", title: "Creative Writing: Sci-Fi Intro", category: "Creative", tags: ["story", "sci-fi", "creative"], lastModified: "2024-05-08" },
  { id: "pt-003", title: "Data Extraction: JSON Format", category: "Data Processing", tags: ["json", "extraction", "structured"], lastModified: "2024-05-12" },
  { id: "pt-004", title: "Customer Support: Angry User", category: "Support", tags: ["support", "empathy", "resolution"], lastModified: "2024-05-01" },
];

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrompts = MOCK_PROMPTS.filter(prompt => 
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1440px] mx-auto w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Library className="h-6 w-6 text-primary" />
              Prompt Library
            </h1>
            <p className="text-sm text-muted-foreground">Organize and reuse complex prompt templates and test suites.</p>
          </div>
          <Button 
            className="gap-2"
            data-usecases="UC_113"
          >
            <PlusSquare className="h-4 w-4" />
            New Template
          </Button>
        </div>

        <Card className="border-border/50 shadow-sm flex-1" data-usecases="UC_117,UC_150">
          <CardHeader className="py-4 px-6 border-b bg-muted/20 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">Saved Templates</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search prompts, categories, or tags..."
                className="w-full bg-background border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-usecases="UC_150"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center border">
                      <FileText className="h-5 w-5 text-secondary-foreground/70" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{prompt.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="px-2 py-0.5 bg-background rounded border">{prompt.category}</span>
                        <span>•</span>
                        <span>Last modified: {prompt.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <div className="flex gap-1">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-usecases="UC_113"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              {filteredPrompts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No templates found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
