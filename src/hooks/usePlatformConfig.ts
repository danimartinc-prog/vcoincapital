import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PlatformConfig {
  config_key: string;
  config_value: string;
  description: string;
}

export const usePlatformConfig = () => {
  const [configs, setConfigs] = useState<PlatformConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_config')
        .select('*')
        .order('config_key');

      if (error) throw error;
      setConfigs(data || []);
    } catch (error) {
      console.error('Error fetching platform config:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la configuración de la plataforma",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('platform_config')
        .update({ config_value: value })
        .eq('config_key', key);

      if (error) throw error;

      setConfigs(prev => 
        prev.map(config => 
          config.config_key === key 
            ? { ...config, config_value: value }
            : config
        )
      );

      toast({
        title: "Éxito",
        description: "Configuración actualizada correctamente",
      });

      return true;
    } catch (error) {
      console.error('Error updating config:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la configuración",
        variant: "destructive",
      });
      return false;
    }
  };

  const getConfigValue = (key: string): string => {
    return configs.find(config => config.config_key === key)?.config_value || '';
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  return {
    configs,
    loading,
    updateConfig,
    getConfigValue,
    refetch: fetchConfigs
  };
};