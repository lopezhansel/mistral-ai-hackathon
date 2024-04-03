import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from 'backend/src/server/trpc/appRouter';

export const trpc = createTRPCReact<AppRouter>();
