import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-2xl">Sports Hub</span>
        </Link>
        
        {/* 404 Message */}
        <h1 className="font-heading font-bold text-8xl text-primary mb-4">404</h1>
        <h2 className="font-heading font-semibold text-2xl mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/search">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Link>
          </Button>
        </div>
        
        {/* Back Link */}
        <button 
          onClick={() => window.history.back()} 
          className="mt-6 text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
