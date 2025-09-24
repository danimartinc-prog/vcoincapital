import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWalletAuth } from '@/hooks/useWalletAuth';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useWalletAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin', {
          _user_id: user.id
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('Error in checkAdminRole:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  const getAdminStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_stats');
      
      if (error) {
        console.error('Error fetching admin stats:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getAdminStats:', error);
      return null;
    }
  };

  const getAllProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllProjects:', error);
      return [];
    }
  };

  const getAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      return [];
    }
  };

  const getAllInvestments = async () => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          profiles!investments_investor_id_fkey (
            full_name,
            email
          ),
          projects (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllInvestments:', error);
      return [];
    }
  };

  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateProjectStatus:', error);
      return false;
    }
  };

  return {
    isAdmin,
    loading,
    getAdminStats,
    getAllProjects,
    getAllUsers,
    getAllInvestments,
    updateProjectStatus,
  };
};