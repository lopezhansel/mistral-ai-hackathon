import Fastify from 'fastify'
import cors from '@fastify/cors'
import { v4 } from 'uuid'

// Import the framework and instantiate it
const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: ['http://localhost:5173']
})

const map = new WeakMap()

const AnimationStatus = {
  READY: 'READY',
  PENDING: 'PENDING',
  ERROR: 'ERROR'
}

fastify.decorate('notFound', (request, reply) => {
  reply.code(404).type('text/html').send('Not Found')
})

fastify.setNotFoundHandler(fastify.notFound)


fastify.post('/api/animation/', async function handler(request, reply) {
  const { prompt } = JSON.parse(request.body);
  const animationId = v4();

  const animation = {
    status: AnimationStatus.PENDING,
    animationId,
    prompt
  }

  map.set(animationId, animation)

  return animation;
});

fastify.get('/api/animation/:animationId', function (request, reply) {
  const { animationId } = request.params;

  const animation = map.get(animationId)

  if (!animation) {
    return fastify.notFound(request, reply)
  }

  return {
    ...animation,
    status: AnimationStatus.READY,
    "video": "http:///domain.com/api/animaton/uuid"
  }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
