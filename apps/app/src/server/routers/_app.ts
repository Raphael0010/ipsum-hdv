import { itemRouter } from './items';
import { protectedExampleRouter } from './protected';
import { userRouter } from './user';
import { t } from './trpc';

export const appRouter = t.router({
  user: userRouter,
  protected: protectedExampleRouter,
  item: itemRouter,
});

export type AppRouter = typeof appRouter;
