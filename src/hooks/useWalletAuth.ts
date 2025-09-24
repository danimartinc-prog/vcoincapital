import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!address || !isConnected) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('wallet-admin', {
          body: {
            action: 'check_admin',
            wallet_address: address.toLowerCase()
          }
        });
        
        if (error) throw error;
        setIsAdmin(data?.isAdmin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [address, isConnected]);

  return {
    user: isConnected ? { id: address, email: null } : null,
    profile: isConnected ? { 
      id: address, 
      user_id: address,
      full_name: null, 
      email: null,
      role: isAdmin ? 'admin' : 'user',
      created_at: new Date().toISOString()
    } : null,
    loading,
    signOut: () => {},
    isAuthenticated: isConnected,
    isAdmin
  };
};