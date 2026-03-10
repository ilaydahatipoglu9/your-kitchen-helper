import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingTopic {
  id: string;
  name: string;
  category: string;
  count: number;
  href: string;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  title?: string;
  className?: string;
}

export function TrendingTopics({
  topics,
  title = "Trending",
  className,
}: TrendingTopicsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-info" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic, index) => (
          <Link
            key={topic.id}
            to={topic.href}
            className="flex items-start gap-3 group"
          >
            <span className="text-sm font-bold text-muted-foreground w-5">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {topic.name}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{topic.category}</span>
                <span>•</span>
                <span>{topic.count.toLocaleString()} posts</span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
