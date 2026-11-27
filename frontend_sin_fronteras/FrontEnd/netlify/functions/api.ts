import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "../../BackendSinFronteras/src/app.js";

let fastifyApp: any = null;
let proxyHandler: any = null;

/**
 * Inicializa y cachea la instancia de Fastify en el entorno serverless de Netlify.
 */
async function initHandler() {
  if (!proxyHandler) {
    process.env.NETLIFY = "true";
    fastifyApp = await buildApp();
    await fastifyApp.ready();
    proxyHandler = awsLambdaFastify(fastifyApp, {
      serializeLambdaArguments: false,
    });
  }
  return proxyHandler;
}

/**
 * Netlify Function Handler
 * Enruta las peticiones entrantes a /api/* hacia la aplicación Fastify.
 */
export const handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const proxy = await initHandler();
  return proxy(event, context);
};
