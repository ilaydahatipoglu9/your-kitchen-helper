import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 shimmer rounded" />
        <div className="h-5 w-16 shimmer rounded-full" />
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shimmer rounded-full" />
          <div className="h-5 w-24 shimmer rounded" />
        </div>
        <div className="h-8 w-12 shimmer rounded" />
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shimmer rounded-full" />
          <div className="h-5 w-24 shimmer rounded" />
        </div>
        <div className="h-8 w-12 shimmer rounded" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-32 shimmer rounded" />
        <div className="h-8 w-20 shimmer rounded" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="h-12 w-12 shimmer rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 shimmer rounded" />
            <div className="h-3 w-1/2 shimmer rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
