import Fastify from 'fastify'

import * as plugins from './plugins';
import routes from './routes';

export const server = Fastify({
  logger: true,
  maxParamLength: 5000,
});

await server.register(plugins.staticDir);
await server.register(plugins.vite);
server.register(plugins.trpc)
server.register(routes)

server.decorate('notFound', (request, reply) => {
  reply.code(404).type('text/html').send('Not Found')
})

await server.vite.ready();

server.setNotFoundHandler(server.notFound)

