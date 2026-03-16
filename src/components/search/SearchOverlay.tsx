import { Search, X, Filter, Star } from "lucide-react";
// eslint-disable-next-line import/no-unresolved
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-background/80 backdrop-blur-sm"
          data-usecases="UC_103,UC_118,UC_120,UC_126"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center p-4 border-b border-border bg-secondary/50">
              <Search className="text-muted-foreground mr-3" size={24} />
              <input
                type="text"
                placeholder="Search teams, players, or leagues..."
                className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => setQuery(e.e.target.value)}
                autoFocus
              />
              <button
                className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-2"
                data-usecases="UC_120"
                aria-label="Filter by Sport"
              >
                <Filter size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-2"
                aria-label="Close Search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {query ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Search Results
                  </h4>
                  {[
                    { name: "Los Angeles Lakers", type: "Team", sport: "Basketball" },
                    { name: "LeBron James", type: "Player", sport: "Basketball" },
                    { name: "Los Angeles Dodgers", type: "Team", sport: "Baseball" },
                  ].map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                          {result.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{result.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.type} • {result.sport}
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Follow"
                        data-usecases="UC_008"
                      >
                        <Star size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Recent Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Premier League", "Manchester City", "NBA Finals"].map((term, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Trending Now
                    </h4>
                    <div className="space-y-2">
                      {[
                        { name: "Champions League", type: "League" },
                        { name: "Lionel Messi", type: "Player" },
                        { name: "Golden State Warriors", type: "Team" },
                      ].map((trend, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors"
                        >
                          <Search size={16} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">{trend.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{trend.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
