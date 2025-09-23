import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectSubmissionForm from "@/components/ProjectSubmissionForm";

const ForFounders = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const benefits = [
    {
      title: "Hybrid Funding",
      description: "Receive cash to operate + VCoin to align incentives with community.",
      icon: "💰"
    },
    {
      title: "Committed Community",
      description: "VCoin holders are incentivized in your project's success.",
      icon: "👥"
    },
    {
      title: "Flexible Rules",
      description: "You decide how to handle excess: pro-rata, cap or convert to perks.",
      icon: "⚙️"
    },
    {
      title: "Total Transparency",
      description: "Direct communication panel with your investors and public metrics.",
      icon: "📊"
    },
    {
      title: "No Intermediaries",
      description: "Direct connection with capital without hidden fees.",
      icon: "🤝"
    },
    {
      title: "Global from Day One",
      description: "Access investors from multiple jurisdictions with automatic compliance.",
      icon: "🌍"
    }
  ];

  const projectTypes = [
    {
      type: "Rewards/Perks",
      description: "Non-financial rewards like products, experiences or discounts",
      suitable: "Physical products, services, digital content",
      requirements: "Minimal legal requirements",
      badge: "Easy"
    },
    {
      type: "Revenue Share",
      description: "Participation in revenue during a determined period",
      suitable: "SaaS, eCommerce with clear metrics",
      requirements: "Compliance according to jurisdiction",
      badge: "Medium"
    },
    {
      type: "Equity-like",
      description: "Instruments similar to equity participation",
      suitable: "Growing startups, accredited investors",
      requirements: "ECSPR/MiCA compliance",
      badge: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO page="forFounders" />
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Funding beyond limits
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Publish your project with cash + VCoin goals. Upload documents, define excess rules and communicate progress. Receive community and runway to scale.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => setShowProjectForm(true)}>
                  Submit Your Project
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/how-it-works'}>
                  View Complete Process
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Funding aligned with your community
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
                Define two goals: cash and VCoin. Receive capital + committed community. 
                Decide how to manage excess (pro-rata, cap or perks). Transparency at all times.
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

            {/* Project types */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Available offer types</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {projectTypes.map((type, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{type.type}</CardTitle>
                        <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "destructive"}>
                          {type.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Ideal for:</h4>
                        <p className="text-sm text-muted-foreground">{type.suitable}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Requirements:</h4>
                        <p className="text-sm text-muted-foreground">{type.requirements}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  * Available offer types depend on your jurisdiction and target investor profile
                </p>
              </div>
            </div>

            {/* Excess configuration */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Excess Management</h2>
              <div className="max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border mb-6">
                  <h3 className="text-xl font-bold mb-4">Practical example:</h3>
                  <p className="text-muted-foreground mb-4">
                    Your project asks for <strong>100,000 VCOIN</strong> and <strong>$50,000</strong>. 
                    If VCoin is worth $0.50, the token part "equals" $50,000.
                  </p>
                  <p className="text-muted-foreground">
                    If at closing VCoin rises to $0.75, those 100,000 VCOIN would equal $75,000. 
                    <strong> Excess = $25,000</strong>
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Pro-rata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        The amount of VCoin accepted is reduced to meet exactly the target.
                      </p>
                      <div className="text-xs bg-green-500/10 p-2 rounded">
                        <strong>Result:</strong> You receive exactly what was planned, return the excess.
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600">Cap + redistribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        A +20% cap is respected. The excess is redistributed according to agreed policy.
                      </p>
                      <div className="text-xs bg-blue-500/10 p-2 rounded">
                        <strong>Result:</strong> More runway for marketing and development.
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-600">Cap + perks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        What exceeds the cap is converted into extra perks/benefits for investors.
                      </p>
                      <div className="text-xs bg-purple-500/10 p-2 rounded">
                        <strong>Result:</strong> Greater value for the investor community.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Step by step process */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Your round in 6 steps</h2>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Registration and verification",
                      description: "Verify your identity and company according to your jurisdiction",
                      time: "2-5 days"
                    },
                    {
                      step: 2,
                      title: "Project configuration",
                      description: "Define cash/VCoin goals, upload documents and select offer type",
                      time: "1-2 days"
                    },
                    {
                      step: 3,
                      title: "Review and approval",
                      description: "Our team reviews your project for compliance and quality",
                      time: "3-7 days"
                    },
                    {
                      step: 4,
                      title: "Active campaign",
                      description: "Your project goes live. Communicate updates and attract investors",
                      time: "30-60 days"
                    },
                    {
                      step: 5,
                      title: "Round closing",
                      description: "Receive cash in your account and VCoin in wallet/custody",
                      time: "2-3 days"
                    },
                    {
                      step: 6,
                      title: "Execution and reporting",
                      description: "Deliver milestones and maintain communication with your community",
                      time: "Ongoing"
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge variant="outline">{item.time}</Badge>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Minimum Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Pitch deck (max 15 slides)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Basic financial plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Company incorporation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Team identification</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Project Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Minimum goal: $5,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Team with verified LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Detailed use of funds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Honest risk analysis</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Ready to launch?</h3>
              <p className="text-muted-foreground mb-6">
                Join entrepreneurs already funding with VCoin's hybrid model.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => setShowProjectForm(true)}>
                  Submit Your Project
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                  View Examples
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                Approval process in 3-7 days. 5% fee only if your round succeeds.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <ProjectSubmissionForm 
        open={showProjectForm} 
        onOpenChange={setShowProjectForm}
      />
    </div>
  );
};

export default ForFounders;