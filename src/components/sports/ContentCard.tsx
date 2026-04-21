import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ExternalLink } from "lucide-react";

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: string;
  sport?: string;
  author?: string;
  publishedAt: string;
  readTime?: string;
  type: "article" | "highlight" | "news" | "analysis";
}

interface ContentCardProps {
  content: ContentItem;
  variant?: "default" | "compact" | "featured";
  onClick?: () => void;
}

export function ContentCard({ content, variant = "default", onClick }: ContentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "highlight":
        return "bg-primary/20 text-primary";
      case "analysis":
        return "bg-secondary/20 text-secondary-foreground";
      case "news":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (variant === "featured") {
    return (
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 group"
        onClick={onClick}
        data-usecases="UC_040,UC_041,UC_042"
      >
        <div className="relative aspect-video bg-muted">
          {content.imageUrl ? (
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-4xl font-heading font-bold text-primary/30">
                {content.sport?.charAt(0) || "S"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTypeColor(content.type)}>
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
              </Badge>
              {content.sport && (
                <Badge variant="secondary">{content.sport}</Badge>
              )}
            </div>
            <h3 className="font-heading font-bold text-lg md:text-xl text-white line-clamp-2 mb-2">
              {content.title}
            </h3>
            {content.description && (
              <p className="text-sm text-white/80 line-clamp-2 hidden md:block">
                {content.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
              {content.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {content.author}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(content.publishedAt)}
              </span>
              {content.readTime && (
                <span>{content.readTime} read</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
        onClick={onClick}
        data-usecases="UC_040,UC_041,UC_042"
      >
        <CardContent className="p-3 flex gap-3">
          <div className="w-16 h-16 rounded-lg bg-muted shrink-0 overflow-hidden">
            {content.imageUrl ? (
              <img
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <span className="text-lg font-bold text-primary/30">
                  {content.sport?.charAt(0) || "S"}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 mb-1">{content.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{content.category}</span>
              <span>-</span>
              <span>{formatDate(content.publishedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group"
      onClick={onClick}
      data-usecases="UC_040,UC_041,UC_042"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-48 h-40 sm:h-auto bg-muted shrink-0 overflow-hidden">
          {content.imageUrl ? (
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-3xl font-heading font-bold text-primary/30">
                {content.sport?.charAt(0) || "S"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getTypeColor(content.type)} variant="secondary">
              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
            </Badge>
            {content.sport && (
              <Badge variant="outline" className="text-xs">
                {content.sport}
              </Badge>
            )}
          </div>

          <h3 className="font-heading font-semibold text-base md:text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>

          {content.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {content.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {content.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {content.author}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(content.publishedAt)}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
