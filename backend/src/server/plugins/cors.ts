import fastifyCorsPlugin from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'

export const corsPlugin = fastifyPlugin(function (fastify, opts, done) {
  fastifyCorsPlugin(fastify, {
    origin: ['http://localhost:5173']
  }, done)
});
