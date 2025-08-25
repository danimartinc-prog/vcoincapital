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
    { id: "resumen", title: "Resumen Ejecutivo", icon: BookOpen },
    { id: "vision", title: "Visión y Misión", icon: Target },
    { id: "problema", title: "Problema que Resolvemos", icon: TrendingUp },
    { id: "solucion", title: "La Solución VCoin", icon: Zap },
    { id: "tokenomics", title: "Tokenomics", icon: Coins },
    { id: "utilidad", title: "Utilidad del Token", icon: Users },
    { id: "tecnologia", title: "Tecnología", icon: Shield },
    { id: "mercado", title: "Análisis de Mercado", icon: Globe },
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
            El futuro de la financiación híbrida: conectando inversores y emprendedores 
            a través de un ecosistema descentralizado y transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Download size={20} />
              Descargar PDF
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('resumen')}>
              Leer Online
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
                <h3 className="font-semibold mb-4">Índice de Contenidos</h3>
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
                    <h2 className="text-3xl font-bold">Resumen Ejecutivo</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      VCoin representa una revolución en la forma en que se financia la innovación empresarial. 
                      Nuestro token conecta el capital global con el talento emprendedor a través de un modelo 
                      de financiación híbrida que combina efectivo tradicional con tokens de utilidad.
                    </p>
                    <p>
                      En un ecosistema donde los inversores buscan oportunidades diversificadas y los emprendedores 
                      necesitan capital accesible, VCoin actúa como el puente que hace posible esta conexión de 
                      manera transparente, eficiente y alineada con los incentivos de toda la comunidad.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">100M</h4>
                        <p className="text-sm">Suministro Máximo</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">Base L2</h4>
                        <p className="text-sm">Blockchain</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold text-primary">€0.10</h4>
                        <p className="text-sm">Precio Inicial</p>
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
                    <h2 className="text-3xl font-bold">Visión y Misión</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Nuestra Visión</h3>
                      <p className="text-muted-foreground">
                        Crear el ecosistema financiero más transparente y eficiente del mundo, donde cualquier 
                        emprendedor con una idea valiosa pueda acceder al capital necesario y cualquier inversor 
                        pueda participar en el futuro de la innovación.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Nuestra Misión</h3>
                      <p className="text-muted-foreground">
                        Democratizar el acceso al capital de riesgo mediante tecnología blockchain, eliminando 
                        barreras geográficas y burocráticas, mientras creamos un modelo de financiación que 
                        alinea los incentivos de inversores y emprendedores a largo plazo.
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
                    <h2 className="text-3xl font-bold">Problema que Resolvemos</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      El ecosistema tradicional de financiación empresarial presenta múltiples fricciones 
                      que limitan tanto a inversores como a emprendedores:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-accent">Para Emprendedores</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Acceso limitado a capital de riesgo
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Procesos largos y burocráticos
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Falta de transparencia en la evaluación
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Concentración geográfica del capital
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-accent">Para Inversores</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Altas barreras de entrada (tickets mínimos)
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Falta de diversificación accesible
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Información asimétrica
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight size={16} className="mt-1 text-primary flex-shrink-0" />
                            Procesos de due diligence costosos
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
                    <h2 className="text-3xl font-bold">La Solución VCoin</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      VCoin introduce un modelo revolucionario de financiación híbrida que combina lo mejor 
                      de las finanzas tradicionales y descentralizadas:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Coins className="text-primary" size={20} />
                            Financiación Híbrida
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Los proyectos pueden establecer objetivos tanto en efectivo (€) como en VCoin, 
                            permitiendo múltiples formas de participación y creando un ecosistema más flexible.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Shield className="text-accent" size={20} />
                            Transparencia Total
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Todas las transacciones, reglas de excedente y asignaciones son visibles 
                            on-chain, eliminando la opacidad tradicional del capital de riesgo.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Users className="text-primary" size={20} />
                            Comunidad Alineada
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Los holders de VCoin se convierten en parte activa del ecosistema, 
                            con derecho a voto en decisiones clave y acceso preferencial a nuevos proyectos.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Globe className="text-accent" size={20} />
                            Acceso Global
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Sin restricciones geográficas, cualquier persona en el mundo puede 
                            participar como inversor o emprendedor, democratizando el acceso al capital.
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
                        <h3 className="text-xl font-semibold">Especificaciones del Token</h3>
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
                            <span className="text-muted-foreground">Suministro Total:</span>
                            <span className="font-medium">100,000,000 VCOIN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Precio Inicial:</span>
                            <span className="font-medium">€0.10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Distribución de Tokens</h3>
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
                    <h2 className="text-3xl font-bold">Utilidad del Token</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Medio de Inversión</h3>
                      <p className="text-sm text-muted-foreground">
                        VCoin sirve como moneda nativa para invertir en proyectos listados en la plataforma, 
                        creando un ciclo económico cerrado y sostenible.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Acceso a Tiers</h3>
                      <p className="text-sm text-muted-foreground">
                        Los holders obtienen acceso early access, mejores límites de ticket y perks exclusivos 
                        basados en la cantidad de VCoin que poseen.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Gobernanza</h3>
                      <p className="text-sm text-muted-foreground">
                        Derecho a voto sobre decisiones clave: qué verticales priorizar, uso del matching pool 
                        y destacados en la plataforma.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Staking</h3>
                      <p className="text-sm text-muted-foreground">
                        Funcionalidad opcional de staking que otorga prioridad de asignación en proyectos 
                        con alta demanda y liquidez reducida.
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
                            Landing page, marketplace de proyectos, sistema de inversión demo, KYC básico
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
                            Lanzamiento de VCoin, on-ramp fiat, staking básico, gobernanza inicial
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
                            Auditoría de smart contracts, aplicación móvil, partnerships estratégicos
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