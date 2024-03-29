import Fastify from 'fastify'
import corsPlugin from '@fastify/cors'
import path from 'node:path'
import staticDirPlugin from '@fastify/static';
import { v4 } from 'uuid'

import { runPromptRewrite } from './runPromptRewrite'

// Import the framework and instantiate it
const fastify = Fastify({
  logger: true
});

await fastify.register(staticDirPlugin, {
  root: path.join(process.cwd(), 'khan-classes'),
  prefix: '/public/',
});

await fastify.register(corsPlugin, {
  origin: ['http://localhost:5173']
})

const map = new Map()

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
    username: 'You',
    prompt
  };

  runPromptRewrite(prompt, animationId).then(() => {
    const baseUrl = 'http://127.0.0.1:3000/public/'

    map.set(animationId, {
      ...animation,
      audio: baseUrl.concat(animationId, '-audio.mp3'),
      video: baseUrl.concat(animationId, '-video.mp4'),
      status: AnimationStatus.READY,
    })
  }).catch(() => {
    map.set(animationId, {
      ...animation,
      status: AnimationStatus.ERROR,
    });
  });

  map.set(animationId, animation)

  return animation;
});

fastify.get('/api/animation/:animationId', function (request, reply) {
  const { animationId } = request.params;
  const animation = map.get(animationId)

  if (!animation) {
    return fastify.notFound(request, reply)
  }

  return animation
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
