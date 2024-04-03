import Fastify from "fastify";

import * as plugins from "./plugins";

export const server = Fastify({
  logger: true,
  // Larger maxParamLength is needed for trpc query params
  maxParamLength: 5000,
});

await server.register(plugins.staticDir);
await server.register(plugins.vite);
server.register(plugins.trpc);
server.register(plugins.notFound);

await server.vite.ready();
