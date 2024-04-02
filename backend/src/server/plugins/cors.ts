import fastifyCorsPlugin from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'

export const cors = fastifyPlugin(function (fastify, opts, done) {
  fastifyCorsPlugin(fastify, {
    origin: ['http://localhost:5173']
  }, done)
});
