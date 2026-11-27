import { FastifyPluginAsync } from "fastify";
import { LeadsService } from "./leads.service.js";
import { createLeadSchema } from "./leads.schema.js";

export const leadsRoutes: FastifyPluginAsync = async (server) => {
  const leadsService = new LeadsService();

  server.post("/", async (request, reply) => {
    // 1. Validar el body con Zod
    const parseResult = createLeadSchema.safeParse(request.body);

    if (!parseResult.success) {
      const firstError =
        parseResult.error.errors[0]?.message || "Datos del formulario inválidos.";
      return reply.status(400).send({
        success: false,
        error: "VALIDATION_ERROR",
        message: firstError,
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    // 2. Procesar el lead con LeadsService
    try {
      const result = await leadsService.createLead(parseResult.data, server.log);
      return reply.status(200).send(result);
    } catch (err: any) {
      server.log.error(err, "Error al procesar el lead en Bitrix24");

      // No exponer secretos ni URLs en la respuesta al cliente
      return reply.status(502).send({
        success: false,
        error: "CRM_INTEGRATION_ERROR",
        message:
          "No fue posible registrar la solicitud en nuestro sistema de atención en este momento. Por favor intenta nuevamente o contáctanos por WhatsApp.",
      });
    }
  });
};
