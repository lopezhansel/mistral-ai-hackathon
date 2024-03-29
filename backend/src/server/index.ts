import Fastify from 'fastify'

import { corsPlugin, staticDirPlugin } from './plugins';
import routes from './routes';
import { trpcPlugin } from './trpc-routes';

export const fastify = Fastify({
  logger: true,
  maxParamLength: 5000,
});

await fastify.register(staticDirPlugin)
fastify.register(trpcPlugin)
fastify.register(corsPlugin)
fastify.register(routes)

fastify.decorate('notFound', (request, reply) => {
  reply.code(404).type('text/html').send('Not Found')
})

fastify.setNotFoundHandler(fastify.notFound)

