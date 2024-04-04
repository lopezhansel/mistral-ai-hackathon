import { type AppRouter, appRouter } from "@repo/trpc";
import {
  type FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";

import fastifyPlugin from "fastify-plugin";

export const trpc = fastifyPlugin((fastify, _opts, done) => {
  fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      onError({ path, error }) {
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });

  done();
});
