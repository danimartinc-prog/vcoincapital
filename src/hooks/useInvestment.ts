import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useInvestment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();

  const createInvestment = async (
    projectId: string,
    amountEur: number,
    amountVcoin: number,
    transactionHash?: string,
    currency: 'ETH' | 'USDT' | 'EUR' = 'ETH'
  ) => {
    if (!user || !profile) {
      toast.error('Debes estar autenticado para invertir');
      return null;
    }

    setIsSubmitting(true);
    try {
      // Create investment record
      const { data: investment, error: investmentError } = await supabase
        .from('investments')
        .insert([
          {
            investor_id: profile.id,
            project_id: projectId,
            amount_eur: amountEur,
            amount_vcoin: amountVcoin,
            transaction_hash: transactionHash,
            status: transactionHash ? 'pending' : 'completed',
          }
        ])
        .select()
        .single();

      if (investmentError) {
        console.error('Error creating investment:', investmentError);
        toast.error('Error al registrar la inversión');
        return null;
      }

      // Create transaction record if we have a hash
      if (transactionHash) {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert([
            {
              user_id: profile.id,
              project_id: projectId,
              amount: amountEur,
              currency,
              transaction_type: 'investment',
              transaction_hash: transactionHash,
              status: 'pending'
            }
          ]);

        if (transactionError) {
          console.error('Error creating transaction:', transactionError);
          // Don't fail the investment if transaction creation fails
        }
      }

      toast.success(`¡Inversión registrada! ${amountVcoin} VCoin`);
      return investment;
    } catch (error) {
      console.error('Error in createInvestment:', error);
      toast.error('Error al procesar la inversión');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserInvestments = async () => {
    if (!profile) return [];

    try {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          projects (
            id,
            title,
            status
          )
        `)
        .eq('investor_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserInvestments:', error);
      return [];
    }
  };

  const updateInvestmentStatus = async (investmentId: string, status: 'pending' | 'completed' | 'failed') => {
    try {
      const { error } = await supabase
        .from('investments')
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
    createInvestment,
    getUserInvestments,
    updateInvestmentStatus,
    isSubmitting,
  };
};