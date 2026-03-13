import { MatchCard } from "./MatchCard";

const mockMatches = [
  {
    id: "1",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Boston Celtics",
    homeScore: 102,
    awayScore: 98,
    status: "LIVE",
    time: "Q4 2:15",
    league: "NBA",
    isFollowed: true,
  },
  {
    id: "2",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    status: "LIVE",
    time: "75'",
    league: "Premier League",
    isFollowed: true,
  },
  {
    id: "3",
    homeTeam: "New York Yankees",
    awayTeam: "Boston Red Sox",
    homeScore: 4,
    awayScore: 3,
    status: "Finished",
    time: "Final",
    league: "MLB",
    isFollowed: false,
  },
  {
    id: "4",
    homeTeam: "Dallas Cowboys",
    awayTeam: "Philadelphia Eagles",
    homeScore: 0,
    awayScore: 0,
    status: "Upcoming",
    time: "Sun 8:20 PM",
    league: "NFL",
    isFollowed: true,
  },
];

interface CentralFeedProps {
  onMatchSelect: (matchId: string) => void;
}

export const CentralFeed = ({ onMatchSelect }: CentralFeedProps) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-background" data-usecases="UC_041,UC_086">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Followed Teams & Live Matches</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground font-medium">
              All
            </button>
            <button className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors">
              Live
            </button>
            <button className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors">
              Upcoming
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onClick={() => onMatchSelect(match.id)}
            />
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-foreground mb-4">Trending News</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-24 h-24 bg-secondary rounded-md flex-shrink-0" />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                      Breaking News
                    </span>
                    <h4 className="text-lg font-medium text-foreground leading-tight">
                      Major trade shakes up the league as deadline approaches
                    </h4>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
