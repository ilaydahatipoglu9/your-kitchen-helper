import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        {/* Maritime-themed illustration */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Compass className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Lost at Sea
        </h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for seems to have drifted away. 
          Let's navigate you back to familiar waters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Link to="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Return to Workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
