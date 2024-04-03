import FastifyVite, { type FastifyViteOptions } from '@fastify/vite'
import fastifyPlugin from 'fastify-plugin'
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path'


export const vite = fastifyPlugin(async function (fastify) {
  const viteCofigPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../../../vite.config.ts'
  );
  const viteOptions = {
    root: viteCofigPath,
    dev: process.argv.includes('--dev'),
    spa: true
  } satisfies FastifyViteOptions;

  await fastify.register(FastifyVite, viteOptions);

  fastify.get('/', (_, reply) => reply.html());
});
