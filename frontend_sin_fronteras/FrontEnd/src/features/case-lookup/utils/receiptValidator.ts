export const VALID_PREFIXES = ["EAC", "WAC", "LIN", "SRC", "MSC", "NBC", "IOE", "YSC", "CSC"] as const
export const RECEIPT_REGEX = /^[A-Z]{3}[0-9]{10}$/i

export const SANDBOX_EXAMPLES = [
  "EAC9999103403",
  "EAC9999103404",
  "LIN9999106498",
  "SRC9999102777",
] as const

export function formatReceiptInput(raw: string): string {
  return raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 13)
}

export function validateReceipt(value: string): string | null {
  if (!value) return null
  if (value.length < 3) return null
  const prefix = value.slice(0, 3)
  if (!VALID_PREFIXES.includes(prefix as (typeof VALID_PREFIXES)[number])) {
    return `Prefijo "${prefix}" no válido. Usa: ${VALID_PREFIXES.join(", ")}`
  }
  if (value.length === 13 && !RECEIPT_REGEX.test(value)) {
    return "Formato inválido. Deben ser 3 letras + 10 dígitos (ej: EAC9999103403)"
  }
  return null
}
