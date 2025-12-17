import { Heart, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  title: string;
  image: string;
  category: string;
  time: string;
  servings: number;
  isLiked?: boolean;
}

const RecipeCard = ({ title, image, category, time, servings, isLiked = false }: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
          {category}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 bg-background/90 hover:bg-background"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {time}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {servings} servings
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
