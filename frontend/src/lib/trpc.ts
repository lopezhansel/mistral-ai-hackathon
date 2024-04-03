import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@app/trpc";

export const trpc = createTRPCReact<AppRouter>();
