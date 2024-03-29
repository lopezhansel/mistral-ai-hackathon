import { z } from 'zod';
// import { db, schema } from '../db';
import { router, publicProcedure } from './trpc';
// import { eq } from 'drizzle-orm';


const userRouter = router({
  create: publicProcedure
    .input(z.object({
      phone: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    }))
    .mutation(async ({ input }) => {
      // const ids = await db.insert(schema.users).values(input).returning({ id: schema.users.id });
      // const [u] = ids;
      // console.log('ids', ids);
      return {};
    }),
  list: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      return [1, 2, 3]
      // return db.select().from(schema.users);
    }),
  getById: publicProcedure
    .input(z.number())
    .query(async (opts) => {
      const { input } = opts;

      // const user = await db.query.users.findFirst({
      //   where: eq(schema.users.id, input)
      // });
      return input

      // return user;
    }),
});

export type AppRouter = typeof appRouter;
export const appRouter = router({
  user: userRouter,
});
