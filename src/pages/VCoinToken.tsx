import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VCoinToken = () => {
  const tokenomics = [
    { category: "Ecosystem & Incentives", percentage: 40, amount: "40M VCOIN", description: "Matching pool para proyectos y recompensas" },
    { category: "Treasury/DAO", percentage: 20, amount: "20M VCOIN", description: "Reserva estratégica y partnerships" },
    { category: "Team", percentage: 15, amount: "15M VCOIN", description: "Vesting 48 meses, 12 cliff" },
    { category: "Liquidity", percentage: 10, amount: "10M VCOIN", description: "CEX/DEX + Market Making" },
    { category: "Reserve", percentage: 10, amount: "10M VCOIN", description: "Seguridad y estabilidad" },
    { category: "Advisors", percentage: 5, amount: "5M VCOIN", description: "Vesting 24 meses" }
  ];

  const utilities = [
    {
      title: "Medio de inversión",
      description: "Utiliza VCoin para invertir en proyectos listados en la plataforma",
      icon: "💰"
    },
    {
      title: "Acceso premium",
      description: "Early access, mejores límites de ticket y asignaciones prioritarias",
      icon: "⚡"
    },
    {
      title: "Gobernanza",
      description: "Vota sobre verticales prioritarias, uso del matching pool y listados",
      icon: "🗳️"
    },
    {
      title: "Staking",
      description: "Prioridad de asignación en proyectos muy demandados",
      icon: "🔒"
    }
  ];

  const technicalFAQ = [
    {
      question: "¿En qué red está VCoin?",
      answer: "VCoin está desplegado en Base (L2 de Ethereum) para garantizar bajas comisiones y alta velocidad."
    },
    {
      question: "¿Cuál es el suministro máximo?",
      answer: "100,000,000 VCOIN es el suministro máximo. No se pueden crear más tokens."
    },
    {
      question: "¿Hay comisiones en la plataforma?",
      answer: "1% de las inversiones + 1% buyback/burn opcional (configurable por gobernanza)."
    },
    {
      question: "¿Cuándo será auditado?",
      answer: "Los smart contracts serán auditados antes del lanzamiento en mainnet por firmas reconocidas."
    },
    {
      question: "¿Cómo funciona el precio?",
      answer: "El precio se determina por oferta y demanda en DEX/CEX. Oráculos proporcionan feeds en tiempo real."
    },
    {
      question: "¿Puedo hacer staking?",
      answer: "Sí, el staking estará disponible para conseguir prioridad en asignaciones de proyectos populares."
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
                El token que impulsa la financiación híbrida
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                VCoin conecta inversores y emprendedores a través de un ecosistema de utilidad real 
                con gobernanza descentralizada y incentivos alineados.
              </p>
              
              {/* Métricas básicas */}
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
                    <CardTitle className="text-sm text-muted-foreground">Red</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Base</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Suministro</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Precio inicial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€0.10</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  ⚠️ La información de tokenomics es provisional y puede actualizarse tras auditoría y gobernanza.
                </p>
              </div>
            </div>

            {/* Utilidad */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Utilidad del token</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {utilities.map((utility, index) => (
                  <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="text-4xl mb-2">{utility.icon}</div>
                      <CardTitle className="text-lg">{utility.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{utility.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tokenomics */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Distribución de tokens</h2>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  {tokenomics.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{item.category}</span>
                          <Badge variant="outline">{item.percentage}%</Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">{item.amount}</span>
                          <span className="text-sm font-semibold">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2 mb-2" />
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <div className="relative w-80 h-80">
                    {/* Placeholder para gráfico circular */}
                    <div className="w-full h-full rounded-full border-8 border-primary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold">100M</div>
                        <div className="text-lg text-muted-foreground">VCOIN</div>
                        <div className="text-sm text-muted-foreground">Total Supply</div>
                      </div>
                    </div>
                    {/* Los segmentos del pie chart irían aquí con un library como recharts */}
                  </div>
                </div>
              </div>
            </div>

            {/* Características técnicas */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Características técnicas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Red Base</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Layer 2 de Ethereum optimizado para bajas comisiones y alta velocidad.
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Comisión promedio:</span>
                        <span className="font-semibold">$0.01</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tiempo de confirmación:</span>
                        <span className="font-semibold">2 segundos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Seguridad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Contratos auditados y verificados en explorer público.
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Auditoría:</span>
                        <span className="font-semibold">Pendiente</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verificación:</span>
                        <span className="font-semibold">En proceso</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gobernanza</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Votaciones on-chain para decisiones clave del protocolo.
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Quórum mínimo:</span>
                        <span className="font-semibold">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Período de voto:</span>
                        <span className="font-semibold">7 días</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contrato placeholder */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Contrato del token</h2>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Información del contrato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Dirección del contrato:</div>
                    <div className="font-mono text-sm break-all">
                      0x... (Disponible tras deploy en mainnet)
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" disabled>
                      Ver en explorer
                    </Button>
                    <Button variant="outline" disabled>
                      Añadir a wallet
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    El contrato estará disponible tras el lanzamiento en mainnet
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ técnica */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">FAQ técnica</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {technicalFAQ.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center p-8 bg-card rounded-lg border-2 border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
                ⚠️ Información importante
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground max-w-4xl mx-auto">
                <p>
                  VCoin es un token de utilidad para interactuar con esta plataforma. 
                  Invertir implica riesgos, puede perderse todo el capital.
                </p>
                <p>
                  Algunas ofertas pueden estar restringidas a ciertos países o perfiles 
                  (p. ej., inversores acreditados). No es asesoramiento financiero ni oferta de valores.
                </p>
                <p>
                  Consulte los términos y la normativa aplicable en su jurisdicción.
                </p>
                <p className="font-semibold">
                  Los parámetros de tokenomics y comisiones pueden evolucionar vía gobernanza descentralizada.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button variant="outline" onClick={() => window.location.href = '/legal'}>
                  Términos legales
                </Button>
                <Button onClick={() => window.location.href = '/projects'}>
                  Ver proyectos
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

export default VCoinToken;