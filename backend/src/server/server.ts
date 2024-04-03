import Fastify from "fastify";

import * as plugins from "./plugins";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translatetime: "hh:mm:ss z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

export const server = Fastify({
  logger: envToLogger.development,
  // Larger maxParamLength is needed for trpc query params
  maxParamLength: 5000,
});

await server.register(plugins.staticDir);
await server.register(plugins.vite);
server.register(plugins.trpc);
server.register(plugins.notFound);

await server.vite.ready();
