import FastifyVite from '@fastify/vite'
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path'
import fastifyPlugin from 'fastify-plugin'


export const vite = fastifyPlugin(async function (fastify) {
  const path = fileURLToPath(import.meta.url)
  const root = resolve(dirname(path), '../../../vite.config.ts')

  await fastify.register(FastifyVite, {
    root,
    dev: process.argv.includes('--dev'),
    spa: true
  });

  fastify.get('/', (_, reply) => {
    return reply.html()
  });
});
