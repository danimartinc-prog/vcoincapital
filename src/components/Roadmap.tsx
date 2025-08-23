import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Presale Launch",
      date: "Q1 2024",
      status: "completed",
      items: [
        "Presale platform development",
        "Smart contract audit",
        "Community building",
        "Initial marketing campaign"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Beta Wallet",
      date: "September 2025",
      status: "current",
      items: [
        "Beta wallet launch",
        "DEX listing preparation",
        "Partnership announcements",
        "Security audits completion"
      ]
    },
    {
      phase: "Phase 3",
      title: "Mainnet Launch",
      date: "Q4 2025",
      status: "upcoming",
      items: [
        "Mainnet deployment",
        "Major CEX listings",
        "Cross-border payment integration",
        "Mobile app release"
      ]
    },
    {
      phase: "Phase 4",
      title: "Global Expansion",
      date: "Q1 2026",
      status: "future",
      items: [
        "Multi-currency support",
        "Bank partnerships",
        "Enterprise solutions",
        "Global market penetration"
      ]
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "border-primary bg-primary/10";
      case "current":
        return "border-accent bg-accent/10 glow-accent";
      case "upcoming":
        return "border-blue-400 bg-blue-400/10";
      default:
        return "border-muted bg-muted/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "current":
        return "🚀";
      case "upcoming":
        return "⏳";
      default:
        return "📋";
    }
  };

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Development <span className="bg-gradient-accent bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our strategic plan to revolutionize cross-border payments and establish 
            CryptoICO as the leading PayFi solution.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-accent to-muted transform -translate-x-0.5 md:-translate-x-0.5" />
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-current rounded-full transform -translate-x-1.5 md:-translate-x-1.5 text-primary z-10" />
                
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                  <Card className={`${getStatusStyles(item.status)} transition-all duration-300 hover:scale-105`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{getStatusIcon(item.status)}</span>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.phase}</div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <div className="text-sm text-accent font-medium">{item.date}</div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {item.items.map((listItem, listIndex) => (
                          <li key={listIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Button variant="crypto" size="lg" className="text-lg px-8 py-4">
            View Detailed Roadmap
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;