import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from './lib/wagmi';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import WalletAuth from "./pages/WalletAuth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import HowItWorks from "./pages/HowItWorks";
import ForInvestors from "./pages/ForInvestors";
import ForFounders from "./pages/ForFounders";
import VCoinToken from "./pages/VCoinToken";
import Whitepaper from "./pages/Whitepaper";
import Legal from "./pages/Legal";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/for-investors" element={<ForInvestors />} />
              <Route path="/for-founders" element={<ForFounders />} />
              <Route path="/vcoin-token" element={<VCoinToken />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/wallet-auth" element={<WalletAuth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
