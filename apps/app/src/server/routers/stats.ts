import { z } from 'zod';
import { router, publicProcedure } from '../routers/trpc';

export const statsRouter = router({
  getLastUpdate: publicProcedure
    .input(z.object({ serverId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { serverId } = input;
      if (serverId) {
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
      } else {
        const lastUpdate = await ctx.prisma.price.findFirst({
          select: {
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        });

        return lastUpdate;
      }
    }),

  getAmountOfPrice: publicProcedure
    .input(z.object({ serverId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { serverId } = input;

      if (serverId) {
        const amount = await ctx.prisma.price.count({
          where: {
            serverId,
          },
        });

        return amount;
      } else {
        const amount = await ctx.prisma.price.count();

        return amount;
      }
    }),

  getAmountOfItems: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const amount = await ctx.prisma.item.count();

      return amount;
    }),
});
