import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

export const useWalletInvestment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useAccount();

  const createWalletInvestment = async (
    projectId: string,
    amountEur: number,
    amountVcoin: number,
    transactionHash?: string,
    paymentMethod: 'ETH' | 'USDT' | 'CARD' = 'ETH'
  ) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return null;
    }

    setIsSubmitting(true);
    try {
      // Create wallet investment record
      const { data: investment, error: investmentError } = await supabase
        .from('wallet_investments')
        .insert([
          {
            wallet_address: address,
            project_id: projectId,
            amount_eur: amountEur,
            amount_vcoin: amountVcoin,
            transaction_hash: transactionHash,
            payment_method: paymentMethod,
            status: transactionHash ? 'pending' : 'completed',
          }
        ])
        .select()
        .single();

      if (investmentError) {
        console.error('Error creating wallet investment:', investmentError);
        toast.error('Error registering investment');
        return null;
      }

      toast.success(`Investment registered! ${amountVcoin} VCoin`);
      return investment;
    } catch (error) {
      console.error('Error in createWalletInvestment:', error);
      toast.error('Error processing investment');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWalletInvestments = async (walletAddress?: string) => {
    const targetAddress = walletAddress || address;
    if (!targetAddress) return [];

    try {
      const { data, error } = await supabase
        .from('wallet_investments')
        .select('*')
        .eq('wallet_address', targetAddress.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wallet investments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getWalletInvestments:', error);
      return [];
    }
  };

  const getWalletBalance = async (walletAddress?: string) => {
    const targetAddress = walletAddress || address;
    if (!targetAddress) return { totalVCoin: 0, totalEur: 0 };

    try {
      const { data, error } = await supabase
        .from('wallet_investments')
        .select('amount_vcoin, amount_eur')
        .eq('wallet_address', targetAddress.toLowerCase())
        .eq('status', 'completed');

      if (error) {
        console.error('Error fetching wallet balance:', error);
        return { totalVCoin: 0, totalEur: 0 };
      }

      const totalVCoin = data?.reduce((sum, inv) => sum + Number(inv.amount_vcoin), 0) || 0;
      const totalEur = data?.reduce((sum, inv) => sum + Number(inv.amount_eur), 0) || 0;

      return { totalVCoin, totalEur };
    } catch (error) {
      console.error('Error in getWalletBalance:', error);
      return { totalVCoin: 0, totalEur: 0 };
    }
  };

  const updateInvestmentStatus = async (investmentId: string, status: 'pending' | 'completed' | 'failed') => {
    try {
      const { error } = await supabase
        .from('wallet_investments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', investmentId);

      if (error) {
        console.error('Error updating investment status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateInvestmentStatus:', error);
      return false;
    }
  };

  return {
    createWalletInvestment,
    getWalletInvestments,
    getWalletBalance,
    updateInvestmentStatus,
    isSubmitting,
  };
};