import { itemRouter } from './items';
import { statsRouter } from './stats';
import { protectedExampleRouter } from './protected';
import { userRouter } from './user';
import { t } from './trpc';

export const appRouter = t.router({
  user: userRouter,
  protected: protectedExampleRouter,
  item: itemRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
