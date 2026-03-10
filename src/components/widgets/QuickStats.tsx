import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamStat {
  id: string;
  name: string;
  logo?: string;
  stat: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  change?: string;
}

interface QuickStatsProps {
  stats: TeamStat[];
  title?: string;
  className?: string;
}

export function QuickStats({
  stats,
  title = "Quick Stats",
  className,
}: QuickStatsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-between gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                {stat.logo ? (
                  <img
                    src={stat.logo}
                    alt={stat.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold text-muted-foreground">
                    {stat.name.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{stat.name}</p>
                <p className="text-xs text-muted-foreground">{stat.stat}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold">{stat.value}</p>
              {stat.trend && stat.change && (
                <div
                  className={cn(
                    "flex items-center justify-end gap-0.5 text-xs",
                    stat.trend === "up" && "text-success",
                    stat.trend === "down" && "text-destructive",
                    stat.trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                  {stat.trend === "neutral" && <Minus className="h-3 w-3" />}
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
