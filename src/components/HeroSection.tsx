import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-warm-100 to-warm-200">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
          Discover Delicious<br />
          <span className="text-primary">Recipes</span> Daily
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore thousands of recipes from around the world. From quick weeknight dinners to gourmet weekend projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search recipes, ingredients..." 
              className="pl-10 h-12 bg-background/80 backdrop-blur-sm"
            />
          </div>
          <Button size="lg" className="h-12 px-8">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
