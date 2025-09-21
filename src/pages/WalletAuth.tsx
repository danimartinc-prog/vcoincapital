import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WalletConnect from '@/components/WalletConnect';
import vcoinLogo from "@/assets/vcoin-logo.png";
import SEO from '@/components/SEO';

const WalletAuth = () => {
  const { isConnected } = useAccount();
  const { t } = useTranslation();

  if (isConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <SEO page="walletAuth" />
      <div className="w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-8 text-center space-y-8 glow-primary">
          <div className="flex flex-col items-center gap-4">
            <img src={vcoinLogo} alt="VCoin" className="w-16 h-16 animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('walletAuth.title')}
            </h1>
            <h2 className="text-2xl font-bold text-accent">
              {t('walletAuth.subtitle')}
            </h2>
          </div>
          
          <p className="text-muted-foreground">
            {t('walletAuth.connectMessage')}
          </p>
          
          <div className="space-y-4">
            <WalletConnect />
            <button 
              onClick={() => window.history.back()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              {t('walletAuth.backToHome')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAuth;