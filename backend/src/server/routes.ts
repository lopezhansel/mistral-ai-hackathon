import { v4 } from "uuid";
import fastifyPlugin from "fastify-plugin";
import { runPromptRewrite } from "../runPromptRewrite";

const map = new Map();

const AnimationStatus = {
  READY: "READY",
  PENDING: "PENDING",
  ERROR: "ERROR",
};

export default fastifyPlugin(function (fastify, _opts, done) {
  fastify.post("/api/animation/", async function handler(request) {
    const { prompt } = JSON.parse(request.body);
    const animationId = v4();
    const animation = {
      status: AnimationStatus.PENDING,
      animationId,
      username: "You",
      prompt,
    };

    runPromptRewrite(prompt, animationId)
      .then(() => {
        const baseUrl = "http://127.0.0.1:3000/public/";

        map.set(animationId, {
          ...animation,
          audio: baseUrl.concat(animationId, "-audio.mp3"),
          video: baseUrl.concat(animationId, "-video.mp4"),
          status: AnimationStatus.READY,
        });
      })
      .catch(() => {
        map.set(animationId, {
          ...animation,
          status: AnimationStatus.ERROR,
        });
      });

    map.set(animationId, animation);

    return animation;
  });

  fastify.get<{ Params: { animationId: string } }>(
    "/api/animation/:animationId",
    function (request, reply) {
      const { animationId } = request.params;
      const animation = map.get(animationId);

      if (!animation) {
        return fastify.notFound(request, reply);
      }

      return animation;
    }
  );

  done();
});
