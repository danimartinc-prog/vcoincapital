import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ProjectSubmissionForm from "@/components/ProjectSubmissionForm";

const Index = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* How it works section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">{t('index.howItWorks')}</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>{t('index.buyVCoin')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('index.buyVCoinDescription')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('index.discoverProjects')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('index.discoverProjectsDescription')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('index.investDirectly')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('index.investDirectlyDescription')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('index.growthPotential')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('index.growthPotentialDescription')}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Sections for investors and entrepreneurs */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>{t('index.forInvestors')}</CardTitle>
                  <p className="text-muted-foreground">{t('index.forInvestorsSubtitle')}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('index.forInvestorsDescription')}
                  </p>
                  <Button onClick={() => window.location.href = '/for-investors'}>
                    {t('index.buyVCoinInvest')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>{t('index.forEntrepreneurs')}</CardTitle>
                  <p className="text-muted-foreground">{t('index.forEntrepreneursSubtitle')}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('index.forEntrepreneursDescription')}
                  </p>
                  <Button onClick={() => setShowProjectForm(true)}>
                    {t('index.submitProject')}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Trust & Community */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">{t('index.trustCommunity')}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('index.projectTransparency')}</h4>
                  <p className="text-sm text-muted-foreground">{t('index.projectTransparencyDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('index.secureSmartContracts')}</h4>
                  <p className="text-sm text-muted-foreground">{t('index.secureSmartContractsDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('index.globalCommunity')}</h4>
                  <p className="text-sm text-muted-foreground">{t('index.globalCommunityDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FAQ />
      </main>
      <Footer />
      
      <ProjectSubmissionForm 
        open={showProjectForm} 
        onOpenChange={setShowProjectForm}
      />
    </div>
  );
};

export default Index;
