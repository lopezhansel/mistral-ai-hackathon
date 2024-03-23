import Fastify from 'fastify'


// Import the framework and instantiate it
const fastify = Fastify({
  logger: true
})

fastify.post('/api/animation/', async function handler(request, reply) {
  return {
    "animationId": "some-uuid-abcd-efgh"
  };
})

fastify.get('/api/animation/:animationId', function (request, reply) {
  const { animationId } = request.params;

  return {
    animationId,
    "status": "READY",
    "video": "http:///domain.com/api/animaton/uuid"
  };
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
