import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
            <span className="font-heading text-6xl font-bold text-primary">404</span>
          </div>
        </div>

        <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might have
          been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Tried to access: <code className="rounded bg-muted px-2 py-1">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
