import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  recipeCount: number;
  gradient: string;
}

const CategoryCard = ({ title, icon: Icon, recipeCount, gradient }: CategoryCardProps) => {
  return (
    <Card className={`group cursor-pointer overflow-hidden border-0 ${gradient} hover:scale-105 transition-all duration-300`}>
      <CardContent className="p-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-background/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="h-7 w-7 text-background" />
        </div>
        <h3 className="font-display text-lg font-semibold text-background mb-1">
          {title}
        </h3>
        <p className="text-sm text-background/80">
          {recipeCount} recipes
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
