export interface CaseMilestone {
  date: string
  description: string
}

export interface CaseLookupResult {
  receiptNumber: string
  formType: string
  status: string
  statusTitle: string
  statusDetails: string
  lastUpdated: string | null
  history: CaseMilestone[]
}

export type CaseLookupError =
  | { kind: "NOT_FOUND"; message: string }
  | { kind: "INVALID_RECEIPT"; message: string }
  | { kind: "RATE_LIMITED"; message: string }
  | { kind: "OFFLINE"; message: string }
  | { kind: "SERVER_ERROR"; message: string }

export type CaseLookupResponse =
  | { ok: true; data: CaseLookupResult }
  | { ok: false; error: CaseLookupError }
