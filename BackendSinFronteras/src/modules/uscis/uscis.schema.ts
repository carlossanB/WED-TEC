import { z } from "zod";

// Regex estándar de Número de Recibo de USCIS: 3 letras iniciales + 10 dígitos numéricos
const RECEIPT_NUMBER_REGEX = /^[A-Z]{3}[0-9]{10}$/i;

export const caseLookupSchema = z.object({
  receiptNumber: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .refine((val) => RECEIPT_NUMBER_REGEX.test(val), {
      message:
        "El número de recibo debe contener exactamente 3 letras seguidas de 10 dígitos (ej. IOE0912345678).",
    }),
});

export type CaseLookupInput = z.infer<typeof caseLookupSchema>;

