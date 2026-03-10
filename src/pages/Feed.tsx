import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { ContentCard } from "@/components/content/ContentCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { Newspaper, Filter, SlidersHorizontal } from "lucide-react";
import { mockContentItems } from "@/data/mockData";

const categories = [
  "All",
  "Match Report",
  "Transfer News",
  "Analysis",
  "Features",
  "Tactics",
];

export default function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [contentItems] = useState(mockContentItems);

  const filteredContent =
    selectedCategory === "All"
      ? contentItems
      : contentItems.filter((item) => item.category === selectedCategory);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Your Feed</h1>
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Customize Feed
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="space-y-6">
            <SkeletonCard variant="content" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} variant="content" />
              ))}
            </div>
          </div>
        ) : filteredContent.length > 0 ? (
          <div className="space-y-6">
            {/* Featured Article */}
            {selectedCategory === "All" && (
              <ContentCard content={filteredContent[0]} variant="featured" />
            )}

            {/* Regular Articles Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(selectedCategory === "All"
                ? filteredContent.slice(1)
                : filteredContent
              ).map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            type="no-content"
            onAction={() => setSelectedCategory("All")}
            actionLabel="View All Content"
          />
        )}
      </div>
    </MainLayout>
  );
}
