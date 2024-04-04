import { fileURLToPath } from "node:url";
import fastifyStaticDirPlugin from "@fastify/static";
import fastifyPlugin from "fastify-plugin";

const kahnClassesDir = fileURLToPath(
  new URL("../../../khan-classes", import.meta.url),
);

export const staticDir = fastifyPlugin(async (fastify) => {
  await fastifyStaticDirPlugin(fastify, {
    root: kahnClassesDir,
    prefix: "/public/",
  });
});
