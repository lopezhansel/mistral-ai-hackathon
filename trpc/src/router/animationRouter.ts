import { db, schema } from "@repo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { runPromptRewrite } from "../runPromptRewrite";

export const AnimationStatus = {
  READY: "READY",
  PENDING: "PENDING",
  ERROR: "ERROR",
};

export const animationRouter = router({
  create: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .mutation(async ({ input: { prompt } }) => {
      const animaitonValues = {
        prompt,
        status: AnimationStatus.PENDING,
        username: "You",
      };
      const [animation] = await db
        .insert(schema.animations)
        .values(animaitonValues)
        .returning({ id: schema.animations.animationId });

      const animationId = animation.id.toString();

      runPromptRewrite(prompt, animationId)
        .then(() => {
          const baseUrl = "http://localhost:3000/public/";
          return db
            .update(schema.animations)
            .set({
              audio: baseUrl.concat(animationId, "-audio.mp3"),
              video: baseUrl.concat(animationId, "-video.mp4"),
              status: AnimationStatus.READY,
            })
            .where(eq(schema.animations.animationId, animation.id));
        })
        .catch(() => {
          return db
            .update(schema.animations)
            .set({ status: AnimationStatus.ERROR })
            .where(eq(schema.animations.animationId, animation.id));
        });

      const newLocal = await db.query.animations.findFirst({
        where: eq(schema.animations.animationId, animation.id),
      });
      return newLocal;
    }),
  list: publicProcedure.query(async () => {
    return db.select().from(schema.animations);
  }),
  getById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;

    const animation = await db.query.animations.findFirst({
      where: eq(schema.animations.animationId, input),
    });

    return animation;
  }),
});
