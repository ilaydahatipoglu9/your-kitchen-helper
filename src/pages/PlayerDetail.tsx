import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Flag,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCardSkeleton } from "@/components/ui/skeleton-loader";
import { useToast } from "@/hooks/use-toast";
import { mockPlayers } from "@/data/mockData";

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const player = mockPlayers.find((p) => p.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing
        ? `You are no longer following ${player?.name}`
        : `You are now following ${player?.name}`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="font-heading text-xl font-bold">Player not found</h2>
        <p className="text-muted-foreground">
          The player you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-usecases="UC_042">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Player Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Player Photo */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 md:h-32 md:w-32">
              <span className="text-4xl font-bold text-primary md:text-5xl">
                {player.name.charAt(0)}
              </span>
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-2xl font-bold md:text-3xl">
                {player.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {player.team}
                </Badge>
                <Badge variant="outline">{player.position}</Badge>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <span className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  {player.nationality}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Age: 28
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  #10
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <Button
              variant={isFollowing ? "secondary" : "default"}
              onClick={handleFollow}
              className="min-w-[120px]"
              data-usecases="UC_007,UC_008"
            >
              <Star className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Player Content Tabs */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary">25</p>
                <p className="text-sm text-muted-foreground">Appearances</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-success">18</p>
                <p className="text-sm text-muted-foreground">Goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-amber-500">12</p>
                <p className="text-sm text-muted-foreground">Assists</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-secondary">8.5</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Season Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minutes Played</span>
                  <span className="font-bold">2,150</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shots on Target</span>
                  <span className="font-bold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pass Accuracy</span>
                  <span className="font-bold">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Yellow Cards</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Red Cards</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Tab */}
        <TabsContent value="career" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Career History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { team: player.team, years: "2023 - Present", apps: 25, goals: 18 },
                  { team: "Previous Club", years: "2020 - 2023", apps: 120, goals: 85 },
                  { team: "Youth Academy", years: "2015 - 2020", apps: 80, goals: 45 },
                ].map((career, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{career.team}</p>
                      <p className="text-sm text-muted-foreground">{career.years}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{career.apps} Apps</p>
                      <p className="text-sm text-muted-foreground">{career.goals} Goals</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Honors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <Trophy className="mr-1 h-3 w-3" />
                  League Champion x2
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Trophy className="mr-1 h-3 w-3" />
                  Cup Winner
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Star className="mr-1 h-3 w-3" />
                  Player of the Year
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Player scores hat-trick in weekend victory",
                    date: "2 hours ago",
                  },
                  {
                    title: "Contract extension talks underway",
                    date: "1 day ago",
                  },
                  {
                    title: "Named in Team of the Week",
                    date: "3 days ago",
                  },
                ].map((news, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 transition-colors hover:bg-accent cursor-pointer"
                  >
                    <p className="font-medium">{news.title}</p>
                    <p className="text-sm text-muted-foreground">{news.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerDetail;
