import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify';
import { AppRouter, appRouter } from '../trpc';

import fastifyPlugin from 'fastify-plugin'

export const trpc = fastifyPlugin(function (fastify, opts, done) {
  fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      onError({ path, error }) {
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
  });

  done();
})