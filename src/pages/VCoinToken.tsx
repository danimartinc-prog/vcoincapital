import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const VCoinToken = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <SEO page="token" />
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('token.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {t('token.subtitle')}
              </p>
              
              {/* Métricas básicas */}
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">{t('token.ticker')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">VCOIN</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">{t('token.network')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Base</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">{t('token.supply')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">{t('token.initialPrice')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€0.10</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  {t('token.warning')}
                </p>
              </div>
            </div>

            {/* Utilidad */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('token.tokenUtility')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(t('token.utilities', { returnObjects: true }) as any[]).map((utility, index) => (
                  <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="text-4xl mb-2">{['💰', '⚡', '🗳️', '🔒'][index]}</div>
                      <CardTitle className="text-lg">{utility.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{utility.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tokenomics */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('token.tokenDistribution')}</h2>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  {(t('token.tokenomics', { returnObjects: true }) as any[]).map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{item.category}</span>
                          <Badge variant="outline">{item.percentage}%</Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">{item.amount}</span>
                          <span className="text-sm font-semibold">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2 mb-2" />
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <div className="relative w-80 h-80">
                    {/* Placeholder para gráfico circular */}
                    <div className="w-full h-full rounded-full border-8 border-primary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold">100M</div>
                        <div className="text-lg text-muted-foreground">VCOIN</div>
                        <div className="text-sm text-muted-foreground">Total Supply</div>
                      </div>
                    </div>
                    {/* Los segmentos del pie chart irían aquí con un library como recharts */}
                  </div>
                </div>
              </div>
            </div>

            {/* Características técnicas */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('token.technicalFeatures')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(t('token.technicalCards', { returnObjects: true }) as any[]).map((card, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {card.description}
                      </p>
                      <div className="space-y-1 text-xs">
                        {Object.entries(card.details).map(([key, value], detailIndex) => (
                          detailIndex % 2 === 0 && (
                            <div key={detailIndex} className="flex justify-between">
                              <span>{value as string}:</span>
                              <span className="font-semibold">{card.details[Object.keys(card.details)[detailIndex + 1]]}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contrato placeholder */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('token.tokenContract')}</h2>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>{t('token.contractInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{t('token.contractAddress')}:</div>
                    <div className="font-mono text-sm break-all">
                      {t('token.addressNotAvailable')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" disabled>
                      {t('token.viewOnExplorer')}
                    </Button>
                    <Button variant="outline" disabled>
                      {t('token.addToWallet')}
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {t('token.contractAvailable')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ técnica */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">{t('token.technicalFAQ')}</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {(t('token.faq', { returnObjects: true }) as any[]).map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
                {t('token.importantInfo')}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground max-w-4xl mx-auto">
                {(t('token.disclaimer', { returnObjects: true }) as string[]).map((text, index) => (
                  <p key={index} className={index === 3 ? 'font-semibold' : ''}>
                    {text}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button variant="outline" onClick={() => window.location.href = '/legal'}>
                  {t('token.legalTerms')}
                </Button>
                <Button onClick={() => window.location.href = '/projects'}>
                  {t('token.viewProjects')}
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

export default VCoinToken;