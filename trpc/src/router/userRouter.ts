import { db, schema } from "@repo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [id] = await db
        .insert(schema.users)
        .values(input)
        .returning({ id: schema.users.id });
      return id;
    }),
  list: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    return db.select().from(schema.users);
  }),
  getById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, input),
    });

    return user;
  }),
});
