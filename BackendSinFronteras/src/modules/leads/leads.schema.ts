import { z } from "zod";

export const createLeadSchema = z.object({
  fullName: z
    .string({ required_error: "El nombre completo es requerido." })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  contact: z
    .string({ required_error: "El contacto es requerido (teléfono o correo)." })
    .trim()
    .min(5, "Ingresa un teléfono o correo electrónico válido."),
  service: z.string().trim().optional().default(""),
  urgency: z.enum(["baja", "media", "alta"]).optional().default("media"),
  location: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar los términos y el aviso de privacidad para continuar.",
    }),
  }),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
