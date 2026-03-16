import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomeDashboard from "./pages/HomeDashboard";
import AdminEntities from "./pages/AdminEntities";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";
import { TopBar } from "@/components/layout/TopBar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProfilePreferencesDialog } from "@/components/profile/ProfilePreferencesDialog";
import { AuthDialogs } from "@/components/auth/AuthDialogs";

const queryClient = new QueryClient();

const App = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TopBar onOpenProfile={() => setProfileOpen(true)} />

          <div className="container max-w-[1200px] px-4 pt-4 md:hidden">
            <div className="flex items-center justify-between gap-2 rounded-lg border bg-background p-3 shadow-sm">
              <div className="text-sm font-medium">Session</div>
              <AuthDialogs signedIn={signedIn} onSignedInChange={setSignedIn} />
            </div>
          </div>

          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/admin/entities" element={<AdminEntities />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <MobileBottomNav />

          <ProfilePreferencesDialog open={profileOpen} onOpenChange={setProfileOpen} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
