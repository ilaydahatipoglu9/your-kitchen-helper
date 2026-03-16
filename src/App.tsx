import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EvaluationWorkspace from "./pages/EvaluationWorkspace";
import ModelsPage from "./pages/ModelsPage";
import PromptsPage from "./pages/PromptsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import StatusPage from "./pages/StatusPage";
import AuthPage from "./pages/AuthPage";
import BenchmarkDashboard from "./pages/BenchmarkDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EvaluationWorkspace />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/benchmarks" element={<BenchmarkDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
