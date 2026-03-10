import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  author?: string;
  publishedAt: string;
  readTime?: string;
  tags?: string[];
  isBookmarked?: boolean;
}

interface ContentCardProps {
  content: ContentItem;
  className?: string;
  variant?: "default" | "featured" | "compact";
  onBookmark?: (contentId: string) => void;
  onShare?: (contentId: string) => void;
}

export function ContentCard({
  content,
  className,
  variant = "default",
  onBookmark,
  onShare,
}: ContentCardProps) {
  if (variant === "featured") {
    return (
      <Link to={`/article/${content.id}`}>
        <Card
          className={cn(
            "group overflow-hidden transition-all duration-200 hover:shadow-card-hover",
            className
          )}
        >
          <div className="relative aspect-video">
            {content.imageUrl ? (
              <img
                src={content.imageUrl}
                alt={content.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className="mb-3 bg-info text-info-foreground">
                {content.category}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {content.title}
              </h3>
              <p className="text-sm text-white/80 line-clamp-2">{content.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-white/60">
                {content.author && <span>{content.author}</span>}
                <span>{content.publishedAt}</span>
                {content.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {content.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${content.id}`}>
        <Card
          className={cn(
            "group transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
            className
          )}
        >
          <CardContent className="p-3 flex gap-3">
            {content.imageUrl && (
              <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {content.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{content.publishedAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <Link to={`/article/${content.id}`}>
        {content.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {content.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                onBookmark?.(content.id);
              }}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  content.isBookmarked
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                onShare?.(content.id);
              }}
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Link to={`/article/${content.id}`}>
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {content.excerpt}
          </p>
        </Link>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {content.author && <span>{content.author}</span>}
            <span>•</span>
            <span>{content.publishedAt}</span>
          </div>
          {content.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {content.readTime}
            </span>
          )}
        </div>
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {content.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
