import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../../../src/server/trpc/appRouter';

export const trpc = createTRPCReact<AppRouter>();
