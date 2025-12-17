import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const popularRecipes = [
  {
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80",
    rating: 4.9,
    reviews: 2341,
    time: "45 min",
  },
  {
    title: "Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80",
    rating: 4.8,
    reviews: 1892,
    time: "35 min",
  },
  {
    title: "Fluffy Pancakes",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    rating: 4.7,
    reviews: 3156,
    time: "20 min",
  },
  {
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80",
    rating: 4.6,
    reviews: 1547,
    time: "10 min",
  },
];

const PopularRecipes = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Most Popular
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recipes loved by thousands of home cooks around the world
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRecipes.map((recipe, index) => (
            <Card key={index} className="group cursor-pointer border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{recipe.rating}</span>
                    <span className="text-muted-foreground">({recipe.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {recipe.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
