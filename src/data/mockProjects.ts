import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "PayLink SaaS",
    slug: "paylink-saas",
    summary: "Plataforma de pagos para pequeños comercios con integración WhatsApp y facturación automática.",
    category: "SaaS",
    stage: "MVP",
    country: "España",
    goal_cash_eur: 40000,
    goal_vcoin: 80000,
    min_ticket_eur: 200,
    min_ticket_vcoin: 500,
    accepts_mix: true,
    oversubscription_rule: "pro-rata",
    use_of_funds: "70% desarrollo producto, 20% marketing, 10% legal",
    team: [
      { name: "Ana García", role: "CEO", linkedin: "#" },
      { name: "Carlos López", role: "CTO", linkedin: "#" }
    ],
    documents: [
      { title: "Pitch Deck", url: "#", type: "pitch" },
      { title: "Plan Financiero", url: "#", type: "financial" }
    ],
    risks: "Riesgo de mercado competitivo, dependencia de WhatsApp API",
    jurisdiction: "España",
    status: "closing-soon",
    cover_image: "/placeholder.svg",
    metrics: {
      mrr: 2500,
      users: 150
    },
    perks: [
      { title: "Acceso Beta", description: "Prueba la plataforma antes del lanzamiento", tier_requirement: 500 },
      { title: "Consultoría", description: "1 hora de consultoría gratis", tier_requirement: 1000 }
    ],
    investor_rights: "Participación en revenue share del 2% durante 3 años",
    raised_cash: 32000,
    raised_vcoin: 64000,
    progress_percentage: 80
  },
  {
    id: "2",
    title: "EcoShop Local",
    slug: "ecoshop-local",
    summary: "Marketplace de productos sostenibles con delivery en 24h para Barcelona.",
    category: "eCom",
    stage: "growth",
    country: "España",
    goal_cash_eur: 25000,
    goal_vcoin: 50000,
    min_ticket_eur: 100,
    min_ticket_vcoin: 250,
    accepts_mix: true,
    oversubscription_rule: "perks",
    use_of_funds: "50% inventario, 30% marketing, 20% logística",
    team: [
      { name: "María Fernández", role: "Fundadora", linkedin: "#" },
      { name: "Pedro Ruiz", role: "Operaciones", linkedin: "#" }
    ],
    documents: [
      { title: "Business Plan", url: "#", type: "financial" },
      { title: "Términos", url: "#", type: "terms" }
    ],
    risks: "Estacionalidad, competencia con grandes marketplaces",
    jurisdiction: "España",
    status: "open",
    cover_image: "/placeholder.svg",
    metrics: {
      gmv: 15000,
      users: 800
    },
    perks: [
      { title: "Descuento 10%", description: "Descuento vitalicio en todas las compras", tier_requirement: 250 },
      { title: "Pack Eco", description: "Pack de productos sostenibles valorado en 50€", tier_requirement: 500 }
    ],
    investor_rights: "Rewards-based, sin participación financiera",
    raised_cash: 18500,
    raised_vcoin: 37000,
    progress_percentage: 74
  },
  {
    id: "3",
    title: "CryptoLearn",
    slug: "cryptolearn",
    summary: "Academia online de blockchain y DeFi con certificaciones verificadas en la blockchain.",
    category: "Crypto",
    stage: "idea",
    country: "México",
    goal_cash_eur: 15000,
    goal_vcoin: 30000,
    min_ticket_eur: 50,
    min_ticket_vcoin: 125,
    accepts_mix: false,
    oversubscription_rule: "cap",
    use_of_funds: "60% contenido, 25% plataforma, 15% marketing",
    team: [
      { name: "Roberto Silva", role: "CEO", linkedin: "#" }
    ],
    documents: [
      { title: "MVP Demo", url: "#", type: "pitch" }
    ],
    risks: "Regulación educativa, adopción de certificaciones blockchain",
    jurisdiction: "México",
    status: "open",
    cover_image: "/placeholder.svg",
    perks: [
      { title: "Curso Gratis", description: "Acceso gratuito al primer curso", tier_requirement: 125 },
      { title: "Mentoría", description: "Sesión de mentoría 1:1", tier_requirement: 250 }
    ],
    investor_rights: "Acceso anticipado y descuentos en cursos",
    raised_cash: 4200,
    raised_vcoin: 8400,
    progress_percentage: 28
  }
];