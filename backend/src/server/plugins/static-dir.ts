import path from 'node:path';
import fastifyStaticDirPlugin from '@fastify/static';
import fastifyPlugin from 'fastify-plugin'

export const staticDirPlugin = fastifyPlugin(async function (fastify) {
  await fastifyStaticDirPlugin(fastify, {
    root: path.join(process.cwd(), 'khan-classes'),
    prefix: '/public/',
  });
});
