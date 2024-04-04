import { sendMessage } from "@repo/chat";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(z.string())
    .mutation(({ input }) => sendMessage(input)),
});
