import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FolderOpen, TrendingUp, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

interface AdminStatsData {
  total_users: number;
  total_projects: number;
  total_investments: number;
  total_amount_raised: number;
  pending_projects: number;
  active_projects: number;
  total_transactions: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { getAdminStats } = useAdmin();

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data as unknown as AdminStatsData);
      setLoading(false);
    };

    loadStats();
  }, [getAdminStats]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-3/4 mt-2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No se pudieron cargar las estadísticas</p>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      description: "Registered users",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Projects",
      value: stats.total_projects,
      description: "All submitted projects",
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Pending Projects",
      value: stats.pending_projects,
      description: "Awaiting approval",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Active Projects",
      value: stats.active_projects,
      description: "Approved and running",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Total Investments",
      value: stats.total_investments,
      description: "Investment transactions",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Amount Raised",
      value: `€${stats.total_amount_raised.toLocaleString()}`,
      description: "Total funds raised",
      icon: CreditCard,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};