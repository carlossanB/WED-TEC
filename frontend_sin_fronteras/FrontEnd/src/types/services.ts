export interface ServiceStep {
  step: number
  title: string
  description: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceDetail {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: string
  categorySlug: 'proteccion' | 'estatus-trabajo' | 'familia-alivio' | 'defensa-corte'
  badge: string
  icon: string
  estimatedTime: string
  targetAudience: string
  summary: string
  description: string
  keyForm: string
  whatIsIt: string[]
  eligibility: string[]
  benefits: string[]
  processSteps: ServiceStep[]
  requiredDocuments: string[]
  faqs: ServiceFAQ[]
  whatsappMessage: string
  relatedSlugs: string[]
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
}
