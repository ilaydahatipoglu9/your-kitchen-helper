import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Radio, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-8">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <Radio className="h-6 w-6 text-primary-foreground" />
        </div>
        <span>Sports Hub</span>
      </Link>

      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/discover" className="gap-2">
              <Search className="h-4 w-4" />
              Discover
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
