import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import cryptoLogo from "@/assets/crypto-logo.png";

const WalletAuth = () => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-8 text-center space-y-8 glow-primary">
          <div className="flex flex-col items-center gap-4">
            <img src={cryptoLogo} alt="CryptoICO" className="w-16 h-16 animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Enter The
            </h1>
            <h2 className="text-2xl font-bold text-accent">
              CryptoICO Presale
            </h2>
          </div>
          
          <p className="text-muted-foreground">
            To join the presale connect your wallet first!
          </p>
          
          <div className="space-y-4">
            <WalletConnect />
            <button 
              onClick={() => window.history.back()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAuth;