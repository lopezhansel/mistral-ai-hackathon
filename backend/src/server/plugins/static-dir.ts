import fastifyStaticDirPlugin from "@fastify/static";
import fastifyPlugin from "fastify-plugin";
import { fileURLToPath } from "node:url";

const kahnClassesDir = fileURLToPath(
  new URL("../../../khan-classes", import.meta.url)
);

export const staticDir = fastifyPlugin(async function (fastify) {
  await fastifyStaticDirPlugin(fastify, {
    root: kahnClassesDir,
    prefix: "/public/",
  });
});
