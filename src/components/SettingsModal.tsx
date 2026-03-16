import React, { useState } from "react";
import { X, User, Palette, Cpu, Wrench, Settings, ShieldAlert } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen) return null;

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "models", label: "Models", icon: Cpu },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "system", label: "System", icon: Settings },
    { id: "audit", label: "Audit Logs", icon: ShieldAlert },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card text-card-foreground w-full max-w-4xl h-[80vh] rounded-xl shadow-2xl flex overflow-hidden border border-border animate-in zoom-in-95 duration-200">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <h2 className="font-semibold text-sidebar-foreground">Settings</h2>
            <button onClick={onClose} className="md:hidden text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col bg-background relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hidden md:block">
            <X size={20} />
          </button>
          
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "profile" && (
              <div className="space-y-6 max-w-md" data-usecases="UC_002">
                <h3 className="text-xl font-semibold">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <input type="text" defaultValue="Oceanic User" className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" defaultValue="user@oceanic.ai" className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring" />
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">Save Changes</button>
                </div>
                <div className="pt-6 border-t border-border" data-usecases="UC_005">
                  <h4 className="text-red-500 font-medium mb-2">Danger Zone</h4>
                  <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90">Deactivate Account</button>
                </div>
              </div>
            )}

            {activeTab === "theme" && (
              <div className="space-y-6 max-w-md" data-usecases="UC_130,UC_134">
                <h3 className="text-xl font-semibold">Theme Customization</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="border-2 border-primary rounded-lg p-4 flex flex-col items-center gap-2 bg-background">
                        <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                        <span className="text-sm font-medium">Maritime Dark</span>
                      </button>
                      <button className="border border-border rounded-lg p-4 flex flex-col items-center gap-2 bg-background hover:border-primary/50">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-border"></div>
                        <span className="text-sm font-medium">Maritime Light</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "models" && (
              <div className="space-y-6" data-usecases="UC_051,UC_204,UC_232">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">AI Models</h3>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">Register Model</button>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary text-secondary-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Model Name</th>
                        <th className="px-4 py-3 font-medium">Provider</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-background">
                        <td className="px-4 py-3 font-medium">GPT-4 Oceanic</td>
                        <td className="px-4 py-3 text-muted-foreground">OpenAI</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">Active</span></td>
                        <td className="px-4 py-3"><button className="text-primary hover:underline">Edit</button></td>
                      </tr>
                      <tr className="bg-background">
                        <td className="px-4 py-3 font-medium">Claude 3 Opus</td>
                        <td className="px-4 py-3 text-muted-foreground">Anthropic</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">Inactive</span></td>
                        <td className="px-4 py-3"><button className="text-primary hover:underline">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-6" data-usecases="UC_093,UC_209,UC_232">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">External Tools</h3>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">Add Tool</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Web Search</h4>
                      <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">Enabled</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Allows the AI to search the web for real-time information.</p>
                    <button className="text-sm text-primary hover:underline">Configure</button>
                  </div>
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Code Execution</h4>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">Disabled</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Run Python code in a secure sandbox environment.</p>
                    <button className="text-sm text-primary hover:underline">Configure</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6" data-usecases="UC_220,UC_214,UC_226">
                <h3 className="text-xl font-semibold">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                    <div>
                      <h4 className="font-medium">Debug Mode</h4>
                      <p className="text-sm text-muted-foreground">Enable verbose logging for troubleshooting.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                    <div>
                      <h4 className="font-medium">Experimental Features</h4>
                      <p className="text-sm text-muted-foreground">Enable beta features before they are released.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-6" data-usecases="UC_024,UC_227">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Audit Logs</h3>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Search logs..." className="px-3 py-1.5 text-sm rounded-md border border-input bg-background" />
                    <button className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm hover:bg-secondary/80">Filter</button>
                  </div>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary text-secondary-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Timestamp</th>
                        <th className="px-4 py-3 font-medium">Event</th>
                        <th className="px-4 py-3 font-medium">User</th>
                        <th className="px-4 py-3 font-medium">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-background">
                        <td className="px-4 py-3 text-muted-foreground">2023-10-27 14:32:01</td>
                        <td className="px-4 py-3">User Login</td>
                        <td className="px-4 py-3">admin@oceanic.ai</td>
                        <td className="px-4 py-3 text-muted-foreground">192.168.1.1</td>
                      </tr>
                      <tr className="bg-background">
                        <td className="px-4 py-3 text-muted-foreground">2023-10-27 14:30:45</td>
                        <td className="px-4 py-3">Model Config Updated</td>
                        <td className="px-4 py-3">admin@oceanic.ai</td>
                        <td className="px-4 py-3 text-muted-foreground">192.168.1.1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
