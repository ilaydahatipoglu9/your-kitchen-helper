import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface NewsArticle {
  id: string;
  title: string;
  summary?: string;
  thumbnail?: string;
  source: string;
  publishedAt: string;
  category?: string;
  sport?: string;
  href?: string;
}

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function NewsCard({ article, variant = "default", className }: NewsCardProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <Link to={article.href || `/news/${article.id}`}>
      <Card
        className={cn(
          "transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer overflow-hidden",
          className
        )}
      >
        {isFeatured && article.thumbnail && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardContent className={cn("p-4", isCompact && "p-3")}>
          <div className={cn(
            "flex gap-4",
            isCompact ? "items-center" : "flex-col"
          )}>
            {!isFeatured && article.thumbnail && (
              <div className={cn(
                "shrink-0 overflow-hidden rounded-lg",
                isCompact ? "h-16 w-16" : "h-24 w-full"
              )}>
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
                {article.sport && (
                  <Badge variant="outline" className="text-xs">
                    {article.sport}
                  </Badge>
                )}
              </div>
              
              <h3 className={cn(
                "font-semibold line-clamp-2",
                isCompact ? "text-sm" : isFeatured ? "text-lg" : "text-base"
              )}>
                {article.title}
              </h3>
              
              {!isCompact && article.summary && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {article.summary}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{article.source}</span>
                <span>-</span>
                <time dateTime={article.publishedAt}>{timeAgo}</time>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
