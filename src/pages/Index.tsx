import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* Sección cómo funciona */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Cómo funciona VCoin</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Compra VCoin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Accede al token y a oportunidades exclusivas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Explora proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Filtra por sector, fase y riesgo</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Invierte en híbrido</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Cash, VCoin o ambos. Tú decides</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sigue tu cartera</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Todo en un panel simple y claro</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Secciones para inversores y emprendedores */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Para inversores</CardTitle>
                  <p className="text-muted-foreground">Multiplica tu alcance con un token de utilidad real</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Usa VCoin para entrar antes en proyectos, conseguir mejores perks y acceder a asignaciones limitadas. 
                    Si el precio sube, tu poder de inversión puede aumentar.
                  </p>
                  <Button onClick={() => window.location.href = '/for-investors'}>
                    Más información
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Para emprendedores</CardTitle>
                  <p className="text-muted-foreground">Financiación alineada con tu comunidad</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define dos metas: cash y VCoin. Recibe capital + comunidad comprometida. 
                    Decide cómo gestionar excedentes.
                  </p>
                  <Button onClick={() => window.location.href = '/for-founders'}>
                    Publicar proyecto
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Confianza y seguridad */}
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Confianza & Seguridad</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">KYC/AML</h4>
                  <p className="text-sm text-muted-foreground">Verificación por jurisdicción</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Custodia segura</h4>
                  <p className="text-sm text-muted-foreground">Auditorías técnicas</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cumplimiento</h4>
                  <p className="text-sm text-muted-foreground">Filtros por país/inversor</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
