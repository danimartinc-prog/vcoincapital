import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Coins, 
  Globe,
  BarChart3,
  ArrowRight,
  Download
} from "lucide-react";

const Whitepaper = () => {
  const sections = [
    { id: "resumen", title: "Executive Summary", icon: BookOpen },
    { id: "vision", title: "Vision & Mission", icon: Target },
    { id: "problema", title: "Problem We Solve", icon: TrendingUp },
    { id: "solucion", title: "The VCoin Solution", icon: Zap },
    { id: "tokenomics", title: "Tokenomics", icon: Coins },
    { id: "utilidad", title: "Token Utility", icon: Users },
    { id: "tecnologia", title: "Technology", icon: Shield },
    { id: "mercado", title: "Market Analysis", icon: Globe },
    { id: "roadmap", title: "Roadmap", icon: BarChart3 }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            Whitepaper v1.0
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VCoin Whitepaper
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The future of hybrid financing: connecting investors and entrepreneurs 
            through a decentralized and transparent ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Download size={20} />
              Download PDF
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('resumen')}>
              Read Online
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                    >
                      <section.icon size={16} className="text-primary" />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Resumen Ejecutivo */}
            <section id="resumen" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Executive Summary</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      VCoin represents a revolution in how business innovation is financed. 
                      Our token connects global capital with entrepreneurial talent through a 
                      hybrid financing model that combines traditional cash with utility tokens.
                    </p>
                    <p>
                      In an ecosystem where investors seek diversified opportunities and entrepreneurs 
                      need accessible capital, VCoin acts as the bridge that makes this connection possible 
                      in a transparent, efficient way aligned with the incentives of the entire community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">100M</h4>
                        <p className="text-sm">Max Supply</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">Base L2</h4>
                        <p className="text-sm">Blockchain</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">€0.10</h4>
                        <p className="text-sm">Initial Price</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Visión y Misión */}
            <section id="vision" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Vision & Mission</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Our Vision</h3>
                      <p className="text-muted-foreground">
                        To create the world's most transparent and efficient financial ecosystem, where any 
                        entrepreneur with a valuable idea can access the necessary capital and any investor 
                        can participate in the future of innovation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To democratize access to venture capital through blockchain technology, eliminating 
                        geographical and bureaucratic barriers, while creating a financing model that 
                        aligns the incentives of investors and entrepreneurs in the long term.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Problema que Resolvemos */}
            <section id="problema" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Problem We Solve</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      The traditional business financing ecosystem presents multiple frictions 
                      that limit both investors and entrepreneurs:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-accent">For Entrepreneurs</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Limited access to venture capital
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Long and bureaucratic processes
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Lack of transparency in evaluation
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Geographic concentration of capital
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-accent">For Investors</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            High entry barriers (minimum tickets)
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Lack of accessible diversification
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Asymmetric information
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Expensive due diligence processes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* La Solución VCoin */}
            <section id="solucion" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">The VCoin Solution</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      VCoin introduces a revolutionary hybrid financing model that combines the best 
                      of traditional and decentralized finance:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Coins className="text-primary" size={20} />
                            Hybrid Financing
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Projects can set goals in both cash (€) and VCoin, 
                            allowing multiple forms of participation and creating a more flexible ecosystem.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Shield className="text-accent" size={20} />
                            Total Transparency
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            All transactions, overflow rules and allocations are visible 
                            on-chain, eliminating the traditional opacity of venture capital.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Users className="text-primary" size={20} />
                            Aligned Community
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            VCoin holders become active participants in the ecosystem, 
                            with voting rights on key decisions and preferential access to new projects.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Globe className="text-accent" size={20} />
                            Global Access
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Without geographical restrictions, anyone in the world can 
                            participate as an investor or entrepreneur, democratizing access to capital.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Tokenomics */}
            <section id="tokenomics" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Coins className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Tokenomics</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Token Specifications</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ticker:</span>
                            <span className="font-medium">VCOIN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Blockchain:</span>
                            <span className="font-medium">Base (L2 Ethereum)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Supply:</span>
                            <span className="font-medium">100,000,000 VCOIN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Initial Price:</span>
                            <span className="font-medium">€0.10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Token Distribution</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Ecosystem & Incentives</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Treasury/DAO</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-accent rounded-full"></div>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Team</span>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-primary/60 rounded-full"></div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Liquidity</span>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-accent/60 rounded-full"></div>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Reserve</span>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-primary/40 rounded-full"></div>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Advisors</span>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-2 bg-accent/40 rounded-full"></div>
                            <span className="text-sm font-medium">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Utilidad del Token */}
            <section id="utilidad" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Token Utility</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Investment Medium</h3>
                      <p className="text-sm text-muted-foreground">
                        VCoin serves as the native currency to invest in projects listed on the platform, 
                        creating a closed and sustainable economic cycle.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Tier Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Holders get early access, better ticket limits and exclusive perks 
                        based on the amount of VCoin they own.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Governance</h3>
                      <p className="text-sm text-muted-foreground">
                        Voting rights on key decisions: which verticals to prioritize, matching pool usage 
                        and featured projects on the platform.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Staking</h3>
                      <p className="text-sm text-muted-foreground">
                        Optional staking functionality that grants allocation priority in projects 
                        with high demand and reduced liquidity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold">Roadmap</h2>
                  </div>
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
                      
                      <div className="relative flex gap-4 pb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          Q4
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">2024 - MVP Launch</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Landing page, project marketplace, demo investment system, basic KYC
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex gap-4 pb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-medium">
                          Q1
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">2025 - Token & DeFi</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            VCoin launch, fiat on-ramp, basic staking, initial governance
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex gap-4 pb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          Q2
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">2025 - Expansion</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Smart contract audit, mobile app, strategic partnerships
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Whitepaper;