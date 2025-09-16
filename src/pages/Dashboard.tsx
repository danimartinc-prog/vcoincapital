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
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { getUserInvestments } = useInvestment();
  const { t } = useTranslation();
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
          <p className="text-muted-foreground">{t('common.loading')}</p>
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
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">
            {t('dashboard.welcome', { name: profile?.full_name || user.email })}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{t('dashboard.totalInvested')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{t('dashboard.inInvestments', { count: investments.length })}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{t('dashboard.totalVCoin')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVCoin.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{t('dashboard.accumulatedTokens')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{t('dashboard.projects')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProjects.length}</div>
              <p className="text-xs text-muted-foreground">{t('dashboard.asFounder')}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stats">{t('dashboard.statistics')}</TabsTrigger>
            <TabsTrigger value="investments">{t('dashboard.investments')}</TabsTrigger>
            <TabsTrigger value="transactions">{t('dashboard.transactions')}</TabsTrigger>
            <TabsTrigger value="projects">{t('dashboard.projects')}</TabsTrigger>
            <TabsTrigger value="profile">{t('dashboard.profile')}</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <InvestmentStats investments={investments} />
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.investmentHistory')}</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">{t('dashboard.loadingInvestments')}</p>
                  </div>
                ) : investments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">{t('dashboard.noInvestments')}</p>
                    <Button onClick={() => window.location.href = '/projects'}>
                      {t('nav.exploreProjects')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <div key={investment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {investment.projects?.title || t('dashboard.unknownProject')}
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
                            <span className="text-muted-foreground">{t('dashboard.invested')}:</span>
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
                <CardTitle>{t('dashboard.myProjects')}</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">{t('dashboard.loadingProjects')}</p>
                  </div>
                ) : userProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">{t('dashboard.noProjects')}</p>
                    <Button onClick={() => window.location.href = '/for-founders'}>
                      {t('dashboard.submitProject')}
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
                            <span className="text-muted-foreground">{t('dashboard.goal')}:</span>
                            <span className="ml-2 font-medium">€{parseFloat(project.goal_cash_eur).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{t('dashboard.raised')}:</span>
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
                <CardTitle>{t('dashboard.profileInfo')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">{t('dashboard.email')}</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{t('dashboard.name')}</label>
                    <p className="font-medium">{profile?.full_name || t('dashboard.notSpecified')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{t('dashboard.role')}</label>
                    <p className="font-medium capitalize">{profile?.role || 'user'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{t('dashboard.memberSince')}</label>
                    <p className="font-medium">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : t('dashboard.unknown')}
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