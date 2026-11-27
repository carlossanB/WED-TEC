// Tipos devueltos por la API de USCIS
export interface UscisOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UscisHistoryItem {
  date?: string;
  completed_text_en?: string;
  completed_text_es?: string;
  status?: string;
}

export interface UscisCaseDetails {
  receiptNumber?: string;
  formType?: string;
  submittedDate?: string;
  modifiedDate?: string;
  current_case_status_text_en?: string;
  current_case_status_desc_en?: string;
  current_case_status_text_es?: string;
  current_case_status_desc_es?: string;
  hist_case_status?: UscisHistoryItem[];
  [key: string]: unknown;
}

export interface UscisCaseRawResponse {
  case_status?: UscisCaseDetails | string;
  [key: string]: unknown;
}

// Estructura limpia y amigable que entregamos a nuestro Frontend de Sin Fronteras
export interface NormalizedCaseResponse {
  receiptNumber: string;
  formType: string;
  status: string;
  statusTitle: string;
  statusDetails: string;
  lastUpdated: string | null;
  history: Array<{
    date: string;
    description: string;
  }>;
}
