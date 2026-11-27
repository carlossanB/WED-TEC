import { FastifyPluginAsync } from "fastify";
import { UscisService } from "./uscis.service.js";
import { caseLookupSchema } from "./uscis.schema.js";

export const uscisRoutes: FastifyPluginAsync = async (server) => {
  const uscisService = new UscisService();

  server.post(
    "/case-status",
    {
      config: {
        // Regla de Rate Limiting específica para esta consulta:
        // Máximo 3 consultas por minuto por dirección IP
        rateLimit: {
          max: 3,
          timeWindow: "1 minute",
          errorResponseBuilder: () => ({
            statusCode: 429,
            error: "Too Many Requests",
            message:
              "Has alcanzado el límite de 3 consultas por minuto. Por favor, espera un momento antes de volver a consultar.",
          }),
        },
      },
    },
    async (request, reply) => {
      // 1. Validar cuerpo de la petición con Zod
      const parseResult = caseLookupSchema.safeParse(request.body);

      if (!parseResult.success) {
        const firstError =
          parseResult.error.errors[0]?.message || "Formato de número inválido.";
        return reply.status(400).send({
          error: "VALIDATION_ERROR",
          message: firstError,
        });
      }

      const { receiptNumber } = parseResult.data;

      // 2. Ejecutar la consulta en USCIS
      try {
        const caseData = await uscisService.getCaseStatus(receiptNumber);
        return reply.status(200).send({
          success: true,
          data: caseData,
        });
      } catch (error: unknown) {
        const err = error as Error;

        if (err.message === "NOT_FOUND") {
          return reply.status(404).send({
            error: "CASE_NOT_FOUND",
            message: `No se encontró ningún caso con el número de recibo ${receiptNumber}. Verifica que los 13 dígitos estén correctos.`,
          });
        }

        if (err.message.startsWith("INVALID_RECEIPT:")) {
          const customMsg = err.message.replace("INVALID_RECEIPT:", "").trim();
          return reply.status(422).send({
            error: "INVALID_RECEIPT",
            message: customMsg,
          });
        }

        server.log.error(err, `Error consultando caso ${receiptNumber}`);

        return reply.status(502).send({
          error: "USCIS_SERVICE_ERROR",
          message:
            "No pudimos conectar con los servicios de USCIS en este momento. Intenta de nuevo más tarde.",
        });
      }
    }
  );
};
