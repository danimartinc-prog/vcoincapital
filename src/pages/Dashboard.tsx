import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useInvestment } from '@/hooks/useInvestment';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import InvestmentStats from '@/components/InvestmentStats';
import TransactionHistory from '@/components/TransactionHistory';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { getUserInvestments } = useInvestment();
  const [investments, setInvestments] = useState<any[]>([]);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (profile) {
      loadUserData();
    }
  }, [profile]);

  const loadUserData = async () => {
    setLoadingData(true);
    try {
      // Load user investments
      const userInvestments = await getUserInvestments();
      setInvestments(userInvestments);

      // Load user projects (if they're a founder)
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('founder_id', profile?.id);
      
      setUserProjects(projects || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount_eur || '0'), 0);
  const totalVCoin = investments.reduce((sum, inv) => sum + parseFloat(inv.amount_vcoin || '0'), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {profile?.full_name || user.email}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Invertido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">En {investments.length} inversiones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">VCoin Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVCoin.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tokens acumulados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProjects.length}</div>
              <p className="text-xs text-muted-foreground">Como fundador</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="investments">Inversiones</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <InvestmentStats investments={investments} />
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Inversiones</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando inversiones...</p>
                  </div>
                ) : investments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No tienes inversiones aún</p>
                    <Button onClick={() => window.location.href = '/projects'}>
                      Explorar Proyectos
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <div key={investment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {investment.projects?.title || 'Proyecto Desconocido'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(investment.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              investment.status === 'completed' ? 'default' :
                              investment.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {investment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Invertido:</span>
                            <span className="ml-2 font-medium">€{parseFloat(investment.amount_eur).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">VCoin:</span>
                            <span className="ml-2 font-medium">{parseFloat(investment.amount_vcoin).toLocaleString()}</span>
                          </div>
                        </div>
                        {investment.transaction_hash && (
                          <div className="mt-2 text-xs">
                            <span className="text-muted-foreground">TX:</span>
                            <span className="ml-2 font-mono">{investment.transaction_hash.slice(0, 10)}...</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mis Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando proyectos...</p>
                  </div>
                ) : userProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No has enviado ningún proyecto aún</p>
                    <Button onClick={() => window.location.href = '/for-founders'}>
                      Enviar Proyecto
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(project.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              project.status === 'approved' ? 'default' :
                              project.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{project.summary}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Objetivo:</span>
                            <span className="ml-2 font-medium">€{parseFloat(project.goal_cash_eur).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Recaudado:</span>
                            <span className="ml-2 font-medium">€{parseFloat(project.raised_amount || '0').toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Nombre</label>
                    <p className="font-medium">{profile?.full_name || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Rol</label>
                    <p className="font-medium capitalize">{profile?.role || 'user'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Miembro desde</label>
                    <p className="font-medium">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Desconocido'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;