import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { RightSidebar } from "./RightSidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  showRightSidebar?: boolean;
}

export function MainLayout({ showRightSidebar = true }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main
          className={cn(
            "flex-1 min-h-[calc(100vh-4rem)] pb-20 lg:pb-0 lg:ml-64",
            showRightSidebar && "xl:mr-80"
          )}
          role="main"
        >
          <div className="container mx-auto px-4 py-6 lg:px-6">
            <Outlet />
          </div>
        </main>

        {showRightSidebar && <RightSidebar />}
      </div>

      <BottomNav />
    </div>
  );
}
