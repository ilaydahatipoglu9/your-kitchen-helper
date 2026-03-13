import { X, Bell, Star, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface UserPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserPreferenceModal = ({ isOpen, onClose }: UserPreferenceModalProps) => {
  const [activeTab, setActiveTab] = useState("following");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          data-usecases="UC_008,UC_020,UC_141"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/50">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Settings className="text-primary" />
                Preferences
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close Preferences"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 border-r border-border bg-secondary/20 p-4 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("following")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === "following"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Star size={20} />
                  Following
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === "notifications"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Bell size={20} />
                  Notifications
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === "following" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Manage Following</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Los Angeles Lakers", type: "Team", sport: "Basketball" },
                        { name: "Manchester City", type: "Team", sport: "Soccer" },
                        { name: "LeBron James", type: "Player", sport: "Basketball" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-foreground">
                              {item.name.substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-lg">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.type} • {item.sport}
                              </div>
                            </div>
                          </div>
                          <button
                            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors font-medium text-sm"
                            data-usecases="UC_008"
                          >
                            Unfollow
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Notification Settings</h3>
                    <div className="space-y-6">
                      {[
                        { title: "Live Match Updates", desc: "Get notified when a match starts, ends, or has a major event." },
                        { title: "Breaking News", desc: "Receive alerts for major news regarding your followed teams." },
                        { title: "Daily Summary", desc: "A daily digest of scores and upcoming matches." },
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                          <div>
                            <div className="font-medium text-foreground text-lg">{setting.title}</div>
                            <div className="text-sm text-muted-foreground">{setting.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer" data-usecases="UC_020">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
