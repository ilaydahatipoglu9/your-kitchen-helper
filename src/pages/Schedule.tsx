import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { UpcomingMatchCard } from "@/components/matches/UpcomingMatchCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { mockUpcomingMatches } from "@/data/mockData";

const leagues = [
  "All",
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Ligue 1",
];

const dates = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [selectedDate, setSelectedDate] = useState("week");
  const [upcomingMatches, setUpcomingMatches] = useState(mockUpcomingMatches);

  const filteredMatches =
    selectedLeague === "All"
      ? upcomingMatches
      : upcomingMatches.filter((match) => match.league === selectedLeague);

  const handleSetNotification = (matchId: string) => {
    setUpcomingMatches((prev) =>
      prev.map((match) =>
        match.id === matchId
          ? { ...match, isNotificationSet: !match.isNotificationSet }
          : match
      )
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-info" />
            <h1 className="text-2xl font-bold">Match Schedule</h1>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {dates.map((date) => (
            <Button
              key={date.value}
              variant={selectedDate === date.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDate(date.value)}
              className="shrink-0"
            >
              {date.label}
            </Button>
          ))}
        </div>

        {/* League Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {leagues.map((league) => (
            <Button
              key={league}
              variant={selectedLeague === league ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedLeague(league)}
              className="shrink-0"
            >
              {league}
            </Button>
          ))}
        </div>

        {/* Matches Grid */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} variant="match" />
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMatches.map((match) => (
              <UpcomingMatchCard
                key={match.id}
                match={match}
                onSetNotification={handleSetNotification}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type="no-upcoming-matches"
            onAction={() => setSelectedLeague("All")}
            actionLabel="View All Leagues"
          />
        )}
      </div>
    </MainLayout>
  );
}
