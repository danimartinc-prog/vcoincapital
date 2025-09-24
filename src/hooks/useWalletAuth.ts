import { useAccount } from 'wagmi';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  
  return {
    user: isConnected ? { id: address, email: null } : null,
    profile: isConnected ? { 
      id: address, 
      user_id: address,
      full_name: null, 
      email: null,
      role: 'user',
      created_at: new Date().toISOString()
    } : null,
    loading: false,
    signOut: () => {},
    isAuthenticated: isConnected
  };
};