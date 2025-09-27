import { Button } from '@/components/ui/button';
import { useReownWallet } from '@/hooks/useReownWallet';

const WalletConnect = () => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useReownWallet();
  
  console.log('WalletConnect component rendered', { isConnected, account });
  
  return (
    <div>
      {!isConnected ? (
        <Button 
          variant="hero" 
          onClick={connectWallet}
          disabled={isConnecting}
          type="button"
          className="h-12 px-8 text-lg font-bold"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={disconnectWallet}
            className="flex items-center gap-2"
            type="button"
          >
            Ethereum
          </Button>

          <Button 
            variant="hero" 
            onClick={disconnectWallet}
            type="button"
            className="font-bold"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connected'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;