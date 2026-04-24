import { useState, useEffect } from "react";
import { Activity, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/sports/MatchCard";
import SectionHeader from "@/components/sports/SectionHeader";
import EmptyState from "@/components/ui/empty-state";
import { MatchCardSkeleton } from "@/components/ui/skeleton-loader";
import { liveMatches, upcomingMatches, finishedMatches } from "@/data/mockData";
import { cn } from "@/lib/utils";

const sports = ["All", "Football", "Basketball", "Tennis", "Cricket"];

const LiveScores = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState("All");
  const [activeTab, setActiveTab] = useState("live");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filterBySport = (matches: typeof liveMatches) => {
    if (selectedSport === "All") return matches;
    return matches.filter((match) => match.sport === selectedSport);
  };

  const filteredLive = filterBySport(liveMatches);
  const filteredUpcoming = filterBySport(upcomingMatches);
  const filteredFinished = filterBySport(finishedMatches);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Live Scores</h1>
          <p className="text-muted-foreground">
            Real-time scores and updates from matches around the world
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-live animate-pulse-live" />
            {liveMatches.length} Live
          </Badge>
        </div>
      </div>

      {/* Sport Filters */}
      <div className="flex flex-wrap gap-2" data-usecases="UC_119,UC_120">
        {sports.map((sport) => (
          <Button
            key={sport}
            variant={selectedSport === sport ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSport(sport)}
            className={cn(
              "transition-all",
              selectedSport === sport && "bg-primary text-primary-foreground"
            )}
          >
            {sport}
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live
            {filteredLive.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {filteredLive.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="finished">Finished</TabsTrigger>
        </TabsList>

        {/* Live Matches */}
        <TabsContent value="live" className="mt-6" data-usecases="UC_046,UC_086,UC_048">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredLive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLive.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState type="no-live" />
          )}
        </TabsContent>

        {/* Upcoming Matches */}
        <TabsContent value="upcoming" className="mt-6" data-usecases="UC_041">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState type="no-matches" />
          )}
        </TabsContent>

        {/* Finished Matches */}
        <TabsContent value="finished" className="mt-6" data-usecases="UC_041">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredFinished.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFinished.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState type="no-matches" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveScores;
