import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SessionProvider } from "@/context/session";
import Dashboard from "@/pages/Dashboard";
import PropertiesPage from "@/pages/Properties";
import TenantsPage from "@/pages/Tenants";
import MaintenancePage from "@/pages/Maintenance";
import FinancialsPage from "@/pages/Financials";
import OwnersPage from "@/pages/Owners";
import MessagesPage from "@/pages/Messages";
import AuditPage from "@/pages/Audit";
import SettingsPage from "@/pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/financials" element={<FinancialsPage />} />
            <Route path="/owners" element={<OwnersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionProvider>
  </QueryClientProvider>
);

export default App;
