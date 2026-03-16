import { X, Activity, BarChart2, Clock } from "lucide-react";
// eslint-disable-next-line import/no-unresolved
import { motion, AnimatePresence } from "framer-motion";

interface DeepDivePanelProps {
  matchId: string | null;
  onClose: () => void;
}

export const DeepDivePanel = ({ matchId, onClose }: DeepDivePanelProps) => {
  return (
    <AnimatePresence>
      {matchId && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-96 bg-card border-l border-border h-full flex flex-col shadow-2xl z-20"
          data-usecases="UC_041,UC_086"
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/50">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Match Details
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Panel"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Score Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                    LAL
                  </div>
                  <span className="font-medium text-foreground">Lakers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-foreground">102 - 98</span>
                  <span className="text-red-500 font-bold text-sm animate-pulse mt-1">Q4 2:15</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                    BOS
                  </div>
                  <span className="font-medium text-foreground">Celtics</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart2 size={18} className="text-primary" />
                Team Statistics
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Field Goal %", home: "48%", away: "45%", homeVal: 48, awayVal: 45 },
                  { label: "3-Point %", home: "35%", away: "38%", homeVal: 35, awayVal: 38 },
                  { label: "Rebounds", home: "42", away: "39", homeVal: 42, awayVal: 39 },
                  { label: "Assists", home: "24", away: "21", homeVal: 24, awayVal: 21 },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{stat.home}</span>
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="text-foreground font-medium">{stat.away}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-secondary">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${(stat.homeVal / (stat.homeVal + stat.awayVal)) * 100}%` }}
                      />
                      <div
                        className="bg-muted-foreground/30 h-full"
                        style={{ width: `${(stat.awayVal / (stat.homeVal + stat.awayVal)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                Play-by-Play
              </h4>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {[
                  { time: "2:15", team: "LAL", event: "LeBron James makes 2-pt layup" },
                  { time: "2:40", team: "BOS", event: "Jayson Tatum misses 3-pt jump shot" },
                  { time: "3:05", team: "LAL", event: "Anthony Davis defensive rebound" },
                ].map((play, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-xs font-bold text-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {play.team}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-border bg-secondary/30 shadow">
                      <div className="flex items-center justify-between mb-1">
                        <time className="text-xs font-medium text-primary">{play.time}</time>
                      </div>
                      <div className="text-sm text-foreground">{play.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
