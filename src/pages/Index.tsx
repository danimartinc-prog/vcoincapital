import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ProjectSubmissionForm from "@/components/ProjectSubmissionForm";

const Index = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* How it works section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">How VCoin Works</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Buy VCoin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get the token and access exclusive opportunities</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Discover Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Filter by sector, stage and risk level</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Invest Directly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Use VCoin, cash or both. You decide</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Track everything in a simple, clear dashboard</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Sections for investors and entrepreneurs */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>For Investors</CardTitle>
                  <p className="text-muted-foreground">Turn one token into multiple opportunities</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access a curated list of real projects. Diversify in startups, real estate, innovation. 
                    Multiply your capital if the token value rises.
                  </p>
                  <Button onClick={() => window.location.href = '/for-investors'}>
                    Buy VCoin & Invest
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>For Entrepreneurs</CardTitle>
                  <p className="text-muted-foreground">Funding beyond limits</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Publish your project easily. Receive investment in cash and VCoin. 
                    Benefit if the token rises → more capital available.
                  </p>
                  <Button onClick={() => setShowProjectForm(true)}>
                    Submit Your Project
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Trust & Community */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Trust & Community</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Project Transparency</h4>
                  <p className="text-sm text-muted-foreground">Clear project information and progress</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Secure Smart Contracts</h4>
                  <p className="text-sm text-muted-foreground">Audited and battle-tested protocols</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Global Community</h4>
                  <p className="text-sm text-muted-foreground">Network of investors & founders worldwide</p>
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
