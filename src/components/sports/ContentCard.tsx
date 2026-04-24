import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";

export interface ContentData {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
  source?: string;
  type: "article" | "highlight" | "news";
  relatedTeams?: string[];
  relatedPlayers?: string[];
}

interface ContentCardProps {
  content: ContentData;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ContentCard = ({ content, variant = "default", className }: ContentCardProps) => {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Link to={`/content/${content.id}`} data-usecases="UC_040">
      <Card
        className={cn(
          "group cursor-pointer overflow-hidden transition-all duration-150 hover:shadow-md",
          isFeatured && "md:flex md:flex-row",
          className
        )}
      >
        {/* Image */}
        {content.imageUrl && (
          <div
            className={cn(
              "relative overflow-hidden bg-muted",
              isFeatured ? "md:w-1/2" : "aspect-video",
              isCompact && "aspect-[4/3]"
            )}
          >
            <img
              src={content.imageUrl}
              alt={content.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="absolute left-3 top-3 bg-primary text-primary-foreground"
            >
              {content.category}
            </Badge>
          </div>
        )}

        {/* Content */}
        <CardContent
          className={cn(
            "flex flex-col gap-2 p-4",
            isFeatured && "md:flex-1 md:justify-center md:p-6",
            isCompact && "p-3"
          )}
        >
          {/* Title */}
          <h3
            className={cn(
              "font-heading font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors",
              isFeatured ? "text-xl md:text-2xl" : "text-base",
              isCompact && "text-sm"
            )}
          >
            {content.title}
          </h3>

          {/* Excerpt - only for featured and default */}
          {!isCompact && content.excerpt && (
            <p
              className={cn(
                "text-muted-foreground line-clamp-2",
                isFeatured ? "text-base" : "text-sm"
              )}
            >
              {content.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {content.publishedAt}
            </span>
            {content.source && (
              <span className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {content.source}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
