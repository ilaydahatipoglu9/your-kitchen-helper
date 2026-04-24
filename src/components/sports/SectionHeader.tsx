import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

const SectionHeader = ({
  title,
  seeAllHref,
  seeAllLabel = "See All",
  icon,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground md:text-2xl">
        {icon}
        {title}
      </h2>
      
      {seeAllHref && (
        <Link
          to={seeAllHref}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {seeAllLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
