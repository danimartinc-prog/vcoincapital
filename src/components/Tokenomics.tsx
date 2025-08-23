import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tokenomics = () => {
  const tokenData = [
    { label: "Total Supply", value: "1,000,000,000", color: "text-primary" },
    { label: "Presale", value: "40%", color: "text-accent" },
    { label: "Liquidity", value: "25%", color: "text-blue-400" },
    { label: "Development", value: "15%", color: "text-purple-400" },
    { label: "Marketing", value: "10%", color: "text-green-400" },
    { label: "Team", value: "10%", color: "text-orange-400" }
  ];

  const features = [
    {
      title: "Instant Settlements",
      description: "Cross-border payments settled within seconds using blockchain technology"
    },
    {
      title: "Low Fees",
      description: "Drastically reduced transaction costs compared to traditional banking"
    },
    {
      title: "Global Access",
      description: "Send payments to any bank account worldwide, 24/7"
    },
    {
      title: "Security First",
      description: "Military-grade encryption and decentralized architecture"
    }
  ];

  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging crypto with local banks. Our revolutionary PayFi infrastructure 
            enables seamless fiat payments using cryptocurrency.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Token Distribution</CardTitle>
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
            <h3 className="text-3xl font-bold mb-8">Why CryptoICO?</h3>
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
              <div className="text-lg text-muted-foreground">Native Token</div>
              <div className="text-sm text-muted-foreground mt-2">
                Powering the future of cross-border payments
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;