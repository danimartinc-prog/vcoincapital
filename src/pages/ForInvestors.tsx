import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForInvestors = () => {
  const benefits = [
    {
      title: "Custodia segura",
      description: "Tus fondos están protegidos con auditorías técnicas y partners de confianza.",
      icon: "🔒"
    },
    {
      title: "KYC/AML compliant",
      description: "Verificación por jurisdicción y cumplimiento normativo total.",
      icon: "✅"
    },
    {
      title: "Transparencia de comisiones",
      description: "Sin sorpresas. Todas las comisiones están claramente especificadas.",
      icon: "💎"
    },
    {
      title: "Diversificación inteligente",
      description: "Accede a múltiples sectores y fases de proyectos desde un único panel.",
      icon: "📊"
    },
    {
      title: "Reglas claras",
      description: "Simulador de precio y reglas de excedente visibles antes de invertir.",
      icon: "📋"
    },
    {
      title: "Acceso anticipado",
      description: "Los holders de VCoin tienen prioridad en proyectos muy demandados.",
      icon: "⚡"
    }
  ];

  const investmentOptions = [
    {
      method: "Solo Cash",
      description: "Invierte únicamente con euros si el proyecto lo permite",
      pros: ["Sin volatilidad", "Familiar para inversores tradicionales"],
      cons: ["Sin acceso a perks exclusivos", "Sin participación en gobernanza"]
    },
    {
      method: "Solo VCoin",
      description: "Utiliza únicamente VCoin para tus inversiones",
      pros: ["Acceso a perks exclusivos", "Mayor poder de inversión si VCoin sube", "Participación en gobernanza"],
      cons: ["Exposición a volatilidad del token"]
    },
    {
      method: "Mixto",
      description: "Combina cash y VCoin según las reglas del proyecto",
      pros: ["Flexibilidad máxima", "Diversificación de riesgo", "Optimización de capital"],
      cons: ["Requiere gestión más activa"]
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
                Invierte con claridad
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Tu capital, tus reglas. En VCoin eliges cómo entrar: cash, token o mixto. 
                Cada ficha muestra riesgos, términos y simulador de precio para evitar sorpresas.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/projects'}>
                  Explorar proyectos
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/how-it-works'}>
                  Cómo funciona
                </Button>
              </div>
            </div>

            {/* Beneficios */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Multiplica tu alcance con un token de utilidad real
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
                Usa VCoin para entrar antes en proyectos, conseguir mejores perks y acceder a asignaciones limitadas. 
                Si el precio sube, tu poder de inversión puede aumentar. Siempre con reglas de excedente visibles antes de invertir.
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

            {/* Opciones de inversión */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Opciones de inversión</h2>
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
                        <h4 className="font-semibold text-green-600 mb-2">Ventajas:</h4>
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
                        <h4 className="font-semibold text-yellow-600 mb-2">Consideraciones:</h4>
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

            {/* Proceso de inversión */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Tu proceso paso a paso</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">Verificación KYC</h3>
                      <p className="text-sm text-muted-foreground">Proceso automático según tu país de residencia</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Compra VCoin</h3>
                      <p className="text-sm text-muted-foreground">On-ramp fiat o conecta tu wallet existente</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Selecciona proyecto</h3>
                      <p className="text-sm text-muted-foreground">Filtros avanzados y métricas transparentes</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold mb-1">Confirma inversión</h3>
                      <p className="text-sm text-muted-foreground">Simulador de precio y reglas claras</p>
                    </div>
                  </div>
                </div>
                <Card className="border-2 border-primary/20 glow-primary">
                  <CardHeader>
                    <CardTitle>Simulador de inversión</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tu VCoin:</span>
                        <span className="font-semibold">5,000 VCOIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Precio actual:</span>
                        <span className="font-semibold">€0.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Poder de inversión:</span>
                        <span className="font-semibold text-primary">€2,500</span>
                      </div>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <div className="text-sm text-center">
                        Si VCoin sube a €0.75 (+50%)
                      </div>
                      <div className="text-lg font-bold text-center text-accent">
                        Tu poder: €3,750 (+€1,250)
                      </div>
                    </div>
                    <Button className="w-full">Comenzar simulación</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ rápido */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Preguntas frecuentes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">¿Es VCoin una recomendación de inversión?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      No. VCoin es un token de utilidad para interactuar con la plataforma. 
                      No ofrecemos asesoramiento financiero.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">¿Qué pasa si sube el precio de VCoin?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Tu poder de inversión en VCoin aumenta, pero la asignación final depende de 
                      la regla de excedentes definida por cada proyecto.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">¿Puedo invertir solo con cash?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Sí, si el proyecto lo permite. Algunos proyectos aceptan solo VCoin, 
                      otros mixto y otros permiten solo cash.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">¿Recibo equity?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Depende del tipo de oferta del proyecto y de tu jurisdicción. 
                      Lee los términos de cada ficha antes de invertir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA final */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
              <p className="text-muted-foreground mb-6">
                Únete a cientos de inversores que ya están diversificando con VCoin.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/wallet-auth'}>
                  Conectar wallet
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                  Ver proyectos
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                VCoin no es asesoramiento financiero. Algunas ofertas pueden estar restringidas por ley.
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