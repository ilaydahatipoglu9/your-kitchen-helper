import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    />
  );
};

// Match Card Skeleton
const MatchCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* Teams and Score */}
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex flex-1 flex-col items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Away Team */}
        <div className="flex flex-1 flex-col items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

// Content Card Skeleton
const ContentCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};

// Hero Section Skeleton
const HeroSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <Skeleton className="aspect-video md:aspect-[21/9] w-full" />
    </div>
  );
};

// Section Header Skeleton
const SectionHeaderSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
};

// Profile Card Skeleton
const ProfileCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

// Table Row Skeleton
const TableRowSkeleton = ({ columns = 4, className }: SkeletonProps & { columns?: number }) => {
  return (
    <div className={cn("flex items-center gap-4 py-3 border-b", className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
};

export {
  Skeleton,
  MatchCardSkeleton,
  ContentCardSkeleton,
  HeroSkeleton,
  SectionHeaderSkeleton,
  ProfileCardSkeleton,
  TableRowSkeleton,
};
