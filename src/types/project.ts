export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: 'SaaS' | 'eCom' | 'Local' | 'Crypto' | 'Impact' | 'Hardware' | 'Fintech';
  stage: 'idea' | 'MVP' | 'growth';
  country: string;
  goal_cash_eur: number;
  goal_vcoin: number;
  min_ticket_eur: number;
  min_ticket_vcoin: number;
  accepts_mix: boolean;
  oversubscription_rule: 'pro-rata' | 'cap' | 'perks';
  use_of_funds: string;
  team: Array<{
    name: string;
    role: string;
    linkedin?: string;
  }>;
  documents: Array<{
    title: string;
    url: string;
    type: 'pitch' | 'financial' | 'terms';
  }>;
  risks: string;
  jurisdiction: string;
  status: 'open' | 'closing-soon' | 'closed' | 'funded';
  cover_image: string;
  metrics?: {
    mrr?: number;
    gmv?: number;
    users?: number;
  };
  perks: Array<{
    title: string;
    description: string;
    tier_requirement: number;
  }>;
  investor_rights: string;
  raised_cash: number;
  raised_vcoin: number;
  progress_percentage: number;
}