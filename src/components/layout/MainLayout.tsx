import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import BottomTabBar from "./BottomTabBar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  showSidebar?: boolean;
  children?: React.ReactNode;
}

const MainLayout = ({ showSidebar = true, children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        )}
        
        <main
          className={cn(
            "flex-1 pb-20 lg:pb-0",
            showSidebar && "lg:ml-0"
          )}
        >
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default MainLayout;
