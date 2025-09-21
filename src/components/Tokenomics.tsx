import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Tokenomics = () => {
  const { t } = useTranslation();
  
  const tokenData = [
    { label: t('tokenomics.distribution.totalSupply'), value: "1,000,000,000", color: "text-primary" },
    { label: t('tokenomics.distribution.presale'), value: "40%", color: "text-accent" },
    { label: t('tokenomics.distribution.liquidity'), value: "25%", color: "text-blue-400" },
    { label: t('tokenomics.distribution.development'), value: "15%", color: "text-purple-400" },
    { label: t('tokenomics.distribution.marketing'), value: "10%", color: "text-green-400" },
    { label: t('tokenomics.distribution.team'), value: "10%", color: "text-orange-400" }
  ];

  const features = [
    {
      title: t('tokenomics.features.instantSettlements.title'),
      description: t('tokenomics.features.instantSettlements.description')
    },
    {
      title: t('tokenomics.features.lowFees.title'),
      description: t('tokenomics.features.lowFees.description')
    },
    {
      title: t('tokenomics.features.globalAccess.title'),
      description: t('tokenomics.features.globalAccess.description')
    },
    {
      title: t('tokenomics.features.securityFirst.title'),
      description: t('tokenomics.features.securityFirst.description')
    }
  ];

  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t('tokenomics.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('tokenomics.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t('tokenomics.distribution.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="font-medium">{item.label}</span>
                      <span className={`font-bold text-lg ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-8">{t('tokenomics.features.title')}</h3>
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-primary mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Card className="inline-block bg-card/50 backdrop-blur-md border-accent/20 glow-accent">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-accent mb-2">$RTX</div>
              <div className="text-lg text-muted-foreground">{t('tokenomics.nativeToken')}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {t('tokenomics.powering')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;