import { X, ShieldAlert, Sliders, Download } from "lucide-react";
import { useState } from "react";

interface AuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_LOGS = [
  { id: 1, action: "File Deleted", user: "admin@oceandrive.com", target: "Q2_Report.pdf", time: "10 mins ago", status: "Success" },
  { id: 2, action: "Permission Changed", user: "admin@oceandrive.com", target: "Finance Folder", time: "1 hour ago", status: "Success" },
  { id: 3, action: "Failed Login", user: "unknown", target: "System", time: "2 hours ago", status: "Failed" },
  { id: 4, action: "File Uploaded", user: "mariner@oceandrive.com", target: "Hero_Image.png", time: "Yesterday", status: "Success" },
  { id: 5, action: "System Config Updated", user: "admin@oceandrive.com", target: "Storage Quota", time: "Oct 12, 2023", status: "Success" },
];

export default function AuditLogsModal({ isOpen, onClose }: AuditLogsModalProps) {
  const [activeTab, setActiveTab] = useState<"logs" | "config">("logs");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" data-usecases="UC_021,UC_122,UC_137">
      <div className="w-full max-w-4xl h-[80vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">System Administration</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-border px-6 bg-card">
          <button 
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "logs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Audit Logs
          </button>
          <button 
            onClick={() => setActiveTab("config")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "config" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            System Configuration
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-background">
          {activeTab === "logs" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-foreground">Recent Activity</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-card hover:bg-accent transition-colors">
                  <Download className="w-3 h-3" />
                  Export CSV
                </button>
              </div>
              
              <div className="border border-border rounded-lg overflow-hidden bg-card">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Action</th>
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Target</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LOGS.map(log => (
                      <tr key={log.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{log.action}</td>
                        <td className="px-4 py-3 text-muted-foreground">{log.user}</td>
                        <td className="px-4 py-3 text-muted-foreground">{log.target}</td>
                        <td className="px-4 py-3 text-muted-foreground">{log.time}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === "Success" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  Storage Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Default Quota (GB)</label>
                    <input type="number" defaultValue={50} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Max File Size (MB)</label>
                    <input type="number" defaultValue={1024} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-foreground">Security Policies</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-input focus:ring-primary" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Require 2FA for Admins</span>
                      <span className="text-xs text-muted-foreground">Enforce two-factor authentication for all administrative accounts.</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-input focus:ring-primary" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Log File Previews</span>
                      <span className="text-xs text-muted-foreground">Record an audit event every time a file is previewed.</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
