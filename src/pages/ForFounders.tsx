import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForFounders = () => {
  const benefits = [
    {
      title: "Financiación híbrida",
      description: "Recibe cash para operar + VCoin para alinear incentivos con la comunidad.",
      icon: "💰"
    },
    {
      title: "Comunidad comprometida",
      description: "Los holders de VCoin están incentivados en el éxito de tu proyecto.",
      icon: "👥"
    },
    {
      title: "Flexibilidad de reglas",
      description: "Tú decides cómo gestionar excedentes: pro-rata, cap o conversión a perks.",
      icon: "⚙️"
    },
    {
      title: "Transparencia total",
      description: "Panel de comunicación directo con tus inversores y métricas públicas.",
      icon: "📊"
    },
    {
      title: "Sin intermediarios",
      description: "Conexión directa con capital sin comisiones ocultas.",
      icon: "🤝"
    },
    {
      title: "Global desde día uno",
      description: "Accede a inversores de múltiples jurisdicciones con cumplimiento automático.",
      icon: "🌍"
    }
  ];

  const projectTypes = [
    {
      type: "Rewards/Perks",
      description: "Recompensas no financieras como productos, experiencias o descuentos",
      suitable: "Productos físicos, servicios, contenido digital",
      requirements: "Mínimos requisitos legales",
      badge: "Fácil"
    },
    {
      type: "Revenue Share",
      description: "Participación en ingresos durante un período determinado",
      suitable: "SaaS, eCommerce con métricas claras",
      requirements: "Cumplimiento según jurisdicción",
      badge: "Medio"
    },
    {
      type: "Equity-like",
      description: "Instrumentos similares a participación accionarial",
      suitable: "Startups en crecimiento, inversores acreditados",
      requirements: "ECSPR/MiCA compliance",
      badge: "Avanzado"
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
                Lanza tu ronda híbrida
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Publica tu proyecto con metas cash + VCoin. Sube documentos, define reglas de excedente 
                y comunica avances. Recibe comunidad y runway para escalar.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/wallet-auth'}>
                  Publicar proyecto
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/how-it-works'}>
                  Ver proceso completo
                </Button>
              </div>
            </div>

            {/* Beneficios */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Financiación alineada con tu comunidad
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
                Define dos metas: cash y VCoin. Recibe capital + comunidad comprometida. 
                Decide cómo gestionar excedentes (pro-rata, cap o perks). Transparencia en todo momento.
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

            {/* Tipos de proyecto */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Tipos de oferta disponibles</h2>
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
                        <h4 className="font-semibold text-sm mb-1">Ideal para:</h4>
                        <p className="text-sm text-muted-foreground">{type.suitable}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Requisitos:</h4>
                        <p className="text-sm text-muted-foreground">{type.requirements}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  * Los tipos de oferta disponibles dependen de tu jurisdicción y perfil de inversor objetivo
                </p>
              </div>
            </div>

            {/* Configuración de excedentes */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Gestión de excedentes</h2>
              <div className="max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border mb-6">
                  <h3 className="text-xl font-bold mb-4">Ejemplo práctico:</h3>
                  <p className="text-muted-foreground mb-4">
                    Tu proyecto pide <strong>100,000 VCOIN</strong> y <strong>50,000 €</strong>. 
                    Si VCoin vale 0,50 €, la parte token "equivale" a 50,000 €.
                  </p>
                  <p className="text-muted-foreground">
                    Si al cerrar VCoin sube a 0,75 €, esos 100,000 VCOIN equivaldrían a 75,000 €. 
                    <strong> Excedente = 25,000 €</strong>
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Pro-rata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Se reduce la cantidad de VCoin aceptada para cumplir exactamente el objetivo.
                      </p>
                      <div className="text-xs bg-green-500/10 p-2 rounded">
                        <strong>Resultado:</strong> Recibes exactamente lo planeado, devuelves el excedente.
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600">Cap + redistribución</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Se respeta un cap del +20%. El excedente se redistribuye según política acordada.
                      </p>
                      <div className="text-xs bg-blue-500/10 p-2 rounded">
                        <strong>Resultado:</strong> Más runway para marketing y desarrollo.
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-600">Cap + perks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Lo que supera el cap se convierte en perks/beneficios extra para inversores.
                      </p>
                      <div className="text-xs bg-purple-500/10 p-2 rounded">
                        <strong>Resultado:</strong> Mayor valor para la comunidad de inversores.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Proceso paso a paso */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Tu ronda en 6 pasos</h2>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Registro y verificación",
                      description: "Verifica tu identidad y empresa según tu jurisdicción",
                      time: "2-5 días"
                    },
                    {
                      step: 2,
                      title: "Configuración del proyecto",
                      description: "Define metas cash/VCoin, sube documentos y selecciona tipo de oferta",
                      time: "1-2 días"
                    },
                    {
                      step: 3,
                      title: "Revisión y aprobación",
                      description: "Nuestro equipo revisa tu proyecto para cumplimiento y calidad",
                      time: "3-7 días"
                    },
                    {
                      step: 4,
                      title: "Campaña activa",
                      description: "Tu proyecto sale en vivo. Comunica updates y atrae inversores",
                      time: "30-60 días"
                    },
                    {
                      step: 5,
                      title: "Cierre de ronda",
                      description: "Recibe cash en tu cuenta y VCoin en wallet/custodia",
                      time: "2-3 días"
                    },
                    {
                      step: 6,
                      title: "Ejecución y reporting",
                      description: "Entrega hitos y mantén comunicación con tu comunidad",
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

            {/* Requisitos */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Requisitos mínimos</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentación básica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Pitch deck (máx 15 slides)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Plan financiero básico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Constitución de empresa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Identificación del equipo</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Criterios del proyecto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Objetivo mínimo: €5,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Equipo con LinkedIn verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Uso de fondos detallado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Análisis de riesgos honesto</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA final */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">¿Listo para lanzar?</h3>
              <p className="text-muted-foreground mb-6">
                Únete a emprendedores que ya están financiando con el modelo híbrido de VCoin.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/wallet-auth'}>
                  Publicar proyecto
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                  Ver ejemplos
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                Proceso de aprobación en 3-7 días. Comisión del 5% solo si tu ronda tiene éxito.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForFounders;