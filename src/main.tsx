import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { ReownWalletProvider } from './hooks/useReownWallet'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ReownWalletProvider>
      <App />
    </ReownWalletProvider>
  </HelmetProvider>
);
