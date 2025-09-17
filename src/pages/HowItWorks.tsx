import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {t('howItWorks.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('howItWorks.subtitle')}
              </p>
            </div>

            {/* Timeline general */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('howItWorks.generalProcess')}</h2>
              <div className="grid md:grid-cols-6 gap-6">
                {(t('howItWorks.steps.general', { returnObjects: true }) as any[]).map((step, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-2">
                        {index + 1}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tabs detallados */}
            <Tabs defaultValue="investors" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="investors">{t('howItWorks.forInvestors')}</TabsTrigger>
                <TabsTrigger value="founders">{t('howItWorks.forFounders')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="investors" className="mt-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.investorFlow')}</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t('howItWorks.investorDescription')}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(t('howItWorks.steps.investor', { returnObjects: true }) as any[]).map((step, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="text-4xl mb-2">
                          {['👤', '💳', '🔍', '💰', '✅', '📊'][index]}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button size="lg" onClick={() => window.location.href = '/for-investors'}>
                    {t('howItWorks.moreInfoInvestors')}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="founders" className="mt-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.founderFlow')}</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t('howItWorks.founderDescription')}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(t('howItWorks.steps.founder', { returnObjects: true }) as any[]).map((step, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="text-4xl mb-2">
                          {['🏢', '📋', '⚙️', '📢', '🎯', '🚀'][index]}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button size="lg" onClick={() => window.location.href = '/for-founders'}>
                    {t('howItWorks.moreInfoFounders')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* CTA final */}
            <div className="text-center mt-16 p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">{t('howItWorks.readyToStart')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('howItWorks.startDescription')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/projects'}>
                  {t('howItWorks.exploreProjects')}
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/wallet-auth'}>
                  {t('howItWorks.connectWallet')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;