import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { MobileTabBar } from "./MobileTabBar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export function MainLayout({ children, showSidebar = true, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        
        <main
          className={cn(
            "flex-1 pb-20 md:pb-0",
            className
          )}
          role="main"
        >
          {children}
        </main>
      </div>

      <Footer />
      <MobileTabBar />
    </div>
  );
}
