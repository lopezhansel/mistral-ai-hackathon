import { resolve, dirname } from 'node:path';
import fastifyStaticDirPlugin from '@fastify/static';
import fastifyPlugin from 'fastify-plugin'
import { fileURLToPath } from 'node:url';

const pathDir = dirname(fileURLToPath(import.meta.url))
const kahnClassesDir = resolve(pathDir, '../../../khan-classes')


export const staticDir = fastifyPlugin(async function (fastify) {
  await fastifyStaticDirPlugin(fastify, {
    root: kahnClassesDir,
    prefix: '/public/',
  });
});
