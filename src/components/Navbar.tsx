import { useState } from "react";
import { Search, Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="font-display text-2xl font-bold text-primary">
              Savory
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Recipes</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Categories</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Popular</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Recipes</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Categories</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Popular</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
