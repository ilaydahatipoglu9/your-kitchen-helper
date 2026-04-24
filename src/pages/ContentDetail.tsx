import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, ExternalLink, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HeroSkeleton } from "@/components/ui/skeleton-loader";
import { useToast } from "@/hooks/use-toast";
import { trendingContent } from "@/data/mockData";

const ContentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const content = trendingContent.find((c) => c.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleShare = () => {
    toast({
      title: "Link copied",
      description: "Article link has been copied to clipboard.",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Article has been saved to your bookmarks.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <HeroSkeleton />
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="font-heading text-xl font-bold">Content not found</h2>
        <p className="text-muted-foreground">
          The article you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-usecases="UC_040">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Article Header */}
      <article className="max-w-3xl mx-auto">
        {/* Category and Meta */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary">{content.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {content.publishedAt}
          </span>
          {content.source && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              {content.source}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl font-bold md:text-4xl mb-6">
          {content.title}
        </h1>

        {/* Featured Image */}
        {content.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleBookmark}>
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        <Separator className="mb-6" />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            {content.excerpt}
          </p>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>Key Highlights</h2>
          
          <ul>
            <li>Important point about the match or event</li>
            <li>Statistics and performance metrics</li>
            <li>Expert analysis and commentary</li>
            <li>Future implications and predictions</li>
          </ul>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        {/* Related Teams/Players */}
        {(content.relatedTeams || content.relatedPlayers) && (
          <>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Related:</span>
              {content.relatedTeams?.map((team) => (
                <Badge key={team} variant="outline">
                  {team}
                </Badge>
              ))}
              {content.relatedPlayers?.map((player) => (
                <Badge key={player} variant="outline">
                  {player}
                </Badge>
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default ContentDetail;
