import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState } from "react";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";

const ForInvestors = () => {
  // Investment simulator state
  const [vcoinAmount, setVcoinAmount] = useState(5000);
  const [priceMultiplier, setPriceMultiplier] = useState(100); // 100 = current price
  
  const currentPrice = 0.50;
  const newPrice = currentPrice * (priceMultiplier / 100);
  const investmentPower = vcoinAmount * newPrice;
  const currentPower = vcoinAmount * currentPrice;
  const powerDifference = investmentPower - currentPower;
  const priceChange = ((newPrice - currentPrice) / currentPrice) * 100;

  const benefits = [
    {
      title: "Secure Custody",
      description: "Your funds are protected with technical audits and trusted partners.",
      icon: "🔒"
    },
    {
      title: "KYC/AML Compliant",
      description: "Verification by jurisdiction and full regulatory compliance.",
      icon: "✅"
    },
    {
      title: "Fee Transparency",
      description: "No surprises. All fees are clearly specified upfront.",
      icon: "💎"
    },
    {
      title: "Smart Diversification",
      description: "Access multiple sectors and project stages from a single dashboard.",
      icon: "📊"
    },
    {
      title: "Clear Rules",
      description: "Price simulator and excess rules visible before investing.",
      icon: "📋"
    },
    {
      title: "Early Access",
      description: "VCoin holders get priority in high-demand projects.",
      icon: "⚡"
    }
  ];

  const investmentOptions = [
    {
      method: "Cash Only",
      description: "Invest exclusively with fiat currency if the project allows it",
      pros: ["No volatility", "Familiar for traditional investors"],
      cons: ["No exclusive perks access", "No governance participation"]
    },
    {
      method: "VCoin Only",
      description: "Use exclusively VCoin for your investments",
      pros: ["Access to exclusive perks", "Higher investment power if VCoin rises", "Governance participation"],
      cons: ["Exposure to token volatility"]
    },
    {
      method: "Hybrid",
      description: "Combine cash and VCoin according to project rules",
      pros: ["Maximum flexibility", "Risk diversification", "Capital optimization"],
      cons: ["Requires more active management"]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO page="forInvestors" />
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Invest in the Future
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Access exclusive startup investments with VCoin. Get early access, better perks, and multiply your investment power.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/projects'}>
                  Explore Projects
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/how-it-works'}>
                  How It Works
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Multiply your reach with a real utility token
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
                Use VCoin to get early access to projects, secure better perks and access limited allocations. 
                If the price rises, your investment power can increase. Always with transparent excess rules before investing.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="text-4xl mb-2">{benefit.icon}</div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Investment options */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Investment Options</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {investmentOptions.map((option, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant={index === 1 ? "default" : "secondary"}>
                          {option.method}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                        <ul className="text-sm space-y-1">
                          {option.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-600 mb-2">Considerations:</h4>
                        <ul className="text-sm space-y-1">
                          {option.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-500">⚠</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Investment process */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Your step-by-step process</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">KYC Verification</h3>
                      <p className="text-sm text-muted-foreground">Automatic process based on your country of residence</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Buy VCoin</h3>
                      <p className="text-sm text-muted-foreground">Fiat on-ramp or connect your existing wallet</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Select Project</h3>
                      <p className="text-sm text-muted-foreground">Advanced filters and transparent metrics</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold mb-1">Confirm Investment</h3>
                      <p className="text-sm text-muted-foreground">Price simulator and clear rules</p>
                    </div>
                  </div>
                </div>
                <Card className="border-2 border-primary/20 glow-primary">
                  <CardHeader>
                    <CardTitle>Investment Simulator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your VCoin Amount</label>
                        <input 
                          type="number" 
                          value={vcoinAmount}
                          onChange={(e) => setVcoinAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          placeholder="Enter VCoin amount"
                          min="0"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">VCoin Price: ${newPrice.toFixed(2)}</label>
                        <Slider
                          value={[priceMultiplier]}
                          onValueChange={([value]) => setPriceMultiplier(value)}
                          min={50}
                          max={300}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$0.25 (-50%)</span>
                          <span>$1.50 (+200%)</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 p-3 bg-secondary rounded-lg">
                        <div className="flex justify-between">
                          <span>Your VCoin:</span>
                          <span className="font-semibold">{vcoinAmount.toLocaleString()} VCOIN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current price:</span>
                          <span className="font-semibold">${currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New price:</span>
                          <span className="font-semibold">${newPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Investment power:</span>
                          <span className="font-semibold text-primary">${investmentPower.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {priceChange !== 0 && (
                        <div className={`p-3 rounded-lg ${priceChange > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                          <div className="text-sm text-center">
                            {priceChange > 0 ? 'If VCoin rises' : 'If VCoin falls'} to ${newPrice.toFixed(2)} ({priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%)
                          </div>
                          <div className={`text-lg font-bold text-center ${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Your power: ${investmentPower.toLocaleString()} ({priceChange > 0 ? '+' : ''}${powerDifference.toLocaleString()})
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is VCoin an investment recommendation?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      No. VCoin is a utility token to interact with the platform. 
                      We do not offer financial advice.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What happens if VCoin price rises?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Your VCoin investment power increases, but final allocation depends on 
                      the excess rules defined by each project.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I invest with cash only?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, if the project allows it. Some projects accept only VCoin, 
                      others hybrid and others allow cash only.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I receive equity?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      It depends on the project's offer type and your jurisdiction. 
                      Read the terms of each listing before investing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join hundreds of investors already diversifying with VCoin.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/auth'}>
                  Connect Wallet
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                  View Projects
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                VCoin is not financial advice. Some offers may be restricted by law.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForInvestors;