import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "PayLink SaaS",
    slug: "paylink-saas",
    summary: "Payment platform for small businesses with WhatsApp integration and automatic invoicing.",
    category: "SaaS",
    stage: "MVP",
    country: "Spain",
    goal_cash_eur: 40000,
    goal_vcoin: 80000,
    min_ticket_eur: 200,
    min_ticket_vcoin: 500,
    accepts_mix: true,
    oversubscription_rule: "pro-rata",
    use_of_funds: "70% product development, 20% marketing, 10% legal",
    team: [
      { name: "Ana García", role: "CEO", linkedin: "#" },
      { name: "Carlos López", role: "CTO", linkedin: "#" }
    ],
    documents: [
      { title: "Pitch Deck", url: "#", type: "pitch" },
      { title: "Financial Plan", url: "#", type: "financial" }
    ],
    risks: "Competitive market risk, WhatsApp API dependency",
    jurisdiction: "Spain",
    status: "closing-soon",
    cover_image: "/placeholder.svg",
    metrics: {
      mrr: 2500,
      users: 150
    },
    perks: [
      { title: "Beta Access", description: "Test the platform before launch", tier_requirement: 500 },
      { title: "Consultation", description: "1 hour of free consultation", tier_requirement: 1000 }
    ],
    investor_rights: "2% revenue share participation for 3 years",
    raised_cash: 32000,
    raised_vcoin: 64000,
    progress_percentage: 80
  },
  {
    id: "2",
    title: "EcoShop Local",
    slug: "ecoshop-local",
    summary: "Sustainable products marketplace with 24h delivery for Barcelona.",
    category: "eCom",
    stage: "growth",
    country: "Spain",
    goal_cash_eur: 25000,
    goal_vcoin: 50000,
    min_ticket_eur: 100,
    min_ticket_vcoin: 250,
    accepts_mix: true,
    oversubscription_rule: "perks",
    use_of_funds: "50% inventory, 30% marketing, 20% logistics",
    team: [
      { name: "María Fernández", role: "Founder", linkedin: "#" },
      { name: "Pedro Ruiz", role: "Operations", linkedin: "#" }
    ],
    documents: [
      { title: "Business Plan", url: "#", type: "financial" },
      { title: "Terms", url: "#", type: "terms" }
    ],
    risks: "Seasonality, competition with large marketplaces",
    jurisdiction: "Spain",
    status: "open",
    cover_image: "/placeholder.svg",
    metrics: {
      gmv: 15000,
      users: 800
    },
    perks: [
      { title: "10% Discount", description: "Lifetime discount on all purchases", tier_requirement: 250 },
      { title: "Eco Pack", description: "Sustainable products pack worth €50", tier_requirement: 500 }
    ],
    investor_rights: "Rewards-based, no financial participation",
    raised_cash: 18500,
    raised_vcoin: 37000,
    progress_percentage: 74
  },
  {
    id: "3",
    title: "CryptoLearn",
    slug: "cryptolearn",
    summary: "Online blockchain and DeFi academy with blockchain-verified certifications.",
    category: "Crypto",
    stage: "idea",
    country: "Mexico",
    goal_cash_eur: 15000,
    goal_vcoin: 30000,
    min_ticket_eur: 50,
    min_ticket_vcoin: 125,
    accepts_mix: false,
    oversubscription_rule: "cap",
    use_of_funds: "60% content, 25% platform, 15% marketing",
    team: [
      { name: "Roberto Silva", role: "CEO", linkedin: "#" }
    ],
    documents: [
      { title: "MVP Demo", url: "#", type: "pitch" }
    ],
    risks: "Educational regulation, blockchain certification adoption",
    jurisdiction: "Mexico",
    status: "open",
    cover_image: "/placeholder.svg",
    perks: [
      { title: "Free Course", description: "Free access to the first course", tier_requirement: 125 },
      { title: "Mentorship", description: "1:1 mentorship session", tier_requirement: 250 }
    ],
    investor_rights: "Early access and course discounts",
    raised_cash: 4200,
    raised_vcoin: 8400,
    progress_percentage: 28
  }
];