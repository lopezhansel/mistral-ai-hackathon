import FastifyVite, { type FastifyViteOptions } from '@fastify/vite'
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path'
import fastifyPlugin from 'fastify-plugin'


export const vite = fastifyPlugin(async function (fastify) {
  const root = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../../'
  );
  const viteOptions = {
    root: root,
    dev: process.argv.includes('--dev'),
    spa: true
  } satisfies FastifyViteOptions;

  await fastify.register(FastifyVite, viteOptions);

  fastify.get('/', (_, reply) => reply.html());
});
