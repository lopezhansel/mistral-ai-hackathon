import type { FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    notFound(request: FastifyRequest, reply: FastifyReply): void;
  }
}

export const notFound = fastifyPlugin((server, _opts, done) => {
  server.decorate("notFound", (_request, reply) => {
    reply.code(404).type("text/html").send("Not Found");
  });

  server.setNotFoundHandler(server.notFound);

  done();
});
