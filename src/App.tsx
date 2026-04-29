import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout";

// Pages
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Notifications from "./pages/Notifications";
import NotificationSettings from "./pages/NotificationSettings";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ProfilePreferences from "./pages/ProfilePreferences";
import MatchDetail from "./pages/MatchDetail";
import TeamProfile from "./pages/TeamProfile";
import PlayerProfile from "./pages/PlayerProfile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Analytics from "./pages/admin/Analytics";
import SystemHealth from "./pages/admin/SystemHealth";
import Configuration from "./pages/admin/Configuration";
import UserAccess from "./pages/admin/UserAccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (no layout) */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* Main App Routes (with layout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications/settings" element={<NotificationSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/preferences" element={<ProfilePreferences />} />
            <Route path="/matches/:matchId" element={<MatchDetail />} />
            <Route path="/teams/:teamId" element={<TeamProfile />} />
            <Route path="/teams" element={<Discover />} />
            <Route path="/players/:playerId" element={<PlayerProfile />} />
            <Route path="/players" element={<Discover />} />
            <Route path="/leagues/:leagueId" element={<Discover />} />
            <Route path="/leagues" element={<Discover />} />
            <Route path="/sports/:sportId" element={<Discover />} />
            <Route path="/sports" element={<Discover />} />
            <Route path="/news" element={<Discover />} />
            <Route path="/matches" element={<Discover />} />
          </Route>

          {/* Admin Routes (with layout, no right sidebar) */}
          <Route element={<MainLayout showRightSidebar={false} />}>
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/health" element={<SystemHealth />} />
            <Route path="/admin/config" element={<Configuration />} />
            <Route path="/admin/users" element={<UserAccess />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
