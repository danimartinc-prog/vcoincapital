import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContractConfig {
  presaleContractAddress: string;
  vcoinTokenAddress: string;
  treasuryAddress: string;
}

export const useContractConfig = () => {
  const [config, setConfig] = useState<ContractConfig>({
    presaleContractAddress: '',
    vcoinTokenAddress: '',
    treasuryAddress: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_config')
        .select('config_key, config_value')
        .in('config_key', ['presale_contract_address', 'vcoin_token_address', 'treasury_wallet_address']);

      if (error) throw error;

      const configMap = data?.reduce((acc, item) => {
        acc[item.config_key] = item.config_value;
        return acc;
      }, {} as Record<string, string>) || {};

      setConfig({
        presaleContractAddress: configMap.presale_contract_address || '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8C',
        vcoinTokenAddress: configMap.vcoin_token_address || '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B',
        treasuryAddress: configMap.treasury_wallet_address || ''
      });
    } catch (error) {
      console.error('Error fetching contract config:', error);
      // Use fallback addresses if there's an error
      setConfig({
        presaleContractAddress: '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8C',
        vcoinTokenAddress: '0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B',
        treasuryAddress: ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    loading,
    refetch: fetchConfig
  };
};