import { itemRouter } from './items';
import { statsRouter } from './stats';
import { craftRouter } from './craft';
import { protectedExampleRouter } from './protected';
import { userRouter } from './user';
import { t } from './trpc';

export const appRouter = t.router({
  user: userRouter,
  protected: protectedExampleRouter,
  item: itemRouter,
  stats: statsRouter,
  craft: craftRouter,
});

export type AppRouter = typeof appRouter;
