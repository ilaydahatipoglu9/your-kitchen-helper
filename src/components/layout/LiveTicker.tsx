// eslint-disable-next-line import/no-unresolved
import { motion } from "framer-motion";

const mockLiveScores = [
  { id: 1, home: "LAL", away: "BOS", homeScore: 102, awayScore: 98, time: "Q4 2:15", status: "live" },
  { id: 2, home: "NYK", away: "MIA", homeScore: 88, awayScore: 90, time: "Q3 5:00", status: "live" },
  { id: 3, home: "GSW", away: "PHX", homeScore: 115, awayScore: 110, time: "Final", status: "finished" },
  { id: 4, home: "CHI", away: "MIL", homeScore: 45, awayScore: 50, time: "Halftime", status: "live" },
  { id: 5, home: "DAL", away: "DEN", homeScore: 0, awayScore: 0, time: "8:00 PM", status: "upcoming" },
];

export const LiveTicker = () => {
  return (
    <div
      className="w-full bg-card border-b border-border h-14 flex items-center overflow-hidden relative"
      data-usecases="UC_048,UC_086"
      aria-live="polite"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 px-4 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...mockLiveScores, ...mockLiveScores].map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            className="flex items-center gap-3 px-4 py-1 rounded-md bg-background/50 border border-border min-w-[200px]"
          >
            <div className="flex flex-col text-sm font-medium">
              <div className="flex justify-between gap-4">
                <span className="text-foreground">{game.home}</span>
                <span className="text-foreground">{game.homeScore}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">{game.away}</span>
                <span className="text-muted-foreground">{game.awayScore}</span>
              </div>
            </div>
            <div className="flex flex-col items-end ml-auto text-xs">
              {game.status === "live" && (
                <span className="text-red-500 font-bold animate-pulse flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  LIVE
                </span>
              )}
              <span className="text-muted-foreground">{game.time}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
