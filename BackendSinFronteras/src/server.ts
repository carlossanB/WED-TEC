import "dotenv/config";
import { buildApp } from "./app.js";

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || "0.0.0.0";

const start = async () => {
  try {
    const server = await buildApp();
    await server.listen({ port, host });
    console.log(`🚀 Servidor listo en http://${host}:${port}`);
  } catch (err) {
    console.error("Error al iniciar el servidor Fastify:", err);
    process.exit(1);
  }
};

start();
