import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/90">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Get Weekly Recipe Inspiration
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Subscribe to our newsletter and receive hand-picked recipes, cooking tips, and exclusive content straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email"
            placeholder="Enter your email" 
            className="h-12 bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
          <Button variant="secondary" size="lg" className="h-12 px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
