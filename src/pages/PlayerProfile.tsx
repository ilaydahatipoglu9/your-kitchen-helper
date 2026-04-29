import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, HeartOff, User, Trophy, Flag, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common";
import { cn } from "@/lib/utils";
import { mockPlayers } from "@/data/mockData";

export default function PlayerProfile() {
  const { playerId } = useParams<{ playerId: string }>();
  const player = mockPlayers.find((p) => p.id === playerId);
  const [isFollowed, setIsFollowed] = useState(player?.isFollowed ?? false);

  if (!player) {
    return (
      <div className="space-y-6">
        <Link to="/players">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Players
          </Button>
        </Link>
        <EmptyState
          type="custom"
          title="Player not found"
          description="The player you're looking for doesn't exist."
          action={{
            label: "Browse Players",
            onClick: () => window.location.href = "/players",
          }}
        />
      </div>
    );
  }

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="space-y-6" data-usecases="UC_042">
      {/* Back Button */}
      <Link to="/players">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Players
        </Button>
      </Link>

      {/* Player Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Player Photo */}
            <div className="relative">
              {player.photo ? (
                <img
                  src={player.photo}
                  alt={player.name}
                  className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground font-bold text-3xl">
                  {player.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                </div>
              )}
              {player.jerseyNumber && (
                <Badge className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 flex items-center justify-center text-lg">
                  {player.jerseyNumber}
                </Badge>
              )}
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-2xl font-heading font-bold">{player.name}</h1>
                {player.position && (
                  <Badge variant="outline">{player.position}</Badge>
                )}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                {player.team && (
                  <Link 
                    to={`/teams/${player.team.id}`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <User className="h-4 w-4" />
                    {player.team.name}
                  </Link>
                )}
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {player.sport}
                </span>
                {player.nationality && (
                  <span className="flex items-center gap-1">
                    <Flag className="h-4 w-4" />
                    {player.nationality}
                  </span>
                )}
                {player.jerseyNumber && (
                  <span className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    {player.jerseyNumber}
                  </span>
                )}
              </div>

              {/* Follow Button */}
              <Button
                variant={isFollowed ? "default" : "outline"}
                onClick={handleFollowToggle}
                className={cn(isFollowed && "bg-primary hover:bg-primary/90")}
                data-usecases="UC_007,UC_008"
              >
                {isFollowed ? (
                  <>
                    <HeartOff className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Player
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Player Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">25</p>
            <p className="text-sm text-muted-foreground">Appearances</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-success">12</p>
            <p className="text-sm text-muted-foreground">Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Assists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">7.8</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats" data-usecases="UC_042">
            Statistics
          </TabsTrigger>
          <TabsTrigger value="career" data-usecases="UC_042">
            Career
          </TabsTrigger>
        </TabsList>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Season Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">Attacking</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assists</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shots per Game</span>
                      <span className="font-bold">3.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Key Passes</span>
                      <span className="font-bold">2.1</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">General</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minutes Played</span>
                      <span className="font-bold">2,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pass Accuracy</span>
                      <span className="font-bold">84%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dribbles per Game</span>
                      <span className="font-bold">4.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fouls Won</span>
                      <span className="font-bold">2.8</span>
                    </div>
                  </div>
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
                {player.team && (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {player.team.name.substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{player.team.name}</p>
                      <p className="text-sm text-muted-foreground">2022 - Present</p>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                )}
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                    FC
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Former Club</p>
                    <p className="text-sm text-muted-foreground">2019 - 2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                    YA
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Youth Academy</p>
                    <p className="text-sm text-muted-foreground">2015 - 2019</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
