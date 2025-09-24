import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAccount, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

const WalletAuthButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Wallet className="w-4 h-4" />
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()} className="flex items-center gap-1">
          <LogOut className="w-4 h-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="default">Connect Wallet</Button>
    </Link>
  );
};

export default WalletAuthButton;