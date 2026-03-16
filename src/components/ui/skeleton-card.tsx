import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  showHeader?: boolean;
  lines?: number;
}

export function SkeletonCard({
  className,
  showHeader = true,
  lines = 3,
}: SkeletonCardProps) {
  return (
    <Card className={cn("animate-pulse", className)}>
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
            <div className="h-6 w-16 bg-muted rounded-full" />
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-muted rounded"
              style={{ width: `${100 - i * 15}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border rounded-lg animate-pulse">
      {/* Header */}
      <div className="border-b p-4 flex gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-muted rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b last:border-0 p-4 flex gap-4">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="h-4 bg-muted rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="h-4 w-24 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-muted rounded" />
                    <div className="h-3 w-12 bg-muted rounded" />
                  </div>
                  <div className="h-1.5 bg-muted rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
