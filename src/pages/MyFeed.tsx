import { useState } from "react";
import { Rss, Filter, ChevronDown, Heart, MessageCircle, Share2, Bookmark, Clock, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonList } from "@/components/ui/skeleton-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FeedItem {
  id: string;
  type: "news" | "highlight" | "stats" | "update";
  title: string;
  description: string;
  source: string;
  timestamp: string;
  image?: string;
  team?: string;
  league?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

// Mock feed data
const mockFeedItems: FeedItem[] = [
  {
    id: "1",
    type: "news",
    title: "Manchester United secures crucial victory against Liverpool",
    description: "In a thrilling match at Old Trafford, Manchester United came from behind to secure a 2-1 victory against their rivals Liverpool. The winning goal came in the 87th minute...",
    source: "Sports Daily",
    timestamp: "2 hours ago",
    team: "Manchester United",
    league: "Premier League",
    likes: 1245,
    comments: 89,
    isLiked: true,
  },
  {
    id: "2",
    type: "highlight",
    title: "Top 10 Goals of the Week - Premier League",
    description: "Watch the best goals from this week's Premier League action, featuring stunning strikes from across the league.",
    source: "Premier League",
    timestamp: "4 hours ago",
    league: "Premier League",
    likes: 3421,
    comments: 156,
  },
  {
    id: "3",
    type: "stats",
    title: "LeBron James reaches another milestone",
    description: "LeBron James has become the first player in NBA history to reach 40,000 career points, cementing his legacy as one of the greatest players of all time.",
    source: "NBA Official",
    timestamp: "6 hours ago",
    team: "LA Lakers",
    league: "NBA",
    likes: 8932,
    comments: 423,
    isSaved: true,
  },
  {
    id: "4",
    type: "update",
    title: "Transfer News: Real Madrid interested in young talent",
    description: "Real Madrid are reportedly in talks to sign one of Europe's most promising young talents ahead of the summer transfer window.",
    source: "Transfer Central",
    timestamp: "8 hours ago",
    team: "Real Madrid",
    league: "La Liga",
    likes: 2156,
    comments: 234,
  },
  {
    id: "5",
    type: "news",
    title: "Wimbledon 2024: Draw announced",
    description: "The draw for Wimbledon 2024 has been announced, with defending champion facing a tough path to retain his title.",
    source: "Tennis World",
    timestamp: "12 hours ago",
    league: "ATP Tour",
    likes: 1567,
    comments: 78,
  },
  {
    id: "6",
    type: "highlight",
    title: "Barcelona's incredible comeback in El Clasico",
    description: "Relive Barcelona's stunning 4-3 comeback victory against Real Madrid in one of the most memorable El Clasico matches in recent history.",
    source: "La Liga",
    timestamp: "1 day ago",
    team: "Barcelona",
    league: "La Liga",
    likes: 12453,
    comments: 892,
    isLiked: true,
    isSaved: true,
  },
];

const contentFilters = ["All Content", "News", "Highlights", "Stats", "Updates"];

export default function MyFeed() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [contentFilter, setContentFilter] = useState("All Content");
  const [isLoading, setIsLoading] = useState(false);
  const [feedItems, setFeedItems] = useState(mockFeedItems);

  const toggleLike = (id: string) => {
    setFeedItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const toggleSave = (id: string) => {
    setFeedItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const filteredItems = feedItems.filter((item) => {
    if (contentFilter === "All Content") return true;
    return item.type.toLowerCase() === contentFilter.toLowerCase().slice(0, -1);
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-blue-100 text-blue-800";
      case "highlight":
        return "bg-purple-100 text-purple-800";
      case "stats":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-content px-4 md:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Feed</h1>
            <p className="text-muted-foreground mt-1">
              Personalized content based on your preferences
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                {contentFilter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {contentFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  onClick={() => setContentFilter(filter)}
                  className={contentFilter === filter ? "bg-accent" : ""}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="for-you" className="gap-2">
              <Rss className="h-4 w-4" />
              For You
            </TabsTrigger>
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Feed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <SkeletonList count={5} />
            ) : filteredItems.length === 0 ? (
              <EmptyState
                icon={Rss}
                title="No content yet"
                description="Follow more teams, players, and leagues to see personalized content in your feed."
                actionLabel="Discover Content"
                onAction={() => window.location.href = "/discover"}
              />
            ) : (
              filteredItems
                .filter((item) => {
                  if (activeTab === "saved") return item.isSaved;
                  return true;
                })
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={cn("text-xs", getTypeColor(item.type))}>
                              {item.type}
                            </Badge>
                            {item.team && (
                              <Badge variant="outline" className="text-xs">
                                {item.team}
                              </Badge>
                            )}
                            {item.league && (
                              <Badge variant="outline" className="text-xs">
                                {item.league}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {item.timestamp}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "gap-1",
                              item.isLiked && "text-maritime-live"
                            )}
                            onClick={() => toggleLike(item.id)}
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                item.isLiked && "fill-current"
                              )}
                            />
                            {item.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {item.comments}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(item.isSaved && "text-accent")}
                            onClick={() => toggleSave(item.id)}
                          >
                            <Bookmark
                              className={cn(
                                "h-4 w-4",
                                item.isSaved && "fill-current"
                              )}
                            />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}

            {/* Load More */}
            {filteredItems.length > 0 && (
              <div className="text-center py-4">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  Trending Topics
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { topic: "#ChampionsLeague", posts: "12.5K" },
                  { topic: "#NBAPlayoffs", posts: "8.2K" },
                  { topic: "#TransferNews", posts: "6.8K" },
                  { topic: "#Wimbledon", posts: "5.4K" },
                  { topic: "#WorldCup", posts: "4.1K" },
                ].map((item) => (
                  <div
                    key={item.topic}
                    className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md -mx-2"
                  >
                    <span className="font-medium text-sm">{item.topic}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.posts} posts
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Teams */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Your Teams</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Manchester United", status: "Playing now" },
                  { name: "LA Lakers", status: "Next: Tomorrow 7PM" },
                  { name: "Real Madrid", status: "Next: Saturday 9PM" },
                ].map((team) => (
                  <div
                    key={team.name}
                    className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md -mx-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                      {team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{team.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.status}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Follows */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Suggested for You</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Barcelona", type: "Team" },
                  { name: "Kylian Mbappe", type: "Player" },
                  { name: "Serie A", type: "League" },
                ].map((suggestion) => (
                  <div
                    key={suggestion.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        {suggestion.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{suggestion.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {suggestion.type}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
