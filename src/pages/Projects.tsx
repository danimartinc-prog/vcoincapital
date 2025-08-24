import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockProjects } from "@/data/mockProjects";
import { Project } from "@/types/project";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                         project.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    const matchesStage = stageFilter === "all" || project.stage === stageFilter;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'closing-soon': return 'bg-yellow-500';
      case 'closed': return 'bg-gray-500';
      case 'funded': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'closing-soon': return 'Cerrando pronto';
      case 'closed': return 'Cerrado';
      case 'funded': return 'Financiado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Proyectos listos para tu próximo movimiento
              </h1>
              <p className="text-xl text-muted-foreground">
                Tickets híbridos, métricas claras y documentación verificada.
              </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Input
                placeholder="Buscar proyectos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="eCom">eCommerce</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="Impact">Impacto</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Fase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fases</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="MVP">MVP</SelectItem>
                  <SelectItem value="growth">Crecimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid de proyectos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.country} • {project.stage}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{project.summary}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Objetivo:</span>
                        <span className="font-semibold">
                          €{project.goal_cash_eur.toLocaleString()} + {project.goal_vcoin.toLocaleString()} VCOIN
                        </span>
                      </div>
                      <Progress value={project.progress_percentage} className="h-2" />
                      <div className="text-center text-sm text-muted-foreground">
                        {project.progress_percentage}% financiado
                      </div>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Ticket mínimo:</span>
                        <span>€{project.min_ticket_eur} / {project.min_ticket_vcoin} VCOIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regla excedente:</span>
                        <Badge variant="outline" className="text-xs">
                          {project.oversubscription_rule}
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => window.location.href = `/project/${project.slug}`}
                    >
                      Ver proyecto
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron proyectos con los filtros aplicados.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;