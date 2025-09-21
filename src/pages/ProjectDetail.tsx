import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { formatCurrency } from "@/lib/formatters";
import { mockProjects } from "@/data/mockProjects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = mockProjects.find(p => p.slug === slug);
  const [vcoinPriceVariation, setVcoinPriceVariation] = useState([0]);
  
  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('projectDetail.notFound')}</h1>
            <Button onClick={() => window.location.href = '/projects'}>
              {t('projectDetail.backToProjects')}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const baseVcoinPrice = 0.50; // €0.50 por VCOIN base
  const currentVcoinPrice = baseVcoinPrice * (1 + vcoinPriceVariation[0] / 100);
  const vcoinValueInEur = project.goal_vcoin * currentVcoinPrice;
  const totalProjectValue = project.goal_cash_eur + vcoinValueInEur;
  const surplus = vcoinValueInEur - (project.goal_vcoin * baseVcoinPrice);

  return (
    <div className="min-h-screen">
      <SEO page="projectDetail" />
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-8">
                {/* Hero del proyecto */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <Badge variant="outline">{project.stage}</Badge>
                      <Badge className="bg-green-500">{project.country}</Badge>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                  <p className="text-xl text-muted-foreground mb-6">{project.summary}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">{t('projectDetail.cashGoal')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(project.goal_cash_eur)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Objetivo VCoin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.goal_vcoin.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Acepta Mix</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.accepts_mix ? 'Sí' : 'Solo VCoin'}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Progress value={project.progress_percentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{project.progress_percentage}% financiado</span>
                      <span>€{project.raised_cash.toLocaleString()} + {project.raised_vcoin.toLocaleString()} VCOIN</span>
                    </div>
                  </div>
                </div>

                {/* Simulador de precio */}
                <Card>
                  <CardHeader>
                    <CardTitle>Simulador de Precio VCoin</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Ve cómo afecta la variación del precio de VCoin a la valoración del proyecto
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Variación precio VCoin:</span>
                        <span className="text-sm font-semibold">{vcoinPriceVariation[0]}%</span>
                      </div>
                      <Slider
                        value={vcoinPriceVariation}
                        onValueChange={setVcoinPriceVariation}
                        max={50}
                        min={-30}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-sm text-muted-foreground">Precio VCoin actual</div>
                          <div className="text-xl font-bold">€{currentVcoinPrice.toFixed(3)}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-sm text-muted-foreground">Valor VCoin en EUR</div>
                          <div className="text-xl font-bold">€{vcoinValueInEur.toLocaleString()}</div>
                        </CardContent>
                      </Card>
                    </div>

                    {surplus > 0 && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                          Excedente detectado: €{surplus.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Regla aplicada: <span className="font-semibold">{project.oversubscription_rule}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tabs con información */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="team">Equipo</TabsTrigger>
                    <TabsTrigger value="funds">Fondos</TabsTrigger>
                    <TabsTrigger value="docs">Docs</TabsTrigger>
                    <TabsTrigger value="risks">Riesgos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resumen del proyecto</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.summary}</p>
                        {project.metrics && (
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            {project.metrics.mrr && (
                              <div>
                                <div className="text-sm text-muted-foreground">MRR</div>
                                <div className="font-semibold">€{project.metrics.mrr}</div>
                              </div>
                            )}
                            {project.metrics.gmv && (
                              <div>
                                <div className="text-sm text-muted-foreground">GMV</div>
                                <div className="font-semibold">€{project.metrics.gmv}</div>
                              </div>
                            )}
                            {project.metrics.users && (
                              <div>
                                <div className="text-sm text-muted-foreground">Usuarios</div>
                                <div className="font-semibold">{project.metrics.users}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="team">
                    <Card>
                      <CardHeader>
                        <CardTitle>Equipo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {project.team.map((member, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.role}</div>
                            </div>
                            {member.linkedin && (
                              <Button variant="outline" size="sm">LinkedIn</Button>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="funds">
                    <Card>
                      <CardHeader>
                        <CardTitle>Uso de fondos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.use_of_funds}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="docs">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documentos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {project.documents.map((doc, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{doc.title}</span>
                            <Button variant="outline" size="sm">Descargar</Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="risks">
                    <Card>
                      <CardHeader>
                        <CardTitle>Riesgos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.risks}</p>
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                            ⚠️ Advertencia de riesgo
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Invertir implica riesgos. Puede perderse todo el capital.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar - Widget de inversión */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-2 border-primary/20 glow-primary">
                  <CardHeader>
                    <CardTitle className="text-center">Invertir ahora</CardTitle>
                    <div className="text-center space-y-1">
                      <div className="text-sm text-muted-foreground">Ticket mínimo</div>
                      <div className="font-semibold">
                        €{project.min_ticket_eur} / {project.min_ticket_vcoin} VCOIN
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Regla excedente:</span>
                        <Badge variant="outline">{project.oversubscription_rule}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jurisdicción:</span>
                        <span>{project.jurisdiction}</span>
                      </div>
                    </div>

                    {project.perks.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold mb-2">Perks disponibles:</div>
                        <div className="space-y-2">
                          {project.perks.map((perk, index) => (
                            <div key={index} className="text-xs p-2 bg-secondary rounded">
                              <div className="font-semibold">{perk.title}</div>
                              <div className="text-muted-foreground">{perk.description}</div>
                              <div className="text-primary">Desde {perk.tier_requirement} VCOIN</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full h-12 text-lg font-bold" onClick={() => window.location.href = '/wallet-auth'}>
                      Invertir ahora
                    </Button>

                    <div className="text-xs text-center text-muted-foreground">
                      Al hacer clic aceptas los términos y condiciones. 
                      No es asesoramiento financiero.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;