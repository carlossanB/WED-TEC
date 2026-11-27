import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import "dotenv/config";
import { uscisRoutes } from "./modules/uscis/uscis.routes.js";
import { leadsRoutes } from "./modules/leads/leads.routes.js";

/**
 * Fábrica de la aplicación Fastify.
 * Configura middlewares, CORS, plugins y rutas compartidas para entorno local y Netlify Functions.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: process.env.NODE_ENV !== "test",
  });

  // Configuración de CORS
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : [
        "http://localhost:8443",
        "http://127.0.0.1:8443",
        "http://192.168.0.107:8443",
      ];

  await app.register(cors, {
    origin: (origin, cb) => {
      // Si no hay origin (llamadas internas o serverless) o está en la lista de orígenes, se permite
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }
      cb(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // Rate limiting (activo solo en servidor local/standalone)
  if (process.env.NETLIFY !== "true") {
    await app.register(rateLimit, {
      max: 100,
      timeWindow: "1 minute",
    });
  }

  // Endpoints de salud y verificación
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "backend-sin-fronteras",
      timestamp: new Date().toISOString(),
    };
  });

  app.get("/api/status", async () => {
    return {
      status: "ok",
      service: "backend-sin-fronteras",
      timestamp: new Date().toISOString(),
    };
  });

  // Rutas de USCIS: soportan prefijo completo /api/uscis y directo /uscis
  await app.register(uscisRoutes, { prefix: "/api/uscis" });
  await app.register(uscisRoutes, { prefix: "/uscis" });

  // Rutas de Leads: soportan prefijo completo /api/leads y directo /leads
  await app.register(leadsRoutes, { prefix: "/api/leads" });
  await app.register(leadsRoutes, { prefix: "/leads" });

  return app;
}
