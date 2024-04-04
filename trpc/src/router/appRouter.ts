import { router } from "../trpc";

import { animationRouter } from "./animationRouter";
import { chatRouter } from "./chatRouter";
import { userRouter } from "./userRouter";

export type AppRouter = typeof appRouter;
export const appRouter = router({
  chat: chatRouter,
  user: userRouter,
  animation: animationRouter,
});
