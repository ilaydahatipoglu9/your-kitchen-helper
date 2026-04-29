import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer rounded bg-muted", className)}
    />
  );
}

export function LiveMatchCardSkeleton() {
  return (
    <Card className="overflow-hidden border-l-4 border-l-muted">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* Teams */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UpcomingMatchCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-8" />
          <div className="flex flex-col items-center gap-2 flex-1">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Date/time */}
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentResultCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Teams */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-6 w-6" />
          </div>
        </div>

        {/* Date */}
        <div className="flex justify-center mt-3">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-1" />
        <Skeleton className="h-3 w-20 mt-2" />
      </CardContent>
    </Card>
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {/* Live matches section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid gap-4 md:grid-cols-2">
          <LiveMatchCardSkeleton />
          <LiveMatchCardSkeleton />
        </div>
      </div>

      {/* Upcoming matches section */}
      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UpcomingMatchCardSkeleton />
          <UpcomingMatchCardSkeleton />
          <UpcomingMatchCardSkeleton />
        </div>
      </div>

      {/* Recent results section */}
      <div>
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RecentResultCardSkeleton />
          <RecentResultCardSkeleton />
          <RecentResultCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
