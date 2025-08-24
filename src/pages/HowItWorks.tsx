import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const investorSteps = [
    {
      step: 1,
      title: "Onboarding + KYC/AML",
      description: "Crea tu cuenta y completa la verificación según tu país de residencia.",
      icon: "👤"
    },
    {
      step: 2,
      title: "Compra VCoin",
      description: "Adquiere VCoin a través de fiat on-ramp o conecta tu wallet existente.",
      icon: "💳"
    },
    {
      step: 3,
      title: "Explora proyectos",
      description: "Navega por el marketplace con filtros de sector, fase, ROI y riesgo.",
      icon: "🔍"
    },
    {
      step: 4,
      title: "Invierte",
      description: "Selecciona tu ticket (cash/VCoin/mixto) y revisa el simulador de precio.",
      icon: "💰"
    },
    {
      step: 5,
      title: "Confirma",
      description: "Acepta términos, reglas de excedente y confirma tu inversión.",
      icon: "✅"
    },
    {
      step: 6,
      title: "Seguimiento",
      description: "Accede a tu panel con hitos, documentos y estado de inversiones.",
      icon: "📊"
    }
  ];

  const founderSteps = [
    {
      step: 1,
      title: "Registro",
      description: "Crea cuenta y verifica tu identidad y empresa según jurisdicción.",
      icon: "🏢"
    },
    {
      step: 2,
      title: "Publica proyecto",
      description: "Define metas cash y VCoin, sube documentos y pitch deck.",
      icon: "📋"
    },
    {
      step: 3,
      title: "Configura reglas",
      description: "Establece regla de excedente y tipo de oferta (rewards/financiero).",
      icon: "⚙️"
    },
    {
      step: 4,
      title: "Campaña activa",
      description: "Comunica con inversores y publica actualizaciones regulares.",
      icon: "📢"
    },
    {
      step: 5,
      title: "Cierre de ronda",
      description: "Recibe cash en cuenta bancaria y VCoin en wallet/custodia.",
      icon: "🎯"
    },
    {
      step: 6,
      title: "Ejecución",
      description: "Entrega hitos y mantén comunicación con tu comunidad.",
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Cómo funciona VCoin
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                La plataforma que conecta capital y talento con financiación híbrida. 
                6 pasos simples para inversores y emprendedores.
              </p>
            </div>

            {/* Timeline general */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Proceso general</h2>
              <div className="grid md:grid-cols-6 gap-6">
                {[
                  { title: "Compra de VCoin", desc: "Los inversores adquieren VCoin y ven su saldo" },
                  { title: "Explora proyectos", desc: "Marketplace con filtros avanzados" },
                  { title: "Ticket híbrido", desc: "Cash, VCoin o mixto según el proyecto" },
                  { title: "Asignación dinámica", desc: "Simulador de precio y reglas claras" },
                  { title: "Cierre & distribución", desc: "Proyecto recibe cash y VCoin" },
                  { title: "Seguimiento", desc: "Panel con hitos y métricas" }
                ].map((step, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-2">
                        {index + 1}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tabs detallados */}
            <Tabs defaultValue="investors" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="investors">Para inversores</TabsTrigger>
                <TabsTrigger value="founders">Para emprendedores</TabsTrigger>
              </TabsList>
              
              <TabsContent value="investors" className="mt-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Flujo del inversor</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Desde la compra de VCoin hasta el seguimiento de tu cartera de inversiones.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {investorSteps.map((step) => (
                    <Card key={step.step} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="text-4xl mb-2">{step.icon}</div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button size="lg" onClick={() => window.location.href = '/for-investors'}>
                    Más info para inversores
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="founders" className="mt-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Flujo del emprendedor</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Desde la publicación de tu proyecto hasta la recepción de financiación híbrida.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {founderSteps.map((step) => (
                    <Card key={step.step} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="text-4xl mb-2">{step.icon}</div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button size="lg" onClick={() => window.location.href = '/for-founders'}>
                    Más info para emprendedores
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* CTA final */}
            <div className="text-center mt-16 p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">¿Listo para empezar?</h3>
              <p className="text-muted-foreground mb-6">
                Únete a la revolución de la financiación híbrida con VCoin.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/projects'}>
                  Explorar proyectos
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/wallet-auth'}>
                  Conectar wallet
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;