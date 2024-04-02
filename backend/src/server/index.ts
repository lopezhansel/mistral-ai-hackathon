import Fastify from 'fastify'

import * as plugins from './plugins';
import routes from './routes';

export const fastify = Fastify({
  logger: true,
  maxParamLength: 5000,
});

fastify.register(plugins.cors);
await fastify.register(plugins.staticDir);
await fastify.register(plugins.vite);
fastify.register(plugins.trpc)
fastify.register(routes)

fastify.decorate('notFound', (request, reply) => {
  reply.code(404).type('text/html').send('Not Found')
})

await fastify.vite.ready();

fastify.setNotFoundHandler(fastify.notFound)

