import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LocationProvider } from "@/hooks/useLocation";
import { ProfileProvider } from "@/hooks/useProfile";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import ProviderRegister from "./pages/ProviderRegister";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProviderProfile from "./pages/ProviderProfile";
import BookVisit from "./pages/BookVisit";
import BookAppointment from "./pages/BookAppointment";
import CategoryPage from "./pages/CategoryPage";
import SymptomChecker from "./pages/SymptomChecker";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProfileProvider>
        <LocationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/providers/:id" element={<ProviderProfile />} />
                <Route path="/book-visit" element={<BookVisit />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/symptoms" element={<SymptomChecker />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/provider-register" element={<ProviderRegister />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LocationProvider>
      </ProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
