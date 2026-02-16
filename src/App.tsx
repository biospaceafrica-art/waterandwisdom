import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import Impact from "./pages/Impact";
import WhyFundUs from "./pages/WhyFundUs";
import Contact from "./pages/Contact";
import Stories from "./pages/Stories";
import Donate from "./pages/Donate";
import Auth from "./pages/Auth";
import Portal from "./pages/Portal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/why-fund-us" element={<WhyFundUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
