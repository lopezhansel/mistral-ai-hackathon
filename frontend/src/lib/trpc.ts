import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@app/backend/src/server/trpc/appRouter";

export const trpc = createTRPCReact<AppRouter>();
