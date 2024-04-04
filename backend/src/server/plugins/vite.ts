import { fileURLToPath } from "node:url";
import FastifyVite, { type FastifyViteOptions } from "@fastify/vite";
import fastifyPlugin from "fastify-plugin";

export const vite = fastifyPlugin(async (fastify) => {
  const viteCofigPath = fileURLToPath(
    new URL("../../../../frontend/vite.config.ts", import.meta.url),
  );
  const viteOptions = {
    root: viteCofigPath,
    dev: process.argv.includes("--dev"),
    spa: true,
  } satisfies FastifyViteOptions;

  await fastify.register(FastifyVite, viteOptions);

  fastify.get("/", (_, reply) => reply.html());
});
