import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/notifications/ToastProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/datapulse/", element: <Dashboard /> },
      { path: "/datapulse/users", element: <Users /> },
      { path: "/datapulse/analytics", element: <Analytics /> },
      { path: "/datapulse/reports", element: <Reports /> },
      { path: "/datapulse/performance", element: <Performance /> },
      { path: "/datapulse/settings", element: <Settings /> },
      { path: "/datapulse/notifications", element: <Dashboard /> },
      { path: "/datapulse/profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SettingsProvider>
        <TooltipProvider>
          <ToastProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </ToastProvider>
        </TooltipProvider>
      </SettingsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
