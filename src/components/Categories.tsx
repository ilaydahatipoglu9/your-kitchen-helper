import { Utensils, Fish, Salad, Cake, Soup, Drumstick } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  { title: "Pasta", icon: Utensils, recipeCount: 128, gradient: "bg-gradient-to-br from-primary to-primary/80" },
  { title: "Seafood", icon: Fish, recipeCount: 86, gradient: "bg-gradient-to-br from-accent to-accent/80" },
  { title: "Salads", icon: Salad, recipeCount: 94, gradient: "bg-gradient-to-br from-sage-500 to-sage-600" },
  { title: "Desserts", icon: Cake, recipeCount: 156, gradient: "bg-gradient-to-br from-warm-400 to-warm-500" },
  { title: "Soups", icon: Soup, recipeCount: 72, gradient: "bg-gradient-to-br from-terracotta-400 to-terracotta-500" },
  { title: "Poultry", icon: Drumstick, recipeCount: 112, gradient: "bg-gradient-to-br from-cream-400 to-cream-500" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect recipe for any craving or occasion
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
