import { X, User, Mail, Lock, LogOut, Trash2 } from "lucide-react";
// eslint-disable-next-line import/no-unresolved
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ isOpen, onClose }: UserProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          data-usecases="UC_001,UC_002,UC_003,UC_004,UC_005,UC_269"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/50">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <User className="text-primary" />
                My Profile
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close Profile"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-foreground border-4 border-primary/20">
                  JD
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    disabled={!isEditing}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                    data-usecases="UC_003"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    disabled={!isEditing}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                    data-usecases="UC_003"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                      data-usecases="UC_003"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium flex items-center justify-center gap-2"
                    data-usecases="UC_003"
                  >
                    Edit Profile
                  </button>
                )}

                <button
                  className="w-full px-4 py-2 rounded-md border border-border text-foreground hover:bg-secondary/50 transition-colors font-medium flex items-center justify-center gap-2"
                  data-usecases="UC_269"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>

                <button
                  className="w-full px-4 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors font-medium flex items-center justify-center gap-2 mt-4"
                  data-usecases="UC_004"
                >
                  <Trash2 size={18} />
                  Deactivate Account
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
