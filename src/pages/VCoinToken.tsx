import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VCoinToken = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The token that powers hybrid financing
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                VCoin connects investors and entrepreneurs through a real utility ecosystem with decentralized governance and aligned incentives.
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Ticker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">VCOIN</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Network</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Base</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Supply</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Initial Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€0.50</div>
                  </CardContent>
                </Card>
              </div>
              
              <Badge variant="secondary" className="mb-8">
                ⚠️ Tokenomics information is provisional and may be updated after audit and governance.
              </Badge>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={() => window.location.href = '/projects'}>
                View Projects
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VCoinToken;