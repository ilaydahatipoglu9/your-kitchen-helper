import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  showRightPanel?: boolean;
  rightPanel?: React.ReactNode;
}

export function MainLayout({
  children,
  showRightPanel = false,
  rightPanel,
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-60"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar collapsed={false} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          sidebarCollapsed ? "md:ml-16" : "md:ml-60"
        )}
      >
        <TopBar
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          showMenuButton
        />

        <div className="flex flex-1">
          {/* Main Content */}
          <main
            className={cn(
              "flex-1 px-4 py-6 pb-20 md:px-6 md:pb-6 lg:px-8",
              showRightPanel && "lg:pr-4"
            )}
          >
            <div className="mx-auto max-w-dashboard">{children}</div>
          </main>

          {/* Right Contextual Panel - Desktop Only */}
          {showRightPanel && rightPanel && (
            <aside className="hidden lg:block w-80 shrink-0 border-l border-border bg-muted/30 p-6">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
