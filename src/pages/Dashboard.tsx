import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import WalletDashboard from '@/pages/WalletDashboard';
import Header from '@/components/Header';

const Dashboard = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <WalletDashboard />
      </div>
    </div>
  );
};

export default Dashboard;