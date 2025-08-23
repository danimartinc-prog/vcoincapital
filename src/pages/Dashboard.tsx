import { useAccount, useDisconnect } from 'wagmi';
import { Navigate } from 'react-router-dom';
import PresaleWidget from '@/components/PresaleWidget';
import WalletConnect from '@/components/WalletConnect';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return <Navigate to="/wallet-auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CryptoICO Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <WalletConnect />
            <Button variant="ghost" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome to the Presale</h2>
            <p className="text-muted-foreground">
              Connected wallet: {address}
            </p>
          </div>

          <div className="flex justify-center">
            <PresaleWidget />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Your Holdings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>$RTX Tokens:</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Invested:</span>
                  <span className="font-bold">$0.00</span>
                </div>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;