import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <SEO page="howItWorks" />
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                How VCoin Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The platform that connects capital and talent with hybrid financing. 6 simple steps for investors and entrepreneurs.
              </p>
            </div>

            {/* Simple process overview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <CardTitle>Buy VCoin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Purchase VCoin tokens to start investing in projects</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <CardTitle>Explore Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Browse verified projects and investment opportunities</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <CardTitle>Invest & Track</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Invest with VCoin and track your portfolio growth</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => window.location.href = '/projects'}>
                Explore Projects
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;