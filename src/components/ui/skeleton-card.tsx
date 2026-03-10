import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonCardProps {
  variant?: "match" | "content" | "compact";
  className?: string;
}

export function SkeletonCard({ variant = "match", className }: SkeletonCardProps) {
  if (variant === "match") {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-24 rounded bg-muted animate-shimmer" />
            <div className="h-5 w-12 rounded-full bg-muted animate-shimmer" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted animate-shimmer" />
                <div className="h-4 w-32 rounded bg-muted animate-shimmer" />
              </div>
              <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted animate-shimmer" />
                <div className="h-4 w-28 rounded bg-muted animate-shimmer" />
              </div>
              <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "content") {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="aspect-video bg-muted animate-shimmer" />
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 w-16 rounded-full bg-muted animate-shimmer" />
            <div className="flex gap-1">
              <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
              <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
            </div>
          </div>
          <div className="h-5 w-full rounded bg-muted animate-shimmer mb-2" />
          <div className="h-5 w-3/4 rounded bg-muted animate-shimmer mb-3" />
          <div className="h-4 w-full rounded bg-muted animate-shimmer mb-1" />
          <div className="h-4 w-2/3 rounded bg-muted animate-shimmer mb-3" />
          <div className="flex items-center justify-between">
            <div className="h-3 w-32 rounded bg-muted animate-shimmer" />
            <div className="h-3 w-16 rounded bg-muted animate-shimmer" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-3 flex gap-3">
        <div className="h-16 w-16 shrink-0 rounded-md bg-muted animate-shimmer" />
        <div className="flex-1">
          <div className="h-4 w-full rounded bg-muted animate-shimmer mb-2" />
          <div className="h-4 w-3/4 rounded bg-muted animate-shimmer mb-2" />
          <div className="h-3 w-20 rounded bg-muted animate-shimmer" />
        </div>
      </CardContent>
    </Card>
  );
}
