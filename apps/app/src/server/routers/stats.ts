import { z } from 'zod';
import { t } from './trpc';

export const statsRouter = t.router({
  getLastUpdate: t.procedure
    .input(z.object({ serverId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { serverId } = input;

      const lastUpdate = await ctx.prisma.price.findFirst({
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        where: {
          serverId,
        },
      });

      return lastUpdate;
    }),

  getAmountOfPrice: t.procedure
    .input(z.object({ serverId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { serverId } = input;

      const amount = await ctx.prisma.price.count({
        where: {
          serverId,
        },
      });

      return amount;
    }),
});
