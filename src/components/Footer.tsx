import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Savory</h3>
            <p className="text-background/70 mb-4">
              Discover, cook, and share delicious recipes from around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Recipes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Breakfast</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Lunch</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Dinner</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Desserts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center text-background/60">
          <p>&copy; 2024 Savory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
