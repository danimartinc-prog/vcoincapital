import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useAdminData = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalInvestments: 0,
    totalFundsRaised: 0,
    pendingProjects: 0,
    activeProjects: 0,
  });
  const { user } = useAuth();

  // Check if user is admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
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

  // Load admin data
  const loadAdminData = async () => {
    if (!isAdmin) return;

    try {
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (role)
        `)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          profiles!projects_founder_id_fkey (full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Fetch investments
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('investments')
        .select(`
          *,
          profiles!investments_investor_id_fkey (full_name, email),
          projects (title)
        `)
        .order('created_at', { ascending: false });

      if (investmentsError) throw investmentsError;
      setInvestments(investmentsData || []);

      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles!transactions_user_id_fkey (full_name, email),
          projects (title)
        `)
        .order('created_at', { ascending: false });

      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData || []);

      // Calculate stats
      const totalFundsRaised = investmentsData?.reduce((sum, inv) => sum + (Number(inv.amount_eur) || 0), 0) || 0;
      const pendingProjects = projectsData?.filter(p => p.status === 'pending').length || 0;
      const activeProjects = projectsData?.filter(p => p.status === 'approved' || p.status === 'active').length || 0;

      setStats({
        totalUsers: usersData?.length || 0,
        totalProjects: projectsData?.length || 0,
        totalInvestments: investmentsData?.length || 0,
        totalFundsRaised,
        pendingProjects,
        activeProjects,
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Error loading admin data');
    }
  };

  // Update project status
  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', projectId);

      if (error) throw error;

      toast.success('Project status updated successfully');
      loadAdminData(); // Reload data
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Error updating project status');
    }
  };

  // Assign user role
  const assignUserRole = async (userId: string, role: 'admin' | 'user' | 'founder') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,role'
        });

      if (error) throw error;

      toast.success('User role updated successfully');
      loadAdminData(); // Reload data
    } catch (error) {
      console.error('Error assigning user role:', error);
      toast.error('Error updating user role');
    }
  };

  useEffect(() => {
    if (isAdmin && !loading) {
      loadAdminData();
    }
  }, [isAdmin, loading]);

  return {
    isAdmin,
    loading,
    users,
    projects,
    investments,
    transactions,
    stats,
    updateProjectStatus,
    assignUserRole,
    loadAdminData,
  };
};