import { X, Moon, Sun, Monitor, Save } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" data-usecases="UC_076,UC_082">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/30">
          <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Theme Settings */}
          <div className="space-y-3" data-usecases="UC_080">
            <label className="text-sm font-medium text-foreground">Appearance</label>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${theme === "light" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent/50"}`}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs font-medium">Light</span>
              </button>
              <button 
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${theme === "dark" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent/50"}`}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs font-medium">Dark</span>
              </button>
              <button 
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${theme === "system" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent/50"}`}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-xs font-medium">System</span>
              </button>
            </div>
          </div>

          {/* Other Settings */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Default View</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Language</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-secondary/30 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-card hover:bg-accent transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
