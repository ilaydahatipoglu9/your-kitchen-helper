import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "@/state/auth";
import { RequireAuth } from "@/components/auth/RequireAuth";
import WorkspacePage from "./pages/WorkspacePage";
import AdminConfigurationsPage from "./pages/admin/AdminConfigurationsPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";
import AdminEntitiesPage from "./pages/admin/AdminEntitiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <WorkspacePage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/configurations"
              element={
                <RequireAuth>
                  <AdminConfigurationsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/audit-logs"
              element={
                <RequireAuth>
                  <AdminAuditLogsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/entities"
              element={
                <RequireAuth>
                  <AdminEntitiesPage />
                </RequireAuth>
              }
            />

            {/* legacy starter route kept but unused */}
            <Route path="/starter" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
