export type UrgencyLevel = 'baja' | 'media' | 'alta'

export interface LeadFormData {
  fullName: string
  contact: string
  service: string
  urgency: UrgencyLevel
  location: string
  description: string
  consent: boolean
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
