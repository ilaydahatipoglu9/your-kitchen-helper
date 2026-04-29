import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  useCases?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  icon,
  viewAllHref, 
  viewAllLabel = "View All",
  className,
  useCases
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-heading font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      
      {viewAllHref && (
        <Link 
          to={viewAllHref}
          className="flex items-center gap-1 text-sm text-primary hover:underline"
          data-usecases={useCases}
        >
          {viewAllLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
