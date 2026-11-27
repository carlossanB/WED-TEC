export type UrgencyLevel = "baja" | "media" | "alta";

export interface CreateLeadPayload {
  fullName: string;
  contact: string;
  service?: string;
  urgency?: UrgencyLevel;
  location?: string;
  description?: string;
  consent: boolean;
}

export interface BitrixLeadAddResponse {
  result?: number | string;
  error?: string;
  error_description?: string;
}

export interface LeadResponseSuccess {
  success: true;
  message: string;
  bitrixLeadId: number | string | null;
}

export interface LeadResponseError {
  success: false;
  error: string;
  message: string;
  details?: Record<string, string[]>;
}
