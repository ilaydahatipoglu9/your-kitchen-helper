import { cn } from "@/lib/utils";

type StatusType = "live" | "upcoming" | "finished" | "default";

interface BadgeStatusProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

export function BadgeStatus({ status, children, className }: BadgeStatusProps) {
  const statusStyles: Record<StatusType, string> = {
    live: "bg-maritime-live text-white animate-pulse",
    upcoming: "bg-maritime-warning text-white",
    finished: "bg-muted text-muted-foreground",
    default: "bg-secondary text-secondary-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {status === "live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-white live-pulse" />
      )}
      {children}
    </span>
  );
}
