import { router } from "../trpc";

import { animationRouter } from "./animationRouter";
import { userRouter } from "./userRouter";


export type AppRouter = typeof appRouter;
export const appRouter = router({
  user: userRouter,
  animation: animationRouter,
});
