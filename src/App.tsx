import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import LiveScores from "./pages/LiveScores";
import MySports from "./pages/MySports";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Notifications from "./pages/Notifications";
import MatchDetail from "./pages/MatchDetail";
import TeamDetail from "./pages/TeamDetail";
import PlayerDetail from "./pages/PlayerDetail";
import LeagueDetail from "./pages/LeagueDetail";
import ContentDetail from "./pages/ContentDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DataSources from "./pages/admin/DataSources";
import AlertRules from "./pages/admin/AlertRules";
import UserManagement from "./pages/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main App Routes - With Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live" element={<LiveScores />} />
            <Route path="/my-sports" element={<MySports />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/team/:id" element={<TeamDetail />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
            <Route path="/league/:id" element={<LeagueDetail />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/data-sources" element={<DataSources />} />
            <Route path="/admin/alerts" element={<AlertRules />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
