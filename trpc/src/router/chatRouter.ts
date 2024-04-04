import { z } from "zod";
import { sendMessage } from "@repo/chat";
import { publicProcedure, router } from "../trpc";

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(z.string())
    .mutation(({ input }) => sendMessage(input)),
});
