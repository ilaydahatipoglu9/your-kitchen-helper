import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Flame } from "lucide-react";

interface TrendingItem {
  id: string;
  title: string;
  category: string;
  engagement: number;
  isHot?: boolean;
}

interface TrendingWidgetProps {
  items: TrendingItem[];
  title?: string;
  onItemClick?: (item: TrendingItem) => void;
  onViewAll?: () => void;
}

export function TrendingWidget({
  items,
  title = "Trending",
  onItemClick,
  onViewAll,
}: TrendingWidgetProps) {
  return (
    <Card className="h-full" data-usecases="UC_016,UC_017">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            {title}
          </CardTitle>
          {onViewAll && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={onViewAll}
            >
              View All
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[300px] pr-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No trending topics</p>
              <p className="text-xs text-muted-foreground mt-1">Check back later</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors"
                  onClick={() => onItemClick?.(item)}
                >
                  <span className="text-lg font-bold text-muted-foreground w-6 shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px] h-5">
                        {item.category}
                      </Badge>
                      {item.isHot && (
                        <Flame className="h-3 w-3 text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.engagement.toLocaleString()} engagements
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
