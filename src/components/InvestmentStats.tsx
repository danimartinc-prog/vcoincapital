import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Wallet, Target, PieChart, Award } from 'lucide-react';

interface Investment {
  id: string;
  amount_eur: string;
  amount_vcoin: string;
  status: string;
  created_at: string;
  projects?: {
    title: string;
    category: string;
  };
}

interface InvestmentStatsProps {
  investments: Investment[];
}

const InvestmentStats = ({ investments }: InvestmentStatsProps) => {
  // Calculate statistics
  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount_eur || '0'), 0);
  const totalVCoin = investments.reduce((sum, inv) => sum + parseFloat(inv.amount_vcoin || '0'), 0);
  const completedInvestments = investments.filter(inv => inv.status === 'completed');
  const pendingInvestments = investments.filter(inv => inv.status === 'pending');
  
  // Calculate portfolio distribution by category
  const categoryDistribution = investments.reduce((acc, inv) => {
    const category = inv.projects?.category || 'Otros';
    acc[category] = (acc[category] || 0) + parseFloat(inv.amount_eur || '0');
    return acc;
  }, {} as Record<string, number>);

  // Calculate performance metrics
  const avgInvestment = totalInvested / investments.length || 0;
  const successRate = completedInvestments.length / investments.length * 100 || 0;
  
  // Mock portfolio performance (in a real app, this would come from live data)
  const portfolioValue = totalInvested * 1.15; // 15% growth simulation
  const portfolioGrowth = ((portfolioValue - totalInvested) / totalInvested * 100) || 0;

  const stats = [
    {
      title: "Portfolio Total",
      value: `€${portfolioValue.toLocaleString()}`,
      change: `+${portfolioGrowth.toFixed(1)}%`,
      trend: portfolioGrowth > 0 ? 'up' : 'down',
      icon: Wallet,
      description: "Valor actual del portfolio"
    },
    {
      title: "Total Invertido",
      value: `€${totalInvested.toLocaleString()}`,
      change: `${investments.length} inversiones`,
      trend: 'neutral',
      icon: Target,
      description: "Capital total invertido"
    },
    {
      title: "VCoin Holdings",
      value: totalVCoin.toLocaleString(),
      change: `${completedInvestments.length} completadas`,
      trend: 'up',
      icon: Award,
      description: "Tokens VCoin acumulados"
    },
    {
      title: "Tasa de Éxito",
      value: `${successRate.toFixed(1)}%`,
      change: `${pendingInvestments.length} pendientes`,
      trend: successRate > 80 ? 'up' : successRate > 60 ? 'neutral' : 'down',
      icon: PieChart,
      description: "Inversiones completadas"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <stat.icon className="h-4 w-4" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                  {stat.change}
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Distribution */}
      {Object.keys(categoryDistribution).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryDistribution).map(([category, amount]) => {
                const percentage = (amount / totalInvested) * 100;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">
                        €{amount.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">€{avgInvestment.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Inversión Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">+{portfolioGrowth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Crecimiento Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-foreground">{investments.length}</div>
              <div className="text-sm text-muted-foreground">Proyectos Respaldados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentStats;