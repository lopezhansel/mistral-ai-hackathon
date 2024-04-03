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
server.register(plugins.notFound)
server.register(routes)

await server.vite.ready();


