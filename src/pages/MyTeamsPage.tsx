import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, Plus, X, Users, Trophy, User } from "lucide-react";
import { mockTeams, mockPlayers, mockUpcomingMatches } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Team {
  id: string;
  name: string;
  shortName: string;
  sport: string;
  league: string;
  followed: boolean;
}

interface Player {
  id: string;
  name: string;
  team: string;
  sport: string;
  position: string;
}

export default function MyTeamsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players] = useState<Player[]>(mockPlayers);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeams(mockTeams);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const followedTeams = teams.filter((team) => team.followed);
  const followedPlayers = players.slice(0, 3); // Mock followed players

  const handleUnfollow = (teamId: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, followed: false } : team
      )
    );
  };

  const handleFollow = (teamId: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, followed: true } : team
      )
    );
  };

  // Get upcoming matches for followed teams
  const upcomingForFollowed = mockUpcomingMatches.filter((match) =>
    followedTeams.some(
      (team) =>
        team.shortName === match.homeTeam.shortName ||
        team.shortName === match.awayTeam.shortName
    )
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div>
            <Skeleton className="h-7 w-32 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">My Teams</h1>
            <p className="text-sm text-muted-foreground">
              Manage your favorite teams and players
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/discover")} data-usecases="UC_007,UC_008">
          <Plus className="h-4 w-4 mr-2" />
          Add Favorites
        </Button>
      </div>

      <Tabs defaultValue="teams">
        <TabsList>
          <TabsTrigger value="teams" className="gap-2">
            <Users className="h-4 w-4" />
            Teams ({followedTeams.length})
          </TabsTrigger>
          <TabsTrigger value="players" className="gap-2">
            <User className="h-4 w-4" />
            Players ({followedPlayers.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">
            <Trophy className="h-4 w-4" />
            Upcoming ({upcomingForFollowed.length})
          </TabsTrigger>
        </TabsList>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6">
          {followedTeams.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {followedTeams.map((team) => (
                <Card key={team.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <span className="text-lg font-bold text-muted-foreground">
                            {team.shortName.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {team.league}
                          </p>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Unfollow {team.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You will no longer receive updates and notifications for this team.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleUnfollow(team.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-usecases="UC_007,UC_008"
                            >
                              Unfollow
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {team.sport}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-teams"
              onAction={() => navigate("/discover")}
            />
          )}

          {/* Suggested Teams */}
          {followedTeams.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Suggested Teams</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teams
                  .filter((team) => !team.followed)
                  .slice(0, 3)
                  .map((team) => (
                    <Card key={team.id} className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                              <span className="text-sm font-bold text-muted-foreground">
                                {team.shortName.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{team.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {team.league}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollow(team.id)}
                            data-usecases="UC_007,UC_008"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Follow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players" className="mt-6">
          {followedPlayers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {followedPlayers.map((player) => (
                <Card key={player.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {player.team}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {player.position}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {player.sport}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-teams"
              title="No Followed Players"
              description="Follow your favorite players to get personalized updates and stats."
              onAction={() => navigate("/discover")}
              actionLabel="Discover Players"
            />
          )}
        </TabsContent>

        {/* Upcoming Tab */}
        <TabsContent value="upcoming" className="mt-6">
          {upcomingForFollowed.length > 0 ? (
            <div className="space-y-3">
              {upcomingForFollowed.map((match) => (
                <Card
                  key={match.id}
                  className="card-hover cursor-pointer"
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            {format(match.startTime, "MMM d")}
                          </p>
                          <p className="font-semibold">
                            {format(match.startTime, "h:mm a")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{match.homeTeam.shortName}</span>
                          <span className="text-muted-foreground">vs</span>
                          <span className="font-medium">{match.awayTeam.shortName}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {match.league}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-schedule"
              title="No Upcoming Matches"
              description="Your followed teams don't have any scheduled matches right now."
              onAction={() => navigate("/schedules")}
              actionLabel="View All Schedules"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
