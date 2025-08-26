import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForInvestors = () => {
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
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Turn one token into multiple opportunities
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Access a curated list of real projects. Diversify in startups, real estate, innovation. 
                Multiply your capital if the token value rises.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/projects'}>
                  Explore Projects
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/how-it-works'}>
                  How it Works
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
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Your VCoin:</span>
                        <span className="font-semibold">5,000 VCOIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current price:</span>
                        <span className="font-semibold">$0.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment power:</span>
                        <span className="font-semibold text-primary">$2,500</span>
                      </div>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <div className="text-sm text-center">
                        If VCoin rises to $0.75 (+50%)
                      </div>
                      <div className="text-lg font-bold text-center text-accent">
                        Your power: $3,750 (+$1,250)
                      </div>
                    </div>
                    <Button className="w-full">Start Simulation</Button>
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
                <Button size="lg" onClick={() => window.location.href = '/wallet-auth'}>
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