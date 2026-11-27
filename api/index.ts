import type { IncomingMessage, ServerResponse } from "node:http";
import { buildApp } from "../BackendSinFronteras/src/app.js";

let appPromise: Promise<any> | null = null;

/**
 * Inicializa y cachea la instancia de Fastify en Vercel Serverless.
 */
async function getApp() {
  if (!appPromise) {
    process.env.VERCEL = "1";
    appPromise = (async () => {
      const app = await buildApp();
      await app.ready();
      return app;
    })();
  }
  return appPromise;
}

/**
 * Vercel Serverless Function Handler
 * Enruta las peticiones de /api/* hacia el servidor Fastify nativo.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getApp();
  app.server.emit("request", req, res);
}
